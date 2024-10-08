package com.fit.paymentservice.dtos.request;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {
    private Long bookingId;
    private Long customerId;
    private Long tourId;
    private String email;
    private String userName;
    private int quantity;
}