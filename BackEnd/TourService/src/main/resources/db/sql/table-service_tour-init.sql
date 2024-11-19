ALTER TABLE tour_service
    MODIFY included_service TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    MODIFY excluded_service TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
INSERT INTO `tour_service` (`service_id`, `tour_id`, `included_service`, `excluded_service`) VALUES
    (2, 2, 'Hướng dẫn viên, bữa sáng, xe đưa đón', 'Bảo hiểm, chi phí cá nhân');