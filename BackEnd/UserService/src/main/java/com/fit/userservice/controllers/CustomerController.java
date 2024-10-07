package com.fit.userservice.controllers;

import com.fit.commonservice.utils.CommonFunction;
import com.fit.userservice.dtos.CustomerDTO;
import com.fit.userservice.services.CustomerService;
import com.fit.userservice.utils.Constant;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.InputStream;

@RestController
@RequestMapping("/api/v1/customers")
@Slf4j
public class CustomerController {

    @Autowired
    private CustomerService customerService;
    @Autowired
    private Gson gson;


    @GetMapping
    public ResponseEntity<Flux<CustomerDTO>> getAllCustomers(@RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(customerService.getAllCustomers(page, size));
    }

    @GetMapping("/by-email")
    public ResponseEntity<Mono<CustomerDTO>> getCustomerByEmail(@RequestParam String email) {
        return ResponseEntity.ok(customerService.getInfoByEmail(email));
    }

    @GetMapping(value = "/checkduplicate/{email}")
    public ResponseEntity<Mono<Boolean>> checkDuplicate(@PathVariable String email) {
        return ResponseEntity.ok(customerService.checkduplicateEmail(email));
    }

    @PostMapping(value = "/addCustomer")
    public ResponseEntity<Mono<CustomerDTO>> addCustomer(@RequestBody String requestStr) {
        log.info("Add customer  {}", requestStr);
        InputStream inputStream = CustomerController.class.getClassLoader().getResourceAsStream(Constant.JSON_REQ_CREATE_CUSTOMER);
        CommonFunction.jsonValidate(inputStream, requestStr);
        return ResponseEntity.status(HttpStatus.CREATED).body(customerService.addCustomer(gson.fromJson(requestStr, CustomerDTO.class)));
    }
}
