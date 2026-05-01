import React, { useMemo } from 'react';
import './SeasonalParticles.css';

export default function SeasonalParticles() {
  const currentMonth = new Date().getMonth(); // 0 = Jan, 11 = Dec

  const getParticles = () => {
    switch (currentMonth) {
      case 3: // April: Avurudu
        return ['🪔', '🎆', '🥁', '🌾', '🔥'];
      case 4: // May: Vesak
        return ['🏮', '✨', '🕊️', '🌸', '🌕'];
      case 1: // February: Valentine's
        return ['❤️', '💖', '💘', '🌹', '💌'];
      case 11: // December: Christmas
        return ['❄️', '⛄', '🎄', '🎁', '✨'];
      case 9: // October: Halloween
        return ['🎃', '🦇', '👻', '🕸️', '🍬'];
      default:
        return [];
    }
  };

  const particles = getParticles();

  // If there are no particles for the current month, return null
  if (particles.length === 0) return null;

  // Generate random particles
  const particleArray = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      emoji: particles[Math.floor(Math.random() * particles.length)],
      left: `${Math.random() * 100}vw`,
      animationDuration: `${Math.random() * 10 + 5}s`, // Between 5s and 15s
      animationDelay: `${Math.random() * 10}s`,
      fontSize: `${Math.random() * 1.5 + 1}rem` // Between 1rem and 2.5rem
    }));
  }, [currentMonth]);

  return (
    <div className="particles-container">
      {particleArray.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            fontSize: p.fontSize
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
