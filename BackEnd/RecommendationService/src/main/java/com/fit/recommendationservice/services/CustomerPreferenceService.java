package com.fit.recommendationservice.services;

import com.fit.commonservice.utils.Constant;
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

import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class CustomerPreferenceService {
    @Autowired
    private CustomerPreferencesRepository preferencesRepository;
    @Qualifier("gson")
    @Autowired
    private Gson gson;
    @Autowired
    private EventProducer recommendationProducer;


    public Mono<Map<String, Object>> getCommonPreferences(Long customerId) {
        Mono<Double> priceLatest = preferencesRepository.findLatestPrice(customerId);

        Mono<Integer> maxDurationLatest = preferencesRepository.findLatestDuration(customerId);

        Mono<TypeTour> popularTypeTour = preferencesRepository.findPopularTypeTour(customerId)
                .map(TypeTour::fromValue);// Sử dụng phương thức fromValue để chuyển đổi từ int sang Enum

        Mono<Region> popularRegion = preferencesRepository.findPopularRegion(customerId)
                .map(Region::fromValue);

        Mono<AccommodationQuality> popularAccommodation = preferencesRepository.findPopularAccommodationQuality(customerId)
                .map(AccommodationQuality::fromValue);


        Mono<TransportationMode> popularTransportation = preferencesRepository.findPopularTransportationMode(customerId)
                .map(TransportationMode::fromValue);

        return Mono.zip(priceLatest, maxDurationLatest,popularTypeTour, popularRegion, popularAccommodation, popularTransportation)
                .map(tuple->{
                    Map<String, Object> commonPreferences = new HashMap<>();
                    commonPreferences.put("maxPrice", tuple.getT1());
                    commonPreferences.put("maxDuration", tuple.getT2());
                    commonPreferences.put("type", tuple.getT3());
                    commonPreferences.put("region", tuple.getT4());
                    commonPreferences.put("accommodation", tuple.getT5());
                    commonPreferences.put("transportationMode", tuple.getT6());
                    return commonPreferences;
                });
    }


}
