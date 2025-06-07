import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause } from 'lucide-react';

const SoundVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 32 }, () => 20));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [audioError, setAudioError] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number>();
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const previousBarsRef = useRef<number[]>(Array.from({ length: 32 }, () => 20));

  // Initialize audio element on component mount
  useEffect(() => {
    const initAudio = () => {
      try {
        const audio = new Audio();
        audio.src = '/Crab Rave - Noisestorm.mp3';
        audio.volume = 0.7;
        audio.preload = 'metadata';
        audio.crossOrigin = 'anonymous';
        
        audio.addEventListener('loadedmetadata', () => {
          setDuration(audio.duration);
          setAudioLoaded(true);
          setAudioError(false);
          console.log('Crab Rave loaded successfully! Duration:', audio.duration);
        });
        
        audio.addEventListener('error', (e) => {
          console.error('Error loading Crab Rave:', e);
          setAudioError(true);
          setAudioLoaded(false);
        });

        audio.addEventListener('ended', () => {
          setIsPlaying(false);
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
          }
          setBars(Array.from({ length: 32 }, () => 20));
          setCurrentTime(0);
        });

        audio.addEventListener('timeupdate', () => {
          setCurrentTime(audio.currentTime);
        });
        
        audioRef.current = audio;
      } catch (error) {
        console.error('Failed to initialize audio:', error);
        setAudioError(true);
      }
    };

    initAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const initializeAudioAnalysis = useCallback(async () => {
    if (!audioRef.current || audioContextRef.current) return false;

    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }
      
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      
      // Refined settings for smoother visualization
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.85;
      analyser.minDecibels = -90;
      analyser.maxDecibels = -10;
      
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      
      console.log('Audio analysis initialized successfully!');
      return true;
    } catch (error) {
      console.error('Error initializing audio analysis:', error);
      return false;
    }
  }, []);

  const updateVisualization = useCallback(() => {
    if (!analyserRef.current || !dataArrayRef.current || !isPlaying) {
      return;
    }

    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    const newBars = [];
    const binCount = dataArrayRef.current.length;
    const barsCount = 32;
    const previousBars = previousBarsRef.current;
    
    for (let i = 0; i < barsCount; i++) {
      // Linear frequency distribution for better coverage
      const binIndex = Math.floor((i / (barsCount - 1)) * (binCount - 1));
      const rawValue = dataArrayRef.current[binIndex];
      
      // Normalize to 0-1 range with adjusted sensitivity
      let normalizedValue = rawValue / 255;
      
      // Apply frequency-specific adjustments
      if (i < 8) {
        // Bass frequencies - moderate boost
        normalizedValue *= 1.1;
      } else if (i > 20) {
        // High frequencies - stronger boost
        normalizedValue *= 1.4;
      }
      
      // Convert to height percentage with controlled range
      let height = normalizedValue * 60 + 20; // Range: 20-80%
      
      // Smooth transitions to prevent sudden jumps
      const previousHeight = previousBars[i] || 20;
      const maxChange = 8; // Maximum change per frame
      
      if (Math.abs(height - previousHeight) > maxChange) {
        if (height > previousHeight) {
          height = previousHeight + maxChange;
        } else {
          height = previousHeight - maxChange;
        }
      }
      
      // Ensure reasonable bounds
      height = Math.max(15, Math.min(75, height));
      newBars.push(height);
    }
    
    previousBarsRef.current = newBars;
    setBars(newBars);
    animationRef.current = requestAnimationFrame(updateVisualization);
  }, [isPlaying]);

  const startDemoMode = useCallback(() => {
    console.log('Starting demo mode with animated bars...');
    
    const animate = () => {
      const time = Date.now() * 0.003;
      setBars(prev => prev.map((_, i) => {
        const wave1 = Math.sin(time * 2 + i * 0.5) * 25 + 45;
        const wave2 = Math.sin(time * 1.5 + i * 0.3) * 20 + 35;
        const wave3 = Math.sin(time * 2.5 + i * 0.8) * 15 + 25;
        return Math.max(20, Math.min(85, (wave1 + wave2 + wave3) / 3));
      }));
      
      if (isPlaying && audioError) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    if (audioError) {
      animate();
    }
  }, [isPlaying, audioError]);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      try {
        if (!audioContextRef.current) {
          const initialized = await initializeAudioAnalysis();
          if (!initialized && !audioError) {
            console.warn('Audio analysis failed to initialize');
          }
        }
        
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
        
        if (analyserRef.current && !audioError) {
          updateVisualization();
        } else {
          startDemoMode();
        }
        
      } catch (error) {
        console.error('Error playing audio:', error);
        setIsPlaying(true);
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

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      if (analyserRef.current && !audioError) {
        updateVisualization();
      } else {
        startDemoMode();
      }
    }
  }, [isPlaying, updateVisualization, startDemoMode, audioError]);

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
          disabled={!audioLoaded && !audioError}
          className={`flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
            isPlaying
              ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-red-500/25'
              : audioError
              ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-yellow-500/25'
              : 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-orange-500/25'
          } ${(!audioLoaded && !audioError) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isPlaying ? (
            <>
              <Pause className="w-6 h-6" />
              Stop {audioError ? 'Demo' : 'Crab Rave'}
            </>
          ) : (
            <>
              <Play className="w-6 h-6" />
              🦀 Play {audioError ? 'Demo Mode' : 'Crab Rave'} 🦀
            </>
          )}
        </button>
        
        {isPlaying && (
          <div className="flex items-center gap-3 text-foreground/70">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">
                🦀 {formatTime(currentTime)} / {formatTime(duration)} - {audioError ? 'Demo Mode' : 'Crab Rave by Noisestorm'}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Visualizer */}
      <div className="flex items-end gap-2 h-64 bg-gradient-to-b from-orange-900/20 to-red-900/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-orange-400/20">
        {bars.map((height, i) => (
          <div
            key={i}
            className="w-4 rounded-t-xl transition-all duration-100 ease-out"
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
        {audioError 
          ? "🚧 Audio file not accessible - showing demo visualization with animated bars"
          : isPlaying 
            ? "🦀 Real-time audio analysis of Crab Rave! The bars react to actual frequency data from the song." 
            : audioLoaded
              ? "Ready to experience the legendary Crab Rave with real-time audio visualization?"
              : "Loading Crab Rave..."
        }
      </p>
    </div>
  );
};

export default SoundVisualizer;
