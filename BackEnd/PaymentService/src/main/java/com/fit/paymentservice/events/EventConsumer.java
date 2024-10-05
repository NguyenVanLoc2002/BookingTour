package com.fit.paymentservice.events;

import com.fit.commonservice.utils.Constant;
import com.fit.paymentservice.dtos.BookingDTO;
import com.fit.paymentservice.enums.StatusBooking;
import com.fit.paymentservice.services.BookingService;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;

import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class EventConsumer {

    private final KafkaReceiver<String, String> kafkaReceiver;
    private final Gson gson;

    // Lưu trữ các Sinks theo customerId để quản lý kết quả phản hồi từ Kafka
    private final Map<Long, Sinks.One<BookingDTO>> bookingResponseSinks = new ConcurrentHashMap<>();

    private final BookingService bookingService;

    @Autowired
    public EventConsumer(ReceiverOptions<String, String> options, Gson gson,@Lazy BookingService bookingService) {
        this.gson = gson;

        // KafkaReceiver luôn lắng nghe phản hồi từ Kafka
        this.kafkaReceiver = KafkaReceiver.create(
                options.subscription(Set.of(
                        Constant.RESPONSE_BOOKING_TOPIC,
                        Constant.VERIFY_BOOKING_TOUR_TOPIC
                ))
        );
        this.kafkaReceiver.receive()
                .flatMap(this::processRecord) // Xử lý từng message từ Kafka
                .subscribe(
                        result -> log.info("Successfully processed recommendation event"),
                        error -> log.error("Error processing recommendation event", error)
                );
        this.bookingService = bookingService;
    }


    private Mono<Void> processRecord(ReceiverRecord<String, String> receiverRecord) {
        String topic = receiverRecord.topic();
        log.info("receiverRecord: {}", receiverRecord);
        if (Constant.RESPONSE_BOOKING_TOPIC.equals(topic)) {
            return getBooking(receiverRecord);
        } else if (Constant.VERIFY_BOOKING_TOUR_TOPIC.equals(topic)) {
            return updateStatusBookingTour(receiverRecord);
        } else {
            log.warn("Unknown topic: {}", topic);
            return Mono.empty();
        }
    }

    private Mono<Void> updateStatusBookingTour(ReceiverRecord<String, String> receiverRecord) {
        log.info("Received Booking tour record: {}", receiverRecord);
        Long bookingId = Long.parseLong(receiverRecord.key());
        return bookingService.findById(bookingId)
                .flatMap(bookingDTO -> {
                    bookingDTO.setStatusBooking(StatusBooking.CONFIRMED);
                    return bookingService.saveBookingTour(bookingDTO);
                })
                .then();
    }

    // Phương thức xử lý thông báo khi nhận được phản hồi từ Kafka
    private Mono<Void> getBooking(ReceiverRecord<String, String> receiverRecord) {
        BookingDTO bookingDTO = gson.fromJson(receiverRecord.value(), BookingDTO.class);
        log.info("bookingResponseDTO: {}", bookingDTO);

        // Tìm Sinks tương ứng với customerId
        Sinks.One<BookingDTO> sink = bookingResponseSinks.get(bookingDTO.getCustomerId());

        // Nếu tìm thấy Sink tương ứng, phát ra kết quả và xóa nó
        if (sink != null) {
            sink.tryEmitValue(bookingDTO);
            bookingResponseSinks.remove(bookingDTO.getCustomerId());
        } else {
            log.warn("No sink found for customerId: {}", bookingDTO.getCustomerId());
            return Mono.empty(); // Trả về Mono.empty() nếu không tìm thấy sink
        }

        // Acknowledge để Kafka biết thông báo đã được xử lý
        receiverRecord.receiverOffset().acknowledge();
        return Mono.empty(); // Trả về Mono<Void> để duy trì nhất quán
    }

    // Phương thức lấy kết quả từ Kafka bằng cách chờ phản hồi
    public Mono<BookingDTO> waitForBookingResponse(Long customerId) {
        // Tạo Sinks.One để lưu trữ phản hồi
        Sinks.One<BookingDTO> sink = Sinks.one();

        // Lưu sink theo customerId
        bookingResponseSinks.put(customerId, sink);

        // Trả về Mono cho phép BookingService chờ phản hồi
        return sink.asMono()
                .doOnTerminate(() -> bookingResponseSinks.remove(customerId)); // Xóa khỏi map sau khi hoàn thành
    }



}