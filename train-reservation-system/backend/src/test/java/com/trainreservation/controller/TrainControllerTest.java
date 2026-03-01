package com.trainreservation.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.web.servlet.MockMvc;

import com.trainreservation.dto.TrainDTO;
import com.trainreservation.dto.TrainSearchRequest;
import com.trainreservation.security.JwtAuthenticationFilter;
import com.trainreservation.security.JwtTokenProvider;
import com.trainreservation.service.TrainService;

@WebMvcTest(TrainController.class)
@AutoConfigureMockMvc(addFilters = false)
public class TrainControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private TrainService trainService;

        @MockBean
        private JwtTokenProvider jwtTokenProvider;

        @MockBean
        private UserDetailsService userDetailsService;

        @MockBean
        private JwtAuthenticationFilter jwtAuthenticationFilter;

        /**
         * @throws Exception
         */
        @Test
        public void testSearchTrains() throws Exception {
                TrainDTO train = TrainDTO.builder()
                                .id(1L)
                                .trainName("Express")
                                .source("CityA")
                                .destination("CityB")
                                .departureTime(LocalDateTime.now().plusHours(1))
                                .arrivalTime(LocalDateTime.now().plusHours(5))
                                .farePerSeat(100.0)
                                .build();

                when(trainService.searchTrains(any(TrainSearchRequest.class)))
                                .thenReturn(List.of(train));

                mockMvc.perform(get("/api/trains/search")
                                .param("source", "CityA")
                                .param("destination", "CityB")
                                .param("date", LocalDate.now().toString()))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].trainName").value("Express"))
                                .andExpect(jsonPath("$[0].source").value("CityA"));
        }

        @Test
        public void testGetTrainById() throws Exception {
                TrainDTO train = TrainDTO.builder()
                                .id(1L)
                                .trainName("Local")
                                .source("CityX")
                                .destination("CityY")
                                .build();

                when(trainService.getTrainById(1L)).thenReturn(train);

                mockMvc.perform(get("/api/trains/1"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.trainName").value("Local"));
        }
}
