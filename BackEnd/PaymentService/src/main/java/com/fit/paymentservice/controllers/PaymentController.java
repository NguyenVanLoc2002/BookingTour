package com.fit.paymentservice.controllers;

import com.fit.paymentservice.dtos.PaymentDTO;
import com.fit.paymentservice.dtos.request.PaymentRequest;
import com.fit.paymentservice.enums.StatusBooking;
import com.fit.paymentservice.services.BookingService;
import com.fit.paymentservice.services.PaymentService;
import com.fit.paymentservice.services.RedisService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping("/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;
    @Autowired
    private BookingService bookingService;
    @Autowired
    private RedisService redisService;


//    @PostMapping("/create")
//    public Mono<RedirectView> makePayment() {
//        log.info("Making payment request");
//        return paymentService.createPayment(100.00, Currency.USD, PaymentMethod.PAYPAL, "sale", "Booking Tour Payment",
//                        "http://localhost:9004/api/v1/payments/cancel",
//                        "http://localhost:9004/api/v1/payments/success")
//                .flatMap(payment -> {
//                    for (Links links : payment.getLinks()) {
//                        if (links.getRel().equals("approval_url")) {
//                            return Mono.just(new RedirectView(links.getHref()));
//                        }
//                    }
//                    return Mono.just(new RedirectView("/api/v1/payments/error"));
//                })
//                .onErrorReturn(new RedirectView("/api/v1/payments/error")); // Handle errors by redirecting to error page
//    }

    @PostMapping("/success")
    public Mono<ResponseEntity<PaymentDTO>> successPayment(@RequestBody PaymentRequest paymentRequest) {
        log.info("Received payment request: {}", paymentRequest.toString());
        return redisService.getDataAsBookingDTO(paymentRequest.getBookingId())
                .flatMap(bookingDTO -> {
                    log.info("Received a booking: {}", bookingDTO.toString());
                    bookingDTO.setStatusBooking(StatusBooking.PAID);
                    return bookingService.saveBookingTour(bookingDTO)
                            .then(paymentService.addPayment(paymentRequest))
                            .map(ResponseEntity::ok);
                })
                .onErrorResume(e -> {
                    // Log the error for debugging
                    log.error("Error processing payment: {}", e.getMessage(), e);
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));
                });
    }

//    @GetMapping("/cancel")
//    public Mono<String> cancelPayment() {
//        return Mono.just("Payment canceled");
//    }
}