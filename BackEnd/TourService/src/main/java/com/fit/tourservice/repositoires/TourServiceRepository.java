package com.fit.tourservice.repositoires;

import com.fit.tourservice.models.TourService;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface TourServiceRepository extends ReactiveCrudRepository<TourService,Long> {
}
