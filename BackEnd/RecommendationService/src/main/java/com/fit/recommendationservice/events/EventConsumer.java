package com.fit.recommendationservice.events;

import com.fit.commonservice.utils.Constant;
import com.fit.recommendationservice.services.CustomerPreferenceService;
import com.fit.recommendationservice.services.MahoutRecommendationService;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;
import lombok.extern.slf4j.Slf4j;
import org.apache.mahout.cf.taste.common.TasteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.http.HttpMessageConverters;
import org.springframework.stereotype.Service;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class EventConsumer {
    private final KafkaReceiver<String, String> kafkaReceiver;

    @Autowired
    private CustomerPreferenceService customerPreferenceService;
    @Autowired
    private Gson gson;
    @Autowired
    private HttpMessageConverters messageConverters;
    @Autowired
    private EventProducer eventProducer;
    @Autowired
    private MahoutRecommendationService mahoutRecommendationService;

    public EventConsumer(ReceiverOptions<String, String> options) {
        log.info("RecommendationConsumer started");
        this.kafkaReceiver = KafkaReceiver.create(options.subscription(Collections.singleton(Constant.REQUEST_RECOMMENDATION_TOPIC)));
        this.kafkaReceiver.receive()
                .doOnNext(this::processRecommendationRequest)
                .doOnNext(this::consumeInteraction)
                .subscribe();
    }

    private void consumeInteraction(ReceiverRecord<String, String> receiverRecord) {
        Map<String, Object> reqMap = gson.fromJson(receiverRecord.value(), new TypeToken<Map<String, Object>>() {}.getType());
        if (reqMap.containsKey("customerId") && reqMap.get("customerId") instanceof Number) {
            Long customerId = ((Number) reqMap.get("customerId")).longValue();

            try{
                // Get tour recommendations for the customer
                List<Long> recommendedTourIds = mahoutRecommendationService.recommendToursForUser(customerId);
                log.info("Tour Ids: {}", recommendedTourIds);
                // Send the recommendations to Kafka
                String message = gson.toJson(recommendedTourIds);
                eventProducer.send(Constant.RECOMMEND_INTERACTED_TOPIC, message)
                        .doOnSuccess(success -> log.info("Message sent to topic {} successfully", Constant.RECOMMEND_INTERACTED_TOPIC))
                        .doOnError(error -> log.error("Error sending message to topic {}", Constant.RECOMMEND_INTERACTED_TOPIC, error))
                        .subscribe();;
            } catch (TasteException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private void processRecommendationRequest(ReceiverRecord<String, String> receiverRecord) {
        log.info("Received Kafka message: {}", receiverRecord.value());

        try {
            // Deserialize message từ Kafka thành Map<String, Object>
            Map<String, Object> reqMap = gson.fromJson(receiverRecord.value(), new TypeToken<Map<String, Object>>() {
            }.getType());

            // Kiểm tra customerId
            if (reqMap.containsKey("customerId") && reqMap.get("customerId") instanceof Number) {
                Long customerId = ((Number) reqMap.get("customerId")).longValue();
                log.info("CustomerId: {}", customerId);

                // Lấy tiêu chí gợi ý từ CustomerPreferenceService
                customerPreferenceService.getCommonPreferences(customerId)
                        .flatMap(commonPreferences -> {
                            String message = gson.toJson(commonPreferences);
                            return eventProducer.send(Constant.RECOMMEND_PREFERENCES_TOPIC, message)
                                    .thenReturn(commonPreferences);
                        })
                        .subscribe(
                                commonPreferences -> log.info("Sent recommendation preferences: {}", commonPreferences),
                                error -> log.error("Error processing recommendation request", error)
                        );
            } else {
                log.error("Invalid customerId format in the message");
            }
        } catch (JsonSyntaxException e) {
            log.error("Error parsing JSON message: {}", receiverRecord.value(), e);
        }

    }


}
