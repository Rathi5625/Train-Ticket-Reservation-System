# Train Reservation System - Backend

A production-ready Spring Boot backend for a comprehensive train ticket reservation system.

## Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - Role-based access control (PASSENGER, ADMIN)
  - Secure password encryption with BCrypt

- **Train Management**
  - CRUD operations for trains
  - Train search by source, destination, and date
  - Real-time seat availability tracking

- **Booking System**
  - Create and manage bookings
  - Multiple passenger support
  - Booking confirmation and cancellation
  - Payment tracking

- **Admin Features**
  - Manage trains
  - View all bookings
  - User management

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.2**
- **Spring Security** with JWT
- **Spring Data JPA** with Hibernate
- **H2 Database** (development) / **MySQL** (production)
- **Maven** for dependency management
- **Lombok** for reducing boilerplate code
- **MapStruct** for DTO mapping

## Prerequisites

- JDK 17 or higher
- Maven 3.6+
- MySQL 8.0+ (for production)

## Getting Started

### 1. Clone the repository

```bash
cd backend
```

### 2. Configure the database

For development, the application uses H2 in-memory database by default.

For production with MySQL, update `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/traindb
    username: your_username
    password: your_password
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.MySQLDialect
```

### 3. Build the project

```bash
mvn clean install
```

### 4. Run the application

```bash
mvn spring-boot:run
```

The server will start on `http://localhost:8080`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Trains

- `GET /api/trains` - Get all trains (Admin only)
- `GET /api/trains/{id}` - Get train by ID
- `GET /api/trains/search` - Search trains (Public)
- `POST /api/trains` - Create train (Admin only)
- `PUT /api/trains/{id}` - Update train (Admin only)
- `DELETE /api/trains/{id}` - Delete train (Admin only)

### Bookings

- `GET /api/bookings` - Get user's bookings
- `GET /api/bookings/{id}` - Get booking by ID
- `POST /api/bookings` - Create booking
- `PUT /api/bookings/{id}/cancel` - Cancel booking

### Admin

- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/users` - Get all users
- `GET /api/admin/statistics` - Get system statistics

## Database Schema

### Users Table
- id, email, password, firstName, lastName, phoneNumber, address, role, enabled, createdAt, updatedAt

### Trains Table
- id, trainNumber, trainName, source, destination, departureTime, arrivalTime, totalSeats, availableSeats, farePerSeat, trainClass, status, createdAt, updatedAt

### Bookings Table
- id, bookingReference, userId, trainId, numberOfSeats, totalFare, status, paymentStatus, paymentMethod, transactionId, createdAt, updatedAt, cancelledAt

### Passengers Table
- id, bookingId, firstName, lastName, age, gender, seatNumber, idProofType, idProofNumber

## Security

- All passwords are encrypted using BCrypt
- JWT tokens expire after 24 hours
- CORS is configured for frontend integration
- Role-based access control for admin endpoints

## H2 Console

For development, access H2 console at: `http://localhost:8080/h2-console`

- JDBC URL: `jdbc:h2:mem:traindb`
- Username: `sa`
- Password: (leave empty)

## Testing

Run tests with:

```bash
mvn test
```

## Production Deployment

1. Update `application.yml` with production database credentials
2. Set `spring.jpa.hibernate.ddl-auto` to `validate` or `none`
3. Use environment variables for sensitive data
4. Build production JAR: `mvn clean package -DskipTests`
5. Run: `java -jar target/train-reservation-backend-1.0.0.jar`

## Environment Variables

For production, use environment variables:

- `JWT_SECRET` - JWT signing secret
- `DB_URL` - Database URL
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password

## License

MIT License
