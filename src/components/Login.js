import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
        setError('Please provide both email and password');
        return;
    }

    console.log("Entered email:", email);
    console.log("Entered password:", password); 
  
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
  
        if (response.ok) {
            setSuccess('Login successful');
            sessionStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
          
        } else {
            setError(data.message || 'Invalid credentials');
        }
    } catch (err) {
        console.error('Error logging in:', err);
        setError('Something went wrong. Please try again later.');
    }
};



  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}

        <button type="submit">Login</button>
        <h5>If no account then <Link to="/register">Register Now</Link></h5>
        

      </form>
    </div>
  );
};

export default Login;
