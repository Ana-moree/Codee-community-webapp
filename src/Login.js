import React, { useState } from 'react';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password');
      return;
    }

    // For demo purposes - accept any non-empty credentials
    // In production, this would verify against a backend
    if (username && password) {
      onLoginSuccess();
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-logo">
          <img src="/Codee Icon.png" alt="CODEE" />
        </div>
        
        <h1 className="login-title">CODEE</h1>
        <p className="login-subtitle">Welcome back! Log in to continue</p>

        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError('');
              }}
              className="login-input"
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError('');
              }}
              className="login-input"
            />
          </div>

          {error && <div className="login-error">{error}</div>}

          <button type="submit" className="login-button">
            LOG IN
          </button>
        </form>

        <div className="login-footer">
          <button className="text-link">Forgot password?</button>
        </div>
      </div>
    </div>
  );
}

export default Login;