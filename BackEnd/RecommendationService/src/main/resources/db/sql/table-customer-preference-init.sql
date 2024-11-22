ALTER TABLE customer_preferences
    MODIFY departure_location VARCHAR (100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT INTO customer_preferences (
    cus_id, price, max_duration, start_date, type_tour, region, accommodation_quality, transportation_mode, departure_location
)
VALUES
    (1, 600000000, 7, '2024-09-19', 'RESORT', 'NORTH', 'FIVE_STAR_HOTEL', 'AIRPLANE', 'Hà Nội'),
    (1, 850, 5, '2024-03-15', 'CULTURE', 'NORTH', 'HOMESTAY', 'BUS', 'Hồ Chí Minh'),
    (1, 600, 4, '2024-02-20', 'ECOLOGY', 'CENTRAL', 'FOUR_STAR_HOTEL', 'TRAIN', 'Đà Nẵng'),
    (2, 2000, 10, '2024-05-01', 'ECOLOGY', 'SOUTH', 'RESORT', 'PRIVATE_CAR', 'Hải Phòng'),
    (2, 750, 6, '2024-06-18', 'ENTERTAINMENT', 'CENTRAL', 'THREE_STAR_HOTEL', 'BUS', 'Nha Trang'),
    (2, 1100, 8, '2024-07-25', 'DISCOVER', 'WEST', 'FIVE_STAR_HOTEL', 'PRIVATE_CAR', 'Phú Quốc'),
    (3, 950, 5, '2024-04-10', 'SPORT', 'NORTH', 'RESORT', 'AIRPLANE', 'Bình Dương'),
    (3, 1800, 9, '2024-08-05', 'ENTERTAINMENT', 'SOUTH', 'FOUR_STAR_HOTEL', 'TRAIN', 'Hạ Long'),
    (3, 650, 4, '2024-09-12', 'VENTURE', 'CENTRAL', 'THREE_STAR_HOTEL', 'PRIVATE_CAR', 'Cần Thơ'),
    (3, 1550, 7, '2024-10-22', 'RESORT', 'MOUNTAIN', 'FIVE_STAR_HOTEL', 'BUS', 'Huế');
