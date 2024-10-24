package com.fit.tourservice.dtos.response;

import com.fit.tourservice.models.Activity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ActivityDTO {
    private Long activityId;
    private Long itinerId;
    private String time;
    private String activityDescription;
    private String place;

    // Phương thức chuyển từ Entity sang DTO
    public static ActivityDTO convertToDTO(Activity activity) {
        if (activity == null) {
            return null;
        }
        return new ActivityDTO(
                activity.getActivityId(),
                activity.getItinerId(),
                activity.getTime(),
                activity.getActivityDescription(),
                activity.getPlace()
        );
    }

    // Phương thức chuyển từ DTO sang Entity
    public static Activity convertToEntity(ActivityDTO activityDTO) {
        if (activityDTO == null) {
            return null;
        }
        Activity activity = new Activity();
        activity.setActivityId(activityDTO.getActivityId());
        activity.setItinerId(activityDTO.getItinerId());
        activity.setTime(activityDTO.getTime());
        activity.setActivityDescription(activityDTO.getActivityDescription());
        activity.setPlace(activityDTO.getPlace());
        return activity;
    }
}
