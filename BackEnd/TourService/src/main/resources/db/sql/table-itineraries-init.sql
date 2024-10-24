-- Thay đổi kiểu dữ liệu của các cột title và description thành utf8mb4
ALTER TABLE itineraries
    MODIFY title VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    MODIFY description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


-- Thêm dữ liệu vào bảng itineraries
INSERT INTO itineraries (tour_id, day_number, title, description, temperature, weather_condition)
VALUES
    (1, 1, 'Day 1: Start your journey', 'Visit the city center and enjoy local cuisine', 28.5, 1),
    (1, 2, 'Day 2: Explore the mountains', 'Hiking through beautiful landscapes', 22.0, 2),
    (2, 1, 'Day 1: Arrive at the resort', 'Relax at the beach', 30.0, 3),
    (2, 2, 'Day 2: Water sports', 'Enjoy windsurfing and jet skiing', 29.0, 4),
    (3, 1, 'Day 1: Safari adventure', 'Experience wildlife in their natural habitat', 33.0, 2),
    (3, 2, 'Day 2: Jungle exploration', 'Discover exotic flora and fauna', 31.0, 1),
    (4, 1, 'Day 1: City tour', 'Visit historical landmarks', 25.0, 3),
    (4, 2, 'Day 2: Museum visit', 'Explore cultural history', 26.0, 3),
    (5, 1, 'Day 1: Snow adventure', 'Skiing in the mountains', -5.0, 2),
    (5, 2, 'Day 2: Hot springs', 'Relax in natural hot springs', 2.0, 5);
