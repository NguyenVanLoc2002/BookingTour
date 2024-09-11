package com.fit.tourservice.repositoires;

import com.fit.tourservice.models.TourNote;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface TourNoteRepository extends ReactiveCrudRepository<TourNote, Long> {
}
