
import React, { useEffect, useState } from 'react';

const ParallaxBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Parallax gradient layers */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-pink-500/5 to-purple-600/5"
        style={{
          transform: `translateY(${scrollY * 0.2}px) translateX(${mousePosition.x * 0.1}px)`
        }}
      />
      
      <div 
        className="absolute inset-0 bg-gradient-to-tl from-blue-500/3 via-cyan-500/3 to-green-500/3"
        style={{
          transform: `translateY(${scrollY * -0.1}px) translateX(${mousePosition.y * 0.05}px)`
        }}
      />

      {/* Floating geometric shapes */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        style={{
          top: '10%',
          left: '10%',
          transform: `translateY(${scrollY * 0.15}px) translateX(${mousePosition.x * 0.08}px)`
        }}
      />
      
      <div 
        className="absolute w-72 h-72 bg-gradient-to-r from-orange-500/8 to-yellow-500/8 rounded-full blur-3xl"
        style={{
          top: '60%',
          right: '15%',
          transform: `translateY(${scrollY * -0.12}px) translateX(${mousePosition.y * -0.06}px)`
        }}
      />

      <div 
        className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500/6 to-blue-500/6 rounded-full blur-3xl"
        style={{
          bottom: '20%',
          left: '20%',
          transform: `translateY(${scrollY * 0.08}px) translateX(${mousePosition.x * -0.04}px)`
        }}
      />

      {/* Animated particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `translateY(${scrollY * (0.05 + i * 0.01)}px)`,
            animationDelay: `${i * 0.1}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );
};

export default ParallaxBackground;
