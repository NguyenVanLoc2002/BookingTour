package com.fit.tourservice.events;

import com.fit.commonservice.utils.Constant;
import com.fit.tourservice.dtos.request.TourFilterCriteriaRequest;
import com.fit.tourservice.dtos.response.TourDTO;
import com.fit.tourservice.enums.AccommodationQuality;
import com.fit.tourservice.enums.Region;
import com.fit.tourservice.enums.TransportationMode;
import com.fit.tourservice.enums.TypeTour;
import com.fit.tourservice.services.TourService;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import reactor.core.publisher.Sinks;
import reactor.kafka.receiver.KafkaReceiver;
import reactor.kafka.receiver.ReceiverOptions;
import reactor.kafka.receiver.ReceiverRecord;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@Slf4j
public class EventConsumer {
    private final KafkaReceiver<String, String> kafkaReceiver;
    private Sinks.Many<TourDTO> sinkForPreferences;
    private Sinks.Many<TourDTO> sinkForInteractions;

    @Autowired
    private Gson gson;
    @Autowired
    private TourService tourService;

    public EventConsumer(ReceiverOptions<String, String> options) {
        log.info("RecomendationConsumer started");
        // Tạo KafkaReceiver với các topic
        this.kafkaReceiver = KafkaReceiver.create(
                options.subscription(Set.of(
                        Constant.RECOMMEND_PREFERENCES_TOPIC,
                        Constant.RECOMMEND_INTERACTED_TOPIC
                ))
        );

        // Khởi tạo các sink
        this.sinkForPreferences = Sinks.many().unicast().onBackpressureBuffer();
        this.sinkForInteractions = Sinks.many().unicast().onBackpressureBuffer();

        this.kafkaReceiver.receive()
                .flatMap(this::processRecord) // Xử lý từng message từ Kafka
                .subscribe(
                        result -> log.info("Successfully processed recommendation event"),
                        error -> log.error("Error processing recommendation event", error)
                );
    }

    private Mono<Void> processRecord(ReceiverRecord<String, String> receiverRecord) {
        String topic = receiverRecord.topic();
        log.info("receiverRecord: {}", receiverRecord);
        if (Constant.RECOMMEND_PREFERENCES_TOPIC.equals(topic)) {
            return getLstTourByRecommendationPreferenceReceived(receiverRecord);
        } else if (Constant.RECOMMEND_INTERACTED_TOPIC.equals(topic)) {
            return getLstTourByRecommendationInteractionReceived(receiverRecord);
        } else {
            log.warn("Unknown topic: {}", topic);
            return Mono.empty();
        }
    }

    private Mono<Void> getLstTourByRecommendationInteractionReceived(ReceiverRecord<String, String> receiverRecord) {
        // Chuyển đổi dữ liệu từ Kafka message thành danh sách tourId
        List<Long> tourIds = gson.fromJson(receiverRecord.value(), new TypeToken<List<Long>>() {
        }.getType());

        if (tourIds != null && !tourIds.isEmpty()) {
            log.info("Received tourIds: {}", tourIds);
            // Lọc các tour theo tourId và chuyển đổi thành Flux<TourDTO>
            return tourService.findToursByIds(tourIds)
                    // Xử lý từng TourDTO
                    .doOnNext(tourDTO -> {log.info("Found tour: {}", tourDTO);
                        sinkForInteractions.tryEmitNext(tourDTO);
                    })
                    // Xử lý lỗi nếu có
                    .doOnError(error -> log.error("Error retrieving tours", error))
                    // Xử lý hoàn tất
                    .doOnComplete(() -> {
                        log.info("All tours emitted, completing sink");
                        sinkForInteractions.tryEmitComplete(); // Hoàn thành sink

//                  Tái khởi tạo sink để sẵn sàng cho yêu cầu tiếp theo
                        this.sinkForInteractions = Sinks.many().unicast().onBackpressureBuffer();
                    })
                    // Chuyển đổi Flux thành Mono<Void> sau khi hoàn tất
                    .then();  // `.then()` trả về Mono<Void> khi hoàn tất xử lý
        } else {
            log.warn("No tour IDs found in the message");
            return Mono.empty();  // Trả về Mono.empty() nếu không có tourIds
        }
    }

