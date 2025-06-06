
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, ArrowLeft, Zap, RotateCw, Sparkles, GamepadIcon, Eye, Brain } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();
  const [glitchText, setGlitchText] = useState('404');
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; velocity: { x: number; y: number } }>>([]);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [secretClicks, setSecretClicks] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [mouseTrail, setMouseTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);
  const [matrixRain, setMatrixRain] = useState<Array<{ id: number; x: number; y: number; speed: number; char: string }>>([]);
  const [aiThinking, setAiThinking] = useState(false);

  // Sound Effects
  const playGlitchSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(100, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.1);
      oscillator.frequency.exponentialRampToValueAtTime(50, audioContext.currentTime + 0.3);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playExplosionSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'square';
      oscillator.frequency.setValueAtTime(150, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(30, audioContext.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playMagicSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const notes = [523, 659, 784, 1047, 1319]; // C, E, G, C, E
      notes.forEach((freq, i) => {
        setTimeout(() => {
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.3);
        }, i * 80);
      });
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playWhooshSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.6);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.6);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playClickSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  useEffect(() => {
    console.error(
      "🚨 404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Play initial error sound
    playGlitchSound();

    // Enhanced glitch effect for 404 text
    const glitchInterval = setInterval(() => {
      const glitchOptions = [
        '404', '4∅4', '4Ø4', '₄0₄', '404', '╔═╗', '███', '┬ ┬┬', '├─┤', '░▒▓',
        '4̴0̷4̸', '▓▒░', '◆◇◆', '●○●', '※※※', '⚡⚡⚡'
      ];
      setGlitchText(glitchOptions[Math.floor(Math.random() * glitchOptions.length)]);
    }, 150);

    // Generate floating particles with physics
    const particleArray = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      velocity: {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
      }
    }));
    setParticles(particleArray);

    // Matrix rain effect
    const matrixArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: Math.random() * 3 + 1,
      char: String.fromCharCode(0x30A0 + Math.random() * 96)
    }));
    setMatrixRain(matrixArray);

    // Screen shake effect on load
    setShakeIntensity(1);
    setTimeout(() => setShakeIntensity(0), 2000);

    return () => clearInterval(glitchInterval);
  }, [location.pathname]);

  // Animate particles
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.velocity.x + window.innerWidth) % window.innerWidth,
        y: (particle.y + particle.velocity.y + window.innerHeight) % window.innerHeight,
        velocity: {
          x: particle.velocity.x * 0.999,
          y: particle.velocity.y * 0.999
        }
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  // Animate matrix rain
  useEffect(() => {
    const animateMatrix = () => {
      setMatrixRain(prev => prev.map(drop => ({
        ...drop,
        y: drop.y > window.innerHeight ? -20 : drop.y + drop.speed,
        char: Math.random() < 0.1 ? String.fromCharCode(0x30A0 + Math.random() * 96) : drop.char
      })));
    };

    const interval = setInterval(animateMatrix, 100);
    return () => clearInterval(interval);
  }, []);

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseTrail(prev => [
        ...prev.slice(-10),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Clean up mouse trail
  useEffect(() => {
    const interval = setInterval(() => {
      setMouseTrail(prev => prev.slice(1));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const suggestions = [
    { path: '/', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { path: '/about', label: 'About', icon: <Search className="w-4 h-4" /> },
    { path: '/services', label: 'Services', icon: <Zap className="w-4 h-4" /> },
    { path: '/contact', label: 'Contact', icon: <ArrowLeft className="w-4 h-4" /> },
  ];

  const handleSecretClick = () => {
    playClickSound();
    setSecretClicks(prev => prev + 1);
    if (secretClicks >= 4) {
      setShowSecret(true);
      setSecretClicks(0);
      setAiThinking(true);
      playMagicSound();
      
      // AI thinking simulation
      setTimeout(() => {
        document.body.style.filter = 'hue-rotate(180deg) saturate(1.5) brightness(1.2)';
        setAiThinking(false);
      }, 2000);
      
      setTimeout(() => {
        document.body.style.filter = '';
        setShowSecret(false);
      }, 5000);
    }
  };

  const generateExplosion = (x: number, y: number) => {
    playExplosionSound();
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      velocity: {
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10
      }
    }));
    setParticles(prev => [...prev, ...newParticles]);
    setTimeout(() => setParticles(prev => prev.slice(15)), 3000);
  };

  const triggerGlobalGlitch = () => {
    playGlitchSound();
    document.body.style.animation = 'glitch 0.5s ease-in-out';
    document.body.style.filter = 'contrast(200%) brightness(150%)';
    setTimeout(() => {
      document.body.style.animation = '';
      document.body.style.filter = '';
    }, 500);
  };

  return (
    <div 
      className={`min-h-screen flex items-center justify-center bg-background relative overflow-hidden ${
        shakeIntensity > 0 ? 'animate-pulse' : ''
      }`}
      style={{
        transform: shakeIntensity > 0 ? `translateX(${Math.random() * 4 - 2}px)` : 'none',
      }}
    >
      {/* Matrix rain background */}
      {matrixRain.map(drop => (
        <div
          key={drop.id}
          className="absolute text-green-400 opacity-30 pointer-events-none font-mono text-sm"
          style={{
            left: `${drop.x}px`,
            top: `${drop.y}px`,
            textShadow: '0 0 5px #00ff00'
          }}
        >
          {drop.char}
        </div>
      ))}

      {/* Mouse trail */}
      {mouseTrail.map((point, index) => (
        <div
          key={point.id}
          className="absolute pointer-events-none"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: (index + 1) / mouseTrail.length * 0.5,
            transform: `scale(${(index + 1) / mouseTrail.length})`
          }}
        >
          ✨
        </div>
      ))}

      {/* Enhanced animated background particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute opacity-40 cursor-pointer hover:scale-150 transition-transform hover:rotate-180"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            fontSize: `${Math.random() * 20 + 10}px`,
            filter: `hue-rotate(${particle.x + particle.y}deg)`
          }}
          onClick={(e) => generateExplosion(e.clientX, e.clientY)}
        >
          {['💫', '⭐', '✨', '🌟', '💥', '🎯', '🔥', '⚡', '🌀', '💎'][particle.id % 10]}
        </div>
      ))}

      <div className="text-center z-10 max-w-4xl mx-auto px-4">
        {/* Enhanced glitching 404 */}
        <div className="mb-8">
          <h1 
            className="text-8xl md:text-9xl font-black text-gradient mb-4 cursor-pointer hover:scale-110 transition-transform duration-300 select-none"
            onClick={handleSecretClick}
            style={{
              textShadow: '0 0 20px rgba(255, 107, 53, 0.5), 0 0 40px rgba(233, 30, 99, 0.3)',
              filter: `hue-rotate(${Math.random() * 360}deg) ${shakeIntensity > 0 ? 'blur(2px)' : ''}`,
              animation: aiThinking ? 'pulse 0.5s infinite' : 'none'
            }}
          >
            {glitchText}
          </h1>
          <div className="w-32 h-2 bg-gradient-to-r from-[#FF6B35] via-[#E91E63] to-[#9C27B0] mx-auto animate-pulse rounded-full"></div>
        </div>

        {/* AI Thinking Indicator */}
        {aiThinking && (
          <div className="mb-8 flex items-center justify-center gap-3 animate-fade-in">
            <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
            <div className="text-purple-400 font-semibold">AI is analyzing the void...</div>
            <Eye className="w-8 h-8 text-blue-400 animate-bounce" />
          </div>
        )}

        {/* Interactive error message */}
        <div className="glass p-8 rounded-3xl mb-8 animate-fade-in hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
          <h2 className="text-4xl font-bold text-gradient mb-4 animate-pulse">
            🚀 Lost in the Digital Multiverse!
          </h2>
          <p className="text-xl text-foreground/80 mb-4">
            You've discovered a quantum dimension that exists between realities! 
            Our AI algorithms are working overtime to create this page.
          </p>
          <p className="text-sm text-foreground/60 mb-4">
            Attempted route: <code className="bg-white/20 px-3 py-1 rounded-lg font-mono hover:bg-white/30 transition-colors">{location.pathname}</code>
          </p>
          
          {/* Enhanced interactive elements */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              onClick={() => {
                playWhooshSound();
                setShakeIntensity(1);
                setTimeout(() => setShakeIntensity(0), 1000);
              }}
              className="px-4 py-2 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/30 transition-all hover:scale-110 animate-bounce hover:rotate-12"
            >
              <RotateCw className="w-4 h-4 inline mr-2" />
              Reality Glitch
            </button>
            
            <button
              onClick={() => {
                triggerGlobalGlitch();
                playGlitchSound();
              }}
              className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/30 transition-all hover:scale-110"
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              Matrix Mode
            </button>

            <button
              onClick={() => {
                playMagicSound();
                setMatrixRain(prev => [...prev, ...Array.from({ length: 30 }, (_, i) => ({
                  id: Date.now() + i,
                  x: Math.random() * window.innerWidth,
                  y: -20,
                  speed: Math.random() * 5 + 2,
                  char: String.fromCharCode(0x30A0 + Math.random() * 96)
                }))]);
              }}
              className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-all hover:scale-110"
            >
              <Zap className="w-4 h-4 inline mr-2" />
              Data Rain
            </button>
          </div>
        </div>

        {/* Enhanced interactive suggestions */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gradient mb-6 animate-fade-in">
            🎯 Navigate to Safety:
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {suggestions.map((suggestion, index) => (
              <Link
                key={suggestion.path}
                to={suggestion.path}
                className="group p-6 glass rounded-2xl hover:bg-white/20 transition-all duration-500 animate-fade-in hover:scale-110 hover:rotate-2 hover:shadow-2xl"
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={(e) => {
                  generateExplosion(e.clientX, e.clientY);
                  playClickSound();
                }}
              >
                <div className="text-gradient mb-3 group-hover:scale-125 transition-transform duration-300 group-hover:animate-spin">
                  {suggestion.icon}
                </div>
                <span className="text-sm font-bold group-hover:text-white transition-colors">
                  {suggestion.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Enhanced interactive playground */}
          <div className="glass p-8 rounded-3xl mb-6 animate-fade-in hover:shadow-2xl transition-shadow">
            <div className="flex items-center justify-center gap-3 mb-6">
              <GamepadIcon className="w-6 h-6 text-gradient animate-bounce" />
              <h3 className="text-xl font-bold text-gradient">Quantum Playground</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => {
                  playMagicSound();
                  document.querySelectorAll('.glass').forEach(el => {
                    (el as HTMLElement).style.animation = 'glow 1s ease-in-out';
                    (el as HTMLElement).style.boxShadow = '0 0 50px rgba(255, 107, 53, 0.8)';
                  });
                  setTimeout(() => {
                    document.querySelectorAll('.glass').forEach(el => {
                      (el as HTMLElement).style.boxShadow = '';
                    });
                  }, 1000);
                }}
                className="p-4 bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all hover:scale-105 font-semibold hover:rotate-3"
              >
                ✨ Cosmic Glow
              </button>
              
              <button
                onClick={() => {
                  playExplosionSound();
                  const newParticles = Array.from({ length: 50 }, (_, i) => ({
                    id: Date.now() + i,
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    velocity: {
                      x: (Math.random() - 0.5) * 20,
                      y: (Math.random() - 0.5) * 20
                    }
                  }));
                  setParticles(prev => [...prev, ...newParticles]);
                }}
                className="p-4 bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-all hover:scale-105 font-semibold hover:rotate-3"
              >
                🎆 Supernova
              </button>
              
              <button
                onClick={() => {
                  playWhooshSound();
                  document.body.style.animation = 'pulse 2s ease-in-out';
                  document.body.style.background = 'radial-gradient(circle, rgba(255,107,53,0.1) 0%, rgba(0,0,0,1) 100%)';
                  setTimeout(() => {
                    document.body.style.animation = '';
                    document.body.style.background = '';
                  }, 2000);
                }}
                className="p-4 bg-yellow-500/20 text-yellow-400 rounded-xl hover:bg-yellow-500/30 transition-all hover:scale-105 font-semibold hover:rotate-3"
              >
                💥 Dimension Shift
              </button>
            </div>

            {showSecret && (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl animate-scale-in border border-purple-400/30">
                <p className="text-gradient font-bold animate-pulse flex items-center justify-center gap-2">
                  <Brain className="w-5 h-5" />
                  🎉 QUANTUM CONSCIOUSNESS UNLOCKED! AI MODE ACTIVATED!
                  <Eye className="w-5 h-5" />
                </p>
              </div>
            )}
          </div>

          {/* Enhanced call to action */}
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[#FF6B35] via-[#E91E63] to-[#9C27B0] text-white font-bold rounded-full hover:scale-110 transition-all duration-300 text-lg shadow-2xl animate-bounce hover:shadow-3xl"
            style={{
              boxShadow: '0 10px 30px rgba(255, 107, 53, 0.3)',
            }}
            onClick={() => playMagicSound()}
          >
            <Home className="w-6 h-6" />
            Return to Reality
            <Sparkles className="w-6 h-6 animate-spin" />
          </Link>
        </div>

        {/* Enhanced fun facts */}
        <div className="mt-8 text-xs text-foreground/50 animate-fade-in space-y-2">
          <p>💡 Quantum fact: This 404 page has {particles.length} interactive particles in motion!</p>
          <p>🎮 Try clicking the floating emojis, the 404 number, and explore the quantum playground!</p>
          <p>🧠 AI Status: {aiThinking ? 'Processing multidimensional data...' : 'Standing by in the void...'}</p>
          <p>🔊 Sound Effects: {typeof window !== 'undefined' && (window.AudioContext || (window as any).webkitAudioContext) ? 'Enabled' : 'Not supported'}</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
