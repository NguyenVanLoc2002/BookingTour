package com.fit.tourservice.services;

import com.fit.tourservice.dtos.response.ActivityDTO;
import com.fit.tourservice.models.Activity;
import com.fit.tourservice.repositories.r2dbc.ActivityRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@Slf4j
public class ActivityService {
    @Autowired
    private ActivityRepository activityRepository;

    public Mono<ActivityDTO> addActivity(ActivityDTO activityDTO) {
        return Mono.just(activityDTO)
                .map(ActivityDTO::convertToEntity)
                .flatMap(activity -> activityRepository.save(activity))
                .map(ActivityDTO::convertToDTO);
    }

    public Mono<Void> deleteActivity(Long activityId) {
        return activityRepository.findById(activityId)
                .flatMap(activity -> activityRepository.delete(activity));
    }

    public Mono<ActivityDTO> updateActivity(ActivityDTO activityDTO, Long activityId) {
        return activityRepository.findById(activityId)
                .flatMap(activity -> {
                    Activity activityNew = ActivityDTO.convertToEntity(activityDTO);
                    activityNew.setActivityId(activity.getActivityId());
                    return activityRepository.save(activityNew);
                })
                .map(ActivityDTO::convertToDTO);
    }

    // Lấy tất cả hoạt động có phân trang
    public Flux<ActivityDTO> getAll(int page, int size) {
        return activityRepository.findAll()
                .map(ActivityDTO::convertToDTO)
                .skip((long) (page - 1) * size)
                .take(size);
    }

    public Flux<ActivityDTO> getActivitiesByItineraryId(Long itinerId) {
        return activityRepository.findActivitiesByItinerId(itinerId)
                .map(ActivityDTO::convertToDTO);
    }
}

