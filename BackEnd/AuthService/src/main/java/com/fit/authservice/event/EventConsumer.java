package com.fit.authservice.event;

import com.fit.authservice.models.AuthUser;
import com.fit.authservice.services.AuthService;
import com.fit.commonservice.utils.Constant;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;

import java.util.Collections;

@Service
@Slf4j
public class EventConsumer {
    @Autowired
    AuthService authService;

//    @Autowired
//    private EventProducer eventProducer;

    private final KafkaReceiver<String, String> kafkaReceiver;

    @Autowired
    public EventConsumer(ReceiverOptions<String, String> options) {
        log.info("userOnboarding");
        this.kafkaReceiver = KafkaReceiver.create(options.subscription(Collections.singleton(Constant.USER_ONBOARDING_TOPIC)));
        this.kafkaReceiver.receive().subscribe(this::userOnboarding);
    }

    public void userOnboarding(ReceiverRecord<String, String> receiverRecord) {
        log.info("userOnboarding {}", receiverRecord.value());
    }

}