
import React, { useState, useEffect } from 'react';

const TypographyLab = () => {
  const [currentText, setCurrentText] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const texts = ['OPTRA', 'DESIGN', 'LAB', 'PREMIUM', 'CLIENT', 'READY'];

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => {
        setCurrentText(prev => (prev + 1) % texts.length);
        setGlitch(false);
      }, 150);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div 
        className={`text-3xl md:text-5xl lg:text-6xl font-black text-gradient-accent transition-all duration-200 ${
          glitch ? 'filter blur-sm scale-110' : 'hover:scale-105'
        }`}
        style={{
          textShadow: glitch ? '2px 2px 0px #ff0066, -2px -2px 0px #00ff66' : '0 0 20px rgba(255, 107, 53, 0.3)',
        }}
      >
        {texts[currentText]}
      </div>
    </div>
  );
};

export default TypographyLab;
