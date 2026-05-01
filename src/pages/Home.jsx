import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SeasonalParticles from '../components/SeasonalParticles';
import './Home.css';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getSeasonalGreeting = () => {
    const currentMonth = new Date().getMonth();
    switch (currentMonth) {
      case 3: return "සුබ අලුත් අවුරුද්දක් වේවා!"; // April
      case 4: return "සුබ වෙසක් මංගල්‍යයක් වේවා!"; // May
      case 1: return "Happy Valentine's Day!"; // February
      case 11: return "Merry Christmas & Happy New Year!"; // December
      case 9: return "Happy Halloween!"; // October
      default: return null;
    }
  };
  const seasonalGreeting = getSeasonalGreeting();

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
      <SeasonalParticles />
      
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

        <div className="container hero-content">
          <div className="hero-text">
            <motion.div variants={textVariants}>
              <h1 className="heading-xl">
                <span className="text-gradient">{t('hero_title')}</span>
              </h1>
            </motion.div>
            
            {seasonalGreeting && (
              <motion.div variants={textVariants}>
                <h3 className="seasonal-greeting" style={{ color: 'var(--primary)', marginBottom: '1rem', fontWeight: 'bold', letterSpacing: '1px' }}>
                  ✨ {seasonalGreeting} ✨
                </h3>
              </motion.div>
            )}
            
            <motion.div variants={textVariants}>
              <p className="hero-subtitle">
                {t('hero_subtitle')}
              </p>
            </motion.div>
            
            <motion.div variants={textVariants}>
              <motion.button 
                className="btn btn-primary hero-btn" 
                onClick={() => navigate('/products')}
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 25px rgba(157, 78, 221, 0.7)" }}
                whileTap={{ scale: 0.95 }}
              >
                {t('shop_now')}
              </motion.button>
            </motion.div>
          </div>

          <motion.div 
            variants={floatingImageVariants}
            className="hero-image-wrapper"
          >
            <motion.div animate={floatAnimation} className="image-float-container">
              <div className="image-glow"></div>
              <img 
                src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80" 
                alt="Fashion Hero" 
                className="hero-img glass" 
              />
            </motion.div>
          </motion.div>
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
