package com.fit.tourservice.dtos.response;

import com.fit.tourservice.models.Tour;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TourDTO {
    private Long tourId;
    private String name;
    private double price;
    private int duration;
    private String destination;
    private String departureLocation;
    private int availableSlot;
    private String urlImage;
    private boolean includePromotions;

    public static Tour convertoEnity(TourDTO tourDTO) {
        Tour tour = new Tour();
        tour.setTourId(tourDTO.getTourId());
        tour.setName(tourDTO.getName());
        tour.setPrice(tourDTO.getPrice());
        tour.setDuration(tourDTO.getDuration());
        tour.setDestination(tourDTO.getDestination());
        tour.setDepartureLocation(tourDTO.getDepartureLocation());
        tour.setAvailableSlot(tourDTO.getAvailableSlot());
        tour.setUrlImage(tourDTO.getUrlImage());
        tour.setIncludePromotions(tourDTO.isIncludePromotions());
        return tour;
    }

    public static TourDTO convertoDTO(Tour tour) {
        TourDTO tourDTO = new TourDTO();
        tourDTO.setTourId(tour.getTourId());
        tourDTO.setName(tour.getName());
        tourDTO.setPrice(tour.getPrice());
        tourDTO.setDuration(tour.getDuration());
        tourDTO.setDestination(tour.getDestination());
        tourDTO.setDepartureLocation(tour.getDepartureLocation());
        tourDTO.setAvailableSlot(tour.getAvailableSlot());
        tourDTO.setUrlImage(tour.getUrlImage());
        tourDTO.setIncludePromotions(tour.isIncludePromotions());
        return tourDTO;
    }

}
