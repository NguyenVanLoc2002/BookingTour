package com.fit.paymentservice.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fit.paymentservice.dtos.BookingDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.ReactiveRedisTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class RedisService {

    private final ReactiveRedisTemplate<String, Object> reactiveRedisTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    public RedisService(ReactiveRedisTemplate<String, Object> reactiveRedisTemplate, @Qualifier("objectMapper") ObjectMapper objectMapper) {
        this.reactiveRedisTemplate = reactiveRedisTemplate;
        this.objectMapper = objectMapper;
    }

    // Lưu dữ liệu vào Redis với TTL
    public Mono<Boolean> saveDataWithTTL(String key, Object value, Duration ttl) {
        return reactiveRedisTemplate.opsForValue().set(key, value, ttl)
                .doOnSuccess(success -> log.info("Saved key: {} with TTL: {}", key, ttl))
                .doOnError(error -> log.error("Failed to save key: {}", key, error));
    }

    // Lấy dữ liệu từ Redis
    public Mono<Object> getData(String key) {
        return reactiveRedisTemplate.opsForValue().get(key);
    }

    // Lấy dữ liệu và chuyển đổi thành BookingDTO
    public Mono<BookingDTO> getDataAsBookingDTO(String key) {
        return getData(key)
                .flatMap(data -> {
                    if (data instanceof LinkedHashMap<?, ?>) {
                        // Chuyển đổi từ LinkedHashMap sang BookingDTO
                        BookingDTO bookingDTO = objectMapper.convertValue(data, BookingDTO.class);
                        return Mono.just(bookingDTO);
                    } else {
                        return Mono.error(new ClassCastException("Data is not of type LinkedHashMap"));
                    }
                });
    }

    // Thêm bookingId vào Redis Set của customer
    public Mono<Boolean> addBookingToCustomer(String customerId, String bookingId) {
        String key = "customer:" + customerId + ":bookings";
        return reactiveRedisTemplate.opsForSet().add(key, bookingId)
                .map(count -> count > 0)  // Nếu có phần tử được thêm vào, trả về true
                .doOnSuccess(success -> log.info("Added booking {} to customer {}", bookingId, customerId))
                .doOnError(error -> log.error("Failed to add booking to customer: {}", error));
    }

    // Lấy danh sách bookings của customer từ Redis
    public Flux<List<BookingDTO>> getBookingsByCustomerId(String customerId) {
        String key = "customer:" + customerId + ":bookings";  // Key của Redis Set chứa các bookingId

        return reactiveRedisTemplate.opsForSet().members(key)
                .doOnNext(bookingIds -> {
                    if (bookingIds != null) {
                        log.info("Fetched bookingIds from Redis for customer {}: {} (Type: {})",
                                customerId, bookingIds, bookingIds.getClass().getName());
                    } else {
                        log.warn("No bookingIds found for customer {} in Redis.", customerId);
                    }
                })
                .flatMap(bookingIds -> {
                    if (bookingIds == null) {
                        log.info("No bookings found for customer {} in Redis. Returning empty list.", customerId);
                        return Mono.just(Collections.emptyList());  // Nếu không có bookingId thì trả về danh sách rỗng
                    }

                    // Nếu bookingIds là một chuỗi đơn lẻ, xử lý nó như một bookingId
                    if (bookingIds instanceof String) {
                        String bookingId = (String) bookingIds;
                        log.info("Processing single bookingId: {}", bookingId);
                        return getDataAsBookingDTO(bookingId) // Lấy dữ liệu từ Redis theo bookingId
                                .flatMap(bookingDTO -> Mono.just(Collections.singletonList(bookingDTO))); // Trả về danh sách chứa 1 bookingDTO
                    } else {
                        // Nếu bookingIds là một Set (như bạn đã dự đoán), xử lý như trước
                        Set<String> bookingIdSet = (Set<String>) bookingIds;
                        List<Mono<BookingDTO>> bookingMonos = bookingIdSet.stream()
                                .map(bookingId -> getDataAsBookingDTO("booking:" + bookingId)) // Key cho từng bookingId
                                .collect(Collectors.toList());

                        return Mono.zip(bookingMonos, results -> {
                            List<BookingDTO> bookings = new ArrayList<>();
                            for (Object result : results) {
                                bookings.add((BookingDTO) result);
                            }
                            log.info("Returning {} bookings for customer {}", bookings.size(), customerId);
                            return bookings;
                        });
                    }
                });
    }




    // Lưu thông tin Booking và thêm bookingId vào Redis Set của customer
    public Mono<Boolean> saveBookingTourFromRedis(BookingDTO bookingDTO) {
        String bookingKey = bookingDTO.getBookingId().toString();

        // Lưu thông tin BookingDTO vào Redis với TTL
        Mono<Boolean> saveBookingMono = saveDataWithTTL(bookingKey, bookingDTO, Duration.ofDays(1));

        // Lưu bookingId vào Redis Set của customerId
        String customerId = (bookingDTO.getCustomerId() != null) ? bookingDTO.getCustomerId().toString() : "guest";
        Mono<Boolean> addBookingToCustomerMono = addBookingToCustomer(customerId, bookingKey);

        // Kết hợp cả hai Mono để thực hiện đồng thời
        return Mono.zip(saveBookingMono, addBookingToCustomerMono)
                .map(tuple -> tuple.getT1() && tuple.getT2())  // Kiểm tra cả hai thao tác đã thành công
                .doOnError(throwable -> log.error("Error saving booking and adding to customer: {}", throwable.getMessage(), throwable));
    }
}


