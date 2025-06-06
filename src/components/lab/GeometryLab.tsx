
import React, { useState, useEffect } from 'react';

const GeometryLab = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.8);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: '800px' }}>
      <div 
        className="relative"
        style={{
          transform: `rotateX(${rotation * 0.3}deg) rotateY(${rotation}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {Array.from({ length: 6 }, (_, i) => (
          <div
            key={i}
            className="absolute w-16 h-16 md:w-20 md:h-20 border-2 border-gradient flex items-center justify-center text-white font-bold shadow-lg text-sm"
            style={{
              backgroundColor: `hsla(${i * 60 + rotation}, 80%, 60%, 0.3)`,
              boxShadow: `0 0 15px hsla(${i * 60 + rotation}, 80%, 60%, 0.5)`,
              transform: 
                i === 0 ? 'translateZ(32px)' :
                i === 1 ? 'rotateY(180deg) translateZ(32px)' :
                i === 2 ? 'rotateY(90deg) translateZ(32px)' :
                i === 3 ? 'rotateY(-90deg) translateZ(32px)' :
                i === 4 ? 'rotateX(90deg) translateZ(32px)' :
                'rotateX(-90deg) translateZ(32px)'
            }}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeometryLab;
