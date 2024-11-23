package com.fit.paymentservice.controllers;


import com.fit.paymentservice.dtos.BookingDTO;
import com.fit.paymentservice.dtos.request.BookingRequest;
import com.fit.paymentservice.enums.StatusBooking;
import com.fit.paymentservice.services.BookingService;
import com.fit.paymentservice.services.RedisService;
import com.fit.paymentservice.utils.JwtUtils;
import io.jsonwebtoken.Claims;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/booking")
@Slf4j
public class BookingController {

    private final BookingService bookingService;
    private final RedisService redisService;
    private final JwtUtils jwtUtils;


    public BookingController(BookingService bookingService, RedisService redisService, JwtUtils jwtUtils) {
        this.bookingService = bookingService;
        this.redisService = redisService;
        this.jwtUtils = jwtUtils;
    }


    @PostMapping("/bookTour")
    public Mono<ResponseEntity<BookingDTO>> bookTour(@RequestBody BookingRequest bookingRequest) {
        return bookingService.createBookingTour(bookingRequest)
                .flatMap(bookingResponse -> {
                    if (bookingResponse != null && bookingResponse.isAvailable()) {
                        BookingDTO bookingDTO = bookingService.mapBookingResponseToDTO(bookingRequest, bookingResponse);
                        return redisService.saveBookingTourFromRedis(bookingDTO)
                                .flatMap(saved -> {
                                    if (saved) {
                                        return bookingService.sendBookingNotification(bookingDTO)
                                                .then(Mono.just(ResponseEntity.ok(bookingDTO)));
                                    } else {
                                        return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                                .body(new BookingDTO()));
                                    }
                                })
                                .onErrorResume(e -> {
                                    log.error("Failed to send Kafka message: {}", e.getMessage());
                                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                                });
                    } else {
                        return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BookingDTO()));
                    }
                })
                .onErrorResume(throwable -> {
                    log.error("Error occurred: {}", throwable.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }

    //Lay du lieu tu Redis
    @GetMapping("redis/{bookingId}")
    public Mono<ResponseEntity<BookingDTO>> getBookingTour(@PathVariable String bookingId) {

        return redisService.getDataAsBookingDTO(bookingId)
                .map(data -> ResponseEntity.ok(data))
                .defaultIfEmpty(ResponseEntity.notFound().build()) // Trả về 404 nếu không tìm thấy
                .doOnError(throwable -> log.error("Error retrieving booking from Redis: {}", throwable.getMessage()));
    }

    // Endpoint lấy danh sách bookings của customer
    @GetMapping("/redis/customer/{customerId}")
    @ResponseStatus(HttpStatus.OK)
    public Flux<List<BookingDTO>> getBookingsByCustomerId(@PathVariable String customerId) {
        return redisService.getBookingsByCustomerId(customerId);
    }

    @GetMapping("/verify-booking-tour")
    public Mono<ResponseEntity<Object>> verifyBookingTour(@RequestParam("bookingId") String bookingId, @RequestParam("redirectUrl") String redirectUrl) {
        Claims claims = jwtUtils.extractAllClaims(bookingId);
        String key = claims.get("bookingId", String.class);

        return redisService.getDataAsBookingDTO(key) // Phải trả về Mono<BookingDTO>
                .flatMap(bookingDTO -> {
                    bookingDTO.setStatusBooking(StatusBooking.CONFIRMED);
                    return redisService.saveBookingTourFromRedis(bookingDTO)
                            .flatMap(success -> {
                                if (success) {
                                    // Thêm bookingId vào redirectUrl
                                    String redirectUrlWithBookingId = redirectUrl + "?bookingId=" + key;
                                    URI uri = URI.create(redirectUrlWithBookingId);
                                    return Mono.just(ResponseEntity.status(HttpStatus.FOUND) // Chuyển hướng
                                            .location(uri)
                                            .build());
                                } else {
                                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                                }
                            });
                })
                .switchIfEmpty(Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND).build())) // Nếu không tìm thấy
                .onErrorResume(throwable -> {
                    log.error("Error occurred: {}", throwable.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()); // Nếu có lỗi
                });
    }


}