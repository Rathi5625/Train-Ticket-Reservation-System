package com.trainreservation.service;

import com.trainreservation.dto.TrainDTO;
import com.trainreservation.dto.TrainSearchRequest;
import com.trainreservation.model.Train;
import com.trainreservation.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TrainService {

    @Autowired
    private TrainRepository trainRepository;

    public List<TrainDTO> getAllTrains() {
        return trainRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public TrainDTO getTrainById(Long id) {
        Train train = trainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Train not found with id: " + id));
        return convertToDTO(train);
    }

    public List<TrainDTO> searchTrains(TrainSearchRequest request) {
        LocalDateTime startOfDay = request.getDate().atStartOfDay();
        LocalDateTime endOfDay = request.getDate().atTime(23, 59, 59);

        List<Train> trains = trainRepository.findBySourceAndDestinationAndDepartureTimeBetween(
                request.getSource(),
                request.getDestination(),
                startOfDay,
                endOfDay);

        return trains.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public TrainDTO createTrain(TrainDTO trainDTO) {
        if (trainRepository.existsByTrainNumber(trainDTO.getTrainNumber())) {
            throw new RuntimeException("Train with number " + trainDTO.getTrainNumber() + " already exists");
        }

        Train train = Train.builder()
                .trainNumber(trainDTO.getTrainNumber())
                .trainName(trainDTO.getTrainName())
                .source(trainDTO.getSource())
                .destination(trainDTO.getDestination())
                .departureTime(trainDTO.getDepartureTime())
                .arrivalTime(trainDTO.getArrivalTime())
                .totalSeats(trainDTO.getTotalSeats())
                .availableSeats(trainDTO.getTotalSeats())
                .farePerSeat(trainDTO.getFarePerSeat())
                .trainClass(Train.TrainClass.valueOf(trainDTO.getTrainClass()))
                .status(Train.TrainStatus.SCHEDULED)
                .build();

        train = trainRepository.save(train);
        return convertToDTO(train);
    }

    @Transactional
    public TrainDTO updateTrain(Long id, TrainDTO trainDTO) {
        Train train = trainRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Train not found with id: " + id));

        train.setTrainName(trainDTO.getTrainName());
        train.setSource(trainDTO.getSource());
        train.setDestination(trainDTO.getDestination());
        train.setDepartureTime(trainDTO.getDepartureTime());
        train.setArrivalTime(trainDTO.getArrivalTime());
        train.setTotalSeats(trainDTO.getTotalSeats());
        train.setFarePerSeat(trainDTO.getFarePerSeat());
        train.setTrainClass(Train.TrainClass.valueOf(trainDTO.getTrainClass()));

        if (trainDTO.getStatus() != null) {
            train.setStatus(Train.TrainStatus.valueOf(trainDTO.getStatus()));
        }

        train = trainRepository.save(train);
        return convertToDTO(train);
    }

    @Transactional
    public void deleteTrain(Long id) {
        if (!trainRepository.existsById(id)) {
            throw new RuntimeException("Train not found with id: " + id);
        }
        trainRepository.deleteById(id);
    }

    private TrainDTO convertToDTO(Train train) {
        return TrainDTO.builder()
                .id(train.getId())
                .trainNumber(train.getTrainNumber())
                .trainName(train.getTrainName())
                .source(train.getSource())
                .destination(train.getDestination())
                .departureTime(train.getDepartureTime())
                .arrivalTime(train.getArrivalTime())
                .totalSeats(train.getTotalSeats())
                .availableSeats(train.getAvailableSeats())
                .farePerSeat(train.getFarePerSeat())
                .trainClass(train.getTrainClass().name())
                .status(train.getStatus().name())
                .build();
    }
}
