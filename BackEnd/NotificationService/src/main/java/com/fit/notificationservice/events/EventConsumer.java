package com.fit.notificationservice.events;

import com.fit.commonservice.utils.Constant;
import com.fit.notificationservice.dtos.reponse.CustomerResponse;
import com.fit.notificationservice.dtos.request.BookingRequest;
import com.fit.notificationservice.service.EmailService;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;

import java.util.Set;

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
        this.kafkaReceiver = KafkaReceiver.create(
                options.subscription(
                        Set.of(Constant.NOTIFICATION_BOOKING_TOUR_TOPIC
                                , Constant.NOTIFICATION_CREATED_USER_TOPIC)));
        this.kafkaReceiver.receive()
                .flatMap(this::processRecord) // Chuyển đổi sang Mono<Void>
                .doOnError(e -> log.error("Error processing message: {}", e.getMessage())) // Xử lý lỗi
                .subscribe();
    }

    private Mono<Void> processRecord(ReceiverRecord<String, String> receiverRecord) {
        String topic = receiverRecord.topic();
        log.info("receiverRecord: {}", receiverRecord);
        if (Constant.NOTIFICATION_BOOKING_TOUR_TOPIC.equals(topic)) {
            return sendEmailVerifyBookingTour(receiverRecord);
        } else if (Constant.NOTIFICATION_CREATED_USER_TOPIC.equals(topic)) {
            return sendEmailVerifyAccount(receiverRecord);
        } else {
            log.warn("Unknown topic: {}", topic);
            return Mono.empty();
        }
    }

    private Mono<Void> sendEmailVerifyAccount(ReceiverRecord<String, String> receiverRecord) {
        try {
            log.info("Received message Verify Account: {}", receiverRecord.value());
            // Chuyển đổi từ JSON sang BookingRequest
            CustomerResponse customerReponse = gson.fromJson(receiverRecord.value(), CustomerResponse.class);
            log.info("customerResponse : {}", customerReponse);

            // Gọi phương thức gửi email
            return emailService.sendEmailVerifyAccount(customerReponse);
        } catch (Exception e) {
            log.error("Error sending email Verify Account: {}", e.getMessage());
            return Mono.error(e); // Ném ra lỗi nếu xảy ra lỗi trong quá trình gửi email
        }
    }

    private Mono<Void> sendEmailVerifyBookingTour(ReceiverRecord<String, String> receiverRecord) {
        try {
            log.info("Received message Booking Tour: {}", receiverRecord.value());
            // Chuyển đổi từ JSON sang BookingRequest
            BookingRequest request = gson.fromJson(receiverRecord.value(), BookingRequest.class);
            log.info("request: {}", request);

            // Gọi phương thức gửi email
            return emailService.sendEmailAuthBookingTour(request);
        } catch (Exception e) {
            log.error("Error sending email Booking Tour: {}", e.getMessage());
            return Mono.error(e); // Ném ra lỗi nếu xảy ra lỗi trong quá trình gửi email
        }
    }
}
