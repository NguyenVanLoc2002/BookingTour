package com.fit.paymentservice.controllers;

import com.fit.paymentservice.dtos.PaymentDTO;
import com.fit.paymentservice.dtos.request.PaymentRequest;
import com.fit.paymentservice.dtos.response.RefundResponseDTO;
import com.fit.paymentservice.enums.RefundStatus;
import com.fit.paymentservice.enums.StatusBooking;
import com.fit.paymentservice.services.BookingService;
import com.fit.paymentservice.services.PaymentService;
import com.fit.paymentservice.services.RedisService;
import com.fit.paymentservice.services.RefundService;
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
    @Autowired
    private RefundService refundService;

    @PostMapping("/process-refund")
    public Mono<ResponseEntity<RefundResponseDTO>> processRefund(@RequestParam String bookingId) {
        return refundService.processRefund(bookingId)
                .map(transactionId -> {
                    RefundResponseDTO response = new RefundResponseDTO();
                    response.setTransactionId(transactionId);
                    response.setStatus(RefundStatus.COMPLETED);
                    return new ResponseEntity<>(response, HttpStatus.OK);
                })
                .onErrorResume(error -> Mono.just(new ResponseEntity<>(new RefundResponseDTO(error.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR)));
    }

    @PostMapping("/success")
    public Mono<ResponseEntity<PaymentDTO>> successPayment(@RequestBody PaymentRequest paymentRequest) {
        log.info("Received payment request: {}", paymentRequest.toString());

        return redisService.getDataAsBookingDTO(paymentRequest.getBookingId()) // Trả về Mono<BookingDTO>
                .flatMap(booking ->
                        redisService.getBookingByBookingIdFromRedisSet(booking.getCustomerId(), booking.getBookingId())
                                .flatMap(bookingDTO -> {
                                    log.info("Received a booking: {}", bookingDTO.toString());

                                    // Xóa booking trong Redis trước khi cập nhật trạng thái
                                    return redisService.deleteDataFromSet("customer:" + bookingDTO.getCustomerId() + ":bookings", bookingDTO)
                                            .then(Mono.defer(() -> {
                                                // Sau khi xóa, cập nhật trạng thái booking
                                                bookingDTO.setStatusBooking(StatusBooking.PAID);
                                                log.info("Updated booking status to PAID: {}", bookingDTO);

                                                // Lưu booking tour và thêm payment
                                                return bookingService.saveBookingTour(bookingDTO)
                                                        .then(paymentService.addPayment(paymentRequest))
                                                        .flatMap(paymentDTO -> {
                                                            // Trả về kết quả PaymentDTO
                                                            return Mono.just(ResponseEntity.ok(paymentDTO));
                                                        });
                                            }));
                                })
                )
                .onErrorResume(e -> {
                    // Log lỗi nếu có
                    log.error("Error processing payment: {}", e.getMessage(), e);
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null));
                });
    }


}