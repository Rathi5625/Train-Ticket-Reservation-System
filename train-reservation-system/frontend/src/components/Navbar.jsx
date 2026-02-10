import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <span className="logo-icon">🚂</span>
                    <span className="logo-text">TrainBook</span>
                </Link>

                <div className="navbar-menu">
                    <Link to="/" className="nav-link">Home</Link>

                    {user ? (
                        <>
                            <Link to="/dashboard" className="nav-link">My Bookings</Link>
                            {user.role === 'ADMIN' && (
                                <Link to="/admin" className="nav-link">Admin</Link>
                            )}
                            <div className="user-info">
                                <span className="user-name">{user.firstName}</span>
                                <button onClick={handleLogout} className="btn btn-secondary">
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-secondary">Login</Link>
                            <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
