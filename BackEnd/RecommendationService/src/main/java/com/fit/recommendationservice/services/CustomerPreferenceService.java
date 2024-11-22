package com.fit.recommendationservice.services;

import com.fit.commonservice.utils.Constant;
import com.fit.recommendationservice.dtos.request.TourFilterCriteriaRequest;
import com.fit.recommendationservice.enums.AccommodationQuality;
import com.fit.recommendationservice.enums.Region;
import com.fit.recommendationservice.enums.TransportationMode;
import com.fit.recommendationservice.enums.TypeTour;
import com.fit.recommendationservice.events.EventProducer;
import com.fit.recommendationservice.repositories.CustomerPreferencesRepository;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class CustomerPreferenceService {
    @Autowired
    private CustomerPreferencesRepository preferencesRepository;


//    public Mono<Map<String, Object>> getCommonPreferences(Long customerId) {
//        Mono<Double> priceLatest = preferencesRepository.findLatestPrice(customerId);
//
//        Mono<Integer> maxDurationLatest = preferencesRepository.findLatestDuration(customerId);
//
//        Mono<TypeTour> popularTypeTour = preferencesRepository.findPopularTypeTour(customerId)
//                .map(TypeTour::fromValue);// Sử dụng phương thức fromValue để chuyển đổi từ int sang Enum
//
//        Mono<Region> popularRegion = preferencesRepository.findPopularRegion(customerId)
//                .map(Region::fromValue);
//
//        Mono<AccommodationQuality> popularAccommodation = preferencesRepository.findPopularAccommodationQuality(customerId)
//                .map(AccommodationQuality::fromValue);
//
//
//        Mono<TransportationMode> popularTransportation = preferencesRepository.findPopularTransportationMode(customerId)
//                .map(TransportationMode::fromValue);
//
//        return Mono.zip(priceLatest, maxDurationLatest,popularTypeTour, popularRegion, popularAccommodation, popularTransportation)
//                .map(tuple->{
//                    Map<String, Object> commonPreferences = new HashMap<>();
//                    commonPreferences.put("maxPrice", tuple.getT1());
//                    commonPreferences.put("maxDuration", tuple.getT2());
//                    commonPreferences.put("type", tuple.getT3());
//                    commonPreferences.put("region", tuple.getT4());
//                    commonPreferences.put("accommodation", tuple.getT5());
//                    commonPreferences.put("transportationMode", tuple.getT6());
//                    return commonPreferences;
//                });
//    }

    public Mono<TourFilterCriteriaRequest> getCommonPreferences(Long customerId) {
        Mono<Double> priceLatest = preferencesRepository.findLatestPrice(customerId)
                .defaultIfEmpty(0.0); // Gán giá trị mặc định nếu không có giá trị

        Mono<Integer> maxDurationLatest = preferencesRepository.findLatestDuration(customerId)
                .defaultIfEmpty(0); // Gán giá trị mặc định nếu không có giá trị

        Mono<String> popularDepartureLocation = preferencesRepository.findPopularDepartureLocation(customerId)
                .defaultIfEmpty("Hồ Chí Minh");

        Mono<String> popularTypeTourString = preferencesRepository.findPopularTypeTour(customerId)
                .defaultIfEmpty(TypeTour.RESORT.name()); // Gán giá trị mặc định là RESORT (tên enum)

        Mono<String> popularRegionString = preferencesRepository.findPopularRegion(customerId)
                .defaultIfEmpty(Region.NORTH.name()); // Gán giá trị mặc định là NORTH (tên enum)

        Mono<String> popularAccommodationString = preferencesRepository.findPopularAccommodationQuality(customerId)
                .defaultIfEmpty(AccommodationQuality.FIVE_STAR_HOTEL.name()); // Gán giá trị mặc định là FIVE_STAR_HOTEL (tên enum)

        Mono<String> popularTransportationString = preferencesRepository.findPopularTransportationMode(customerId)
                .defaultIfEmpty(TransportationMode.AIRPLANE.name()); // Gán giá trị mặc định là AIRPLANE (tên enum)

        return Mono.zip(priceLatest, maxDurationLatest, popularDepartureLocation,
                        popularTypeTourString, popularRegionString, popularAccommodationString, popularTransportationString)
                .flatMap(tuple -> {
                    // Chuyển đổi từ String sang Enum ngay trong flatMap
                    return Mono.just(new TourFilterCriteriaRequest(
                            tuple.getT1(), // maxCost
                            LocalDate.now(), // startDate
                            tuple.getT2(), // maxDuration
                            tuple.getT3(), // departureLocation
                            TypeTour.valueOf(tuple.getT4()), // typeTour
                            AccommodationQuality.valueOf(tuple.getT6()), // accommodationQuality
                            Region.valueOf(tuple.getT5()), // region
                            TransportationMode.valueOf(tuple.getT7()) // transportationMode
                    ));
                });
    }


}
