package com.fit.paymentservice.events;

import com.fit.commonservice.utils.Constant;
import com.fit.paymentservice.dtos.BookingDTO;
import com.fit.paymentservice.dtos.BookingResponseDTO;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;

import java.time.LocalDate;
import java.util.Collections;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@Slf4j
public class EventConsumer {

    private final KafkaReceiver<String, String> kafkaReceiver;
    private final Gson gson;

    // Lưu trữ các Sinks theo customerId để quản lý kết quả phản hồi từ Kafka
    private final Map<Long, Sinks.One<BookingDTO>> bookingResponseSinks = new ConcurrentHashMap<>();

    @Autowired
    public EventConsumer(ReceiverOptions<String, String> options, Gson gson) {
        this.gson = gson;

        // KafkaReceiver luôn lắng nghe phản hồi từ Kafka
        this.kafkaReceiver = KafkaReceiver.create(options.subscription(Collections.singleton(Constant.RESPONSE_BOOKING_TOPIC)));
        this.kafkaReceiver.receive().subscribe(this::getBooking);  // Đăng ký lắng nghe thông báo
    }

    // Phương thức xử lý thông báo khi nhận được phản hồi từ Kafka
    private void getBooking(ReceiverRecord<String, String> receiverRecord) {
        log.info("Received booking event from Kafka");

        BookingResponseDTO bookingResponseDTO = gson.fromJson(receiverRecord.value(), BookingResponseDTO.class);
        log.info("bookingResponseDTO: {}", bookingResponseDTO);

        // Tạo BookingDTO từ BookingResponseDTO
        BookingDTO bookingDTO = convertToBookingDTO(bookingResponseDTO);

        // Tìm Sinks tương ứng với customerId
        Sinks.One<BookingDTO> sink = bookingResponseSinks.get(bookingResponseDTO.getCustomerId());

        // Nếu tìm thấy Sink tương ứng, phát ra kết quả và xóa nó
        if (sink != null) {
            sink.tryEmitValue(bookingDTO);
            bookingResponseSinks.remove(bookingResponseDTO.getCustomerId());
        } else {
            log.warn("No sink found for customerId: {}", bookingResponseDTO.getCustomerId());
        }

        // Acknowledge để Kafka biết thông báo đã được xử lý
        receiverRecord.receiverOffset().acknowledge();
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

    // Chuyển đổi từ BookingResponseDTO sang BookingDTO
    private BookingDTO convertToBookingDTO(BookingResponseDTO bookingResponseDTO) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setCustomerId(bookingResponseDTO.getCustomerId());
        bookingDTO.setTourId(bookingResponseDTO.getTourId());
        bookingDTO.setQuantity(bookingResponseDTO.getQuantity());
        bookingDTO.setStatusBooking(bookingResponseDTO.getStatusBooking());
        bookingDTO.setBookingDate(LocalDate.now());
        bookingDTO.setTotalAmount(bookingResponseDTO.getTotalAmount());
        return bookingDTO;
    }
}
