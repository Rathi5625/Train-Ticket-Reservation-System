package com.trainreservation.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
/**
 * @param id
 * @param bookingReference
 * @param userId
 * @param userEmail
 * @param userName
 * @param train
 * @param numberOfSeats
 * @param totalFare
 * @param status
 * @param paymentStatus
 * @param paymentMethod
 * @param transactionId
 * @param passengers
 * @param createdAt
 * @param updatedAt
 * @param cancelledAt
 */
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
    /**
     *
     */
    private String transactionId;
    public BookingDTO(String transactionId) {
        this.transactionId = transactionId;
    }
    private List<PassengerDTO> passengers;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime cancelledAt;
}
