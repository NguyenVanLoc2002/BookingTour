package com.fit.tourservice.services;

import com.fit.commonservice.utils.Constant;
import com.fit.tourservice.dtos.request.TourFilterCriteriaRequest;
import com.fit.tourservice.dtos.TourDTO;
import com.fit.tourservice.dtos.TourFeatureDTO;
import com.fit.tourservice.dtos.TourTicketDTO;
import com.fit.tourservice.enums.Region;
import com.fit.tourservice.events.EventProducer;
import com.fit.tourservice.models.Tour;
import com.fit.tourservice.models.TourFeature;
import com.fit.tourservice.repositories.r2dbc.TourFeatureRepository;
import com.fit.tourservice.repositories.r2dbc.TourRepository;
import com.fit.tourservice.repositories.r2dbc.TourTicketRepository;
import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.*;

@Service
@Slf4j
public class TourService {
    @Autowired
    private TourRepository tourRepository;
    @Autowired
    private TourFeatureRepository tourFeatureRepository;

    @Autowired
    private EventProducer eventProducer;
    @Qualifier("gson")
    @Autowired
    private Gson gson;
    @Autowired
    private TourTicketRepository tourTicketRepository;

    public Mono<TourDTO> addTour(TourDTO tourDTO) {
        return Mono.just(tourDTO)
                .map(TourDTO::convertToEnity)
                .flatMap(tour -> tourRepository.save(tour))
                .map(TourDTO::convertToDTO);
    }

    // Xóa Tour theo ID
    public Mono<Void> deleteTour(Long tourId) {
        return tourRepository.findById(tourId)
                .flatMap(tour -> tourRepository.delete(tour));
    }

    public Mono<TourDTO> updateTour(TourDTO tourDTO, Long tourId) {
        return tourRepository.findById(tourId)
                .flatMap(existTour -> {
                    Tour updateTour = TourDTO.convertToEnity(tourDTO);
                    updateTour.setTourId(existTour.getTourId());
                    return tourRepository.save(updateTour);
                })
                .map(TourDTO::convertToDTO);
    }

    public Flux<TourDTO> getAllTours(int page, int size) {
        return tourRepository.findAll()
                .map(TourDTO::convertToDTO)
                .skip((long) (page - 1) * size)
                .take(size);
    }

    public Flux<TourDTO> getToursByNameContainingIgnoreCase(String name, int page, int size) {
        return tourRepository.findToursByNameContainingIgnoreCase(name)
                .map(TourDTO::convertToDTO)
                .skip((long) (page - 1) * size)
                .take(size);
    }

    public Flux<TourDTO> getToursByDayBetween(LocalDate startDate, LocalDate endDate, int page, int size) {
        return tourRepository.findToursByDayBetween(startDate, endDate)
                .map(TourDTO::convertToDTO)
                .skip((long) (page - 1) * size)
                .take(size);
    }


    public Flux<TourDTO> getToursByPriceBetween(Double minPrice, Double maxPrice, int page, int size) {
        return tourRepository.findToursByPriceBetween(minPrice, maxPrice)
                .map(TourDTO::convertToDTO)
                .skip((long) (page - 1) * size)
                .take(size);
    }

    public Flux<TourDTO> getToursByTypeTour(int type, int page, int size) {
        return tourRepository.findToursByTypeTour(type)
                .map(TourDTO::convertToDTO)
                .skip((long) (page - 1) * size)
                .take(size);
    }

    //Lay DS  Tour con han va con cho trong
    public Flux<TourDTO> getAvailableTours(int page, int size) {
        return tourRepository.findAvailableTours()
                .map(TourDTO::convertToDTO)
                .skip((long) (page - 1) * size)
                .take(size);
    }

    public Flux<TourDTO> findToursByCriteria(TourFilterCriteriaRequest criteria) {
        return tourRepository.findToursByCriteria(
                criteria.getMaxCost(),
                criteria.getMaxDuration(),
                criteria.getStartDate(),
                criteria.getTypeTour(), // Chuyển đổi thành int
                criteria.getAccommodationQuality(), // Chuyển đổi thành int
                criteria.getRegion(), // Chuyển đổi thành int
                criteria.getTransportationMode() // Chuyển đổi thành int
        );
    }


    //Gửi yêu cầu lay preference den RecommendationService
    public Mono<Void> requestPreferences(Long customerId) {
        // Tạo thông điệp yêu cầu tiêu chí từ TourService
        String requestMessage = gson.toJson(Map.of("customerId", customerId));
        // Trả về Mono<Void> để giữ cho việc gửi message bất đồng bộ
        return eventProducer.send(Constant.REQUEST_RECOMMENDATION_TOPIC, String.valueOf(customerId), requestMessage).then();
    }


    public Flux<TourDTO> findToursByIds(List<Long> tourIds) {
        return tourRepository.findByTourIdIn(tourIds)
                .map(TourDTO::convertToDTO);
    }

    public Mono<Double> calcTotalAmountTicket(Long tourId, int numberOfGuests) {
        return tourRepository.findById(tourId)
                .map(tour -> tour.getPrice() * numberOfGuests); // Tính tổng tiền trực tiếp trong luồng
    }

