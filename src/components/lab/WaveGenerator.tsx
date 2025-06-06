
import React, { useState, useEffect } from 'react';

const WaveGenerator = () => {
  const [frequency, setFrequency] = useState(1);
  const [amplitude, setAmplitude] = useState(40);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prev => prev + 0.08);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const generateWavePoints = () => {
    const points = [];
    for (let x = 0; x <= 320; x += 5) {
      const y = 120 + amplitude * Math.sin((x * frequency * 0.02) + time);
      points.push(`${x},${y}`);
    }
    return points.join(' ');
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <svg width="320" height="240" className="border border-white/20 rounded-lg bg-black/10 shadow-2xl">
        <polyline
          fill="none"
          stroke="url(#waveGradient)"
          strokeWidth="2"
          points={generateWavePoints()}
        />
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="50%" stopColor="#9C27B0" />
            <stop offset="100%" stopColor="#00BCD4" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="flex flex-col sm:flex-row gap-4 text-sm">
        <div className="flex items-center gap-2">
          <label className="text-foreground/70 min-w-[60px]">Frequency</label>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.1"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
            className="w-20 accent-purple-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-foreground/70 min-w-[60px]">Amplitude</label>
          <input
            type="range"
            min="20"
            max="60"
            step="5"
            value={amplitude}
            onChange={(e) => setAmplitude(Number(e.target.value))}
            className="w-20 accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default WaveGenerator;
