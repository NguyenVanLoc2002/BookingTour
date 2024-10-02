package com.fit.recommendationservice.repositories;

import com.fit.recommendationservice.models.CustomerInteraction;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface CustomerInteractionRepository  extends ReactiveCrudRepository<CustomerInteraction, String> {
    Flux<CustomerInteraction> findByCusId(String cusId);
}
