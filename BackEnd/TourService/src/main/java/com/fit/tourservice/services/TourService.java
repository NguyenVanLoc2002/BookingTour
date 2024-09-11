package com.fit.tourservice.services;

import com.fit.tourservice.repositoires.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

@Service
public class TourService {
    @Autowired
    private TourRepository tourRepository;

    public Mono<Boolean> checkAvailableSlot(Long tourId){
        return tourRepository.findById(tourId)
                .map(tour -> tour.getAvailableSlot()>0);
    }
}
