ALTER TABLE customers
    MODIFY address VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

INSERT IGNORE  INTO customers(user_id, address, gender, date_of_birth, phone_number)
VALUES
    ('1',  '123 Đường ABC, Quận 1, TP.HCM', TRUE, '1990-01-01', '0123456789'),
    ('2',  '456 Đường DEF, Quận 2, TP.HCM', FALSE, '1992-02-02', '0987654321'),
    ('3',  '789 Đường GHI, Quận 3, TP.HCM', TRUE, '1994-03-03', '0112233445');
