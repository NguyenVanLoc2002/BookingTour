package com.fit.recommendationservice.builder;

import com.fit.recommendationservice.dtos.response.CustomerInteractionDTO;
import com.fit.recommendationservice.enums.InteractionType;
import com.fit.recommendationservice.repositories.CustomerInteractionRepository;
import org.apache.mahout.cf.taste.impl.common.FastByIDMap;
import org.apache.mahout.cf.taste.impl.model.GenericDataModel;
import org.apache.mahout.cf.taste.impl.model.GenericPreference;
import org.apache.mahout.cf.taste.impl.model.GenericUserPreferenceArray;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.model.Preference;
import org.apache.mahout.cf.taste.model.PreferenceArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MahoutDataModelBuilder {
    @Autowired
    private CustomerInteractionRepository customerInteractionRepository;

    public DataModel buildDataModel() {
        List<CustomerInteractionDTO> customerInteractionDTOList = customerInteractionRepository.findAll()
                .map(CustomerInteractionDTO::convertToDTO)
                .collectList()
                .block();

        FastByIDMap<PreferenceArray> userPreferences = new FastByIDMap<>();//lưu trữ các ánh xạ giữa các ID và đối tượng PreferenceArray
        customerInteractionDTOList.stream()
                .collect(Collectors.groupingBy(CustomerInteractionDTO::getCusId))
                .forEach((cusId, customerInteractionDTOS) -> {
                    List<Preference> preferences = customerInteractionDTOS.stream()
                            .map(i -> new GenericPreference(i.getCusId(), i.getTourId(), calculateScore(i)))
                            .collect(Collectors.toList());

                    PreferenceArray preferenceArray = new GenericUserPreferenceArray(preferences);
                    userPreferences.put(cusId, preferenceArray);
                });
        return new GenericDataModel(userPreferences);
    }

    private float calculateScore(CustomerInteractionDTO customerInteractionDTO) {
        InteractionType interactionType = InteractionType.fromValue(customerInteractionDTO.getInteractionType().getValue());

        switch (interactionType) {
            case LIKE:
                return 1.0f;
            case VIEW:
                return 0.5f;
            case BOOK:
                return 2.0f;
            case SAVED:
                return 1.5f;
            case REVIEW:
                return 2.5f;
            case SEARCH:
            case SHARE:
            case FILTER:
            case INQUIRY:
                return 0.8f;
            default:
                return 0.0f;
        }
    }
}