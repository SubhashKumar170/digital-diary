// src/Navbar.jsx
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from './AuthContext';

export default function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5050/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (res.status === 200) {
        setIsAuth(false);       // update auth state
        navigate('/login');     // redirect to login
      } else {
        alert('Logout failed');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Server error');
    }
  };

  return (
    <div className="nav-bar">
      <nav className="link-container">
        {isAuth ? (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/history">History</NavLink>
            <NavLink to="/new">New</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </nav>
    </div>
  );
}
