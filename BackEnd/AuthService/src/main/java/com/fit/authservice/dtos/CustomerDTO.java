package com.fit.authservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDTO {
    private Long userId;
    private String email;
    private LocalDate registrationDate;
    private String name;
    private String address;
    private boolean gender;
    private LocalDate dateOfBirth;
    private String phoneNumber;

}
