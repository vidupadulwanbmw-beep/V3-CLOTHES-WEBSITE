import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FcGoogle } from 'react-icons/fc';
import './Auth.css';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUpWithEmail, signInWithGoogle, user } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(name, email, password);
      // Let's redirect to login after successful signup so they can login after verifying
      navigate('/login');
    } catch (error) {
      // Error is already alerted in context
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ type: 'spring', damping: 15 }}
      className="auth-container container"
    >
      <div className="auth-box glass">
        <h2 className="auth-title">Join the Future</h2>
        <p className="auth-subtitle">Create an account to track orders and save favorites.</p>
        
        <form onSubmit={handleSignup} className="auth-form">
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input 
              type="text" 
              className="input-field" 
              required 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Neo"
            />
          </div>
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
          <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
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
          Sign up with Google
        </button>

        <div className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Login</Link>
        </div>
      </div>
    </motion.div>
  );
}
