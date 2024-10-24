package com.fit.tourservice.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "activity_itineraries")
public class Activity {
    @Id
    private Long activityId;
    private Long itinerId;
    private String time;
    private String activityDescription;
    private String place;
}
