package com.fit.tourservice.repositoires;

import com.fit.tourservice.models.Itineraries;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface ItinerariesRepository extends ReactiveCrudRepository<Itineraries, Long> {

    Flux<Itineraries> findItinerariesByTourId(Long tourId);
}
