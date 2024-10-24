package com.fit.paymentservice.services;

import com.fit.paymentservice.enums.Currency;
import com.fit.paymentservice.enums.PaymentMethod;
import com.fit.paymentservice.enums.PaymentStatus;
import com.fit.paymentservice.repositories.PaymentRepository;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PaymentService {

    @Autowired
    private APIContext apiContext;

    @Autowired
    private PaymentRepository paymentRepository;

//    public Mono<String> createPayment(double total, Currency currency, PaymentMethod method, String intent, String description, String cancelUrl, String successUrl) {
//        Amount amount = new Amount();
//        amount.setCurrency(currency.name());
//        amount.setTotal(String.format("%.2f", total));
//
//        Transaction transaction = new Transaction();
//        transaction.setDescription(description);
//        transaction.setAmount(amount);
//
//        List<Transaction> transactions = new ArrayList<>();
//        transactions.add(transaction);
//
//        Payer payer = new Payer();
//        payer.setPaymentMethod(method.name().toLowerCase());
//
//        com.paypal.api.payments.Payment payment = new com.paypal.api.payments.Payment();
//        payment.setIntent(intent.toLowerCase());
//        payment.setPayer(payer);
//        payment.setTransactions(transactions);
//
//        RedirectUrls redirectUrls = new RedirectUrls();
//        redirectUrls.setCancelUrl(cancelUrl);
//        redirectUrls.setReturnUrl(successUrl);
//        payment.setRedirectUrls(redirectUrls);
//
//        try {
//            com.paypal.api.payments.Payment createdPayment = payment.create(apiContext);
//
//            // Lưu thông tin thanh toán vào cơ sở dữ liệu
//            Payment newPayment = new Payment();
//            newPayment.setPaymentId(createdPayment.getId());
//            newPayment.setCustomerId(null); // Gán customerId nếu cần
//            newPayment.setBookingId(null); // Gán bookingId nếu cần
//            newPayment.setDiscountId(null);
//            newPayment.setAmount(total);
//            newPayment.setPaymentMethod(method);
//            newPayment.setPaymentStatus(PaymentStatus.PENDING); // Đặt trạng thái ban đầu là PENDING
//            newPayment.setPaymentDate(LocalDate.now());
//            newPayment.setCurrency(currency);
//            newPayment.setPaymentReference(createdPayment.getId());
//            newPayment.setTransactionFee(0.0); // Gán giá trị phí giao dịch nếu cần
//            newPayment.setCreatedDate(LocalDate.now());
//            newPayment.setUpdatedDate(LocalDate.now());
//
//            log.info("newPayment: {}", newPayment.toString());
//            paymentRepository.save(newPayment).subscribe(
//                    savedPayment -> log.info("Payment saved successfully: {}", savedPayment),
//                    error -> log.error("Error saving payment: {}", error.getMessage())
//            );
//
//
//            return Mono.just(createdPayment.getLinks().stream()
//                    .filter(link -> link.getRel().equals("approval_url"))
//                    .findFirst()
//                    .orElseThrow(() -> new RuntimeException("Approval URL not found"))
//                    .getHref());
//        } catch (PayPalRESTException e) {
//            return Mono.error(e);
//        }
//    }
//
//    public Mono<String> executePayment(String paymentId, String payerId) {
//        com.paypal.api.payments.Payment payment = new com.paypal.api.payments.Payment();
//        payment.setId(paymentId); // This is the paymentId from PayPal
//
//        PaymentExecution paymentExecution = new PaymentExecution();
//        paymentExecution.setPayerId(payerId);
//
//        try {
//            com.paypal.api.payments.Payment executedPayment = payment.execute(apiContext, paymentExecution);
//            // Update the payment status in the database
//            return paymentRepository.findById(executedPayment.getId())
//                    .flatMap(existingPayment -> {
//                        existingPayment.setPaymentStatus(PaymentStatus.COMPLETED); // Update status
//                        existingPayment.setUpdatedDate(LocalDate.now()); // Update modified date
//                        return paymentRepository.save(existingPayment) // Save updates
//                                .then(Mono.just("Payment completed with ID: " + executedPayment.getId())); // Return a success message
//                    })
//                    .defaultIfEmpty("Payment not found"); // Handle case where payment is not found
//        } catch (PayPalRESTException e) {
//            return Mono.error(e);
//        }
//    }


    public Mono<Payment> createPayment(double total, Currency currency, PaymentMethod method, String intent, String description, String cancelUrl, String successUrl) {
        Amount amount = new Amount();
        amount.setCurrency(currency.name());
        amount.setTotal(String.format("%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method.name().toLowerCase());

        com.paypal.api.payments.Payment payment = new com.paypal.api.payments.Payment();
        payment.setIntent(intent.toLowerCase());
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);

        try {
            Payment createdPayment = payment.create(apiContext);

            return Mono.just(createdPayment);
        } catch (PayPalRESTException e) {
            return Mono.error(e);
        }
    }

    public Mono<Payment> executePayment(String paymentId, String payerId) {
        com.paypal.api.payments.Payment payment = new com.paypal.api.payments.Payment();
        payment.setId(paymentId); // This is the paymentId from PayPal

        PaymentExecution paymentExecution = new PaymentExecution();
        paymentExecution.setPayerId(payerId);

        try {
            com.paypal.api.payments.Payment executedPayment = payment.execute(apiContext, paymentExecution);
            // Update the payment status in the database
            return Mono.just(executedPayment);
        } catch (PayPalRESTException e) {
            return Mono.error(e);
        }
    }


}
