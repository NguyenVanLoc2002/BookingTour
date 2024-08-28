package com.fit.userservice.models;


import lombok.*;

import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Customer extends  User{
    private String name;
    private String address;
    private boolean gender;
    private LocalDate dateOfBirth;
    private String phoneNumber;
}
