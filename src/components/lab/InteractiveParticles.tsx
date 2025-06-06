
import React, { useState, useEffect } from 'react';

interface InteractiveParticlesProps {
  mousePosition: { x: number; y: number };
}

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({ mousePosition }) => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number; size: number; color: string }>>([]);

  useEffect(() => {
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 300,
      y: Math.random() * 200,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 6 + 3,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`
    }));
    setParticles(initialParticles);
  }, []);

  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        const dx = mousePosition.x - (particle.x + 150);
        const dy = mousePosition.y - (particle.y + 150);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let newVx = particle.vx;
        let newVy = particle.vy;
        
        if (distance < 100) {
          const force = (100 - distance) / 100 * 0.002;
          newVx += dx * force;
          newVy += dy * force;
        }
        
        return {
          ...particle,
          x: (particle.x + newVx + 300) % 300,
          y: (particle.y + newVy + 200) % 200,
          vx: newVx * 0.99,
          vy: newVy * 0.99,
        };
      }));
    };

    const interval = setInterval(animateParticles, 20);
    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <div className="relative w-80 h-56 border border-white/20 rounded-lg overflow-hidden bg-black/10 shadow-2xl">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            transition: 'all 0.1s ease-out'
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveParticles;
