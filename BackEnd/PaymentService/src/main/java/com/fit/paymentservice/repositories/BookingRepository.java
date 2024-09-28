package com.fit.paymentservice.repositories;

import com.fit.paymentservice.models.Booking;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;

public interface BookingRepository extends ReactiveCrudRepository<Booking, Long> {
    @Override
    Mono<Booking> findById(Long aLong);
}
