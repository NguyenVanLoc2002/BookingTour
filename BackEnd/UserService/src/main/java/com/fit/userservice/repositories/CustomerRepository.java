package com.fit.userservice.repositories;

import com.fit.userservice.models.Customer;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Mono;


public interface CustomerRepository extends ReactiveCrudRepository<Customer, Long> {
    @Query("Select * from customers where user_id = :id")
    Mono<Customer> findByUserId(@Param("id") Long id);
}