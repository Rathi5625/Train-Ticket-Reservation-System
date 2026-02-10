import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trainAPI, bookingAPI } from '../services/api';

function BookingPage() {
    const { trainId } = useParams();
    const navigate = useNavigate();
    const [train, setTrain] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [numberOfSeats, setNumberOfSeats] = useState(1);
    const [passengers, setPassengers] = useState([{
        firstName: '',
        lastName: '',
        age: '',
        gender: 'MALE',
        idProofType: 'AADHAR',
        idProofNumber: ''
    }]);
    const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');

    useEffect(() => {
        const fetchTrain = async () => {
            try {
                const data = await trainAPI.getById(trainId);
                setTrain(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch train details');
            } finally {
                setLoading(false);
            }
        };

        fetchTrain();
    }, [trainId]);

    useEffect(() => {
        // Update passengers array when number of seats changes
        const newPassengers = Array(numberOfSeats).fill(null).map((_, index) =>
            passengers[index] || {
                firstName: '',
                lastName: '',
                age: '',
                gender: 'MALE',
                idProofType: 'AADHAR',
                idProofNumber: ''
            }
        );
        setPassengers(newPassengers);
    }, [numberOfSeats]);

    const handlePassengerChange = (index, field, value) => {
        const newPassengers = [...passengers];
        newPassengers[index] = { ...newPassengers[index], [field]: value };
        setPassengers(newPassengers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);

        try {
            const bookingData = {
                trainId: parseInt(trainId),
                numberOfSeats,
                passengers: passengers.map(p => ({
                    ...p,
                    age: parseInt(p.age)
                })),
                paymentMethod
            };

            const response = await bookingAPI.create(bookingData);
            navigate('/dashboard', { state: { bookingSuccess: true, booking: response } });
        } catch (err) {
            setError(err.message || 'Failed to create booking');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="booking-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading train details...</p>
                </div>
            </div>
        );
    }

    if (!train) {
        return (
            <div className="booking-page">
                <div className="error-message">Train not found</div>
            </div>
        );
    }

    const totalFare = train.farePerSeat * numberOfSeats;

    return (
        <div className="booking-page">
            <div className="booking-container">
                <h1 className="page-title">Complete Your Booking</h1>

                <div className="booking-content">
                    <div className="booking-form-section">
                        {error && <div className="error-message">{error}</div>}

                        <form onSubmit={handleSubmit} className="booking-form">
                            <div className="form-section">
                                <h2>Train Details</h2>
                                <div className="train-summary">
                                    <div className="summary-row">
                                        <span className="label">Train:</span>
                                        <span className="value">{train.trainName} ({train.trainNumber})</span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="label">Route:</span>
                                        <span className="value">{train.source} → {train.destination}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span className="label">Class:</span>
                                        <span className="value">{train.trainClass.replace(/_/g, ' ')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="form-section">
                                <h2>Number of Seats</h2>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        min="1"
                                        max={Math.min(train.availableSeats, 6)}
                                        value={numberOfSeats}
                                        onChange={(e) => setNumberOfSeats(parseInt(e.target.value))}
                                        required
                                    />
                                    <small>Maximum 6 seats per booking</small>
                                </div>
                            </div>

                            <div className="form-section">
                                <h2>Passenger Details</h2>
                                {passengers.map((passenger, index) => (
                                    <div key={index} className="passenger-form">
                                        <h3>Passenger {index + 1}</h3>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>First Name</label>
                                                <input
                                                    type="text"
                                                    value={passenger.firstName}
                                                    onChange={(e) => handlePassengerChange(index, 'firstName', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Last Name</label>
                                                <input
                                                    type="text"
                                                    value={passenger.lastName}
                                                    onChange={(e) => handlePassengerChange(index, 'lastName', e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Age</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="120"
                                                    value={passenger.age}
                                                    onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Gender</label>
                                                <select
                                                    value={passenger.gender}
                                                    onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                                                    required
                                                >
                                                    <option value="MALE">Male</option>
                                                    <option value="FEMALE">Female</option>
                                                    <option value="OTHER">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>ID Proof Type</label>
                                                <select
                                                    value={passenger.idProofType}
                                                    onChange={(e) => handlePassengerChange(index, 'idProofType', e.target.value)}
                                                >
                                                    <option value="AADHAR">Aadhar Card</option>
                                                    <option value="PAN">PAN Card</option>
                                                    <option value="PASSPORT">Passport</option>
                                                    <option value="VOTER_ID">Voter ID</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>ID Proof Number</label>
                                                <input
                                                    type="text"
                                                    value={passenger.idProofNumber}
                                                    onChange={(e) => handlePassengerChange(index, 'idProofNumber', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="form-section">
                                <h2>Payment Method</h2>
                                <div className="payment-options">
                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            value="CREDIT_CARD"
                                            checked={paymentMethod === 'CREDIT_CARD'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <span>Credit Card</span>
                                    </label>
                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            value="DEBIT_CARD"
                                            checked={paymentMethod === 'DEBIT_CARD'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <span>Debit Card</span>
                                    </label>
                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            value="UPI"
                                            checked={paymentMethod === 'UPI'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <span>UPI</span>
                                    </label>
                                    <label className="radio-option">
                                        <input
                                            type="radio"
                                            value="NET_BANKING"
                                            checked={paymentMethod === 'NET_BANKING'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <span>Net Banking</span>
                                    </label>
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                                {submitting ? 'Processing...' : `Pay ₹${totalFare} and Confirm Booking`}
                            </button>
                        </form>
                    </div>

                    <div className="booking-summary">
                        <h2>Booking Summary</h2>
                        <div className="summary-details">
                            <div className="summary-item">
                                <span>Number of Seats</span>
                                <span>{numberOfSeats}</span>
                            </div>
                            <div className="summary-item">
                                <span>Fare per Seat</span>
                                <span>₹{train.farePerSeat}</span>
                            </div>
                            <div className="summary-divider"></div>
                            <div className="summary-item total">
                                <span>Total Amount</span>
                                <span>₹{totalFare}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingPage;
