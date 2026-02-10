package com.trainreservation.controller;

import com.trainreservation.dto.BookingDTO;
import com.trainreservation.model.User;
import com.trainreservation.repository.BookingRepository;
import com.trainreservation.repository.UserRepository;
import com.trainreservation.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*", maxAge = 3600)
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingService bookingService;

    @GetMapping("/bookings")
    public ResponseEntity<List<BookingDTO>> getAllBookings() {
        List<BookingDTO> bookings = bookingRepository.findAll().stream()
                .map(booking -> {
                    try {
                        return bookingService.getBookingById(booking.getId());
                    } catch (Exception e) {
                        return null;
                    }
                })
                .filter(booking -> booking != null)
                .collect(Collectors.toList());
        return ResponseEntity.ok(bookings);
    }

    @GetMapping("/users")
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        List<Map<String, Object>> users = userRepository.findAll().stream()
                .map(user -> {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", user.getId());
                    userMap.put("email", user.getEmail());
                    userMap.put("firstName", user.getFirstName());
                    userMap.put("lastName", user.getLastName());
                    userMap.put("phoneNumber", user.getPhoneNumber());
                    userMap.put("address", user.getAddress());
                    userMap.put("role", user.getRole().name());
                    userMap.put("enabled", user.getEnabled());
                    userMap.put("createdAt", user.getCreatedAt());
                    return userMap;
                })
                .collect(Collectors.toList());
        return ResponseEntity.ok(users);
    }

    @GetMapping("/statistics")
    public ResponseEntity<Map<String, Object>> getStatistics() {
        Map<String, Object> stats = new HashMap<>();

        long totalUsers = userRepository.count();
        long totalBookings = bookingRepository.count();
        long totalPassengers = userRepository.findAll().stream()
                .filter(user -> user.getRole() == User.Role.PASSENGER)
                .count();

        double totalRevenue = bookingRepository.findAll().stream()
                .mapToDouble(booking -> booking.getTotalFare())
                .sum();

        stats.put("totalUsers", totalUsers);
        stats.put("totalBookings", totalBookings);
        stats.put("totalPassengers", totalPassengers);
        stats.put("totalRevenue", totalRevenue);

        return ResponseEntity.ok(stats);
    }
}
