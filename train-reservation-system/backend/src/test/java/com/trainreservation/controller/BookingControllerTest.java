package com.trainreservation.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.trainreservation.dto.BookingDTO;
import com.trainreservation.dto.BookingRequest;
import com.trainreservation.dto.PassengerDTO;
import com.trainreservation.service.BookingService;
import com.trainreservation.security.JwtAuthenticationFilter;
import com.trainreservation.security.JwtTokenProvider;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(BookingController.class)
@AutoConfigureMockMvc(addFilters = false)
public class BookingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookingService bookingService;

    @MockBean
    private JwtTokenProvider jwtTokenProvider;

    @MockBean
    private UserDetailsService userDetailsService;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testCreateBooking() throws Exception {
        PassengerDTO passenger = PassengerDTO.builder()
                .firstName("John")
                .lastName("Doe")
                .age(30)
                .gender("Male")
                .build();

        BookingRequest request = BookingRequest.builder()
                .trainId(1L)
                .numberOfSeats(1)
                .passengers(Collections.singletonList(passenger))
                .paymentMethod("CARD")
                .build();

        BookingDTO response = BookingDTO.builder()
                .id(1L)
                .bookingReference("REF123")
                .status("CONFIRMED")
                .build();

        when(bookingService.createBooking(any(BookingRequest.class))).thenReturn(response);

        mockMvc.perform(post("/api/bookings")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.bookingReference").value("REF123"));
    }
}
