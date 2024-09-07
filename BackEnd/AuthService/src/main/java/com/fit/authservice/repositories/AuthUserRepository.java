package com.fit.authservice.repositories;

import com.fit.authservice.models.AuthUser;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;


public interface AuthUserRepository extends ReactiveCrudRepository<AuthUser, Long> {
}
