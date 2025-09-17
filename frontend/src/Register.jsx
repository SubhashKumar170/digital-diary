import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';


export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // redirect after successful registration

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch('http://localhost:5050/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();

      if (res.status === 201) {
        alert(data.message);
        navigate('/login'); // go to login after successful registration
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error("Registration error:", err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create Account</h2>
        <form className="register-form" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            className="register-input"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="register-input"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="register-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
    </div>
  );
}
