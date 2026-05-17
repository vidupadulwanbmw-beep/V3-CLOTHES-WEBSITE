import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
import './Home.css';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2, 
        delayChildren: 0.3 
      }
    },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100, bounce: 0.4 }
    }
  };

  const floatingImageVariants = {
    hidden: { scale: 0.8, opacity: 0, rotate: -5 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      rotate: 0,
      transition: { 
        type: 'spring', 
        damping: 15, 
        stiffness: 80,
        duration: 1
      }
    }
  };

  const floatAnimation = {
    y: [-15, 15],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden" 
      animate="visible" 
      exit="exit"
      className="home-page"
    >
      <div className="hero-section">
        {/* Animated background elements */}
        <motion.div 
          className="bg-shape shape-1"
          animate={{ x: [-20, 30, -20], y: [-20, 20, -20], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="bg-shape shape-2"
          animate={{ x: [20, -30, 20], y: [20, -20, 20], rotate: [0, -90, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />

        <div className="container hero-content" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="hero-text" style={{ textAlign: 'center', width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.div variants={textVariants}>
              <h1 className="heading-xl">
                <span className="text-gradient">{t('hero_title')}</span>
              </h1>
            </motion.div>
            
            <motion.div variants={textVariants}>
              <p className="hero-subtitle">
                {t('hero_subtitle')}
              </p>
            </motion.div>
            
            <motion.div variants={textVariants}>
              <motion.button 
                className="btn btn-primary hero-btn" 
                onClick={() => navigate('/products')}
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(255, 0, 60, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                style={{ marginTop: '1rem', padding: '1rem 3rem', fontSize: '1.2rem', borderRadius: '50px' }}
              >
                {t('shop_now')}
              </motion.button>
            </motion.div>

            {/* Follow Us Section */}
            <motion.div variants={textVariants} style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginBottom: '1.5rem', letterSpacing: '3px', textTransform: 'uppercase' }}>Follow Us</h3>
              <div style={{ display: 'flex', gap: '20px' }}>
                <motion.a 
                  href="https://www.facebook.com/share/1DrkbUZau7/" target="_blank" rel="noreferrer"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 10, 
                    background: 'rgba(24, 119, 242, 0.4)',
                    boxShadow: '0 0 25px rgba(24, 119, 242, 0.8), inset 0 0 15px rgba(24, 119, 242, 0.5)',
                    borderColor: 'rgba(24, 119, 242, 1)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  style={{ 
                    color: '#fff', fontSize: '1.8rem', transition: 'all 0.3s ease',
                    width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(24, 119, 242, 0.15)', border: '1px solid rgba(24, 119, 242, 0.6)',
                    boxShadow: '0 0 15px rgba(24, 119, 242, 0.4), inset 0 0 10px rgba(24, 119, 242, 0.2)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'
                  }}
                >
                  <FaFacebook />
                </motion.a>

                <motion.a 
                  href="https://www.instagram.com/v3clothes.business?igsh=ODAxOWtkaWhmYmJz" target="_blank" rel="noreferrer"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: -10, 
                    background: 'rgba(225, 48, 108, 0.4)',
                    boxShadow: '0 0 25px rgba(225, 48, 108, 0.8), inset 0 0 15px rgba(225, 48, 108, 0.5)',
                    borderColor: 'rgba(225, 48, 108, 1)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  style={{ 
                    color: '#fff', fontSize: '1.8rem', transition: 'all 0.3s ease',
                    width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(225, 48, 108, 0.15)', border: '1px solid rgba(225, 48, 108, 0.6)',
                    boxShadow: '0 0 15px rgba(225, 48, 108, 0.4), inset 0 0 10px rgba(225, 48, 108, 0.2)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'
                  }}
                >
                  <FaInstagram />
                </motion.a>

                <motion.a 
                  href="https://www.tiktok.com/@v3.clothes?_r=1&_t=ZS-95rcPcdvpbU" target="_blank" rel="noreferrer"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 10, 
                    background: 'rgba(0, 242, 254, 0.4)',
                    boxShadow: '0 0 25px rgba(0, 242, 254, 0.8), inset 0 0 15px rgba(0, 242, 254, 0.5)',
                    borderColor: 'rgba(0, 242, 254, 1)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  style={{ 
                    color: '#fff', fontSize: '1.8rem', transition: 'all 0.3s ease',
                    width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0, 242, 254, 0.15)', border: '1px solid rgba(0, 242, 254, 0.6)',
                    boxShadow: '0 0 15px rgba(0, 242, 254, 0.4), inset 0 0 10px rgba(0, 242, 254, 0.2)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'
                  }}
                >
                  <FaTiktok />
                </motion.a>

                <motion.a 
                  href="https://wa.me/94706461066" target="_blank" rel="noreferrer"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: -10, 
                    background: 'rgba(37, 211, 102, 0.4)',
                    boxShadow: '0 0 25px rgba(37, 211, 102, 0.8), inset 0 0 15px rgba(37, 211, 102, 0.5)',
                    borderColor: 'rgba(37, 211, 102, 1)'
                  }}
                  whileTap={{ scale: 0.9 }}
                  style={{ 
                    color: '#fff', fontSize: '1.8rem', transition: 'all 0.3s ease',
                    width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(37, 211, 102, 0.15)', border: '1px solid rgba(37, 211, 102, 0.6)',
                    boxShadow: '0 0 15px rgba(37, 211, 102, 0.4), inset 0 0 10px rgba(37, 211, 102, 0.2)',
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)'
                  }}
                >
                  <FaWhatsapp />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="about-section container" style={{ paddingBottom: '4rem' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 80 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="glass about-card"
        >
          <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>
            <span className="text-gradient">{t('about_title')}</span>
          </h2>
          <p className="about-text">
            {t('about_desc')}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