    private Mono<Void> getLstTourByRecommendationPreferenceReceived(ReceiverRecord<String, String> receiverRecord) {
        TourFilterCriteriaRequest criteriaRequest = getCriteriaRequest(receiverRecord);
        // Trả về Flux<TourDTO> và gửi qua sink
        return tourService.findToursByCriteria(criteriaRequest)
                .doOnNext(tour -> {
                    log.info("Emitting tour: {}", tour);
                    sinkForPreferences.tryEmitNext(tour); // Gửi từng tour tới các subscribers
                })
                .doOnComplete(() -> {
                    log.info("All tours emitted, completing sink");
                    sinkForPreferences.tryEmitComplete(); // Hoàn thành sink

//                  Tái khởi tạo sink để sẵn sàng cho yêu cầu tiếp theo
                    this.sinkForPreferences = Sinks.many().unicast().onBackpressureBuffer();
                })
                .then()
                .onErrorResume(error -> {
                    log.error("Error during tour filtering: ", error);
                    return Mono.empty();
                });
    }

    private TourFilterCriteriaRequest getCriteriaRequest(ReceiverRecord<String, String> receiverRecord) {
        log.info("Received recommendation event");

        // Chuyển message từ Kafka thành Map<String, Object>
        Map<String, Object> criteriaMap = gson.fromJson(receiverRecord.value(), new TypeToken<Map<String, Object>>() {
        }.getType());

        // Tạo TourFilterCriteriaRequest từ các tiêu chí
        TourFilterCriteriaRequest criteriaRequest = new TourFilterCriteriaRequest();
        if (criteriaMap.containsKey("maxPrice")) {
            Object maxPriceObj = criteriaMap.get("maxPrice");
            log.info("maxPrice type: {}", maxPriceObj.getClass().getName());
            Double maxPrice = (maxPriceObj instanceof Number) ? ((Number) maxPriceObj).doubleValue() : null;
            criteriaRequest.setMaxCost(maxPrice);
        }

        if (criteriaMap.containsKey("maxDuration")) {
            Object maxDurationObj = criteriaMap.get("maxDuration");
            log.info("maxDuration type: {}", maxDurationObj.getClass().getName());
            Integer maxDuration = (maxDurationObj instanceof Number) ? ((Number) maxDurationObj).intValue() : null;
            criteriaRequest.setMaxDuration(maxDuration);
            log.info("Converted maxDuration: {}", maxDuration);
        }

        criteriaRequest.setStartDate(LocalDate.now());
        try {
            criteriaRequest.setTypeTour(TypeTour.valueOf((String) criteriaMap.get("type")));
            criteriaRequest.setRegion(Region.valueOf((String) criteriaMap.get("region")));
            criteriaRequest.setAccommodationQuality(AccommodationQuality.valueOf((String) criteriaMap.get("accommodation")));
            criteriaRequest.setTransportationMode(TransportationMode.valueOf((String) criteriaMap.get("transportationMode")));
            log.info("criteriaRequest: {}", criteriaRequest);
        } catch (IllegalArgumentException e) {
            log.error("Error in enum conversion: ", e);
        }
        return criteriaRequest;
    }

    public Flux<TourDTO> getPreferenceTourStream() {
        return sinkForPreferences.asFlux();
    }

    public Flux<TourDTO> getInteractionTourStream() {
        return sinkForInteractions.asFlux();
    }

//    public void ensureSinkForPreferencesInitialized() {
//        if (sinkForPreferences == null || isSinkForPreferencesTerminated) {
//            this.sinkForPreferences = Sinks.many().unicast().onBackpressureBuffer();
//            this.isSinkForPreferencesTerminated = false; // Đánh dấu là sink không còn hoàn tất
//        }
//    }
//
//    // Phương thức xử lý khi hoàn tất
//    public void markSinkForPreferencesAsCompleted() {
//        this.isSinkForPreferencesTerminated = true; // Đánh dấu sink đã hoàn tất
//    }

}

