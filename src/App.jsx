import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import CustomTShirt from './pages/CustomTShirt';
import Products from './pages/Products';
import AdminDashboard from './pages/AdminDashboard';
import { useCart } from './context/CartContext';
import SeasonalParticles from './components/SeasonalParticles';
import ChatBot from './components/ChatBot';

const ProtectedRoute = ({ children }) => {
  const { user, loadingAuth } = useCart();
  
  if (loadingAuth) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#0a0a0a' }}>
        <div style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>LOADING...</div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { user, loadingAuth } = useCart();
  
  if (loadingAuth) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', background: '#0a0a0a' }}>
        <div style={{ fontSize: '1.2rem', letterSpacing: '2px' }}>LOADING...</div>
      </div>
    );
  }
  
  if (!user || user.email !== 'v3clothesbusiness@gmail.com') {
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamic Monthly Themes Logic
    const currentMonth = new Date().getMonth(); // 0 = Jan, 11 = Dec
    const root = document.documentElement;

    if (currentMonth === 3) {
      // April: Avurudu (New Year) - Orange/Yellow/Red
      root.style.setProperty('--primary', '#f59e0b'); // Amber
      root.style.setProperty('--primary-hover', '#d97706');
      root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #2a0800 0%, #5c1800 50%, #1a0500 100%)');
    } else if (currentMonth === 4) {
      // May: Vesak - Yellow/White
      root.style.setProperty('--primary', '#fde047'); // Yellow
      root.style.setProperty('--primary-hover', '#eab308');
      root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #1f1d00 0%, #423d00 50%, #121000 100%)');
    } else if (currentMonth === 1) {
      // February: Valentine's - Pink/Red
      root.style.setProperty('--primary', '#ec4899'); // Pink
      root.style.setProperty('--primary-hover', '#db2777');
      root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #2e0014 0%, #4a0024 50%, #17000a 100%)');
    } else if (currentMonth === 11) {
      // December: Christmas - Red/Green
      root.style.setProperty('--primary', '#ef4444'); // Red
      root.style.setProperty('--primary-hover', '#dc2626');
      root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #001f0c 0%, #003d18 50%, #001206 100%)');
    } else if (currentMonth === 9) {
      // October: Halloween - Orange/Dark
      root.style.setProperty('--primary', '#f97316'); // Orange
      root.style.setProperty('--primary-hover', '#ea580c');
      root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #1c0c00 0%, #3d1b00 50%, #0a0400 100%)');
    } else {
      // Default Theme (Reset to CSS defaults)
      root.style.removeProperty('--primary');
      root.style.removeProperty('--primary-hover');
      root.style.removeProperty('--bg-gradient');
    }

    // Show splash screen for 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            width: '100vw',
            height: '100vh',
            background: '#0a0a0a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
        >
          <motion.img 
            src="./logo.jpg.jpg" 
            alt="V3 Clothes Logo"
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: [0.8, 1.1, 1], opacity: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ 
              width: '150px', 
              height: '150px',
              objectFit: 'cover',
              borderRadius: '30px', 
              boxShadow: '0 0 40px rgba(79, 70, 229, 0.4)',
              border: '2px solid rgba(255,255,255,0.1)'
            }}
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ 
              marginTop: '30px', 
              color: '#fff', 
              fontSize: '1.8rem', 
              fontWeight: 'bold',
              letterSpacing: '3px'
            }}
          >
            V3 <span style={{ color: 'var(--primary)' }}>CLOTHES</span>
          </motion.div>
          <motion.div
             initial={{ width: 0 }}
             animate={{ width: "150px" }}
             transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
             style={{
               marginTop: '20px',
               height: '4px',
               background: 'var(--primary)',
               borderRadius: '10px'
             }}
          />
        </motion.div>
      ) : (
        <motion.div 
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Router>
            <div className="page-wrapper">
              <Navbar />
              <main className="main-content">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                    <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    <Route path="/customize" element={<ProtectedRoute><CustomTShirt /></ProtectedRoute>} />
                    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
              <ChatBot />
            </div>
          </Router>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
