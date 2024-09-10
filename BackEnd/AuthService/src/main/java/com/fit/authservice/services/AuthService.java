package com.fit.authservice.services;

import com.fit.authservice.dtos.AuthUserDTO;
import com.fit.authservice.repositories.AuthUserRepository;
import com.fit.commonservice.common.CommonException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.NoSuchElementException;

@Service
@Slf4j
public class AuthService {
    @Autowired
    AuthUserRepository authUserRepository;

    public Mono<AuthUserDTO> createAuthUser(AuthUserDTO authUserDTO) {
        return Mono.just(authUserDTO)
                .map(AuthUserDTO::convertToEntity)
                .flatMap(authUser -> authUserRepository.save(authUser))
                .map(AuthUserDTO::convertToDto)
                .doOnError(throwable -> log.error(throwable.getMessage(), throwable));
    }

    public Mono<AuthUserDTO> findById(Long id) {
        return authUserRepository.findById(id)
                .map(AuthUserDTO::convertToDto)
                .switchIfEmpty(Mono.error(NoSuchElementException::new));
    }
}
