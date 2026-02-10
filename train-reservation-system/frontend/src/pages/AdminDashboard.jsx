import { useState, useEffect } from 'react';
import { adminAPI, trainAPI } from '../services/api';

function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('statistics');
    const [statistics, setStatistics] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [users, setUsers] = useState([]);
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showTrainForm, setShowTrainForm] = useState(false);
    const [trainForm, setTrainForm] = useState({
        trainNumber: '',
        trainName: '',
        source: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        totalSeats: '',
        farePerSeat: '',
        trainClass: 'SLEEPER'
    });

    useEffect(() => {
        fetchData();
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        setError('');

        try {
            if (activeTab === 'statistics') {
                const stats = await adminAPI.getStatistics();
                setStatistics(stats);
            } else if (activeTab === 'bookings') {
                const bookingsData = await adminAPI.getAllBookings();
                setBookings(bookingsData);
            } else if (activeTab === 'users') {
                const usersData = await adminAPI.getAllUsers();
                setUsers(usersData);
            } else if (activeTab === 'trains') {
                const trainsData = await trainAPI.getAll();
                setTrains(trainsData);
            }
        } catch (err) {
            setError(err.message || 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTrain = async (e) => {
        e.preventDefault();
        try {
            await trainAPI.create({
                ...trainForm,
                totalSeats: parseInt(trainForm.totalSeats),
                farePerSeat: parseFloat(trainForm.farePerSeat)
            });
            setShowTrainForm(false);
            setTrainForm({
                trainNumber: '',
                trainName: '',
                source: '',
                destination: '',
                departureTime: '',
                arrivalTime: '',
                totalSeats: '',
                farePerSeat: '',
                trainClass: 'SLEEPER'
            });
            fetchData();
        } catch (err) {
            setError(err.message || 'Failed to create train');
        }
    };

    const handleDeleteTrain = async (trainId) => {
        if (!window.confirm('Are you sure you want to delete this train?')) {
            return;
        }

        try {
            await trainAPI.delete(trainId);
            fetchData();
        } catch (err) {
            setError(err.message || 'Failed to delete train');
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

    return (
        <div className="admin-dashboard">
            <div className="admin-container">
                <h1 className="page-title">Admin Dashboard</h1>

                <div className="admin-tabs">
                    <button
                        className={`tab-button ${activeTab === 'statistics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('statistics')}
                    >
                        Statistics
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookings')}
                    >
                        All Bookings
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Users
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'trains' ? 'active' : ''}`}
                        onClick={() => setActiveTab('trains')}
                    >
                        Trains
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading data...</p>
                    </div>
                ) : (
                    <div className="admin-content">
                        {activeTab === 'statistics' && statistics && (
                            <div className="statistics-grid">
                                <div className="stat-card">
                                    <div className="stat-icon">👥</div>
                                    <div className="stat-info">
                                        <h3>Total Users</h3>
                                        <p className="stat-value">{statistics.totalUsers}</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">🎫</div>
                                    <div className="stat-info">
                                        <h3>Total Bookings</h3>
                                        <p className="stat-value">{statistics.totalBookings}</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">🚂</div>
                                    <div className="stat-info">
                                        <h3>Passengers</h3>
                                        <p className="stat-value">{statistics.totalPassengers}</p>
                                    </div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-icon">💰</div>
                                    <div className="stat-info">
                                        <h3>Total Revenue</h3>
                                        <p className="stat-value">₹{statistics.totalRevenue.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'bookings' && (
                            <div className="data-table">
                                <h2>All Bookings</h2>
                                {bookings.length === 0 ? (
                                    <p>No bookings found</p>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Reference</th>
                                                <th>User</th>
                                                <th>Train</th>
                                                <th>Seats</th>
                                                <th>Fare</th>
                                                <th>Status</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bookings.map((booking) => (
                                                <tr key={booking.id}>
                                                    <td>{booking.bookingReference}</td>
                                                    <td>{booking.userEmail}</td>
                                                    <td>{booking.train?.trainName}</td>
                                                    <td>{booking.numberOfSeats}</td>
                                                    <td>₹{booking.totalFare}</td>
                                                    <td>
                                                        <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                                            {booking.status}
                                                        </span>
                                                    </td>
                                                    <td>{formatDateTime(booking.createdAt)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {activeTab === 'users' && (
                            <div className="data-table">
                                <h2>All Users</h2>
                                {users.length === 0 ? (
                                    <p>No users found</p>
                                ) : (
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Role</th>
                                                <th>Status</th>
                                                <th>Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user) => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>
                                                    <td>{user.firstName} {user.lastName}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phoneNumber}</td>
                                                    <td>
                                                        <span className={`role-badge ${user.role.toLowerCase()}`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={user.enabled ? 'status-active' : 'status-inactive'}>
                                                            {user.enabled ? 'Active' : 'Inactive'}
                                                        </span>
                                                    </td>
                                                    <td>{formatDateTime(user.createdAt)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        )}

                        {activeTab === 'trains' && (
                            <div className="trains-management">
                                <div className="section-header">
                                    <h2>Manage Trains</h2>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => setShowTrainForm(!showTrainForm)}
                                    >
                                        {showTrainForm ? 'Cancel' : 'Add New Train'}
                                    </button>
                                </div>

                                {showTrainForm && (
                                    <form onSubmit={handleCreateTrain} className="train-form">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Train Number</label>
                                                <input
                                                    type="text"
                                                    value={trainForm.trainNumber}
                                                    onChange={(e) => setTrainForm({ ...trainForm, trainNumber: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Train Name</label>
                                                <input
                                                    type="text"
                                                    value={trainForm.trainName}
                                                    onChange={(e) => setTrainForm({ ...trainForm, trainName: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Source</label>
                                                <input
                                                    type="text"
                                                    value={trainForm.source}
                                                    onChange={(e) => setTrainForm({ ...trainForm, source: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Destination</label>
                                                <input
                                                    type="text"
                                                    value={trainForm.destination}
                                                    onChange={(e) => setTrainForm({ ...trainForm, destination: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Departure Time</label>
                                                <input
                                                    type="datetime-local"
                                                    value={trainForm.departureTime}
                                                    onChange={(e) => setTrainForm({ ...trainForm, departureTime: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Arrival Time</label>
                                                <input
                                                    type="datetime-local"
                                                    value={trainForm.arrivalTime}
                                                    onChange={(e) => setTrainForm({ ...trainForm, arrivalTime: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label>Total Seats</label>
                                                <input
                                                    type="number"
                                                    value={trainForm.totalSeats}
                                                    onChange={(e) => setTrainForm({ ...trainForm, totalSeats: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Fare per Seat</label>
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={trainForm.farePerSeat}
                                                    onChange={(e) => setTrainForm({ ...trainForm, farePerSeat: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Class</label>
                                                <select
                                                    value={trainForm.trainClass}
                                                    onChange={(e) => setTrainForm({ ...trainForm, trainClass: e.target.value })}
                                                >
                                                    <option value="SLEEPER">Sleeper</option>
                                                    <option value="AC_3_TIER">AC 3 Tier</option>
                                                    <option value="AC_2_TIER">AC 2 Tier</option>
                                                    <option value="AC_1_TIER">AC 1 Tier</option>
                                                    <option value="FIRST_CLASS">First Class</option>
                                                </select>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Create Train</button>
                                    </form>
                                )}

                                <div className="data-table">
                                    {trains.length === 0 ? (
                                        <p>No trains found</p>
                                    ) : (
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Number</th>
                                                    <th>Name</th>
                                                    <th>Route</th>
                                                    <th>Departure</th>
                                                    <th>Class</th>
                                                    <th>Seats</th>
                                                    <th>Fare</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {trains.map((train) => (
                                                    <tr key={train.id}>
                                                        <td>{train.trainNumber}</td>
                                                        <td>{train.trainName}</td>
                                                        <td>{train.source} → {train.destination}</td>
                                                        <td>{formatDateTime(train.departureTime)}</td>
                                                        <td>{train.trainClass.replace(/_/g, ' ')}</td>
                                                        <td>{train.availableSeats}/{train.totalSeats}</td>
                                                        <td>₹{train.farePerSeat}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleDeleteTrain(train.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
