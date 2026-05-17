import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { doc, setDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Mouse tracker
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Visitor Counter
    const incrementVisitor = async () => {
      try {
        const statsRef = doc(db, 'stats', 'global');
        await setDoc(statsRef, { visits: increment(1) }, { merge: true });
      } catch (e) {
        console.error("Error updating visits", e);
      }
    };
    incrementVisitor();

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
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            overflow: 'hidden'
          }}
        >
          {/* Floating Liquid Glass Theme Background */}
          {[...Array(6)].map((_, i) => {
            return (
              <motion.div
                key={`glass-${i}`}
                className="glass"
                initial={{
                  x: (Math.random() - 0.5) * window.innerWidth,
                  y: (Math.random() - 0.5) * window.innerHeight,
                  rotate: Math.random() * 360,
                  opacity: 0.1,
                  scale: Math.random() * 2 + 1,
                  width: `${Math.random() * 300 + 100}px`,
                  height: `${Math.random() * 300 + 100}px`,
                  borderRadius: Math.random() > 0.5 ? '50%' : '20px'
                }}
                animate={{
                  y: [null, (Math.random() - 0.5) * window.innerHeight],
                  rotate: [null, Math.random() * 360],
                  opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ 
                  duration: 15 + Math.random() * 10, 
                  repeat: Infinity, 
                  repeatType: "reverse", 
                  ease: "easeInOut" 
                }}
                style={{
                  position: 'absolute',
                  background: 'linear-gradient(135deg, rgba(255,0,60,0.1), rgba(0,0,0,0))',
                  border: '1px solid rgba(255,0,60,0.2)',
                  boxShadow: '0 0 30px rgba(255,0,60,0.1)',
                  zIndex: 1
                }}
              />
            );
          })}

          {/* Powder particles merging */}
          {[...Array(80)].map((_, i) => {
            const randomX = (Math.random() - 0.5) * (window.innerWidth || 1000);
            const randomY = (Math.random() - 0.5) * (window.innerHeight || 800);
            return (
              <motion.div
                key={i}
                initial={{ 
                  x: randomX, 
                  y: randomY,
                  opacity: 0,
                  scale: Math.random() * 2 + 0.5
                }}
                animate={{ 
                  x: 0, 
                  y: 0, 
                  opacity: [0, 1, 0], 
                  scale: 0 
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: "circIn", 
                  delay: Math.random() * 0.4 
                }}
                style={{
                  position: 'absolute',
                  width: '4px',
                  height: '4px',
                  background: 'var(--primary)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px var(--primary)'
                }}
              />
            );
          })}

          {/* Logo and Text that emerge from the powder */}
          <motion.div
            initial={{ opacity: 0, scale: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 1.0, duration: 0.8, type: "spring", stiffness: 100 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}
          >
            <motion.img 
              src="./logo.jpg.jpg" 
              alt="V3 Clothes Logo"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ delay: 1.2, duration: 0.5 }}
              style={{ 
                width: '150px', 
                height: '150px',
                objectFit: 'cover',
                borderRadius: '30px', 
                boxShadow: '0 0 40px rgba(255, 0, 60, 0.4)',
                border: '2px solid rgba(255,0,60,0.2)'
              }}
            />
            <div style={{ 
              marginTop: '30px', 
              color: '#fff', 
              fontSize: '2rem', 
              fontWeight: 'bold',
              letterSpacing: '5px'
            }}>
              V3 <span style={{ color: 'var(--primary)', textShadow: '0 0 15px var(--primary)' }}>CLOTHES</span>
            </div>
            <motion.div
               initial={{ width: 0 }}
               animate={{ width: "150px" }}
               transition={{ duration: 1.0, ease: "easeInOut", delay: 1.2 }}
               style={{
                 marginTop: '20px',
                 height: '4px',
                 background: 'var(--primary)',
                 borderRadius: '10px',
                 boxShadow: '0 0 10px var(--primary)'
               }}
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div 
          key="main-app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Custom Red Cursor Tracker (Global) */}
          <motion.div
            className="cursor-glow"
            animate={{
              x: mousePosition.x - 150,
              y: mousePosition.y - 150,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255,0,60,0.15) 0%, rgba(255,0,60,0) 70%)',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 9999, // High z-index so it stays on top of most things
            }}
          />
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
