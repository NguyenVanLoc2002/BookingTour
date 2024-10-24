package com.fit.tourservice.repositories.r2dbc;

import com.fit.tourservice.enums.Region;
import com.fit.tourservice.models.TourFeature;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface TourFeatureRepository extends ReactiveCrudRepository<TourFeature, Long> {
    @Query("SELECT * FROM tour_feature WHERE region = :region AND start_date > CURRENT_DATE")
    Flux<TourFeature> findAllByRegion(@Param("region") Region region);
}
