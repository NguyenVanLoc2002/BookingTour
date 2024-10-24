package com.fit.tourservice.controllers;

import com.fit.tourservice.dtos.response.ActivityDTO;
import com.fit.tourservice.dtos.response.ItinerariesDTO;
import com.fit.tourservice.services.ActivityService;
import com.fit.tourservice.services.ItinerariesService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/itineraries")
@Slf4j
public class ItinerariesController {
    @Autowired
    private ItinerariesService itinerariesService;

    @Autowired
    private ActivityService activityService;

    @GetMapping
    public Mono<ResponseEntity<Flux<ItinerariesDTO>>> getItineraries(@RequestParam int page, @RequestParam int size){
        return Mono.just(ResponseEntity.ok(itinerariesService.getAll(page, size)))
                .onErrorResume(e->{
                    log.error("Error fetching tour notes: {}", e.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }

    @PostMapping("/add")
    public Mono<ResponseEntity<ItinerariesDTO>> addItinerary(@RequestBody ItinerariesDTO itinerariesDTO){
        return itinerariesService.addItineraries(itinerariesDTO)
                .map(itinerariesSaved -> ResponseEntity.status(HttpStatus.CREATED).body(itinerariesSaved))
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }

    @PutMapping("/{itinerariesId}")
    public Mono<ResponseEntity<ItinerariesDTO>> updateItinerary(@PathVariable Long itinerariesId, @RequestBody ItinerariesDTO itinerariesDTO){
        return itinerariesService.updateItineraries(itinerariesDTO, itinerariesId)
                .map(updated-> ResponseEntity.status(HttpStatus.OK).body(updated))
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/{itinerariesId}")
    public Mono<ResponseEntity<String>> deleteItinerary(@PathVariable Long itinerariesId) {
        return itinerariesService.deleteItineraries(itinerariesId)
                .then(Mono.just(ResponseEntity.ok("Itinerary with ID " + itinerariesId + " has been deleted."))) // Trả về thông báo xác nhận
                .onErrorResume(error -> {
                    log.error("Error while deleting Itinerary {}: {}", itinerariesId, error.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }

    @GetMapping("/by-tour")
    public Mono<ResponseEntity<Flux<ItinerariesDTO>>> getItinerariesByTour(@RequestParam Long tourId) {
        return Mono.just(ResponseEntity.ok(itinerariesService.getItinerariesByTourId(tourId)))
                .onErrorResume(e -> {
                    log.error("Error fetching itineraries by tour ID: {}", e.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }

    @PostMapping("/activities/add")
    public Mono<ResponseEntity<ActivityDTO>> addActivity(@RequestBody ActivityDTO activityDTO) {
        return activityService.addActivity(activityDTO)
                .map(savedActivity -> ResponseEntity.status(HttpStatus.CREATED).body(savedActivity))
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.BAD_REQUEST).build());
    }

    @PutMapping("/activities/{activityId}")
    public Mono<ResponseEntity<ActivityDTO>> updateActivity(@PathVariable Long activityId, @RequestBody ActivityDTO activityDTO) {
        return activityService.updateActivity(activityDTO, activityId)
                .map(updatedActivity -> ResponseEntity.status(HttpStatus.OK).body(updatedActivity))
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("/activities/{activityId}")
    public Mono<ResponseEntity<String>> deleteActivity(@PathVariable Long activityId) {
        return activityService.deleteActivity(activityId)
                .then(Mono.just(ResponseEntity.ok("Activity with ID " + activityId + " has been deleted.")))
                .onErrorResume(error -> {
                    log.error("Error while deleting activity {}: {}", activityId, error.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }

    @GetMapping("/activities")
    public Mono<ResponseEntity<Flux<ActivityDTO>>> getAllActivities(@RequestParam int page, @RequestParam int size) {
        return Mono.just(ResponseEntity.ok(activityService.getAll(page, size)))
                .onErrorResume(e -> {
                    log.error("Error fetching activities: {}", e.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }

    @GetMapping("/activities/by-itinerary")
    public Mono<ResponseEntity<Flux<ActivityDTO>>> getActivitiesByItineraryId(@RequestParam Long itinerId) {
        return Mono.just(ResponseEntity.ok(activityService.getActivitiesByItineraryId(itinerId)))
                .onErrorResume(e -> {
                    log.error("Error fetching activities by itinerary ID: {}", e.getMessage());
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }
}
