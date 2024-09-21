package com.fit.recommendationservice.services;


import com.fit.recommendationservice.builder.MahoutDataModelBuilder;
import lombok.extern.slf4j.Slf4j;
import org.apache.mahout.cf.taste.common.TasteException;
import org.apache.mahout.cf.taste.impl.neighborhood.NearestNUserNeighborhood;
import org.apache.mahout.cf.taste.impl.recommender.GenericUserBasedRecommender;
import org.apache.mahout.cf.taste.impl.similarity.PearsonCorrelationSimilarity;
import org.apache.mahout.cf.taste.model.DataModel;
import org.apache.mahout.cf.taste.neighborhood.UserNeighborhood;
import org.apache.mahout.cf.taste.recommender.RecommendedItem;
import org.apache.mahout.cf.taste.recommender.Recommender;
import org.apache.mahout.cf.taste.similarity.UserSimilarity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
public class MahoutRecommendationService {
    @Autowired
    private MahoutDataModelBuilder mahoutDataModelBuilder;

    public  List<Long> recommendToursForUser(Long customerId) throws TasteException {
        //Build Data model
        DataModel dataModel = mahoutDataModelBuilder.buildDataModel();

        //sử dụng thuật toán tương tự Pearson Correlation. UserSimilarity tính toán
        //mức độ tương đồng giữa các người dùng dựa trên dữ liệu trong DataModel.
        UserSimilarity similarity = new PearsonCorrelationSimilarity(dataModel);
        UserNeighborhood neighborhood = new NearestNUserNeighborhood(10, similarity, dataModel);//lấy 10 người dùng gần gũi nhất (10 là số lượng người dùng lân cận), dựa trên độ tương đồng
        long[] neighbors = neighborhood.getUserNeighborhood(customerId);
        log.info("User neighbors for customer {}: {}", customerId, neighbors);

        Recommender recommender = new GenericUserBasedRecommender(dataModel, neighborhood, similarity);

        List<RecommendedItem> recommendations = recommender.recommend(customerId, 10);
        log.info("Recommendations for customer {}: {}", customerId, recommendations);

        return recommendations.stream()
                .map(RecommendedItem::getItemID)
                .collect(Collectors.toList());
    }
}
