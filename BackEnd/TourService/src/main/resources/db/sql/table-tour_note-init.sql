ALTER TABLE tour_note
    MODIFY price_detail_of_children TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    MODIFY regulation TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    MODIFY notes TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
INSERT INTO `tour_note` (`note_id`, `tour_id`, `price_detail_of_children`, `regulation`, `notes`) VALUES
    (1, 4, 'Giá cho trẻ em dưới 12 tuổi là 50% giá người lớn.', 'Vui lòng có mặt trước 30 phút so với giờ khởi hành.', 'Chúng tôi cung cấp bữa ăn trưa và nước uống trong suốt chuyến đi. 1');
