-- Thêm dữ liệu vào bảng tour_feature
INSERT INTO tour_feature (feature_id, tour_id, type_tour, region, accommodation_quality, transportation_mode, start_date, end_date)
VALUES
    (1, 1, 2, 0, 3, 0, '2024-10-01', '2024-10-04'), -- RESORT, NORTH, FIVE_STAR_HOTEL, AIRPLANE
    (2, 2, 5, 0, 2, 1, '2024-11-05', '2024-11-09'), -- DISCOVER, NORTH, FOUR_STAR_HOTEL, BUS
    (3, 3, 0, 1, 4, 0, '2024-12-01', '2024-12-06'), -- CULTURE, CENTRAL, RESORT, AIRPLANE
    (4, 4, 5, 2, 1, 3, '2024-09-15', '2024-09-19'), -- DISCOVER, SOUTH, THREE_STAR_HOTEL, PRIVATE_CAR
    (5, 5, 2, 2, 4, 0, '2024-08-10', '2024-08-13'), -- RESORT, SOUTH, RESORT, AIRPLANE
    (6, 6, 0, 1, 2, 2, '2024-07-20', '2024-07-22'), -- CULTURE, CENTRAL, FOUR_STAR_HOTEL, TRAIN
    (7, 7, 4, 2, 0, 1, '2024-06-01', '2024-06-03'), -- SPORT, SOUTH, HOMESTAY, BUS
    (8, 8, 5, 1, 1, 3, '2024-05-12', '2024-05-17'), -- DISCOVER, CENTRAL, THREE_STAR_HOTEL, PRIVATE_CAR
    (9, 9, 6, 2, 2, 3, '2024-04-25', '2024-04-29'), -- VENTURE, SOUTH, FOUR_STAR_HOTEL, PRIVATE_CAR
    (10, 10, 2, 3, 4, 0, '2024-03-01', '2024-03-04'); -- RESORT, CENTRAL_HIGHLANDS, RESORT, AIRPLANE
