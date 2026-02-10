package com.trainreservation.service;

import com.trainreservation.dto.BookingDTO;
import com.trainreservation.dto.BookingRequest;
import com.trainreservation.dto.PassengerDTO;
import com.trainreservation.dto.TrainDTO;
import com.trainreservation.model.Booking;
import com.trainreservation.model.Passenger;
import com.trainreservation.model.Train;
import com.trainreservation.model.User;
import com.trainreservation.repository.BookingRepository;
import com.trainreservation.repository.TrainRepository;
import com.trainreservation.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private TrainRepository trainRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TrainService trainService;

    public List<BookingDTO> getUserBookings() {
        User user = getCurrentUser();
        List<Booking> bookings = bookingRepository.findByUserIdOrderByCreatedAtDesc(user.getId());
        return bookings.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public BookingDTO getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));

        User user = getCurrentUser();
        if (!booking.getUser().getId().equals(user.getId()) && !user.getRole().equals(User.Role.ADMIN)) {
            throw new RuntimeException("Unauthorized access to booking");
        }

        return convertToDTO(booking);
    }

    @Transactional
    public BookingDTO createBooking(BookingRequest request) {
        User user = getCurrentUser();

        Train train = trainRepository.findById(request.getTrainId())
                .orElseThrow(() -> new RuntimeException("Train not found"));

        if (train.getAvailableSeats() < request.getNumberOfSeats()) {
            throw new RuntimeException("Not enough seats available");
        }

        // Generate booking reference
        String bookingReference = "BK" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        // Calculate total fare
        double totalFare = train.getFarePerSeat() * request.getNumberOfSeats();

        // Create booking
        final Booking bookingToSave = Booking.builder()
                .bookingReference(bookingReference)
                .user(user)
                .train(train)
                .numberOfSeats(request.getNumberOfSeats())
                .totalFare(totalFare)
                .status(Booking.BookingStatus.CONFIRMED)
                .paymentStatus(Booking.PaymentStatus.COMPLETED)
                .paymentMethod(request.getPaymentMethod())
                .transactionId("TXN" + UUID.randomUUID().toString().substring(0, 10).toUpperCase())
                .build();

        // Add passengers
        List<Passenger> passengers = request.getPassengers().stream()
                .map(passengerDTO -> {
                    Passenger passenger = Passenger.builder()
                            .booking(bookingToSave)
                            .firstName(passengerDTO.getFirstName())
                            .lastName(passengerDTO.getLastName())
                            .age(passengerDTO.getAge())
                            .gender(Passenger.Gender.valueOf(passengerDTO.getGender().toUpperCase()))
                            .seatNumber(generateSeatNumber())
                            .idProofType(passengerDTO.getIdProofType())
                            .idProofNumber(passengerDTO.getIdProofNumber())
                            .build();
                    return passenger;
                })
                .collect(Collectors.toList());

        bookingToSave.setPassengers(passengers);

        // Update available seats
        train.setAvailableSeats(train.getAvailableSeats() - request.getNumberOfSeats());
        trainRepository.save(train);

        Booking savedBooking = bookingRepository.save(bookingToSave);
        return convertToDTO(savedBooking);
    }

    @Transactional
    public BookingDTO cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        User user = getCurrentUser();
        if (!booking.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Unauthorized to cancel this booking");
        }

        if (booking.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new RuntimeException("Booking is already cancelled");
        }

        booking.setStatus(Booking.BookingStatus.CANCELLED);
        booking.setPaymentStatus(Booking.PaymentStatus.REFUNDED);
        booking.setCancelledAt(LocalDateTime.now());

        // Restore available seats
        Train train = booking.getTrain();
        train.setAvailableSeats(train.getAvailableSeats() + booking.getNumberOfSeats());
        trainRepository.save(train);

        booking = bookingRepository.save(booking);
        return convertToDTO(booking);
    }

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private String generateSeatNumber() {
        // Simple seat number generation - can be enhanced
        return String.valueOf((int) (Math.random() * 100) + 1);
    }

    private BookingDTO convertToDTO(Booking booking) {
        TrainDTO trainDTO = trainService.getTrainById(booking.getTrain().getId());

        List<PassengerDTO> passengerDTOs = booking.getPassengers().stream()
                .map(passenger -> PassengerDTO.builder()
                        .id(passenger.getId())
                        .firstName(passenger.getFirstName())
                        .lastName(passenger.getLastName())
                        .age(passenger.getAge())
                        .gender(passenger.getGender().name())
                        .seatNumber(passenger.getSeatNumber())
                        .idProofType(passenger.getIdProofType())
                        .idProofNumber(passenger.getIdProofNumber())
                        .build())
                .collect(Collectors.toList());

        return BookingDTO.builder()
                .id(booking.getId())
                .bookingReference(booking.getBookingReference())
                .userId(booking.getUser().getId())
                .userEmail(booking.getUser().getEmail())
                .userName(booking.getUser().getFirstName() + " " + booking.getUser().getLastName())
                .train(trainDTO)
                .numberOfSeats(booking.getNumberOfSeats())
                .totalFare(booking.getTotalFare())
                .status(booking.getStatus().name())
                .paymentStatus(booking.getPaymentStatus().name())
                .paymentMethod(booking.getPaymentMethod())
                .transactionId(booking.getTransactionId())
                .passengers(passengerDTOs)
                .createdAt(booking.getCreatedAt())
                .updatedAt(booking.getUpdatedAt())
                .cancelledAt(booking.getCancelledAt())
                .build();
    }
}
