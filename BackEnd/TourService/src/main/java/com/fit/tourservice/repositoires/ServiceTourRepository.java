package com.fit.tourservice.repositoires;

import com.fit.tourservice.models.ServiceTour;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ServiceTourRepository extends ReactiveCrudRepository<ServiceTour,Long> {
}
