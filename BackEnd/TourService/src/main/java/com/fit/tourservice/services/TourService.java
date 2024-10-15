package com.fit.tourservice.services;

import com.fit.commonservice.utils.Constant;
import com.fit.tourservice.dtos.request.TourFilterCriteriaRequest;
import com.fit.tourservice.dtos.response.TourDTO;
import com.fit.tourservice.events.EventProducer;
import com.fit.tourservice.models.Tour;
import com.fit.tourservice.repositories.r2dbc.TourRepository;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class TourService {
    @Autowired
    private TourRepository tourRepository;

    @Autowired
    private EventProducer eventProducer;
    @Qualifier("gson")
    @Autowired
    private Gson gson;

    public Mono<TourDTO> addTour(TourDTO tourDTO){
        return Mono.just(tourDTO)
                .map(TourDTO::convertoEnity)
                .flatMap(tour -> tourRepository.save(tour))
                .map(TourDTO::convertoDTO);
    }

    // Xóa Tour theo ID
    public Mono<Void> deleteTour(Long tourId) {
        return tourRepository.findById(tourId)
                .flatMap(tour -> tourRepository.delete(tour));
    }

    public Mono<TourDTO> updateTour(TourDTO tourDTO, Long tourId) {
        return tourRepository.findById(tourId)
                .flatMap(existTour->{
                    Tour updateTour = TourDTO.convertoEnity(tourDTO);
                    updateTour.setTourId(existTour.getTourId());
                    return tourRepository.save(updateTour);
                })
                .map(TourDTO::convertoDTO);
    }

    public Flux<TourDTO> getAllTours(int page, int size) {
        return tourRepository.findAll()
                .map(TourDTO::convertoDTO)
                .skip((long) (page -1) *size)
                .take(size);
    }

    public Flux<TourDTO> getToursByNameContainingIgnoreCase(String name ,int page, int size) {
        return tourRepository.findToursByNameContainingIgnoreCase(name)
                .map(TourDTO::convertoDTO)
                .skip((long) (page -1) *size)
                .take(size);
    }

    public Flux<TourDTO> getToursByDayBetween(LocalDate startDate,LocalDate endDate, int page, int size) {
        return tourRepository.findToursByDayBetween(startDate,endDate)
                .map(TourDTO::convertoDTO)
                .skip((long) (page -1) *size)
                .take(size);
    }


    public Flux<TourDTO> getToursByPriceBetween(Double minPrice, Double maxPrice, int page, int size) {
        return tourRepository.findToursByPriceBetween(minPrice,maxPrice)
                .map(TourDTO::convertoDTO)
                .skip((long) (page -1) *size)
                .take(size);
    }

    public Flux<TourDTO> getToursByTypeTour(int type, int page, int size) {
        return tourRepository.findToursByTypeTour(type)
                .map(TourDTO::convertoDTO)
                .skip((long) (page -1) *size)
                .take(size);
    }

    //Lay DS  Tour con han va con cho trong
    public Flux<TourDTO> getAvailableTours(int page, int size) {
        return tourRepository.findAvailableTours()
                .map(TourDTO::convertoDTO)
                .skip((long) (page -1) *size)
                .take(size);
    }

    public Flux<TourDTO> findToursByCriteria(TourFilterCriteriaRequest criteria) {
        return tourRepository.findToursByCriteria(
                criteria.getMaxCost(),
                criteria.getMaxDuration(),
                criteria.getStartDate(),
                criteria.getTypeTourValue(), // Chuyển đổi thành int
                criteria.getAccommodationQualityValue(), // Chuyển đổi thành int
                criteria.getRegionValue(), // Chuyển đổi thành int
                criteria.getTransportationModeValue() // Chuyển đổi thành int
        );
    }


    //Gửi yêu cầu lay preference den RecommendationService
    public Mono<Void> requestPreferences(Long customerId) {
        // Tạo thông điệp yêu cầu tiêu chí từ TourService
        String requestMessage = gson.toJson(Map.of("customerId", customerId));
        // Trả về Mono<Void> để giữ cho việc gửi message bất đồng bộ
        return eventProducer.send(Constant.REQUEST_RECOMMENDATION_TOPIC, String.valueOf(customerId), requestMessage).then();
    }


    public Flux<TourDTO> findToursByIds(List<Long> tourIds) {
        return tourRepository.findByTourIdIn(tourIds)
                .map(TourDTO::convertoDTO);
    }

    public Mono<Boolean> checkAvailableSlot(Long tourId, int numberOfGuests) {
        return tourRepository.findById(tourId)
                .map(tour -> tour.getAvailableSlot() >= numberOfGuests)
                .defaultIfEmpty(false);
    }

    public Mono<Double> calcTotalAmountTicket(Long tourId, int numberOfGuests) {
        return tourRepository.findById(tourId)
                .map(tour -> tour.getPrice() * numberOfGuests); // Tính tổng tiền trực tiếp trong luồng
    }

    public Mono<Tour> updateAvailableSlot(Long tourId, int numberOfGuests) {
        return tourRepository.findById(tourId)
                .flatMap(tour -> {
                    int updatedSlot = tour.getAvailableSlot() - numberOfGuests;
                    if (updatedSlot < 0) {
                        return Mono.error(new IllegalArgumentException("Not enough slots available"));
                    }
                    tour.setAvailableSlot(updatedSlot);
                    return tourRepository.save(tour);
                })
                .switchIfEmpty(Mono.error(new Exception("Tour not found!")));
    }
}
