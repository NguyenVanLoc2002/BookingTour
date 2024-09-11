package com.fit.tourservice.repositoires;

import com.fit.tourservice.models.Itineraries;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ItinerariesRepository extends ReactiveCrudRepository<Itineraries, Long> {
}