    public Mono<Page<TourDTO>> getTourByRegion(Region region, int offset, int size, boolean isAscending) {
        // Lấy tổng số phần tử trước
        Mono<Long> totalCount = tourFeatureRepository.countToursByRegionAndStartDateAfter(region);

        // Lấy các TourFeature với trang hiện tại
        Flux<TourFeature> tourFeatures = isAscending
                ? tourFeatureRepository.findAllByRegionAndStartDateAfter(region, size, offset)
                : tourFeatureRepository.findAllByRegionAndStartDateBefore(region, size, offset);

        return totalCount.flatMap(count -> {
            // Lấy danh sách các tour cho trang hiện tại
            return tourFeatures.concatMap(tourFeature ->
                            tourRepository.findById(tourFeature.getTourId())
                                    .flatMap(tour ->
                                            tourTicketRepository.findClosestTourTicketByTourId(tour.getTourId())
                                                    .map(TourTicketDTO::convertToDTO)
                                                    .defaultIfEmpty(new TourTicketDTO())
                                                    .map(closestTicket -> {
                                                        // Tạo DTO cho tour
                                                        TourDTO tourDTO = TourDTO.convertToDTO(tour);
                                                        tourDTO.setTourFeatureDTO(TourFeatureDTO.convertToDTO(tourFeature));
                                                        tourDTO.setDepartureDate(closestTicket.getDepartureDate());
                                                        tourDTO.setAvailableSlot(closestTicket.getAvailableSlot());
                                                        return tourDTO;
                                                    })
                                    )
                    )
                    .collectList()  // Thu thập kết quả vào Mono<List<TourDTO>>
                    .map(tourList -> {
                        if (tourList != null && !tourList.isEmpty()) {
                            // Sắp xếp theo ngày bắt đầu (startDate) theo thứ tự tăng dần hoặc giảm dần
                            if (isAscending) {
                                // Sắp xếp tăng dần
                                tourList.sort(Comparator.comparing(tourDTO ->
                                        Optional.ofNullable(tourDTO.getTourFeatureDTO())
                                                .map(TourFeatureDTO::getStartDate)
                                                .orElse(LocalDate.MAX)));
                            } else {
                                tourList.sort(Comparator.comparing((TourDTO tourDTO) ->
                                        Optional.ofNullable(tourDTO.getTourFeatureDTO())
                                                .map(TourFeatureDTO::getStartDate)
                                                .orElse(LocalDate.MAX), Comparator.reverseOrder()));
                            }
                        }

                        // Tính số trang
                        int totalPages = (int) Math.ceil((double) count / size);

                        // Trả về PageImpl
                        return new PageImpl<TourDTO>(tourList, PageRequest.of(offset / size, size), count) {
                            @Override
                            public int getTotalPages() {
                                return totalPages; // Trả về giá trị totalPages đã tính
                            }
                        };
                    });
        });
    }




    public Mono<Page<TourDTO>> findToursByRegionOrderByPrice(Region region, int offset, int size, boolean isAscending) {
        // Lấy tổng số phần tử trước
        Mono<Long> totalCount = tourFeatureRepository.countToursByRegionAndStartDateAfter(region);

        // Chọn query theo thứ tự sắp xếp
        Flux<TourFeature> tourFeatures = isAscending
                ? tourFeatureRepository.findAllByRegionAndStartDateAfterOrderByPriceAsc(region, size, offset)
                : tourFeatureRepository.findAllByRegionAndStartDateAfterOrderByPriceDesc(region, size, offset);
        return totalCount.flatMap(count ->
                tourFeatures.flatMap(tourFeature ->
                                tourRepository.findById(tourFeature.getTourId())
                                        .flatMap(tour ->
                                                tourTicketRepository.findClosestTourTicketByTourId(tour.getTourId())
                                                        .map(TourTicketDTO::convertToDTO)
                                                        .defaultIfEmpty(new TourTicketDTO())
                                                        .map(closestTicket -> {
                                                            TourDTO tourDTO = TourDTO.convertToDTO(tour);
                                                            tourDTO.setTourFeatureDTO(TourFeatureDTO.convertToDTO(tourFeature));
                                                            tourDTO.setDepartureDate(closestTicket.getDepartureDate());
                                                            tourDTO.setAvailableSlot(closestTicket.getAvailableSlot());
                                                            return tourDTO;
                                                        })
                                        )
                        )
                        .collectList()
                        .map(tourList -> {
                            // Nếu cần thiết, sắp xếp lại trong Java
                            if (isAscending) {
                                tourList.sort(Comparator.comparingDouble(TourDTO::getPrice));
                            } else {
                                tourList.sort(Comparator.comparingDouble(TourDTO::getPrice).reversed());
                            }

                            // Tính tổng số trang
                            int totalPages = (int) Math.ceil((double) count / size);

                            // Trả về PageImpl
                            return new PageImpl<TourDTO>(tourList, PageRequest.of(offset / size, size), count) {
                                @Override
                                public int getTotalPages() {
                                    return totalPages;
                                }
                            };
                        })
        );
    }


}
