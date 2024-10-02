package com.fit.recommendationservice.services;

import com.fit.recommendationservice.dtos.response.CustomerInteractionDTO;
import com.fit.recommendationservice.repositories.CustomerInteractionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class CustomerInteractionService {
    @Autowired
    private CustomerInteractionRepository customerInteractionRepository;

    public Mono<CustomerInteractionDTO> addCustomerInteraction(CustomerInteractionDTO customerInteractionDTO) {
        return Mono.just(customerInteractionDTO)
                .map(CustomerInteractionDTO::convertToEntity)
                .flatMap(customerInteraction -> customerInteractionRepository.save(customerInteraction))
                .map(CustomerInteractionDTO::convertToDTO)
                .doOnError(throwable -> log.error(throwable.getMessage(), throwable));
    }
}
