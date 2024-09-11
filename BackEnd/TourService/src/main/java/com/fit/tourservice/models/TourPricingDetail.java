package com.fit.tourservice.models;

import com.fit.tourservice.enums.AgeGroup;
import com.fit.tourservice.enums.SurchargeType;
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
@Table(name = "tour_pricing_detail")
public class TourPricingDetail {
    @Id
    private Long tourPriceId;
    private Long tourId;
    private AgeGroup ageGroup;
    private double price;
    private SurchargeType surchargeType;//loại phụ phí
    private double surchargeAmount;
}
