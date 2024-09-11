package com.fit.tourservice.repositoires;

import com.fit.tourservice.models.TourPricingDetail;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface TourPricingDetailRepository extends ReactiveCrudRepository<TourPricingDetail, Long> {
}
