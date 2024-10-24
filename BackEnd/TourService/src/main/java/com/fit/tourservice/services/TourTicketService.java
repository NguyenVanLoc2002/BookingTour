package com.fit.tourservice.services;

import com.fit.tourservice.dtos.response.TourTicketDTO;
import com.fit.tourservice.models.TourTicket;
import com.fit.tourservice.repositories.r2dbc.TourTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TourTicketService {

    @Autowired
    private TourTicketRepository tourTicketRepository;

    // Lấy tất cả tour tickets với phân trang
    public Flux<TourTicketDTO> getAllTourTickets(int page, int size) {
        return tourTicketRepository.findAll()
                .map(TourTicketDTO::convertToDTO)
                .skip((long) (page - 1) * size)
                .take(size);
    }

    // Lấy tour ticket theo ID
    public Mono<TourTicketDTO> getTourTicketById(Long id) {
        return tourTicketRepository.findById(id)
                .map(TourTicketDTO::convertToDTO);
    }

    // Tạo mới tour ticket
    public Mono<TourTicketDTO> createTourTicket(TourTicketDTO tourTicketDTO) {
        return Mono.just(tourTicketDTO)
                .map(TourTicketDTO::convertToEntity)
                .flatMap(tourTicketRepository::save)
                .map(TourTicketDTO::convertToDTO);
    }

    // Cập nhật tour ticket theo ID
    public Mono<TourTicketDTO> updateTourTicket(Long id, TourTicketDTO updatedTicketDTO) {
        return tourTicketRepository.findById(id)
                .flatMap(existingTicket -> {
                    TourTicket updatedTicket = TourTicketDTO.convertToEntity(updatedTicketDTO);
                    updatedTicket.setTicketId(existingTicket.getTicketId());
                    return tourTicketRepository.save(updatedTicket);
                })
                .map(TourTicketDTO::convertToDTO);
    }

    // Xóa tour ticket theo ID
    public Mono<Void> deleteTourTicket(Long id) {
        return tourTicketRepository.deleteById(id);
    }

    // Lấy tất cả tour tickets theo tourId với ngày khởi hành trong tương lai
    public Flux<TourTicketDTO> getFutureTourTicketsByTourId(Long tourId) {
        return tourTicketRepository.findTourTicketsByTourId(tourId)
                .map(TourTicketDTO::convertToDTO);
    }

    // Lấy tour ticket gần với ngày hiện tại nhất
    public Mono<TourTicketDTO> getClosestTourTicketByTourId(Long tourId) {
        return tourTicketRepository.findClosestTourTicketByTourId(tourId)
                .map(TourTicketDTO::convertToDTO)
                .switchIfEmpty(Mono.error(new RuntimeException("No tickets available for the selected tour.")));
    }
}
