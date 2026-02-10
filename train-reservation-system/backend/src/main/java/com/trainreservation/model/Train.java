package com.trainreservation.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "trains")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Train {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 20)
    private String trainNumber;

    @Column(nullable = false, length = 200)
    private String trainName;

    @Column(nullable = false, length = 100)
    private String source;

    @Column(nullable = false, length = 100)
    private String destination;

    @Column(nullable = false)
    private LocalDateTime departureTime;

    @Column(nullable = false)
    private LocalDateTime arrivalTime;

    @Column(nullable = false)
    private Integer totalSeats;

    @Column(nullable = false)
    private Integer availableSeats;

    @Column(nullable = false)
    private Double farePerSeat;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TrainClass trainClass;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private TrainStatus status = TrainStatus.SCHEDULED;

    @OneToMany(mappedBy = "train", cascade = CascadeType.ALL)
    @Builder.Default
    private Set<Booking> bookings = new HashSet<>();

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    public enum TrainClass {
        SLEEPER,
        AC_3_TIER,
        AC_2_TIER,
        AC_1_TIER,
        FIRST_CLASS
    }

    public enum TrainStatus {
        SCHEDULED,
        RUNNING,
        DELAYED,
        CANCELLED,
        COMPLETED
    }
}
