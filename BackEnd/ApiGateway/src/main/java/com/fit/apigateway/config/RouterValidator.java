package com.fit.apigateway.config;


import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Predicate;
import java.util.regex.Pattern;

@Component
public class RouterValidator {

    public static final List<Pattern> openApiEndpoints = List.of(
            Pattern.compile("/api/v1/auth/login"),
            Pattern.compile("/api/v1/customers/addCustomer"),
            Pattern.compile("/api/v1/auth/get-claims"),
            Pattern.compile("/eureka")
    );

    public static final List<Pattern> internalApiEndpoints = List.of(
            Pattern.compile("/api/v1/auth/.*")
//          Pattern.compile("/api/v1/students/.*")
    );

    public static final List<Pattern> adminApiEndpoints = List.of(
            Pattern.compile("/api/v1/tours/*"),
            Pattern.compile("/api/v1/customers/*")
    );

    public static final List<Pattern> customerApiEndpoints = List.of(
            Pattern.compile("/api/v1/tours/user/*"),
            Pattern.compile("/api/v1/bookings/*"),
            Pattern.compile("/api/v1/customers/by-email")
    );

    private Predicate<ServerHttpRequest> createPredicate(List<Pattern> patterns) {
        return request -> patterns.stream()
                .anyMatch(pattern -> pattern.matcher(request.getURI().getPath()).matches());
    }

    public final Predicate<ServerHttpRequest> isSecured = createPredicate(openApiEndpoints).negate();
    public final Predicate<ServerHttpRequest> isInternal = createPredicate(internalApiEndpoints);
    public final Predicate<ServerHttpRequest> adminEndpoints = createPredicate(adminApiEndpoints);
    public final Predicate<ServerHttpRequest> customerEndpoints = createPredicate(customerApiEndpoints);
}

