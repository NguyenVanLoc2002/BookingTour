package com.fit.tourservice.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tour_service")
public class ServiceTour {
    @Id
    private Long serviceId;
    private Long tourId;
    private String includedService;
    private String excludedService;
}
