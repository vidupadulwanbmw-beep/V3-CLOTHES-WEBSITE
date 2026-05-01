import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

export default function Navbar() {
  const { cart, user, logout } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
  };
  
  const langs = [
    { code: 'en', label: 'EN' },
    { code: 'si', label: 'SI' },
    { code: 'ta', label: 'TA' }
  ];
  
  const navLinks = [
    { name: t('home'), path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Customize', path: '/customize' }
  ];

  return (
    <nav className="navbar glass">
      <div className="container nav-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" className="brand" style={{ display: 'flex', alignItems: 'center' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 10 }}
          >
            <span className="brand-text" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>V3 <span style={{ color: 'var(--primary)' }}>Clothes</span></span>
          </motion.div>
        </Link>

        {/* Mobile Toggle */}
        <button 
          className="nav-toggle" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Desktop / Mobile Menu */}
        <ul className={`nav-links ${isOpen ? 'mobile-open' : ''}`} style={{ margin: 0, padding: 0 }}>
          {navLinks.map((link) => (
            <li key={link.path} style={{ position: 'relative' }}>
              <Link 
                to={link.path} 
                className={location.pathname === link.path ? 'nav-link active' : 'nav-link'}
              >
                {link.name}
              </Link>
              {location.pathname === link.path && (
                <motion.div
                  layoutId="liquidNav"
                  className="liquid-nav-glass"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </li>
          ))}
          {user && user.email === 'v3clothesbusiness@gmail.com' && (
            <li style={{ position: 'relative' }}>
              <Link 
                to="/admin" 
                className={location.pathname === '/admin' ? 'nav-link active' : 'nav-link'}
                style={{ color: 'var(--primary)', fontWeight: 'bold' }}
              >
                Add Products
              </Link>
            </li>
          )}
          {user ? (
            <>
              <li className="nav-user" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#fff' }}>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" style={{ width: '35px', height: '35px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary)' }} />
                ) : (
                  <div style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={20} color="#fff" />
                  </div>
                )}
                <span style={{ fontWeight: '500' }}>Hi, {user.name?.split(' ')[0] || 'User'}</span>
              </li>
              <li>
                <button onClick={logout} className="nav-btn" style={{ padding: '0.4rem 1rem' }}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="nav-btn">{t('login')}</Link></li>
              <li><Link to="/signup" className="nav-btn-highlight">{t('signup')}</Link></li>
            </>
          )}
          <li>
            <div className="pill-container" style={{ display: 'flex', gap: '5px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
              {langs.map((l) => (
                <div key={l.code} style={{ position: 'relative' }}>
                  <button 
                    onClick={() => changeLanguage(l.code)}
                    className={i18n.language === l.code ? 'pill-btn active' : 'pill-btn'}
                    style={{ position: 'relative', zIndex: 10, padding: '0.4rem 0.8rem', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontWeight: 'bold' }}
                  >
                    {l.label}
                  </button>
                  {i18n.language === l.code && (
                    <motion.div
                      layoutId="liquidLang"
                      className="liquid-nav-glass"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      style={{ borderRadius: '15px' }}
                    />
                  )}
                </div>
              ))}
            </div>
          </li>
          <li>
            <Link to="/cart" className="cart-link" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <ShoppingBag size={24} color="#fff" />
              {totalItems > 0 && (
                <motion.span 
                  className="cart-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={totalItems}
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'var(--primary)',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
