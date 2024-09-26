package com.fit.paymentservice.dtos;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    private Long customerId;
    private Long tourId;
    private int quantity;
}
