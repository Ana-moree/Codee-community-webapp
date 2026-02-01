import React, { useState } from 'react';
import './Login.css';
import { signInWithEmailAndPassword, auth } from '../firebase';

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    setIsSubmitting(true);
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(() => {
        onLoginSuccess();
      })
      .catch((err) => {
        const code = err?.code || '';
        let message = 'Something went wrong. Please try again.';

        if (code === 'auth/invalid-credential' || code === 'auth/wrong-password') {
          message = 'Incorrect email or password. Please try again.';
        } else if (code === 'auth/user-not-found') {
          message = 'No account found for that email.';
        } else if (code === 'auth/invalid-email') {
          message = 'Please enter a valid email address.';
        } else if (code === 'auth/too-many-requests') {
          message = 'Too many attempts. Please wait a bit and try again.';
        } else if (code === 'auth/user-disabled') {
          message = 'This account has been disabled.';
        }

        setError(message);
      })
      .finally(() => setIsSubmitting(false));
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
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

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'LOGGING IN...' : 'LOG IN'}
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
