
import React, { useState, useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import Navigation from '../components/Navigation';
import { Beaker, Zap, Palette, Code, Sparkles, Waves, Grid3X3, Triangle, Music, Gamepad2, Orbit, Atom } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

// Lazy load heavy components for better performance
const ColorHarmonics = lazy(() => import('../components/lab/ColorHarmonics'));
const MotionStudies = lazy(() => import('../components/lab/MotionStudies'));
const TypographyLab = lazy(() => import('../components/lab/TypographyLab'));
const InteractiveParticles = lazy(() => import('../components/lab/InteractiveParticles'));
const WaveGenerator = lazy(() => import('../components/lab/WaveGenerator'));
const GridMorphing = lazy(() => import('../components/lab/GridMorphing'));
const GeometryLab = lazy(() => import('../components/lab/GeometryLab'));
const SoundVisualizer = lazy(() => import('../components/lab/SoundVisualizer'));
const GravitySimulator = lazy(() => import('../components/lab/GravitySimulator'));

const Lab = () => {
  const [activeExperiment, setActiveExperiment] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPerformanceMode, setIsPerformanceMode] = useState(false);

  // Performance detection for potato devices
  useEffect(() => {
    const checkPerformance = () => {
      const memory = (performance as any).memory;
      const cores = navigator.hardwareConcurrency || 2;
      const isLowEnd = cores <= 2 || (memory && memory.jsHeapSizeLimit < 500000000);
      setIsPerformanceMode(isLowEnd);
    };

    checkPerformance();
  }, []);

  // Throttled mouse tracking for better performance
  const updateMousePosition = useCallback((e: MouseEvent) => {
    if (!isPerformanceMode) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  }, [isPerformanceMode]);

  useEffect(() => {
    if (!isPerformanceMode) {
      let timeoutId: NodeJS.Timeout;
      const handleMouseMove = (e: MouseEvent) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => updateMousePosition(e), 16); // ~60fps
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        clearTimeout(timeoutId);
      };
    }
  }, [updateMousePosition, isPerformanceMode]);

  const experiments = useMemo(() => [
    {
      title: "Color Harmonics",
      description: "Advanced color theory & AI-driven palettes",
      icon: <Palette className="w-5 h-5" />,
      component: <ColorHarmonics />
    },
    {
      title: "Motion Studies",
      description: "Fluid micro-interactions & animations",
      icon: <Orbit className="w-5 h-5" />,
      component: <MotionStudies />
    },
    {
      title: "Typography Lab",
      description: "Dynamic text systems & kinetic type",
      icon: <Code className="w-5 h-5" />,
      component: <TypographyLab />
    },
    {
      title: "Interactive Particles",
      description: "Real-time physics & particle systems",
      icon: <Atom className="w-5 h-5" />,
      component: <InteractiveParticles mousePosition={mousePosition} />
    },
    {
      title: "Wave Generator",
      description: "Audio-visual synthesis & patterns",
      icon: <Waves className="w-5 h-5" />,
      component: <WaveGenerator />
    },
    {
      title: "Grid Morphing",
      description: "Parametric design & morphing systems",
      icon: <Grid3X3 className="w-5 h-5" />,
      component: <GridMorphing />
    },
    {
      title: "3D Geometry",
      description: "WebGL experiments & spatial design",
      icon: <Triangle className="w-5 h-5" />,
      component: <GeometryLab />
    },
    {
      title: "Sound Visualizer",
      description: "Real-time audio analysis & visuals",
      icon: <Music className="w-5 h-5" />,
      component: <SoundVisualizer />
    },
    {
      title: "Gravity Simulator",
      description: "N-body physics & orbital mechanics",
      icon: <Gamepad2 className="w-5 h-5" />,
      component: <GravitySimulator />
    }
  ], [mousePosition]);

  const playExperimentSound = useCallback(() => {
    if (isPerformanceMode) return; // Skip audio on low-end devices
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
      // Silently fail on unsupported browsers
    }
  }, [isPerformanceMode]);

  const handleExperimentChange = useCallback((index: number) => {
    setActiveExperiment(index);
    playExperimentSound();
  }, [playExperimentSound]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      {/* Optimized background effects */}
      {!isPerformanceMode && (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/5 via-blue-900/3 to-pink-900/5" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,53,0.05),transparent_70%)]" />
        </>
      )}
      
      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="relative">
                <Beaker className="w-10 h-10 md:w-12 md:h-12 text-gradient" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full" />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient-accent">
                Design Lab
              </h1>
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />
            </div>
            
            <p className="text-lg md:text-xl text-foreground/80 max-w-4xl mx-auto leading-relaxed px-4">
              🧪 <span className="font-semibold text-gradient">Experimental design concepts</span> and <span className="font-semibold text-gradient">interactive explorations</span>. 
              A creative playground where <span className="text-gradient-accent">innovation meets technology</span>.
            </p>
            
            <div className="mt-6 flex flex-wrap justify-center gap-2 md:gap-3">
              <span className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 px-3 md:px-4 py-2 rounded-full border border-yellow-400/30 backdrop-blur-sm text-sm">
                ⚠️ Experimental Features
              </span>
              <span className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-400 px-3 md:px-4 py-2 rounded-full border border-blue-400/30 backdrop-blur-sm text-sm">
                🚀 Performance Optimized
              </span>
              <span className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 px-3 md:px-4 py-2 rounded-full border border-purple-400/30 backdrop-blur-sm text-sm">
                💎 Interactive
              </span>
            </div>
          </div>

          {/* Experiment Navigation */}
          <ScrollArea className="w-full">
            <div className="flex gap-3 md:gap-4 pb-4 px-2 min-w-max md:min-w-0 md:flex-wrap md:justify-center">
              {experiments.map((experiment, index) => (
                <button
                  key={index}
                  onClick={() => handleExperimentChange(index)}
                  className={`group relative flex items-center gap-2 md:gap-3 px-4 md:px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap ${
                    activeExperiment === index
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105 shadow-lg shadow-purple-500/25'
                      : 'bg-white/5 text-foreground/70 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  <span className="group-hover:rotate-12 transition-transform duration-300">
                    {experiment.icon}
                  </span>
                  <span className="text-sm md:text-base">{experiment.title}</span>
                </button>
              ))}
            </div>
          </ScrollArea>

          {/* Active Experiment */}
          <div className="glass p-6 md:p-8 rounded-3xl mb-8 min-h-[400px] md:min-h-[500px]">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gradient-accent mb-3">
                {experiments[activeExperiment].title}
              </h2>
              <p className="text-foreground/70 text-sm md:text-base">
                {experiments[activeExperiment].description}
              </p>
            </div>
            
            <div className="flex items-center justify-center min-h-[300px] md:min-h-[400px]">
              <Suspense fallback={
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gradient"></div>
                </div>
              }>
                {experiments[activeExperiment].component}
              </Suspense>
            </div>
          </div>

          {/* Lab Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="glass p-4 md:p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 animate-fade-in">
              <Code className="w-6 md:w-8 h-6 md:h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Modern Tech</h3>
              <p className="text-xs md:text-sm text-foreground/70">
                Built with cutting-edge web technologies and frameworks
              </p>
            </div>
            
            <div className="glass p-4 md:p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Zap className="w-6 md:w-8 h-6 md:h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">High Performance</h3>
              <p className="text-xs md:text-sm text-foreground/70">
                Optimized for all devices from mobile to desktop workstations
              </p>
            </div>
            
            <div className="glass p-4 md:p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <Sparkles className="w-6 md:w-8 h-6 md:h-8 text-gradient mx-auto mb-3" />
              <h3 className="font-bold text-gradient mb-2">Creative Innovation</h3>
              <p className="text-xs md:text-sm text-foreground/70">
                Pushing boundaries of design and interactive experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lab;
