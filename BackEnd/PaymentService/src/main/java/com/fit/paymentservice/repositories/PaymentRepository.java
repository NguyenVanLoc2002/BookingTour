package com.fit.paymentservice.repositories;

import com.fit.paymentservice.models.Payment;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface PaymentRepository extends ReactiveCrudRepository<Payment, String> {
}
