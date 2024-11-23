package com.fit.paymentservice.services;

import com.fit.paymentservice.dtos.PaymentDTO;
import com.fit.paymentservice.dtos.request.PaymentRequest;
import com.fit.paymentservice.enums.Currency;
import com.fit.paymentservice.enums.PaymentMethod;
import com.fit.paymentservice.enums.PaymentStatus;
import com.fit.paymentservice.models.Payment;
import com.fit.paymentservice.repositories.PaymentRepository;
import com.paypal.api.payments.PaymentExecution;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.UUID;

@Service
@Slf4j
public class PaymentService {

    @Autowired
    private APIContext apiContext;

    @Autowired
    private PaymentRepository paymentRepository;

    public Mono<PaymentDTO> addPayment(PaymentRequest payment) {
        String paymentId = UUID.randomUUID().toString();
        return paymentRepository.insertPayment(
                        paymentId,  // Sử dụng paymentId mới được tạo
                        payment.getBookingId(),
                        payment.getTransactionId(),
                        payment.getDiscountId(),
                        payment.getAmount(),
                        PaymentMethod.PAYPAL.name(),  // Chuyển đổi PaymentMethod thành String
                        PaymentStatus.COMPLETED.name(),   // Chuyển đổi PaymentStatus thành String
                        LocalDate.now(),
                        Currency.USD.name(),         // Chuyển đổi Currency thành String
                        payment.getPaymentId(),
                        0,
                        LocalDate.now(),
                        LocalDate.now()
                )
                .then(paymentRepository.findById(paymentId))  // Tìm Payment vừa chèn
                .map(PaymentDTO::convertToDTO); // Tạo PaymentDTO từ Payment
    }



//    public Mono<PaymentDTO> executePayment(PaymentRequest paymentRequest) {
//        // Tạo đối tượng Payment để lưu vào cơ sở dữ liệu
////        Payment paymentEntity = new Payment();
////        paymentEntity.setPaymentId(UUID.randomUUID().toString());
////        paymentEntity.setBookingId(paymentRequest.getBookingId()); // Chuyển đổi bookingId từ String sang UUID
////
////        paymentEntity.setAmount(paymentRequest.getAmount());
////        paymentEntity.setPaymentMethod(PaymentMethod.PAYPAL);
////        paymentEntity.setPaymentStatus(PaymentStatus.COMPLETED);
////        paymentEntity.setPaymentDate(LocalDate.now());
////        paymentEntity.setCurrency(Currency.USD);
////        paymentEntity.setPaymentReference(paymentRequest.getPaymentId()); // Sử dụng ID của PayPal
////        paymentEntity.setCreatedDate(LocalDate.now());
////        paymentEntity.setUpdatedDate(LocalDate.now());
////        log.info("payment: {}", paymentEntity);
//        return addPayment(paymentRequest)
//                .map(PaymentDTO::convertToDTO)
//                .doOnError(throwable -> log.info("Lỗi khi lưu thông tin thanh toán: " + throwable.getMessage(), throwable));
//    }


}
