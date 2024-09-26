package com.fit.paymentservice.services;

import com.fit.commonservice.utils.Constant;
import com.fit.paymentservice.dtos.BookingDTO;
import com.fit.paymentservice.dtos.BookingRequest;
import com.fit.paymentservice.dtos.BookingResponseDTO;
import com.fit.paymentservice.events.EventConsumer;
import com.fit.paymentservice.events.EventProducer;
import com.fit.paymentservice.repositories.BookingRepository;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;

import java.time.Duration;
import java.time.LocalDate;
import java.util.Collections;
import java.util.NoSuchElementException;

@Service
@Slf4j
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private EventProducer eventProducer;

    @Autowired
    private ReceiverOptions<String, String> receiverOptions;
    @Qualifier("gson")
    @Autowired
    private Gson gson;
    @Autowired
    private EventConsumer eventConsumer;


    public Mono<BookingDTO> bookTour(BookingRequest bookingRequest) {
//        Kiem tra thong tin truoc khi gui
        if (bookingRequest.getCustomerId() == null || bookingRequest.getCustomerId().equals("")) {
            return Mono.error(new IllegalArgumentException("Customer ID is required"));
        }

        if (bookingRequest.getTourId() == null || bookingRequest.getTourId().equals("")) {
            return Mono.error(new IllegalArgumentException("Tour ID is required"));
        }

        if (bookingRequest.getQuantity() <= 0) {
            return Mono.error(new IllegalArgumentException("Quantity is required"));
        }

        // Gửi message đến Kafka và chờ phản hồi từ Kafka
        return eventProducer.send(Constant.REQUEST_CHECK_AVAILABLE_SLOT_TOPIC, String.valueOf(bookingRequest.getCustomerId()), gson.toJson(bookingRequest))
                .then(eventConsumer.waitForBookingResponse(bookingRequest.getCustomerId()))
                .switchIfEmpty(Mono.error(new NoSuchElementException("Not found response for customerId: " + bookingRequest.getCustomerId())))
                .onErrorResume(throwable -> {
                    log.error("Error occurred: {}", throwable.getMessage());
                    return Mono.just(new BookingDTO()); // Trả măc dinh ve doi tuong rong
                });
    }
}
