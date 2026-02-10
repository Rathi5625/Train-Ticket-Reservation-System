import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { trainAPI } from '../services/api';

function SearchResults() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const source = searchParams.get('source');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');

    useEffect(() => {
        const fetchTrains = async () => {
            try {
                setLoading(true);
                const data = await trainAPI.search(source, destination, date);
                setTrains(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch trains');
            } finally {
                setLoading(false);
            }
        };

        if (source && destination && date) {
            fetchTrains();
        }
    }, [source, destination, date]);

    const formatTime = (dateTime) => {
        return new Date(dateTime).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatDate = (dateTime) => {
        return new Date(dateTime).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const calculateDuration = (departure, arrival) => {
        const diff = new Date(arrival) - new Date(departure);
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
    };

    if (loading) {
        return (
            <div className="search-results-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Searching for trains...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="search-results-page">
            <div className="search-header">
                <h1>Available Trains</h1>
                <p className="search-info">
                    {source} → {destination} on {formatDate(date)}
                </p>
            </div>

            {error && <div className="error-message">{error}</div>}

            {trains.length === 0 ? (
                <div className="no-results">
                    <div className="no-results-icon">🚂</div>
                    <h2>No trains found</h2>
                    <p>Try searching for a different route or date</p>
                    <button onClick={() => navigate('/')} className="btn btn-primary">
                        Search Again
                    </button>
                </div>
            ) : (
                <div className="trains-list">
                    {trains.map((train) => (
                        <div key={train.id} className="train-card">
                            <div className="train-header">
                                <div className="train-info">
                                    <h3 className="train-name">{train.trainName}</h3>
                                    <span className="train-number">#{train.trainNumber}</span>
                                </div>
                                <span className={`train-class ${train.trainClass.toLowerCase()}`}>
                                    {train.trainClass.replace(/_/g, ' ')}
                                </span>
                            </div>

                            <div className="train-details">
                                <div className="time-info">
                                    <div className="station">
                                        <span className="time">{formatTime(train.departureTime)}</span>
                                        <span className="station-name">{train.source}</span>
                                    </div>
                                    <div className="duration">
                                        <span className="duration-line"></span>
                                        <span className="duration-text">
                                            {calculateDuration(train.departureTime, train.arrivalTime)}
                                        </span>
                                    </div>
                                    <div className="station">
                                        <span className="time">{formatTime(train.arrivalTime)}</span>
                                        <span className="station-name">{train.destination}</span>
                                    </div>
                                </div>

                                <div className="train-meta">
                                    <div className="meta-item">
                                        <span className="meta-label">Available Seats</span>
                                        <span className="meta-value">{train.availableSeats}</span>
                                    </div>
                                    <div className="meta-item">
                                        <span className="meta-label">Fare</span>
                                        <span className="meta-value price">₹{train.farePerSeat}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                className="btn btn-primary btn-book"
                                onClick={() => navigate(`/booking/${train.id}`)}
                                disabled={train.availableSeats === 0}
                            >
                                {train.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResults;
