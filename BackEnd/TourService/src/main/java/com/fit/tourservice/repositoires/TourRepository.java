package com.fit.tourservice.repositoires;

import com.fit.tourservice.dtos.response.TourDTO;
import com.fit.tourservice.enums.AccommodationQuality;
import com.fit.tourservice.enums.Region;
import com.fit.tourservice.enums.TransportationMode;
import com.fit.tourservice.enums.TypeTour;
import com.fit.tourservice.models.Tour;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

import java.time.LocalDate;

public interface TourRepository extends ReactiveCrudRepository<Tour, Long> {

    @Query("SELECT * FROM tours T " +
            "JOIN tour_feature TF ON T.tour_id = TF.tour_id " +
            "WHERE T.available_slot > 0 AND " +
            "T.price <= :maxCost AND " +
            "DATEDIFF(TF.end_date, TF.start_date) <= :maxDuration AND " +
            "TF.start_date >= :startDate AND " +
            "(:typeTour IS NULL OR TF.type_tour = :typeTour) AND " +
            "(:accommodationQuality IS NULL OR TF.accommodation_quality = :accommodationQuality) AND " +
            "(:region IS NULL OR TF.region = :region) AND " +
            "(:transportationMode IS NULL OR TF.transportation_mode = :transportationMode) AND " +
            "(:includePromotions IS NULL OR T.include_promotions = :includePromotions)"
    )
    Flux<TourDTO> findToursByCriteria(@Param("maxCost") double maxCost,
                                      @Param("maxDuration") int maxDuration,
                                      @Param("startDate") LocalDate startDate,
                                      @Param("typeTour") Integer typeTour, // Sử dụng Integer
                                      @Param("accommodationQuality") Integer accommodationQuality, // Sử dụng Integer
                                      @Param("region") Integer region, // Sử dụng Integer
                                      @Param("transportationMode") Integer transportationMode, // Sử dụng Integer
                                      @Param("includePromotions") Boolean includePromotions);
}
