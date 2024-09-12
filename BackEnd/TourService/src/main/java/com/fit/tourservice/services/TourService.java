package com.fit.tourservice.services;

import com.fit.tourservice.dtos.request.TourFilterCriteriaRequest;
import com.fit.tourservice.dtos.response.TourDTO;
import com.fit.tourservice.models.Tour;
import com.fit.tourservice.repositoires.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TourService {
    @Autowired
    private TourRepository tourRepository;

    public Mono<Boolean> checkAvailableSlot(Long tourId){
        return tourRepository.findById(tourId)
                .map(tour -> tour.getAvailableSlot()>0);
    }

    public Flux<TourDTO> findToursByCriteria(TourFilterCriteriaRequest criteria) {
        return tourRepository.findToursByCriteria(
                criteria.getMaxCost(),
                criteria.getMaxDuration(),
                criteria.getStartDate(),
                criteria.getTypeTourValue(), // Chuyển đổi thành int
                criteria.getAccommodationQualityValue(), // Chuyển đổi thành int
                criteria.getRegionValue(), // Chuyển đổi thành int
                criteria.getTransportationModeValue(), // Chuyển đổi thành int
                criteria.isIncludePromotions()
        );
    }
}
