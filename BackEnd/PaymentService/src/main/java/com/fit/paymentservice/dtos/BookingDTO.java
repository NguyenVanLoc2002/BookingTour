package com.fit.paymentservice.dtos;

import com.fit.paymentservice.enums.StatusBooking;
import com.fit.paymentservice.models.Booking;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long customerId;
    private Long tourId;
    private LocalDate bookingDate;
    private StatusBooking statusBooking;
    private double totalAmount;
    private int quantity;

    public BookingDTO convertToDto(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setCustomerId(booking.getCustomerId());
        bookingDTO.setTourId(booking.getTourId());
        bookingDTO.setBookingDate(booking.getBookingDate());
        bookingDTO.setStatusBooking(booking.getStatusBooking());
        bookingDTO.setTotalAmount(booking.getTotalAmount());
        bookingDTO.setQuantity(booking.getQuantity());
        return bookingDTO;
    }

    public Booking convertToEntity(BookingDTO bookingDTO) {
        Booking booking = new Booking();
        booking.setCustomerId(bookingDTO.getCustomerId());
        booking.setTourId(bookingDTO.getTourId());
        booking.setBookingDate(bookingDTO.getBookingDate());
        booking.setStatusBooking(bookingDTO.getStatusBooking());
        booking.setTotalAmount(bookingDTO.getTotalAmount());
        booking.setQuantity(bookingDTO.getQuantity());
        return booking;
    }
}
