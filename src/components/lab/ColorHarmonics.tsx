
import React, { useState, useEffect } from 'react';

const ColorHarmonics = () => {
  const [hue, setHue] = useState(0);
  const [pattern, setPattern] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHue(prev => (prev + 0.8) % 360);
      setPattern(prev => (prev + 0.3) % 100);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-4">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="w-8 h-8 md:w-12 md:h-12 rounded-lg transition-all duration-1000 hover:scale-110 cursor-pointer shadow-lg"
            style={{
              backgroundColor: `hsl(${(hue + i * 18) % 360}, ${70 + Math.sin(pattern + i) * 15}%, ${60 + Math.cos(pattern + i) * 10}%)`,
              transform: `rotate(${hue + i * 3}deg) scale(${1 + Math.sin(pattern + i) * 0.1})`,
              boxShadow: `0 0 15px hsla(${(hue + i * 18) % 360}, 70%, 60%, 0.4)`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorHarmonics;
