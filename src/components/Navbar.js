
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token'); 
  
      if (!token) {
        console.log('No token found');
        return;
      }
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log(data.message);
      localStorage.removeItem('token');
 
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          MyApp
        </Link>
        <ul className="navbar-links">
          <li>
            <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          </li>
          <li>
            <Link to="/login" className="navbar-link">Login</Link>
          </li>
          <li>
            <Link to="/register" className="navbar-link">Register</Link>
          </li>
          <li>
            <Link  onClick={handleLogout} className="navbar-link">Logout</Link>
          </li>
        </ul>
       
      </div>
    </nav>
  );
};

export default Navbar;
