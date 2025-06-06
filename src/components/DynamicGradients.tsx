
import React, { useEffect, useState, useCallback } from 'react';

const DynamicGradients = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
    setIsActive(true);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const throttledMouseMove = (e: MouseEvent) => {
      handleMouseMove(e);
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsActive(false), 4000);
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      clearTimeout(timeout);
    };
  }, [handleMouseMove]);

  // More subtle, premium opacity values
  const baseOpacity = 0.08;
  const activeOpacity = 0.15;
  const currentOpacity = isActive ? activeOpacity : baseOpacity;

  const gradientStyle = {
    background: `
      radial-gradient(1200px circle at ${mousePosition.x}px ${mousePosition.y}px, 
        rgba(255, 107, 53, ${currentOpacity * 0.6}) 0%, 
        rgba(233, 30, 99, ${currentOpacity * 0.5}) 20%, 
        rgba(156, 39, 176, ${currentOpacity * 0.4}) 40%, 
        rgba(63, 81, 181, ${currentOpacity * 0.3}) 60%, 
        transparent 80%),
      radial-gradient(800px circle at ${mousePosition.x + 300}px ${mousePosition.y - 200}px,
        rgba(255, 193, 7, ${currentOpacity * 0.4}) 0%,
        rgba(76, 175, 80, ${currentOpacity * 0.3}) 50%,
        transparent 90%),
      radial-gradient(1000px circle at ${mousePosition.x - 200}px ${mousePosition.y + 200}px,
        rgba(3, 169, 244, ${currentOpacity * 0.5}) 0%,
        rgba(139, 69, 19, ${currentOpacity * 0.2}) 70%,
        transparent 95%),
      linear-gradient(135deg, 
        rgba(255, 107, 53, 0.03) 0%, 
        rgba(233, 30, 99, 0.04) 15%, 
        rgba(156, 39, 176, 0.03) 30%, 
        rgba(63, 81, 181, 0.03) 45%, 
        rgba(0, 150, 136, 0.02) 60%,
        rgba(255, 193, 7, 0.02) 75%,
        transparent 100%)
    `,
    transition: 'background 6s cubic-bezier(0.23, 1, 0.32, 1)',
    willChange: 'background',
  };

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-10"
      style={gradientStyle}
    />
  );
};

export default DynamicGradients;
