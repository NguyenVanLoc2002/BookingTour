package com.fit.tourservice.repositoires;

import com.fit.tourservice.models.Review;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface ReviewRepository extends ReactiveCrudRepository<Review, Long> {
}
