package com.fit.tourservice.services;

import com.fit.commonservice.utils.Constant;
import com.fit.tourservice.dtos.request.TourFilterCriteriaRequest;
import com.fit.tourservice.dtos.response.TourDTO;
import com.fit.tourservice.events.EventProducer;
import com.fit.tourservice.models.Tour;
import com.fit.tourservice.repositoires.TourRepository;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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

    private final Map<Long, TourFilterCriteriaRequest> customerPreferences = new ConcurrentHashMap<>();

    // Lưu tiêu chí vào map tạm thời
    public Mono<Void> saveCustomerPreferences(Long customerId, TourFilterCriteriaRequest criteriaRequest) {
        customerPreferences.put(customerId, criteriaRequest);
        return Mono.empty();
    }

    // Trả về các tour dựa trên tiêu chí đã lưu
    public Flux<TourDTO> getRecommendedTours(Long customerId) {
        TourFilterCriteriaRequest criteriaRequest = customerPreferences.get(customerId);
        if (criteriaRequest == null) {
            return Flux.empty(); // Trả về Flux.empty() nếu không có tiêu chí
        }
        return findToursByCriteria(criteriaRequest);
    }

    public Mono<Boolean> checkAvailableSlot(Long tourId) {
        return tourRepository.findById(tourId)
                .map(tour -> tour.getAvailableSlot() > 0);
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
                .map(tour -> {
                    if (tour.getAvailableSlot() >= numberOfGuests)
                        return true;
                    else
                        return false;
                }).defaultIfEmpty(false);
    }

    public Mono<Double> calcTotalAmountTicket(Long tourId, int numberOfGuests) {
        return tourRepository.findById(tourId)
                .map(tour -> tour.getPrice() * numberOfGuests); // Tính tổng tiền trực tiếp trong luồng
    }
}
