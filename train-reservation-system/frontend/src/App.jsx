import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SearchResults from './pages/SearchResults';
import BookingPage from './pages/BookingPage';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import { AuthContext } from './context/AuthContext';

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
            setUser(JSON.parse(userData));
        }
        setLoading(false);
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <Router>
                <div className="app">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
                        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route
                            path="/booking/:trainId"
                            element={user ? <BookingPage /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/dashboard"
                            element={user ? <Dashboard /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/admin"
                            element={user && user.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" />}
                        />
                    </Routes>
                </div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
