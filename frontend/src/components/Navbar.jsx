import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          🚀 Crypto Trading
        </Link>
        
        {user ? (
          <div className="nav-links">
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
              Dashboard
            </Link>
            <span className="user-info">
              👋 {user.email} ({user.role})
            </span>
            <button onClick={handleLogout} className="btn btn-sm btn-secondary">
              <FiLogOut /> Logout
            </button>
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-sm btn-secondary">Login</Link>
            <Link to="/register" className="btn btn-sm btn-primary">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;