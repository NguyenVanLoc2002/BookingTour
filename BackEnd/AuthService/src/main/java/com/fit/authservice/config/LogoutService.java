package com.fit.authservice.config;

import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.web.server.WebFilterExchange;
import org.springframework.security.web.server.authentication.logout.ServerLogoutHandler;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class LogoutService implements ServerLogoutHandler {


    @Override
    public Mono<Void> logout(WebFilterExchange exchange, Authentication authentication) {
        // Lấy thông tin header Authorization
        String authHeader = exchange.getExchange().getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Mono.empty(); // Nếu không có header, trả về Mono.empty()
        }

        // Xóa thông tin xác thực trong ReactiveSecurityContextHolder
        return Mono.fromRunnable(() -> {
            // Xóa context xác thực
            ReactiveSecurityContextHolder.clearContext();
        });
    }
}
