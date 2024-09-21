package com.fit.tourservice.controllers;

import com.fit.tourservice.dtos.request.TourFilterCriteriaRequest;
import com.fit.tourservice.dtos.response.TourDTO;
import com.fit.tourservice.events.EventConsumer;
import com.fit.tourservice.services.TourService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/tours")
@Slf4j
public class TourController {
    @Autowired
    private TourService tourService;
    @Autowired
    private EventConsumer eventConsumer;

    @PostMapping(value = "/getFilteredTours")
    public ResponseEntity<Flux<TourDTO>> getLstTourByCriteria(@RequestBody TourFilterCriteriaRequest tourFilterCriteriaRequest) {
        return ResponseEntity.ok(tourService.findToursByCriteria(tourFilterCriteriaRequest));
    }

    @GetMapping(value = "/recommendations-preferences/{customerId}")
    public Mono<ResponseEntity<Flux<TourDTO>>> getRecommendedTourByCriteria(@PathVariable("customerId") Long customerId) {
        return tourService.requestPreferences(customerId)
                .then(Mono.defer(() -> {
                    Flux<TourDTO> tourFlux = eventConsumer.getPreferenceTourStream()
                            .doOnNext(tour -> log.info("Tour emitted for response: {}", tour))
                            .doOnComplete(() -> log.info("Completed emitting tours for customer: {}", customerId))
                            .doOnError(error -> log.error("Error during Flux processing: ", error)); // Log lỗi trong quá trình xử lý Flux

                    // Kiểm tra việc trả về ResponseEntity với Flux đã được xử lý
                    return Mono.just(ResponseEntity.ok(tourFlux));
                }))
                .onErrorResume(error -> {
                    // Thêm log để biết chính xác lỗi xảy ra
                    log.error("Error while processing recommendation for customer {}: {}", customerId, error.getMessage(), error);
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(Flux.just(new TourDTO()))); // Có thể trả về một body mặc định nếu có lỗi
                });
    }


    @GetMapping(value = "/recommendations-interactions/{customerId}")
    public Mono<ResponseEntity<Flux<TourDTO>>> getRecommendedTourByInteractions(@PathVariable("customerId") Long customerId) {
        return tourService.requestPreferences(customerId)
                .then(Mono.defer(() -> {
                    Flux<TourDTO> tourFlux = eventConsumer.getInteractionTourStream()
                            .doOnNext(tour -> log.info("Tour emitted for response: {}", tour))
                            .doOnComplete(() -> log.info("Completed emitting tours for customer: {}", customerId))
                            .doOnError(error -> log.error("Error during Flux processing: ", error)); // Log lỗi trong quá trình xử lý Flux

                    // Kiểm tra việc trả về ResponseEntity với Flux đã được xử lý
                    return Mono.just(ResponseEntity.ok(tourFlux));
                }))
                .onErrorResume(error -> {
                    // Thêm log để biết chính xác lỗi xảy ra
                    log.error("Error while processing recommendation for customer {}: {}", customerId, error.getMessage(), error);
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(Flux.just(new TourDTO()))); // Có thể trả về một body mặc định nếu có lỗi
                });
    }


//    //    Test
//    @GetMapping(value = "/recommendations-preferences/request")
//    public Mono<ResponseEntity<Void>> requestPreferences(@RequestParam("customerId") Long customerId) {
//        return tourService.requestPreferences(customerId)
//                .then(Mono.just(ResponseEntity.ok().<Void>build()))
//                .onErrorResume(error -> {
//                    log.error("Error while requesting preferences for customer {}: {}", customerId, error.getMessage());
//                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
//                });
//    }
//
//    @GetMapping(value = "/recommendations-preferences/tours")
//    public Mono<ResponseEntity<Flux<TourDTO>>> getTourStream(@RequestParam("customerId") Long customerId) {
//        eventConsumer.ensureSinkForPreferencesInitialized(); // Đảm bảo sink được khởi tạo
//
//        Flux<TourDTO> tourFlux = eventConsumer.getPreferenceTourStream()
//                .doOnNext(tour -> log.info("Tour emitted for customer {}: {}", customerId, tour))
//                .doOnComplete(() -> {
//                    log.info("Completed emitting tours for customer: {}", customerId);
//                    eventConsumer.markSinkForPreferencesAsCompleted(); // Đánh dấu sink đã hoàn tất
//                })
//                .doOnError(error -> log.error("Error during Flux processing for customer {}: ", customerId, error));
//
//        return Mono.just(ResponseEntity.ok(tourFlux));
//    }

}
