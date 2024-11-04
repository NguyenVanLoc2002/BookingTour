package com.fit.paymentservice.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fit.paymentservice.dtos.BookingDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.LinkedHashMap;

@Service
public class RedisService {

    private final ReactiveRedisTemplate<String, Object> reactiveRedisTemplate;
    private final ObjectMapper objectMapper;

    @Autowired

    public RedisService(ReactiveRedisTemplate<String, Object> reactiveRedisTemplate, @Qualifier("objectMapper") ObjectMapper objectMapper) {
        this.reactiveRedisTemplate = reactiveRedisTemplate;
        this.objectMapper = objectMapper;
    }

    public Mono<Boolean> saveData(String key, Object value) {
        return reactiveRedisTemplate.opsForValue().set(key, value);
    }

    public Mono<Object> getData(String key) {
        return reactiveRedisTemplate.opsForValue().get(key);
    }

    public Mono<BookingDTO> getDataAsBookingDTO(String key) {
        return getData(key)
                .flatMap(data -> {
                    if (data instanceof LinkedHashMap<?,?>) {
                        // Chuyển đổi từ LinkedHashMap sang BookingDTO
                        BookingDTO bookingDTO = objectMapper.convertValue(data, BookingDTO.class);
                        return Mono.just(bookingDTO);
                    } else {
                        return Mono.error(new ClassCastException("Data is not of type LinkedHashMap"));
                    }
                });
    }

    public Mono<Boolean> acquireLock(String key) {
        return reactiveRedisTemplate.opsForValue().setIfAbsent(key, true, Duration.ofSeconds(30));
    }

    public Mono<Void> releaseLock(String key) {
        return reactiveRedisTemplate.opsForValue().delete(key).then();
    }
}

