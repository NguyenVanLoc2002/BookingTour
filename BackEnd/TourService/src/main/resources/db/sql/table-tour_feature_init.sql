-- Thêm dữ liệu vào bảng tour_feature với giá trị Enum
INSERT INTO tour_feature (feature_id, tour_id, type_tour, region, accommodation_quality, transportation_mode, start_date, end_date)
VALUES
    (1, 1, 'RESORT', 'NORTH', 'FIVE_STAR_HOTEL', 'AIRPLANE', '2024-10-01', '2024-10-04'),
    (2, 2, 'DISCOVER', 'NORTH', 'FOUR_STAR_HOTEL', 'BUS', '2024-11-05', '2024-11-09'),
    (3, 3, 'CULTURE', 'CENTRAL', 'RESORT', 'AIRPLANE', '2024-12-01', '2024-12-06'),
    (4, 4, 'DISCOVER', 'SOUTH', 'THREE_STAR_HOTEL', 'PRIVATE_CAR', '2024-09-15', '2024-09-19'),
    (5, 5, 'RESORT', 'SOUTH', 'RESORT', 'AIRPLANE', '2024-08-10', '2024-08-13'),
    (6, 6, 'CULTURE', 'CENTRAL', 'FOUR_STAR_HOTEL', 'TRAIN', '2024-07-20', '2024-07-22'),
    (7, 7, 'SPORT', 'SOUTH', 'HOMESTAY', 'BUS', '2024-06-01', '2024-06-03'),
    (8, 8, 'DISCOVER', 'CENTRAL', 'THREE_STAR_HOTEL', 'PRIVATE_CAR', '2024-05-12', '2024-05-17'),
    (9, 9, 'VENTURE', 'SOUTH', 'FOUR_STAR_HOTEL', 'PRIVATE_CAR', '2024-04-25', '2024-04-29'),
    (10, 10, 'RESORT', 'CENTRAL_HIGHLANDS', 'RESORT', 'AIRPLANE', '2024-03-01', '2024-03-04');
