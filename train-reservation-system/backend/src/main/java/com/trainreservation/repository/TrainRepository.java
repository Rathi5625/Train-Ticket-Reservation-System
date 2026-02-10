package com.trainreservation.repository;

import com.trainreservation.model.Train;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TrainRepository extends JpaRepository<Train, Long> {

        Optional<Train> findByTrainNumber(String trainNumber);

        boolean existsByTrainNumber(String trainNumber);

        List<Train> findBySourceAndDestinationAndDepartureTimeBetween(
                        String source,
                        String destination,
                        LocalDateTime startTime,
                        LocalDateTime endTime);

        @Query("SELECT t FROM Train t WHERE " +
                        "LOWER(t.source) LIKE LOWER(CONCAT('%', :source, '%')) AND " +
                        "LOWER(t.destination) LIKE LOWER(CONCAT('%', :destination, '%')) AND " +
                        "t.departureTime >= :date AND " +
                        "t.status = 'SCHEDULED' AND " +
                        "t.availableSeats > 0")
        List<Train> searchTrains(@Param("source") String source,
                        @Param("destination") String destination,
                        @Param("date") LocalDateTime date);

        List<Train> findByStatus(Train.TrainStatus status);
}
