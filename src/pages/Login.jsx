import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginWithEmail, signInWithGoogle } = useCart();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      navigate('/');
    } catch (error) {
      // Error is already alerted in context
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -50 }}
      transition={{ type: 'spring', damping: 15 }}
      className="auth-container container"
    >
      <div className="auth-box glass">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Login to access your futuristic wardrobe.</p>
        
        <form onSubmit={handleLogin} className="auth-form">
          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input 
              type="email" 
              className="input-field" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="cyber@punk.com"
            />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input 
              type="password" 
              className="input-field" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button>
        </form>

        <div className="auth-separator">
          <span>OR</span>
        </div>

        <button 
          type="button"
          className="btn btn-google btn-block"
          onClick={async () => {
            await signInWithGoogle();
            navigate('/');
          }}
        >
          <FcGoogle size={24} className="google-icon" />
          Login with Google
        </button>

        <div className="auth-footer">
          Don't have an account? <Link to="/signup" className="auth-link">Sign Up</Link>
        </div>
      </div>
    </motion.div>
  );
}
