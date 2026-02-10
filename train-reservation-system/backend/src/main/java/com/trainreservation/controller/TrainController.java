package com.trainreservation.controller;

import com.trainreservation.dto.TrainDTO;
import com.trainreservation.dto.TrainSearchRequest;
import com.trainreservation.service.TrainService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/trains")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TrainController {

    @Autowired
    private TrainService trainService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<TrainDTO>> getAllTrains() {
        List<TrainDTO> trains = trainService.getAllTrains();
        return ResponseEntity.ok(trains);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TrainDTO> getTrainById(@PathVariable Long id) {
        TrainDTO train = trainService.getTrainById(id);
        return ResponseEntity.ok(train);
    }

    @GetMapping("/search")
    public ResponseEntity<List<TrainDTO>> searchTrains(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        TrainSearchRequest request = TrainSearchRequest.builder()
                .source(source)
                .destination(destination)
                .date(date)
                .build();

        List<TrainDTO> trains = trainService.searchTrains(request);
        return ResponseEntity.ok(trains);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TrainDTO> createTrain(@Valid @RequestBody TrainDTO trainDTO) {
        TrainDTO createdTrain = trainService.createTrain(trainDTO);
        return ResponseEntity.ok(createdTrain);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<TrainDTO> updateTrain(@PathVariable Long id, @Valid @RequestBody TrainDTO trainDTO) {
        TrainDTO updatedTrain = trainService.updateTrain(id, trainDTO);
        return ResponseEntity.ok(updatedTrain);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteTrain(@PathVariable Long id) {
        trainService.deleteTrain(id);
        return ResponseEntity.noContent().build();
    }
}
