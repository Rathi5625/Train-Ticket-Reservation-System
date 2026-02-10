-- Auto-loaded train data for Train Reservation System
-- This file is automatically executed on application startup
-- Using DATEADD to create dates relative to current date

-- Delhi to Mumbai
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12951', 'Mumbai Rajdhani', 'Delhi', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '16:55:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '08:35:00', 100, 100, 2500.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12953', 'August Kranti Rajdhani', 'Delhi', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '17:00:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '08:45:00', 100, 100, 2400.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12137', 'Punjab Mail', 'Delhi', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '19:15:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '14:30:00', 150, 150, 800.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12009', 'Shatabdi Express', 'Delhi', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '06:15:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '22:45:00', 80, 80, 3000.00, 'AC_1_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12617', 'Mangala Express', 'Delhi', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '22:10:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '18:50:00', 120, 120, 1100.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Mumbai to Delhi
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12952', 'Mumbai Rajdhani', 'Mumbai', 'Delhi', DATEADD('DAY', 1, CURRENT_DATE) + TIME '16:40:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '08:35:00', 100, 100, 2500.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12954', 'August Kranti Rajdhani', 'Mumbai', 'Delhi', DATEADD('DAY', 1, CURRENT_DATE) + TIME '17:05:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '09:15:00', 100, 100, 2400.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12138', 'Punjab Mail', 'Mumbai', 'Delhi', DATEADD('DAY', 1, CURRENT_DATE) + TIME '20:05:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '15:20:00', 150, 150, 800.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Delhi to Bangalore
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12429', 'Rajdhani Express', 'Delhi', 'Bangalore', DATEADD('DAY', 1, CURRENT_DATE) + TIME '20:00:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '05:30:00', 100, 100, 3200.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('22691', 'Bangalore Rajdhani', 'Delhi', 'Bangalore', DATEADD('DAY', 1, CURRENT_DATE) + TIME '21:15:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '06:45:00', 100, 100, 3000.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bangalore to Delhi
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12430', 'Rajdhani Express', 'Bangalore', 'Delhi', DATEADD('DAY', 1, CURRENT_DATE) + TIME '19:50:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '05:00:00', 100, 100, 3200.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Mumbai to Bangalore
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('16529', 'Udyan Express', 'Mumbai', 'Bangalore', DATEADD('DAY', 1, CURRENT_DATE) + TIME '08:05:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '06:40:00', 150, 150, 900.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12133', 'Mumbai Express', 'Mumbai', 'Bangalore', DATEADD('DAY', 1, CURRENT_DATE) + TIME '21:40:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '18:15:00', 100, 100, 1800.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('16331', 'Trivandrum Express', 'Mumbai', 'Bangalore', DATEADD('DAY', 1, CURRENT_DATE) + TIME '11:40:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '08:30:00', 120, 120, 950.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bangalore to Mumbai
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('16530', 'Udyan Express', 'Bangalore', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '07:30:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '06:15:00', 150, 150, 900.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12134', 'Mumbai Express', 'Bangalore', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '20:50:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '17:25:00', 100, 100, 1800.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Delhi to Chennai
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12621', 'Tamil Nadu Express', 'Delhi', 'Chennai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '22:30:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '04:45:00', 150, 150, 1200.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12615', 'Grand Trunk Express', 'Delhi', 'Chennai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '18:30:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '03:00:00', 120, 120, 2200.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12433', 'Rajdhani Express', 'Delhi', 'Chennai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '15:55:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '07:00:00', 100, 100, 2800.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Chennai to Delhi
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12622', 'Tamil Nadu Express', 'Chennai', 'Delhi', DATEADD('DAY', 1, CURRENT_DATE) + TIME '21:45:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '04:00:00', 150, 150, 1200.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12616', 'Grand Trunk Express', 'Chennai', 'Delhi', DATEADD('DAY', 1, CURRENT_DATE) + TIME '17:40:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '02:15:00', 120, 120, 2200.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Mumbai to Chennai
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12163', 'Chennai Express', 'Mumbai', 'Chennai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '11:40:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '09:30:00', 100, 100, 1500.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12693', 'Pearl City Express', 'Mumbai', 'Chennai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '06:20:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '05:15:00', 150, 150, 850.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('11041', 'Chennai Express', 'Mumbai', 'Chennai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '16:50:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '14:20:00', 130, 130, 1100.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Chennai to Mumbai
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12164', 'Chennai Express', 'Chennai', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '11:30:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '09:20:00', 100, 100, 1500.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12694', 'Pearl City Express', 'Chennai', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '06:00:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '05:00:00', 150, 150, 850.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Bangalore to Chennai
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12607', 'Lalbagh Express', 'Bangalore', 'Chennai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '06:15:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '11:00:00', 120, 120, 400.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12295', 'Sanghamitra Express', 'Bangalore', 'Chennai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '21:45:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '04:30:00', 110, 110, 550.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12639', 'Brindavan Express', 'Bangalore', 'Chennai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '07:00:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '12:30:00', 100, 100, 600.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Chennai to Bangalore
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12640', 'Brindavan Express', 'Chennai', 'Bangalore', DATEADD('DAY', 1, CURRENT_DATE) + TIME '14:30:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '20:00:00', 100, 100, 600.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12608', 'Lalbagh Express', 'Chennai', 'Bangalore', DATEADD('DAY', 1, CURRENT_DATE) + TIME '13:30:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '18:15:00', 120, 120, 400.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Delhi to Kolkata
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12313', 'Sealdah Rajdhani', 'Delhi', 'Kolkata', DATEADD('DAY', 1, CURRENT_DATE) + TIME '16:55:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '10:05:00', 100, 100, 2800.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12381', 'Poorva Express', 'Delhi', 'Kolkata', DATEADD('DAY', 1, CURRENT_DATE) + TIME '15:50:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '14:30:00', 150, 150, 1100.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12301', 'Howrah Rajdhani', 'Delhi', 'Kolkata', DATEADD('DAY', 1, CURRENT_DATE) + TIME '17:00:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '09:35:00', 100, 100, 2900.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Kolkata to Delhi
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12314', 'Sealdah Rajdhani', 'Kolkata', 'Delhi', DATEADD('DAY', 1, CURRENT_DATE) + TIME '16:50:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '10:00:00', 100, 100, 2800.00, 'AC_2_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12382', 'Poorva Express', 'Kolkata', 'Delhi', DATEADD('DAY', 1, CURRENT_DATE) + TIME '15:40:00', DATEADD('DAY', 2, CURRENT_DATE) + TIME '14:20:00', 150, 150, 1100.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Mumbai to Kolkata
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12869', 'Howrah Express', 'Mumbai', 'Kolkata', DATEADD('DAY', 1, CURRENT_DATE) + TIME '06:00:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '06:55:00', 150, 150, 1800.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12809', 'Howrah Mail', 'Mumbai', 'Kolkata', DATEADD('DAY', 1, CURRENT_DATE) + TIME '19:05:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '23:45:00', 120, 120, 950.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Kolkata to Mumbai
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12870', 'Howrah Express', 'Kolkata', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '06:10:00', DATEADD('DAY', 3, CURRENT_DATE) + TIME '07:05:00', 150, 150, 1800.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12810', 'Howrah Mail', 'Kolkata', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '19:15:00', DATEADD('DAY', 4, CURRENT_DATE) + TIME '00:00:00', 120, 120, 950.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Delhi to Jaipur
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12015', 'Ajmer Shatabdi', 'Delhi', 'Jaipur', DATEADD('DAY', 1, CURRENT_DATE) + TIME '06:05:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '10:30:00', 80, 80, 800.00, 'AC_1_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12413', 'Intercity Express', 'Delhi', 'Jaipur', DATEADD('DAY', 1, CURRENT_DATE) + TIME '15:15:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '20:00:00', 100, 100, 350.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12957', 'Swarna Jayanti', 'Delhi', 'Jaipur', DATEADD('DAY', 1, CURRENT_DATE) + TIME '17:50:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '22:30:00', 90, 90, 650.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Jaipur to Delhi
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12016', 'Ajmer Shatabdi', 'Jaipur', 'Delhi', DATEADD('DAY', 1, CURRENT_DATE) + TIME '17:30:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '22:00:00', 80, 80, 800.00, 'AC_1_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12414', 'Intercity Express', 'Jaipur', 'Delhi', DATEADD('DAY', 1, CURRENT_DATE) + TIME '05:30:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '10:15:00', 100, 100, 350.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Pune to Mumbai
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12127', 'Intercity Express', 'Pune', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '07:10:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '10:25:00', 100, 100, 250.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12123', 'Deccan Queen', 'Pune', 'Mumbai', DATEADD('DAY', 1, CURRENT_DATE) + TIME '17:10:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '20:25:00', 90, 90, 450.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Mumbai to Pune
INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12128', 'Intercity Express', 'Mumbai', 'Pune', DATEADD('DAY', 1, CURRENT_DATE) + TIME '07:05:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '10:20:00', 100, 100, 250.00, 'SLEEPER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO trains (train_number, train_name, source, destination, departure_time, arrival_time, total_seats, available_seats, fare_per_seat, train_class, status, created_at, updated_at)
VALUES ('12124', 'Deccan Queen', 'Mumbai', 'Pune', DATEADD('DAY', 1, CURRENT_DATE) + TIME '17:05:00', DATEADD('DAY', 1, CURRENT_DATE) + TIME '20:20:00', 90, 90, 450.00, 'AC_3_TIER', 'SCHEDULED', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
