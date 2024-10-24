package com.fit.tourservice.dtos.response;

import com.fit.tourservice.models.Tour;
import com.fit.tourservice.models.TourTicket;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TourDTO {
    private Long tourId;
    private String name;
    private double price;
    private double oldPrice;
    private int day;
    private int night;
    private String destination;
    private String departureLocation;
    private List<String> urlImage;
    private boolean includePromotions;
    private TourFeatureDTO tourFeatureDTO;
    private LocalDate departureDate;
    private int availableSlot;

    public static Tour convertToEnity(TourDTO tourDTO) {
        Tour tour = new Tour();
        tour.setTourId(tourDTO.getTourId());
        tour.setName(tourDTO.getName());
        tour.setPrice(tourDTO.getPrice());
        tour.setOldPrice(tourDTO.getOldPrice());
        tour.setDay(tourDTO.getDay());
        tour.setNight(tourDTO.getNight());
        tour.setDestination(tourDTO.getDestination());
        tour.setDepartureLocation(tourDTO.getDepartureLocation());
        tour.setUrlImage(tourDTO.getUrlImage());
        tour.setIncludePromotions(tourDTO.isIncludePromotions());
        return tour;
    }

    public static TourDTO convertToDTO(Tour tour) {
        TourDTO tourDTO = new TourDTO();
        tourDTO.setTourId(tour.getTourId());
        tourDTO.setName(tour.getName());
        tourDTO.setPrice(tour.getPrice());
        tourDTO.setOldPrice(tour.getOldPrice());
        tourDTO.setDay(tour.getDay());
        tourDTO.setNight(tour.getNight());
        tourDTO.setDestination(tour.getDestination());
        tourDTO.setDepartureLocation(tour.getDepartureLocation());
        tourDTO.setUrlImage(tour.getUrlImage());
        tourDTO.setIncludePromotions(tour.isIncludePromotions());
        return tourDTO;
    }

}
