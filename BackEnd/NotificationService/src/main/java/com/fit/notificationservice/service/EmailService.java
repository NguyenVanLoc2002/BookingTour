package com.fit.notificationservice.service;

import com.fit.commonservice.utils.JwtUtils;
import com.fit.notificationservice.dtos.reponse.CustomerResponse;
import com.fit.notificationservice.dtos.request.BookingRequest;
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

    @Autowired
    private JwtUtils jwtUtils;

    @Value("${spring.mail.username}")
    private String sender;

    public Mono<Void> sendEmailAuthBookingTour(BookingRequest bookingRequest) {
        return Mono.fromCallable(() -> {
                    String htmlContent = loadVerifyBookingTourTemplate();
                    htmlContent = htmlContent.replace("${username}", bookingRequest.getUserName());
                    htmlContent = htmlContent.replace("${email}", bookingRequest.getEmail());
                    htmlContent = htmlContent.replace("${verificationLink}", createVerificationLinkBookingTour(bookingRequest.getBookingId()));

                    // Tạo đối tượng Email và gửi
                    Email emailDetails = new Email(bookingRequest.getEmail(), htmlContent, "Booking Confirmation", "");
                    sendVerifyEmail(emailDetails);
                    return true;
                })
                .subscribeOn(Schedulers.boundedElastic()) // để thực hiện các tác vụ blocking trên các thread riêng biệt, tránh chặn các thread chính.
                .then();
    }

    public Mono<Void> sendEmailVerifyAccount(CustomerResponse customerReponse) {
        return Mono.fromCallable(() -> {
                    String htmlContent = loadVerifyAccountTemplate();
                    htmlContent = htmlContent.replace("${username}", customerReponse.getName());
                    htmlContent = htmlContent.replace("${email}", customerReponse.getEmail());
                    htmlContent = htmlContent.replace("${verificationLink}", createVerificationLinkAccount(customerReponse.getEmail()));

                    // Tạo đối tượng Email và gửi
                    Email emailDetails = new Email(customerReponse.getEmail(), htmlContent, "Booking Confirmation", "");
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

    public String loadVerifyBookingTourTemplate() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:templates/NotificationVerifyBookingTour.html");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    public String loadVerifyAccountTemplate() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:templates/NotificationVerifyAccount.html");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    public String createVerificationLinkBookingTour(Long token) {
//        String token = createToken(bookingRequest);
        return "http://localhost:9008/api/v1/notification/verify-booking-tour?bookingId=" + token;
    }

    public String createVerificationLinkAccount(String email) {
        String token = jwtUtils.generateToken(email);
        log.info("token: {}", token);
        return "http://localhost:9002/api/v1/auth/verify-account?token=" + token;
    }




}
