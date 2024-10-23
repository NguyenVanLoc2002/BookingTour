package com.fit.tourservice.repositories.r2dbc;

import com.fit.tourservice.models.Activity;
import com.fit.tourservice.models.Itineraries;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface ActivityRepository extends ReactiveCrudRepository<Activity, Long> {
    Flux<Activity> findActivitiesByItinerId(Long itinerId);
}
