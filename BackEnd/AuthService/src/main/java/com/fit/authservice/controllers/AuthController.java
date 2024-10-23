package com.fit.authservice.controllers;

import com.fit.authservice.dtos.request.CustomerDTO;
import com.fit.authservice.dtos.response.ApiResponse;
import com.fit.authservice.dtos.response.ClaimsResponse;
import com.fit.authservice.utils.JwtUtils;
import com.fit.authservice.dtos.AuthUserDTO;
import com.fit.authservice.dtos.request.AccountRequest;
import com.fit.authservice.dtos.response.LoginResponse;
import com.fit.authservice.enums.Role;
import com.fit.authservice.services.AuthService;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.time.LocalDate;

@RestController
@RequestMapping("/auth")
@Slf4j
public class AuthController {
    @Autowired
    private AuthService authService;
    @Autowired
    private JwtUtils jwtUtils;

    @GetMapping("/verify-account")
    public Mono<ResponseEntity<AuthUserDTO>> verifyAccount(@RequestParam("token") String token) {
        Claims claims = jwtUtils.extractAllClaims(token);
        log.info("claims: {}",claims.toString());
        String email = claims.get("email", String.class);
        String name = claims.get("name", String.class);
        boolean gender = claims.get("gender", Boolean.class);
        LocalDate dateOfBirth = LocalDate.parse(claims.get("dateOfBirth", String.class));

        CustomerDTO customerDTO = new CustomerDTO();
        customerDTO.setEmail(email);
        customerDTO.setName(name);
        customerDTO.setGender(gender);
        customerDTO.setDateOfBirth(dateOfBirth);
        log.info("customerDTO: {}",customerDTO);
        if(email==null){
            return Mono.just(ResponseEntity.badRequest().build());
        }

        AuthUserDTO authUserDTO = new AuthUserDTO();
        authUserDTO.setEmail(email);
        authUserDTO.setPassword("123456");
        authUserDTO.setRole(Role.USER);
        log.info(authUserDTO.toString());
        return authService.createAuthUser(authUserDTO)
                .flatMap(authSaved ->{
                    return authService.registerUser(customerDTO)
                            .map(customerResponse -> {
                                log.info("Customer registered successfully: {}", customerResponse);
                                return ResponseEntity.ok().body(authSaved);
                            })
                            .defaultIfEmpty(ResponseEntity.badRequest().build());
                })
                .defaultIfEmpty(ResponseEntity.badRequest().build());
    }

    @PostMapping("/login")
    public Mono<ResponseEntity<LoginResponse>> login(@RequestBody AccountRequest accountRequest){
        return authService.login(accountRequest)
                .map(loginResponse -> ResponseEntity.ok().body(loginResponse))
                .onErrorResume(e -> {
                    log.error("Error during login", e);
                    LoginResponse defaultResponse = null;
                    return Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(defaultResponse));
                });
    }

    @GetMapping("/get-claims")
    public Mono<ApiResponse<ClaimsResponse>> getClaims(@RequestHeader("Authorization") String authorization) {
        log.info("Get claims");

        if (authorization == null || !authorization.startsWith("Bearer ")) {
            return Mono.just(ApiResponse.<ClaimsResponse>builder()
                    .code(HttpStatus.UNAUTHORIZED.value())
                    .message("Invalid authorization header.")
                    .build());
        }

        String token = authorization.substring(7);

        return Mono.just(token)
                .flatMap(t -> {
                    // Validate and extract claims from the token
                    String username = jwtUtils.extractUsername(t);
                    Claims claims = jwtUtils.extractAllClaims(t);

                    if (username == null) {
                        return Mono.just(ApiResponse.<ClaimsResponse>builder()
                                .code(HttpStatus.UNAUTHORIZED.value())
                                .message("Invalid token.")
                                .build());
                    }

                    // Extract the role from claims
                    String roleClaim = claims.get("role", String.class);
                    Role role = Role.valueOf(roleClaim); // Convert the string to the Enum

                    // Construct the response object
                    ClaimsResponse claimsResponse = new ClaimsResponse(username, role);
                    log.info("claimsResponse: {}", claimsResponse);
                    return Mono.just(ApiResponse.<ClaimsResponse>builder()
                            .code(HttpStatus.OK.value())
                            .result(claimsResponse)
                            .build());
                })
                .onErrorResume(e -> {
                    log.error("Error while extracting claims: {}", e.getMessage());
                    return Mono.just(ApiResponse.<ClaimsResponse>builder()
                            .code(HttpStatus.UNAUTHORIZED.value())
                            .message("Token validation failed.")
                            .build());
                });
    }
}
