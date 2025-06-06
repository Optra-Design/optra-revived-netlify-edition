
import React, { useState, useEffect } from 'react';

const GridMorphing = () => {
  const [morph, setMorph] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMorph(prev => (prev + 0.04) % (Math.PI * 2));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-6 md:grid-cols-8 gap-1 md:gap-2 p-4 bg-black/10 rounded-lg shadow-2xl">
        {Array.from({ length: 48 }, (_, i) => {
          const row = Math.floor(i / 6);
          const col = i % 6;
          const distance = Math.sqrt((row - 3) ** 2 + (col - 2.5) ** 2);
          const scale = 1 + 0.3 * Math.sin(morph + distance * 0.4);
          const rotation = morph * 20 + distance * 15;
          const hue = (morph * 40 + distance * 25) % 360;
          
          return (
            <div
              key={i}
              className="w-4 h-4 md:w-5 md:h-5 rounded-sm shadow-lg"
              style={{
                background: `hsl(${hue}, 70%, 60%)`,
                transform: `scale(${scale}) rotate(${rotation}deg)`,
                transition: 'transform 0.1s ease-out',
                boxShadow: `0 0 8px hsla(${hue}, 70%, 60%, 0.6)`
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GridMorphing;
