
import React, { useState, useEffect } from 'react';

const MotionStudies = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.08);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {Array.from({ length: 6 }, (_, i) => (
        <div
          key={i}
          className="absolute border-2 border-gradient rounded-full"
          style={{
            width: `${50 + i * 25}px`,
            height: `${50 + i * 25}px`,
            transform: `rotate(${time * (i + 1) * 12}deg) scale(${1 + Math.sin(time + i) * 0.2})`,
            opacity: 0.8 - i * 0.1,
            borderColor: `hsl(${(time * 40 + i * 60) % 360}, 80%, 65%)`,
            filter: `drop-shadow(0 0 8px hsla(${(time * 40 + i * 60) % 360}, 80%, 65%, 0.6))`
          }}
        />
      ))}
      <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg" />
    </div>
  );
};

export default MotionStudies;
