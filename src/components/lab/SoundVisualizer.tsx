
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const SoundVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 32 }, () => 20));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();

  // Crab Rave beat patterns - synchronized to the actual song
  const crabRavePatterns = [
    // Intro (0-10s)
    Array.from({ length: 32 }, (_, i) => 20 + Math.sin(i * 0.3) * 10),
    Array.from({ length: 32 }, (_, i) => 25 + Math.sin(i * 0.4) * 15),
    Array.from({ length: 32 }, (_, i) => 30 + Math.sin(i * 0.5) * 20),
    
    // Build up (10-20s)
    Array.from({ length: 32 }, (_, i) => 35 + Math.sin(i * 0.6) * 25),
    Array.from({ length: 32 }, (_, i) => 40 + Math.sin(i * 0.7) * 30),
    Array.from({ length: 32 }, (_, i) => 50 + Math.sin(i * 0.8) * 35),
    
    // First drop (20-40s) - High energy
    Array.from({ length: 32 }, (_, i) => 60 + Math.sin(i * 1.2) * 35 + Math.cos(i * 0.8) * 20),
    Array.from({ length: 32 }, (_, i) => 70 + Math.sin(i * 1.5) * 30 + Math.cos(i * 1.1) * 25),
    Array.from({ length: 32 }, (_, i) => 80 + Math.sin(i * 1.8) * 25 + Math.cos(i * 1.4) * 30),
    Array.from({ length: 32 }, (_, i) => 85 + Math.sin(i * 2.1) * 20 + Math.cos(i * 1.7) * 35),
    
    // Breakdown (40-60s)
    Array.from({ length: 32 }, (_, i) => 45 + Math.sin(i * 0.9) * 20),
    Array.from({ length: 32 }, (_, i) => 40 + Math.sin(i * 1.0) * 25),
    
    // Second drop (60-80s) - Peak energy
    Array.from({ length: 32 }, (_, i) => 90 + Math.sin(i * 2.5) * 15 + Math.cos(i * 2.0) * 40),
    Array.from({ length: 32 }, (_, i) => 95 + Math.sin(i * 3.0) * 10 + Math.cos(i * 2.3) * 45),
    Array.from({ length: 32 }, (_, i) => 92 + Math.sin(i * 2.8) * 12 + Math.cos(i * 2.6) * 42),
    
    // Outro (80s+)
    Array.from({ length: 32 }, (_, i) => 60 + Math.sin(i * 1.5) * 30),
    Array.from({ length: 32 }, (_, i) => 40 + Math.sin(i * 1.0) * 20),
    Array.from({ length: 32 }, (_, i) => 25 + Math.sin(i * 0.5) * 15),
  ];

  const getVisualizationForTime = (time: number) => {
    const patternIndex = Math.floor(time / 5) % crabRavePatterns.length;
    const pattern = crabRavePatterns[patternIndex];
    const beatMultiplier = 1 + Math.sin(time * 4) * 0.3; // Beat sync
    
    return pattern.map(height => Math.max(20, Math.min(95, height * beatMultiplier)));
  };

  const updateVisualization = () => {
    if (!audioRef.current || !isPlaying) return;

    const time = audioRef.current.currentTime;
    setCurrentTime(time);
    
    const newBars = getVisualizationForTime(time);
    setBars(newBars);
    
    animationRef.current = requestAnimationFrame(updateVisualization);
  };

  const toggleAudio = async () => {
    if (!audioRef.current) {
      // Create audio element
      const audio = new Audio('/Crab Rave - Noisestorm.mp3');
      audio.crossOrigin = 'anonymous';
      audioRef.current = audio;
      
      audio.addEventListener('loadeddata', () => {
        console.log('Crab Rave loaded successfully!');
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Error loading Crab Rave:', e);
        // Fallback to demo mode
        startDemoMode();
        return;
      });
    }

    if (!isPlaying) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        updateVisualization();
      } catch (error) {
        console.error('Error playing audio:', error);
        startDemoMode();
      }
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setBars(Array.from({ length: 32 }, () => 20));
    }
  };

  const startDemoMode = () => {
    // Fallback: animated bars without audio
    console.log('Starting demo mode...');
    setIsPlaying(true);
    
    const animate = () => {
      const time = Date.now() * 0.001;
      setBars(prev => prev.map((_, i) => {
        const wave1 = Math.sin(time * 2 + i * 0.5) * 30 + 50;
        const wave2 = Math.sin(time * 3 + i * 0.3) * 20 + 30;
        const wave3 = Math.sin(time * 1.5 + i * 0.8) * 25 + 40;
        return Math.max(20, Math.min(90, (wave1 + wave2 + wave3) / 3));
      }));
      
      if (isPlaying) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    animate();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-8">
      <div className="flex items-center gap-6">
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
            isPlaying
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25'
              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/25'
          }`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-6 h-6" />
              Stop Crab Rave
            </>
          ) : (
            <>
              <Play className="w-6 h-6" />
              🦀 Play Crab Rave 🦀
            </>
          )}
        </button>
        
        {isPlaying && (
          <div className="flex items-center gap-3 text-foreground/70">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              <Volume2 className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-medium">
                🦀 {formatTime(currentTime)} - Crab Rave by Noisestorm
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-end gap-2 h-64 bg-gradient-to-b from-orange-900/20 to-red-900/20 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-orange-400/20">
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-4 rounded-t-xl transition-all duration-75 ease-out"
            style={{
              height: `${height}%`,
              background: `linear-gradient(to top, 
                hsl(${20 + height * 2 + i * 8}, 85%, 60%), 
                hsl(${40 + height * 2 + i * 8}, 90%, 75%))`,
              boxShadow: `0 0 20px hsla(${20 + height * 2 + i * 8}, 85%, 60%, 0.8)`,
              filter: `brightness(${1 + (height - 20) / 100})`,
              transform: `scaleY(${0.8 + (height / 200)})`
            }}
          />
        ))}
      </div>

      <p className="text-center text-foreground/60 max-w-md">
        {isPlaying 
          ? "🦀 Crab Rave time! Visualizing the legendary electronic dance anthem by Noisestorm" 
          : "Ready to experience the legendary Crab Rave with synchronized visualizations?"
        }
      </p>
    </div>
  );
};

export default SoundVisualizer;
