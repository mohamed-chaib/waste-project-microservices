import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';

import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={assets.logo2} alt="SmartRecycle Logo" className="logo" />
        </Link>
      </div>
      <ul className="nav-links">
        <li className="active"><Link to="/">HOME</Link></li>
        <li><a href="#">OUR SERVICE</a></li>
        <li><a href="#">ABOUT US</a></li>
        <li><a href="#">CONTACT US</a></li>
        {token ? (
          <>
            <li><Link to="/dashboard">DASHBOARD</Link></li>
            <li><button onClick={handleLogout} className="login-btn" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>LOGOUT</button></li>
          </>
        ) : (
          <li><Link to="/login" className="login-btn">LOGIN</Link></li>
        )}
      </ul>
      {!token && (
        <Link to="/register">
          <button className="register-btn">REGISTER NOW</button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
