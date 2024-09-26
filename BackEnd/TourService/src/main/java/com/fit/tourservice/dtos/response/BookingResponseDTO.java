package com.fit.tourservice.dtos.response;

import com.fit.tourservice.enums.StatusBooking;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BookingResponseDTO {
    private Long customerId;
    private Long tourId;
    private LocalDate bookingDate;
    private StatusBooking statusBooking;
    private double totalAmount;
    private int quantity;
    private boolean isAvailable;
}
