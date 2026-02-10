import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { bookingAPI } from '../services/api';

function Dashboard() {
    const location = useLocation();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (location.state?.bookingSuccess) {
            setSuccessMessage('Booking confirmed successfully!');
            setTimeout(() => setSuccessMessage(''), 5000);
        }

        fetchBookings();
    }, [location]);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const data = await bookingAPI.getUserBookings();
            setBookings(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Are you sure you want to cancel this booking?')) {
            return;
        }

        try {
            await bookingAPI.cancel(bookingId);
            setSuccessMessage('Booking cancelled successfully');
            fetchBookings();
            setTimeout(() => setSuccessMessage(''), 5000);
        } catch (err) {
            setError(err.message || 'Failed to cancel booking');
        }
    };

    const formatDateTime = (dateTime) => {
        return new Date(dateTime).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="dashboard-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading your bookings...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                <h1 className="page-title">My Bookings</h1>

                {successMessage && <div className="success-message">{successMessage}</div>}
                {error && <div className="error-message">{error}</div>}

                {bookings.length === 0 ? (
                    <div className="no-bookings">
                        <div className="no-bookings-icon">📋</div>
                        <h2>No bookings yet</h2>
                        <p>Start your journey by booking your first train ticket</p>
                        <a href="/" className="btn btn-primary">Search Trains</a>
                    </div>
                ) : (
                    <div className="bookings-list">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="booking-card">
                                <div className="booking-header">
                                    <div className="booking-ref">
                                        <span className="ref-label">Booking Reference</span>
                                        <span className="ref-value">{booking.bookingReference}</span>
                                    </div>
                                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                        {booking.status}
                                    </span>
                                </div>

                                <div className="booking-details">
                                    <div className="train-info">
                                        <h3>{booking.train.trainName}</h3>
                                        <span className="train-number">#{booking.train.trainNumber}</span>
                                    </div>

                                    <div className="journey-info">
                                        <div className="journey-point">
                                            <span className="time">{formatDateTime(booking.train.departureTime)}</span>
                                            <span className="station">{booking.train.source}</span>
                                        </div>
                                        <div className="journey-arrow">→</div>
                                        <div className="journey-point">
                                            <span className="time">{formatDateTime(booking.train.arrivalTime)}</span>
                                            <span className="station">{booking.train.destination}</span>
                                        </div>
                                    </div>

                                    <div className="booking-meta">
                                        <div className="meta-row">
                                            <span className="label">Passengers:</span>
                                            <span className="value">{booking.numberOfSeats}</span>
                                        </div>
                                        <div className="meta-row">
                                            <span className="label">Total Fare:</span>
                                            <span className="value price">₹{booking.totalFare}</span>
                                        </div>
                                        <div className="meta-row">
                                            <span className="label">Payment:</span>
                                            <span className={`value ${booking.paymentStatus.toLowerCase()}`}>
                                                {booking.paymentStatus}
                                            </span>
                                        </div>
                                        <div className="meta-row">
                                            <span className="label">Booked On:</span>
                                            <span className="value">{formatDateTime(booking.createdAt)}</span>
                                        </div>
                                    </div>

                                    {booking.passengers && booking.passengers.length > 0 && (
                                        <div className="passengers-section">
                                            <h4>Passenger Details</h4>
                                            <div className="passengers-list">
                                                {booking.passengers.map((passenger, index) => (
                                                    <div key={index} className="passenger-item">
                                                        <span className="passenger-name">
                                                            {passenger.firstName} {passenger.lastName}
                                                        </span>
                                                        <span className="passenger-details">
                                                            {passenger.age} yrs, {passenger.gender}, Seat: {passenger.seatNumber}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {booking.status === 'CONFIRMED' && (
                                    <div className="booking-actions">
                                        <button
                                            onClick={() => handleCancelBooking(booking.id)}
                                            className="btn btn-danger"
                                        >
                                            Cancel Booking
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
