import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        source: '',
        destination: '',
        date: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchData.source && searchData.destination && searchData.date) {
            navigate(`/search?source=${searchData.source}&destination=${searchData.destination}&date=${searchData.date}`);
        }
    };

    const popularRoutes = [
        { from: 'Mumbai', to: 'Delhi', duration: '16h' },
        { from: 'Bangalore', to: 'Chennai', duration: '6h' },
        { from: 'Kolkata', to: 'Mumbai', duration: '26h' },
        { from: 'Delhi', to: 'Jaipur', duration: '5h' },
    ];

    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Book Your Train Journey
                        <span className="gradient-text"> Effortlessly</span>
                    </h1>
                    <p className="hero-subtitle">
                        Fast, reliable, and convenient train booking at your fingertips
                    </p>

                    <form className="search-form" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="source">From</label>
                                <input
                                    type="text"
                                    id="source"
                                    placeholder="Enter source station"
                                    value={searchData.source}
                                    onChange={(e) => setSearchData({ ...searchData, source: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="destination">To</label>
                                <input
                                    type="text"
                                    id="destination"
                                    placeholder="Enter destination station"
                                    value={searchData.destination}
                                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={searchData.date}
                                    onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary btn-search">
                                Search Trains
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section className="features-section">
                <h2 className="section-title">Why Choose Us?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Fast Booking</h3>
                        <p>Book your tickets in seconds with our streamlined process</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🔒</div>
                        <h3>Secure Payment</h3>
                        <p>Your transactions are protected with industry-standard security</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">📱</div>
                        <h3>Easy Management</h3>
                        <p>View and manage all your bookings from one dashboard</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🎫</div>
                        <h3>Instant Confirmation</h3>
                        <p>Get immediate booking confirmation and e-tickets</p>
                    </div>
                </div>
            </section>

            <section className="popular-routes-section">
                <h2 className="section-title">Popular Routes</h2>
                <div className="routes-grid">
                    {popularRoutes.map((route, index) => (
                        <div key={index} className="route-card" onClick={() => {
                            setSearchData({ ...searchData, source: route.from, destination: route.to });
                        }}>
                            <div className="route-info">
                                <span className="route-from">{route.from}</span>
                                <span className="route-arrow">→</span>
                                <span className="route-to">{route.to}</span>
                            </div>
                            <span className="route-duration">{route.duration}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
