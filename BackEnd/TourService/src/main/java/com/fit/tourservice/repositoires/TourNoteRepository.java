package com.fit.tourservice.repositoires;

import com.fit.tourservice.models.TourNote;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface TourNoteRepository extends ReactiveCrudRepository<TourNote, Long> {

    Flux<TourNote> findTourNotesByTourId(Long tourId);

}
