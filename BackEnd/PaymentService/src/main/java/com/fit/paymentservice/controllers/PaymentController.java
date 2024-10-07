package com.fit.paymentservice.controllers;

import com.fit.paymentservice.enums.Currency;
import com.fit.paymentservice.enums.PaymentMethod;
import com.fit.paymentservice.models.Payment;
import com.fit.paymentservice.services.PaymentService;
import com.paypal.api.payments.Links;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.reactive.result.view.RedirectView;
import reactor.core.publisher.Mono;

@Slf4j
@RestController
@RequestMapping("/api/v1/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

//    @PostMapping("/pay")
//    public Mono<ResponseEntity<String>> makePayment() {
//        log.info("Making payment request");
//        return paymentService.createPayment(100.00, Currency.USD, PaymentMethod.PAYPAL, "sale", "Booking Tour Payment",
//                        "http://localhost:9004/api/v1/payments/cancel",
//                        "http://localhost:9004/api/v1/payments/success")
//                .map(url -> ResponseEntity.status(HttpStatus.FOUND).header("Location", url).build());
//    }
//
//    @GetMapping("/success")
//    public Mono<ResponseEntity<String>> successPayment(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
//        return paymentService.executePayment(paymentId, payerId)
//                .map(successMessage -> ResponseEntity.ok(successMessage))
//                .onErrorReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment execution failed"));
//    }
//
//    @GetMapping("/cancel")
//    public Mono<String> cancelPayment() {
//        return Mono.just("Payment canceled");
//}


    @PostMapping("/create")
    public Mono<RedirectView> makePayment() {
        log.info("Making payment request");
        return paymentService.createPayment(100.00, Currency.USD, PaymentMethod.PAYPAL, "sale", "Booking Tour Payment",
                        "http://localhost:9004/api/v1/payments/cancel",
                        "http://localhost:9004/api/v1/payments/success")
                .flatMap(payment -> {
                    for (Links links : payment.getLinks()) {
                        if (links.getRel().equals("approval_url")) {
                            return Mono.just(new RedirectView(links.getHref()));
                        }
                    }
                    return Mono.just(new RedirectView("/api/v1/payments/error"));
                })
                .onErrorReturn(new RedirectView("/api/v1/payments/error")); // Handle errors by redirecting to error page
    }

    @GetMapping("/success")
    public Mono<ResponseEntity<String>> successPayment(@RequestParam("paymentId") String paymentId,
                                                       @RequestParam("PayerID") String payerId) {
        return paymentService.executePayment(paymentId, payerId)
                .flatMap(executedPayment -> {
                    // Optionally, you can also save the executed payment in the database here
                    return Mono.just(ResponseEntity.ok("Payment completed with ID: " + executedPayment.getId()));
                })
                .onErrorReturn(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Payment execution failed"));
    }

    @GetMapping("/cancel")
    public Mono<String> cancelPayment() {
        return Mono.just("Payment canceled");
    }
}