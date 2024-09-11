package com.fit.paymentservice.models;

import com.fit.tourservice.enums.StatusBooking;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booking")
public class Booking {
    @Id
    private Long bookingId;
    private Long customerId;
    private String tourId;
    private LocalDate bookingDate;
    private StatusBooking statusBooking;
    private double totalAmount;
    private int quantity;
}
