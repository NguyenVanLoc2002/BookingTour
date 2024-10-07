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

import java.time.LocalDate;

@RestController
@RequestMapping("/api/v1/tours")
@Slf4j
public class TourController {
    @Autowired
    private TourService tourService;
    @Autowired
    private EventConsumer eventConsumer;


    @PostMapping("/add")
    public Mono<ResponseEntity<TourDTO>> addTour(@RequestBody TourDTO tourDTO) {
        return tourService.addTour(tourDTO)
                .map(savedTour -> ResponseEntity.status(HttpStatus.CREATED).body(savedTour))
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }

    @PutMapping("/{tourId}")
    public Mono<ResponseEntity<TourDTO>> updateTour(@PathVariable Long tourId, @RequestBody TourDTO tourDTO) {
        return tourService.updateTour(tourDTO, tourId)
                .map(updatedTour -> ResponseEntity.ok(updatedTour))
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{tourId}")
    public Mono<ResponseEntity<String>> deleteTour(@PathVariable Long tourId) {
        return tourService.deleteTour(tourId)
                .then(Mono.just(ResponseEntity.ok("Tour with ID " + tourId + " has been deleted."))) // Trả về thông báo xác nhận
                .onErrorResume(error -> {
                    log.error("Error while deleting tour {}: {}", tourId, error.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }


    @GetMapping
    public ResponseEntity<Flux<TourDTO>> getAllTours(@RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(tourService.getAllTours(page, size));
    }

    @GetMapping("/by-name")
    public ResponseEntity<Flux<TourDTO>> getToursByNameContainingIgnoreCase(@RequestParam String name,@RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(tourService.getToursByNameContainingIgnoreCase(name, page, size));
    }

    //Lay DS theo khoang ngay
    @GetMapping("/by-date")
    public ResponseEntity<Flux<TourDTO>> getToursByDayBetween(@RequestParam LocalDate startDate, @RequestParam LocalDate endDate, @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(tourService.getToursByDayBetween(startDate, endDate, page, size));
    }

    //Lay DS theo gia nam trong khoảng yêu cau
    @GetMapping("/by-price-between")
    public ResponseEntity<Flux<TourDTO>> getToursByPriceBetween(@RequestParam Double minPrice, @RequestParam Double maxPrice, @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(tourService.getToursByPriceBetween(minPrice, maxPrice, page, size));
    }


    //Lay DS theo loai  tour
    @GetMapping("/by-type")
    public ResponseEntity<Flux<TourDTO>> getToursByTypeTour(@RequestParam int typeTour, @RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(tourService.getToursByTypeTour(typeTour, page, size));
    }

    @GetMapping("/available")
    public ResponseEntity<Flux<TourDTO>> getAvailableTours(@RequestParam int page, @RequestParam int size) {
        return ResponseEntity.ok(tourService.getAvailableTours(page, size));
    }


    @PostMapping(value = "/getFilteredTours")
    public ResponseEntity<Flux<TourDTO>> getLstTourByCriteria(@RequestBody TourFilterCriteriaRequest tourFilterCriteriaRequest) {
        return ResponseEntity.ok(tourService.findToursByCriteria(tourFilterCriteriaRequest));
    }



    @GetMapping(value = "/recommendations-preferences/{customerId}")
    public Mono<ResponseEntity<Flux<TourDTO>>> getRecommendedTourByCriteria(@PathVariable("customerId") Long customerId) {
        return tourService.requestPreferences(customerId)
                .then(Mono.defer(() -> {
                    Flux<TourDTO> tourFlux = eventConsumer.getPreferenceTourStream() // Dữ liệu lưu tru trong Sink
                            .doOnNext(tour -> log.info("Tour emitted for response: {}", tour))
                            .doOnComplete(() -> log.info("Completed emitting tours for customer: {}", customerId))
                            .doOnError(error -> log.error("Error during Flux processing: ", error)); // Log lỗi trong quá trình xử lý Flux

                    // Kiểm tra việc trả về ResponseEntity với Flux đã được xử lý
                    return Mono.just(ResponseEntity.ok(tourFlux));
                }))
                .onErrorResume(error -> {
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
    @GetMapping(value = "/recommendations-preferences/request")
    public Mono<ResponseEntity<Void>> requestPreferences(@RequestParam("customerId") Long customerId) {
        return tourService.requestPreferences(customerId)
                .then(Mono.just(ResponseEntity.ok().<Void>build()))
                .onErrorResume(error -> {
                    log.error("Error while requesting preferences for customer {}: {}", customerId, error.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }


//    @GetMapping(value = "/recommendations-preferences/tours")
//    public Flux<TourDTO> getTourStream(@RequestParam("customerId") Long customerId) {
//        eventConsumer.ensureSinkForPreferencesInitialized(); // Đảm bảo sink được khởi tạo
//
//        return eventConsumer.getPreferenceTourStream()
//                .doOnNext(tour -> log.info("Tour emitted for customer {}: {}", customerId, tour))
//                .doOnComplete(() -> {
//                    log.info("Completed emitting tours for customer: {}", customerId);
//                    eventConsumer.markSinkForPreferencesAsCompleted(); // Đánh dấu sink đã hoàn tất
//                })
//                .doOnError(error -> log.error("Error during Flux processing for customer {}: ", customerId, error));
//    }


}
