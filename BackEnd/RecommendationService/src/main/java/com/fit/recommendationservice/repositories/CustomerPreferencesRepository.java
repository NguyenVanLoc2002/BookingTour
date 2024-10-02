package com.fit.recommendationservice.repositories;

import com.fit.recommendationservice.models.CustomerPreferences;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Repository
public interface CustomerPreferencesRepository extends ReactiveCrudRepository<CustomerPreferences, Long> {
    Flux<CustomerPreferences> findByCusId(Long cusId);

    @Query("SELECT price FROM customer_preferences WHERE cus_id = :customerId GROUP BY price ORDER BY start_date DESC LIMIT 1")
    Mono<Double> findLatestPrice(@Param("customerId") Long customerId);

    @Query("SELECT max_duration FROM customer_preferences WHERE cus_id = :customerId GROUP BY max_duration ORDER BY start_date DESC LIMIT 1")
    Mono<Integer> findLatestDuration(@Param("customerId") Long customerId);

    @Query("SELECT type_tour FROM customer_preferences WHERE cus_id = :customerId GROUP BY type_tour ORDER BY COUNT(*) DESC LIMIT 1")
    Mono<Integer> findPopularTypeTour(@Param("customerId") Long customerId);

    @Query("SELECT region FROM customer_preferences WHERE cus_id = :customerId GROUP BY region ORDER BY COUNT(*) DESC LIMIT 1")
    Mono<Integer> findPopularRegion(Long customerId);

    @Query("SELECT accommodation_quality FROM customer_preferences WHERE cus_id = :customerId GROUP BY accommodation_quality ORDER BY COUNT(*) DESC LIMIT 1")
    Mono<Integer> findPopularAccommodationQuality(Long customerId);

    @Query("SELECT transportation_mode FROM customer_preferences WHERE cus_id = :customerId GROUP BY transportation_mode ORDER BY COUNT(*) DESC LIMIT 1")
    Mono<Integer> findPopularTransportationMode(Long customerId);
}
