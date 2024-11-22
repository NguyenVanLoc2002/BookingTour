ALTER TABLE review
    MODIFY content_comment TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
INSERT INTO `review` (`rew_id`, `cus_id`, `tour_id`, `rating`, `content_comment`, `review_date`)
VALUES (1, 123, 2, 5, 'Hướng dẫn viên quá ngon, còn dễ thương', '2024-10-05'),
       (3, 123, 1, 5, 'Hướng dẫn viên quá ngon', '2024-10-05');