package com.fit.authservice.services;

import com.fit.authservice.repositories.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    AuthUserRepository authUserRepository;
}
