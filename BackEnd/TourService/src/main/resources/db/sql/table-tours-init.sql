-- Thay đổi kiểu dữ liệu của các cột name và destination thành utf8mb4
ALTER TABLE tours
    MODIFY name VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    MODIFY destination VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    MODIFY departure_location VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- Thêm dữ liệu vào bảng tours
INSERT INTO tours (tour_id, name, day, night, destination, departure_location, available_slot, url_image, include_promotions, price)
VALUES
    (1, 'Tour du lịch Hạ Long', 3,3, 'Hạ Long', 'Hà Nội', 20, 'halong.jpg', true, 5000000),
    (2, 'Tour du lịch Sapa', 4, 3, 'Sapa', 'Hà Nội', 15, 'sapa.jpg', false, 4500000),
    (3, 'Tour du lịch Đà Nẵng', 5,4,  'Đà Nẵng', 'Hồ Chí Minh', 10, 'danang.jpg', true, 6000000),
    (4, 'Tour du lịch Nha Trang', 4, 3, 'Nha Trang', 'Hồ Chí Minh', 12, 'nhatrang.jpg', false, 5500000),
    (5, 'Tour du lịch Phú Quốc', 3,3,  'Phú Quốc', 'Hà Nội', 8, 'phuquoc.jpg', true, 7000000),
    (6, 'Tour du lịch Huế', 2, 1,'Huế', 'Hà Nội', 18, 'hue.jpg', false, 4000000),
    (7, 'Tour du lịch Cần Thơ', 3,3,  'Cần Thơ', 'Hồ Chí Minh', 14, 'cantho.jpg', true, 5000000),
    (8, 'Tour du lịch Quy Nhơn', 5, 4,'Quy Nhơn', 'Hà Nội', 9, 'quynhon.jpg', false, 6500000),
    (9, 'Tour du lịch Mũi Né', 4, 4,'Mũi Né', 'Hồ Chí Minh', 11, 'muine.jpg', true, 5500000),
    (10, 'Tour du lịch Đà Lạt', 3, 2,'Đà Lạt', 'Hồ Chí Minh', 13, 'dalat.jpg', false, 6000000);
