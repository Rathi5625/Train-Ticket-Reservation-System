# Train Ticket Reservation System

A full-stack train ticket reservation system built with Spring Boot (backend) and React + Vite (frontend).

## Features

### User Features
- **Authentication**: Secure user registration and login with JWT
- **Train Search**: Search trains by source, destination, and date
- **Booking Management**: Book tickets with passenger details
- **Payment Options**: Multiple payment methods (Credit Card, Debit Card, UPI, Net Banking)
- **Booking History**: View and manage all bookings
- **Cancel Bookings**: Cancel confirmed bookings with automatic refund

### Admin Features
- **Dashboard**: View system statistics (users, bookings, revenue)
- **Train Management**: Create, update, and delete trains
- **User Management**: View all registered users
- **Booking Overview**: Monitor all bookings in the system

## Technology Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.2**
- **Spring Security** with JWT authentication
- **Spring Data JPA** with Hibernate
- **H2 Database** (development) / **MySQL** (production)
- **Maven** for dependency management
- **Lombok** for reducing boilerplate code

### Frontend
- **React 18**
- **Vite** for fast development and building
- **React Router** for navigation
- **Modern CSS** with custom design system
- **Fetch API** for HTTP requests

## Prerequisites

- **Java Development Kit (JDK) 17** or higher
- **Node.js 18** or higher
- **npm** or **yarn**
- **Maven 3.6+**

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

   The backend server will start on `http://localhost:8080`

4. Access H2 Console (development only):
   - URL: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:traindb`
   - Username: `sa`
   - Password: (leave empty)

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Trains
- `GET /api/trains` - Get all trains (Admin only)
- `GET /api/trains/{id}` - Get train by ID
- `GET /api/trains/search` - Search trains (Query params: source, destination, date)
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

## Default Users

The system doesn't create default users. You need to register through the UI or API.

To create an admin user, you can:
1. Register a normal user through the UI
2. Manually update the user's role to 'ADMIN' in the database

## Database Schema

### Users Table
- id, email, password, firstName, lastName, phoneNumber, address, role, enabled, createdAt, updatedAt

### Trains Table
- id, trainNumber, trainName, source, destination, departureTime, arrivalTime, totalSeats, availableSeats, farePerSeat, trainClass, status, createdAt, updatedAt

### Bookings Table
- id, bookingReference, userId, trainId, numberOfSeats, totalFare, status, paymentStatus, paymentMethod, transactionId, createdAt, updatedAt, cancelledAt

### Passengers Table
- id, bookingId, firstName, lastName, age, gender, seatNumber, idProofType, idProofNumber

## Environment Variables

For production deployment, set these environment variables:

### Backend
- `JWT_SECRET` - JWT signing secret
- `DB_URL` - Database URL
- `DB_USERNAME` - Database username
- `DB_PASSWORD` - Database password

### Frontend
- Update the API base URL in `src/services/api.js`

## Building for Production

### Backend
```bash
cd backend
mvn clean package -DskipTests
java -jar target/train-reservation-backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
```

The built files will be in the `dist` directory. Serve them using any static file server.

## Project Structure

```
train-reservation-system/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/trainreservation/
│   │   │   │   ├── config/          # Security and app configuration
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── model/           # JPA entities
│   │   │   │   ├── repository/      # Data repositories
│   │   │   │   ├── security/        # Security components
│   │   │   │   └── service/         # Business logic
│   │   │   └── resources/
│   │   │       └── application.yml  # Application configuration
│   │   └── test/                    # Test files
│   └── pom.xml                      # Maven dependencies
└── frontend/
    ├── src/
    │   ├── components/              # Reusable components
    │   ├── context/                 # React context
    │   ├── pages/                   # Page components
    │   ├── services/                # API services
    │   ├── App.jsx                  # Main app component
    │   ├── index.css                # Global styles
    │   └── main.jsx                 # Entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

## Features in Detail

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (PASSENGER, ADMIN)
- Secure password encryption with BCrypt
- Protected routes on both frontend and backend

### Train Management
- Search trains by route and date
- Real-time seat availability tracking
- Multiple train classes (Sleeper, AC 3-Tier, AC 2-Tier, AC 1-Tier, First Class)
- Train status management (Scheduled, Running, Delayed, Cancelled, Completed)

### Booking System
- Multi-passenger booking support
- Automatic seat allocation
- Booking reference generation
- Payment method selection
- Booking confirmation and cancellation
- Automatic refund on cancellation

### Admin Dashboard
- System-wide statistics
- User management
- Booking oversight
- Train CRUD operations

## Security Features

- All passwords encrypted with BCrypt
- JWT tokens expire after 24 hours
- CORS configured for frontend integration
- Role-based access control for admin endpoints
- Input validation on all forms

## Troubleshooting

### Backend Issues
- **Port 8080 already in use**: Change the port in `application.yml`
- **Database connection errors**: Check H2 console or database configuration
- **JWT errors**: Verify the JWT secret is properly configured

### Frontend Issues
- **API connection errors**: Ensure backend is running on port 8080
- **CORS errors**: Check CORS configuration in backend
- **Build errors**: Delete `node_modules` and run `npm install` again

## License

MIT License

## Contributors

Built as a demonstration project for a modern full-stack train reservation system.
