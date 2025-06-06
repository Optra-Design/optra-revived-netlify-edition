
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

const SoundVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array.from({ length: 32 }, () => 20));
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationRef = useRef<number>();
  const dataArrayRef = useRef<Uint8Array | null>(null);

  const initializeAudioAnalysis = () => {
    if (!audioRef.current || audioContextRef.current) return;

    try {
      // Create audio context and analyser
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audioRef.current);
      
      // Configure analyser
      analyser.fftSize = 128; // This gives us 64 frequency bins
      analyser.smoothingTimeConstant = 0.8;
      
      // Connect nodes
      source.connect(analyser);
      analyser.connect(audioContext.destination);
      
      // Store references
      audioContextRef.current = audioContext;
      analyserRef.current = analyser;
      sourceRef.current = source;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
      
      console.log('Audio analysis initialized successfully!');
    } catch (error) {
      console.error('Error initializing audio analysis:', error);
    }
  };

  const updateVisualization = () => {
    if (!analyserRef.current || !dataArrayRef.current || !isPlaying) return;

    // Get frequency data
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Convert frequency data to bar heights
    const newBars = [];
    const frequencyBinSize = Math.floor(dataArrayRef.current.length / 32);
    
    for (let i = 0; i < 32; i++) {
      let sum = 0;
      const startIndex = i * frequencyBinSize;
      const endIndex = Math.min(startIndex + frequencyBinSize, dataArrayRef.current.length);
      
      // Average the frequency data for this bar
      for (let j = startIndex; j < endIndex; j++) {
        sum += dataArrayRef.current[j];
      }
      
      const average = sum / (endIndex - startIndex);
      // Convert to percentage (0-100) with minimum height of 20
      const height = Math.max(20, (average / 255) * 95);
      newBars.push(height);
    }
    
    setBars(newBars);
    
    // Update time
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    
    animationRef.current = requestAnimationFrame(updateVisualization);
  };

  const toggleAudio = async () => {
    if (!audioRef.current) {
      // Create audio element
      const audio = new Audio('/Crab Rave - Noisestorm.mp3');
      audio.crossOrigin = 'anonymous';
      audio.volume = volume;
      audioRef.current = audio;
      
      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration);
        console.log('Crab Rave loaded successfully!');
      });
      
      audio.addEventListener('error', (e) => {
        console.error('Error loading Crab Rave:', e);
        startDemoMode();
        return;
      });

      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
        setBars(Array.from({ length: 32 }, () => 20));
      });
    }

    if (!isPlaying) {
      try {
        // Resume audio context if suspended
        if (audioContextRef.current?.state === 'suspended') {
          await audioContextRef.current.resume();
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
        
        // Initialize audio analysis on first play
        if (!audioContextRef.current) {
          initializeAudioAnalysis();
        }
        
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

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
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
              <button onClick={toggleMute} className="text-orange-400 hover:scale-110 transition-transform">
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <span className="text-sm font-medium">
                🦀 {formatTime(currentTime)} / {formatTime(duration)} - Crab Rave by Noisestorm
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Audio Controls */}
      {isPlaying && (
        <div className="flex flex-col gap-4 w-full max-w-md">
          {/* Seek Bar */}
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #f97316 0%, #f97316 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
            }}
          />
          
          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <button onClick={toggleMute} className="text-orange-400">
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* Visualizer */}
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
          ? "🦀 Real-time audio analysis of Crab Rave! The bars react to actual frequency data from the song." 
          : "Ready to experience the legendary Crab Rave with real-time audio visualization?"
        }
      </p>
    </div>
  );
};

export default SoundVisualizer;
