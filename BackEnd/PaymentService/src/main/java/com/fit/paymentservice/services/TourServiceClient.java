package com.fit.paymentservice.services;

import com.fit.paymentservice.dtos.TourTicketDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class TourServiceClient {

    @Autowired
    private WebClient.Builder webClientBuilder;
    private static final String TOUR_SERVICE_URL = "http://APIGATEWAY/api/v1/tour-tickets"; // Địa chỉ API của TourService thông qua API GATEWAY

    public Mono<TourTicketDTO> getTourTicketById(Long ticketId) {
        String url = UriComponentsBuilder.fromHttpUrl(TOUR_SERVICE_URL)
                .path("/{id}")
                .buildAndExpand(ticketId)
                .toUriString();

        return webClientBuilder.build()
                .get()
                .uri(url)
                .retrieve()
                .bodyToMono(TourTicketDTO.class) // Ánh xạ JSON sang TourTicketDTO
                .doOnError(error -> log.error("Error fetching ticket {}: {}", ticketId, error.getMessage()));
    }

}


