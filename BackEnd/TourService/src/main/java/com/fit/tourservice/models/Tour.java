package com.fit.tourservice.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tours")
public class Tour {
    @Id
    private Long tourId;
    private String name;
    private double price;
//    Khoảng thời gian 3 ngay 2 dem
    private int day;
    private int night;
    //Điểm den
    private String destination;
//    Dia diem khoi hanh
    private String departureLocation;
    private int availableSlot;
    private String urlImage;
    private boolean includePromotions;
}
