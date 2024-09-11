package com.fit.tourservice.dtos.request;

import com.fit.tourservice.enums.AccommodationQuality;
import com.fit.tourservice.enums.Region;
import com.fit.tourservice.enums.TransportationMode;
import com.fit.tourservice.enums.TypeTour;
import lombok.*;

import java.time.LocalDate;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class TourFilterCriteriaRequest {
    private double maxCost;
    private int duration;
    private LocalDate startDate;
    private TypeTour typeTour;
    private AccommodationQuality accommodationQuality;
    private Region region;
    private TransportationMode transportationMode;
    private boolean includePromotions;
}
