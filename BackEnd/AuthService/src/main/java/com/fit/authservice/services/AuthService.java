package com.fit.authservice.services;

import com.fit.authservice.utils.JwtUtils;
import com.fit.authservice.dtos.AuthUserDTO;
import com.fit.authservice.dtos.request.AccountRequest;
import com.fit.authservice.dtos.response.LoginResponse;
import com.fit.authservice.models.AuthUser;
import com.fit.authservice.repositories.AuthUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.*;

@Service
@Slf4j
public class AuthService {
    @Autowired
    AuthUserRepository authUserRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtils jwtUtils;

    public Mono<AuthUserDTO> createAuthUser(AuthUserDTO authUserDTO) {
        return Mono.just(authUserDTO)
                .map(AuthUserDTO::convertToEntity)
                .map(authUser -> {
                    String encodedPassword = passwordEncoder.encode(authUser.getPassword());
                    authUser.setPassword(encodedPassword);
                    return authUser;
                })
                .flatMap(authUser -> authUserRepository.save(authUser))
                .map(AuthUserDTO::convertToDto)
                .doOnError(throwable -> log.error(throwable.getMessage(), throwable));
    }

    public Mono<AuthUserDTO> findById(Long id) {
        return authUserRepository.findById(id)
                .map(AuthUserDTO::convertToDto)
                .switchIfEmpty(Mono.error(NoSuchElementException::new));
    }

    public Mono<LoginResponse> login(AccountRequest accountRequest) {
        return authUserRepository.findByEmail(accountRequest.getEmail())
                .flatMap(authUser -> {
                    if (passwordEncoder.matches(accountRequest.getPassword(), authUser.getPassword())) {
                        // Tạo extraClaims nếu cần
                        Map<String, Object> extraClaims = new HashMap<>();
                        // Bạn có thể thêm các claim tùy ý vào đây
                        extraClaims.put("role", authUser.getRole()); // Ví dụ: thêm role

                        // Chuyển đổi AuthUser thành UserDetails
                        UserDetails userDetails = convertToUserDetails(authUser);
                        log.info("userDetails: {}", userDetails );

                        // Gọi phương thức generateToken với extraClaims
                        String token = jwtUtils.generateToken(extraClaims, userDetails);
                        LoginResponse loginResponse = new LoginResponse(authUser.getEmail(), authUser.getRole(), token);
                        return Mono.just(loginResponse);
                    } else {
                        // Mật khẩu không đúng
                        return Mono.error(new RuntimeException("Invalid email or password"));
                    }
                })
                .switchIfEmpty(Mono.error(new RuntimeException("Invalid email or password")));
    }

    private UserDetails convertToUserDetails(AuthUser authUser) {
        // Lấy quyền hạn từ AuthUser (nếu có)
        Collection<? extends GrantedAuthority> authorities = List.of(authUser.getRole());

        // Tạo và trả về đối tượng UserDetails
        return new User(
                authUser.getEmail(),
                authUser.getPassword(),
                authorities
        );
    }
}
