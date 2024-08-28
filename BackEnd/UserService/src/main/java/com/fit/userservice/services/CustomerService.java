package com.fit.userservice.services;

import com.fit.userservice.dtos.CustomerDTO;
import com.fit.userservice.repositories.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Flux<CustomerDTO> getAllCustomers() {
        return  customerRepository.findAll().map(CustomerDTO::convertToDto)
                .switchIfEmpty(Mono.error(new Exception("Customer list empty!")));
    }
}
