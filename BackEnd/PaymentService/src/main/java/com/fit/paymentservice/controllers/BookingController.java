package com.fit.paymentservice.controllers;


import com.fit.paymentservice.dtos.BookingDTO;
import com.fit.paymentservice.dtos.BookingRequest;
import com.fit.paymentservice.services.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/booking")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Mono<ResponseEntity<BookingDTO>> bookTour(@RequestBody BookingRequest bookingRequest) {
        return bookingService.bookTour(bookingRequest)
                .map(bookingDTO -> ResponseEntity.status(HttpStatus.CREATED).body(bookingDTO))
                .onErrorResume(throwable -> Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()));
    }
}
