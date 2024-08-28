package com.fit.userservice.dtos;

import com.fit.userservice.models.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private String userId;
    private String email;
    private LocalDate registrationDate;
    private String name;
    private String address;
    private boolean gender;
    private LocalDate dateOfBirth;
    private String phoneNumber;

    public static Customer convertToEntity(CustomerDTO customerDTO) {
        Customer customer = new Customer();
        customer.setUserId(customerDTO.getUserId());
        customer.setEmail(customerDTO.getEmail());
        customer.setRegistrationDate(customerDTO.getRegistrationDate());
        customer.setName(customerDTO.getName());
        customer.setAddress(customerDTO.getAddress());
        customer.setGender(customerDTO.isGender());
        customer.setDateOfBirth(customerDTO.getDateOfBirth());
        customer.setPhoneNumber(customerDTO.getPhoneNumber());
        return customer;
    }

    public static CustomerDTO convertToDto(Customer customer) {
        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setUserId(customer.getUserId());
        customerDTO.setEmail(customer.getEmail());
        customerDTO.setRegistrationDate(customer.getRegistrationDate());
        customerDTO.setName(customer.getName());
        customerDTO.setAddress(customer.getAddress());
        customerDTO.setGender(customer.isGender());
        customerDTO.setDateOfBirth(customer.getDateOfBirth());
        customerDTO.setPhoneNumber(customer.getPhoneNumber());
        return customerDTO;
    }
}
