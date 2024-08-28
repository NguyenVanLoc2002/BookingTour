package com.fit.userservice.repositories;

import com.fit.userservice.models.Customer;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface CustomerRepository extends ReactiveCrudRepository<Customer, String> {
}