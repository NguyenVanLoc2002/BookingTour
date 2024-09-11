package com.fit.tourservice.repositoires;

import com.fit.tourservice.models.Tour;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface TourRepository extends ReactiveCrudRepository<Tour, Long> {
}
