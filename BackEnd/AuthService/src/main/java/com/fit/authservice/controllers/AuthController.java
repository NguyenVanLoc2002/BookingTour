package com.fit.authservice.controllers;

import com.fit.authservice.dtos.AuthUserDTO;
import com.fit.authservice.dtos.request.AccountRequest;
import com.fit.authservice.dtos.response.LoginResponse;
import com.fit.authservice.enums.Role;
import com.fit.authservice.services.AuthService;
import com.fit.commonservice.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/auth")
@Slf4j
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/verify-account")
    public Mono<ResponseEntity<AuthUserDTO>> verifyAccount(@RequestParam("token") String token) {
        String email = jwtUtils.extractUsername(token);
        if(email==null){
            return Mono.just(ResponseEntity.badRequest().build());
        }

        AuthUserDTO authUserDTO = new AuthUserDTO();
        authUserDTO.setEmail(email);
        authUserDTO.setPassword("123456");
        authUserDTO.setRole(Role.USER);
        log.info(authUserDTO.toString());
        return authService.createAuthUser(authUserDTO)
                .map(authSaved-> ResponseEntity.ok().body(authSaved))
                .defaultIfEmpty(ResponseEntity.badRequest().build());
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<LoginResponse>> login(@RequestBody AccountRequest accountRequest){
        return authService.login(accountRequest)
                .map(loginResponse -> ResponseEntity.ok().body(loginResponse))
                .onErrorResume(e-> {
                    LoginResponse defaultResponse = null;
                    return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body(defaultResponse));
                });
    }
}
