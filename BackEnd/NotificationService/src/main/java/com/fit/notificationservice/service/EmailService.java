package com.fit.notificationservice.service;

import com.fit.notificationservice.dtos.BookingRequest;
import com.fit.notificationservice.entity.Email;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private ResourceLoader resourceLoader;

    @Value("${spring.mail.username}")
    private String sender;

    public Mono<Void> sendEmailAuthBookingTour(BookingRequest bookingRequest) {
        return Mono.fromCallable(() -> {
                    String htmlContent = loadEmailTemplate();
                    htmlContent = htmlContent.replace("${username}", bookingRequest.getUserName());
                    htmlContent = htmlContent.replace("${email}", bookingRequest.getEmail());
                    htmlContent = htmlContent.replace("${verificationLink}", createVerificationLink(bookingRequest.getBookingId()));

                    // Tạo đối tượng Email và gửi
                    Email emailDetails = new Email(bookingRequest.getEmail(), htmlContent, "Booking Confirmation", "");
                    sendVerifyEmail(emailDetails);
                    return true;
                })
                .subscribeOn(Schedulers.boundedElastic()) // để thực hiện các tác vụ blocking trên các thread riêng biệt, tránh chặn các thread chính.
                .then();
    }

    public void sendVerifyEmail(Email email) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setFrom(sender);
            helper.setTo(email.getRecipient());
            helper.setText(email.getMsgBody(), true);
            helper.setSubject(email.getSubject());

            mailSender.send(mimeMessage);
        } catch (Exception e) {
            log.error("Error sending email: {}", e.getMessage());
            throw new RuntimeException("Error sending email", e); // Ném ra lỗi để có thể xử lý ở nơi gọi
        }
    }

    public String loadEmailTemplate() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:templates/NotificationEmail.html");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    public String createVerificationLink(Long token) {
//        String token = createToken(bookingRequest);
        return "http://localhost:9008/api/v1/notification/verify-booking-tour?bookingId=" + token;
    }

}
