package com.fit.paymentservice.controllers;


import com.fit.commonservice.utils.Constant;
import com.fit.paymentservice.dtos.response.BookingDTO;
import com.fit.paymentservice.dtos.request.BookingRequest;
import com.fit.paymentservice.events.EventProducer;
import com.fit.paymentservice.services.BookingService;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/booking")
@Slf4j
public class BookingController {

    private final BookingService bookingService;
    private final EventProducer eventProducer;
    private final Gson gson;

    public BookingController(BookingService bookingService, EventProducer eventProducer, @Qualifier("gson") Gson gson) {
        this.bookingService = bookingService;
        this.eventProducer = eventProducer;
        this.gson = gson;
    }

    @PostMapping
    public Mono<ResponseEntity<BookingDTO>> bookTour(@RequestBody BookingRequest bookingRequest) {
        return bookingService.createBookingTour(bookingRequest)
                .flatMap(bookingDTO -> {
                    if (bookingDTO != null && bookingDTO.isAvailable()) {
                        return bookingService.saveBookingTour(bookingDTO)
                                .flatMap(savedBooking -> {
                                    String email = bookingRequest.getEmail();
                                    bookingRequest.setBookingId(savedBooking.getBookingId());
                                    return eventProducer.send(Constant.NOTIFICATION_BOOKING_TOUR_TOPIC, String.valueOf(savedBooking.getBookingId()), gson.toJson(bookingRequest))
                                                    .thenReturn(ResponseEntity.status(HttpStatus.CREATED).body(savedBooking))
                                            .onErrorResume(e->{
                                                log.error("Failed to send Kafka message: {}", e.getMessage());
                                                return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                                            })
                                     ;
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
}