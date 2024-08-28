package com.fit.userservice.models;


import lombok.*;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString

public class User {
    private String userId;
    private String email;
    private LocalDate registrationDate;
}
