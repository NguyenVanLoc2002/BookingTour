# Sử dụng hình ảnh Rasa phiên bản cụ thể
FROM rasa/rasa:3.6.20

# Thiết lập thư mục làm việc
WORKDIR /app

# Sao chép dữ liệu huấn luyện và các tệp cần thiết vào container
COPY ./data /app/data
COPY ./actions /app/actions
COPY ./config.yml /app/config.yml
COPY ./domain.yml /app/domain.yml
COPY ./credentials.yml /app/credentials.yml
COPY requirements.txt /app/requirements.txt

# Chuyển sang người dùng root để cài đặt các phụ thuộc
USER root

# Thêm biến môi trường để tắt cảnh báo SQLAlchemy
ENV SQLALCHEMY_SILENCE_UBER_WARNING=1

# Cập nhật pip và cài đặt các phụ thuộc
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# Huấn luyện mô hình Rasa
RUN rasa train

# Mở cổng cho API Rasa
EXPOSE 5005

# Thiết lập ENTRYPOINT để chạy lệnh Rasa
ENTRYPOINT ["rasa"]

# Thêm CMD cho các tham số lệnh Rasa
CMD ["run", "--enable-api", "--cors", "*"]
