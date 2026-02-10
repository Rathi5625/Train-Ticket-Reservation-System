package com.trainreservation.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO {
    private Long id;
    private String bookingReference;
    private Long userId;
    private String userEmail;
    private String userName;
    private TrainDTO train;
    private Integer numberOfSeats;
    private Double totalFare;
    private String status;
    private String paymentStatus;
    private String paymentMethod;
    private String transactionId;
    private List<PassengerDTO> passengers;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime cancelledAt;
}
