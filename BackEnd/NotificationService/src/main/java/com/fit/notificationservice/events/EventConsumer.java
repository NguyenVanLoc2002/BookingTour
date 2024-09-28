package com.fit.notificationservice.events;

import com.fit.commonservice.utils.Constant;
import com.fit.notificationservice.dtos.BookingRequest;
import com.fit.notificationservice.service.EmailService;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;

import java.util.Collections;

@Service
@Slf4j
public class EventConsumer {
    private final KafkaReceiver<String, String> kafkaReceiver;
    private final Gson gson;

    @Autowired
    private EmailService emailService;

    @Autowired
    public EventConsumer(ReceiverOptions<String, String> options, Gson gson, EmailService emailService) {
        this.gson = gson;

        // KafkaReceiver luôn lắng nghe phản hồi từ Kafka
        this.kafkaReceiver = KafkaReceiver.create(options.subscription(Collections.singleton(Constant.NOTIFICATION_BOOKING_TOUR_TOPIC)));
        this.kafkaReceiver.receive()
                .flatMap(this::sendEmail) // Chuyển đổi sang Mono<Void>
                .doOnError(e -> log.error("Error processing message: {}", e.getMessage())) // Xử lý lỗi
                .subscribe();
    }

    private Mono<Void> sendEmail(ReceiverRecord<String, String> receiverRecord) {
        try {
            log.info("Received message: {}", receiverRecord.value());
            // Chuyển đổi từ JSON sang BookingRequest
            BookingRequest request = gson.fromJson(receiverRecord.value(), BookingRequest.class);
            log.info("request: {}", request);

            // Gọi phương thức gửi email
            return  emailService.sendEmailAuthBookingTour(request);
        } catch (Exception e) {
            log.error("Error sending email: {}", e.getMessage());
            return Mono.error(e); // Ném ra lỗi nếu xảy ra lỗi trong quá trình gửi email
        }
    }
}
