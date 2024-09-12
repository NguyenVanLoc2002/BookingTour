package com.fit.tourservice.controllers;

import com.fit.tourservice.dtos.request.TourFilterCriteriaRequest;
import com.fit.tourservice.dtos.response.TourDTO;
import com.fit.tourservice.services.TourService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/v1/tours")
public class TourController {
    @Autowired
    private TourService tourService;

    @PostMapping(value = "/getFilteredTours")
    public ResponseEntity<Flux<TourDTO>> getLstTourByCriteria(@RequestBody TourFilterCriteriaRequest tourFilterCriteriaRequest) {
        return ResponseEntity.ok(tourService.findToursByCriteria(tourFilterCriteriaRequest));
    }
}
