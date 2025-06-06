
import React, { useState, useEffect } from 'react';

const GravitySimulator = () => {
  const [balls, setBalls] = useState<Array<{ x: number; y: number; vx: number; vy: number; color: string }>>([]);
  
  useEffect(() => {
    const initialBalls = Array.from({ length: 6 }, () => ({
      x: Math.random() * 280 + 20,
      y: Math.random() * 180 + 20,
      vx: (Math.random() - 0.5) * 3,
      vy: (Math.random() - 0.5) * 3,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }));
    setBalls(initialBalls);
  }, []);

  useEffect(() => {
    const simulate = () => {
      setBalls(prev => prev.map(ball => {
        let newX = ball.x + ball.vx;
        let newY = ball.y + ball.vy;
        let newVx = ball.vx;
        let newVy = ball.vy + 0.15; // gravity

        // Bounce off walls
        if (newX <= 8 || newX >= 312) {
          newVx = -newVx * 0.8;
          newX = newX <= 8 ? 8 : 312;
        }
        if (newY <= 8 || newY >= 232) {
          newVy = -newVy * 0.8;
          newY = newY <= 8 ? 8 : 232;
        }

        return { ...ball, x: newX, y: newY, vx: newVx, vy: newVy };
      }));
    };

    const interval = setInterval(simulate, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-80 h-60 border border-white/20 rounded-lg bg-black/10 shadow-2xl overflow-hidden">
      {balls.map((ball, i) => (
        <div
          key={i}
          className="absolute w-5 h-5 rounded-full shadow-lg"
          style={{
            left: `${ball.x}px`,
            top: `${ball.y}px`,
            background: ball.color,
            boxShadow: `0 0 12px ${ball.color}`,
            transition: 'all 0.02s linear'
          }}
        />
      ))}
    </div>
  );
};

export default GravitySimulator;
