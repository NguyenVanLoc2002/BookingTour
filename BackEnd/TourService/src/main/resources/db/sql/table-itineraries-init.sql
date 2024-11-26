-- Thay đổi kiểu dữ liệu của các cột title và description thành utf8mb4
ALTER TABLE itineraries
    MODIFY title VARCHAR (255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    MODIFY description TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    MODIFY activity TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;;


-- Thêm dữ liệu vào bảng itineraries với cột activity là HTML
INSERT INTO `itineraries` (`itiner_id`, `tour_id`, `day_number`, `title`, `description`, `temperature`,
                           `weather_condition`, `activity`)
VALUES
    (1, 1, 1, 'Day 1: Start your journey', 'Visit the city center and enjoy local cuisine', 28.5, 'SUNNY',
     '<ul><li>Visit city center</li><li>Enjoy local food</li></ul>'),
    (2, 1, 2, 'Day 2: Explore the mountains', 'Hiking through beautiful landscapes', 22, 'CLOUDY',
     '<ul><li>Hike through landscapes</li><li>Capture photos</li></ul>'),
    (3, 2, 1, 'Day 1: Arrive at the resort', 'Relax at the beach', 30, 'SUNNY',
     '<ul><li>Swim in the sea</li><li>Enjoy sunbathing</li></ul>'),
    (4, 2, 2, 'Day 2: Water sports', 'Enjoy windsurfing and jet skiing', 29, 'WINDY',
     '<ul><li>Windsurfing</li><li>Jet skiing</li></ul>'),
    (5, 3, 1, 'Day 1: Safari adventure', 'Experience wildlife in their natural habitat', 33, 'SUNNY',
     '<ul><li>Safari ride</li><li>Animal photography</li></ul>'),
    (6, 3, 2, 'Day 2: Jungle exploration', 'Discover exotic flora and fauna', 31, 'CLOUDY',
     '<ul><li>Jungle trek</li><li>Bird watching</li></ul>'),
    (7, 4, 1, 'Day 1: City tour', 'Visit historical landmarks', 25, 'RAINY',
     '<ul><li>Visit landmarks</li><li>Try local coffee</li></ul>'),
    (8, 4, 2, 'Day 2: Museum visit', 'Explore cultural history', 26, 'RAINY',
     '<ul><li>Tour museum</li><li>Attend workshop</li></ul>'),
    (9, 5, 1, 'Day 1: Snow adventure', 'Skiing in the mountains', -5, 'SNOWY',
     '<ul><li>Skiing</li><li>Build a snowman</li></ul>'),
    (10, 5, 2, 'Day 2: Hot springs', 'Relax in natural hot springs', 2, 'SUNNY',
     '<ul><li>Soak in hot springs</li><li>Enjoy spa</li></ul>');
