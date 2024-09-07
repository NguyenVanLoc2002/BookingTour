package com.fit.userservice.services;

import com.fit.userservice.dtos.CustomerDTO;
import com.fit.userservice.models.Customer;
import com.fit.userservice.models.User;
import com.fit.userservice.repositories.CustomerRepository;
import com.fit.userservice.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;

@Service
@Slf4j
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private UserRepository userRepository;

    public Flux<CustomerDTO> getAllCustomers() {
        return customerRepository.findAll()
                .flatMap(customer -> userRepository.findById(customer.getUserId())
                        .map(user -> {
                            CustomerDTO customerDTO = CustomerDTO.convertToDto(customer);
                            customerDTO.setName(user.getName());
                            customerDTO.setEmail(user.getEmail());
                            customerDTO.setRegistrationDate(user.getRegistrationDate());
                            return customerDTO;
                        }))

                .switchIfEmpty(Mono.error(new Exception("Customer list empty!")));
    }

    public Mono<Boolean> checkduplicateEmail(String email) {
        return userRepository.findByEmail(email)
                .flatMap(customer -> Mono.just(true))
                .switchIfEmpty(Mono.just(false));
    }

    public Mono<CustomerDTO> addCustomer(CustomerDTO customerDTO) {
        return checkduplicateEmail(customerDTO.getEmail())
                .flatMap(aBoolean -> {
                    if (Boolean.TRUE.equals(aBoolean)) {
                        return Mono.error(new Exception("Customer with email " + customerDTO.getEmail() + " already exists"));
                    } else {
                        return createCustomer(customerDTO);
                    }
                });
    }

    public Mono<CustomerDTO> createCustomer(CustomerDTO customerDTO) {
        User user = new User();
        user.setName(customerDTO.getName());  // Thay thế full_name bằng name
        user.setEmail(customerDTO.getEmail());
        user.setRegistrationDate(LocalDate.now());

        return userRepository.save(user)
                .flatMap(savedUser -> {
                    Customer customer = CustomerDTO.convertToEntity(customerDTO);
                    customer.setUserId(savedUser.getUserId());
                    return customerRepository.save(customer);
                })
                .map(CustomerDTO::convertToDto);
    }



}
