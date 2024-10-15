package com.fit.tourservice.repositories.r2dbc;

import com.fit.tourservice.models.TourFeature;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface TourFeatureRepository extends ReactiveCrudRepository<TourFeature, Long> {
}
