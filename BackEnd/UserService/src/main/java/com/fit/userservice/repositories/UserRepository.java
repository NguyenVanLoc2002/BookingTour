package com.fit.userservice.repositories;

import com.fit.userservice.models.User;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface UserRepository extends ReactiveCrudRepository<User, String> {
}