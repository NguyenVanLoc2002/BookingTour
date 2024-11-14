package com.fit.tourservice.repositories.r2dbc;

import com.fit.tourservice.enums.Region;
import com.fit.tourservice.models.TourFeature;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface TourFeatureRepository extends ReactiveCrudRepository<TourFeature, Long> {
    @Query("SELECT * FROM tour_feature WHERE region = :region AND start_date > CURRENT_DATE ORDER BY start_date LIMIT :limit OFFSET :offset")
    Flux<TourFeature> findAllByRegionAndStartDateAfter(
            @Param("region") Region region,
            @Param("limit") int limit,   // Định nghĩa limit cho số lượng bản ghi
            @Param("offset") int offset  // Định nghĩa offset cho phân trang
    );

    @Query("SELECT COUNT(*) FROM tour_feature WHERE region = :region AND start_date > CURRENT_DATE")
    Mono<Long> countToursByRegionAndStartDateAfter(@Param("region") Region region);
}
