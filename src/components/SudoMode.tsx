import React, { useState, useEffect } from 'react';
import { Settings, Palette, Layout, Zap, LogIn, LogOut, User, Sparkles, Smartphone, Bug, Minimize2, Maximize2, Volume2, VolumeX, Gamepad2, Wand2, Rainbow } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SudoMode = () => {
  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [theme, setTheme] = useState('default');
  const [layout, setLayout] = useState('default');
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touchCount, setTouchCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [funMode, setFunMode] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const { isLoggedIn, login, logout, user } = useAuth();
  const navigate = useNavigate();

  const playSound = (frequency: number, duration: number = 0.2) => {
    if (!soundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(frequency * 0.7, audioContext.currentTime + duration);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  const playSuccessSound = () => {
    playSound(800, 0.1);
    setTimeout(() => playSound(1000, 0.1), 100);
    setTimeout(() => playSound(1200, 0.2), 200);
  };

  const playClickSound = () => {
    playSound(600, 0.1);
  };

  const playFunSound = () => {
    const notes = [523, 659, 784, 1047]; // C, E, G, C
    notes.forEach((note, i) => {
      setTimeout(() => playSound(note, 0.15), i * 100);
    });
  };

  const triggerConfetti = () => {
    setConfettiActive(true);
    setTimeout(() => setConfettiActive(false), 3000);
  };

  const toggleFunMode = () => {
    setFunMode(!funMode);
    if (!funMode) {
      playFunSound();
      triggerConfetti();
      document.body.style.animation = 'rainbow 2s infinite';
    } else {
      document.body.style.animation = '';
    }
  };

  useEffect(() => {
    const handleSudoToggle = () => {
      setIsActive(prev => !prev);
      playClickSound();
    };

    const handleKeyboardShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setIsActive(prev => !prev);
        playClickSound();
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        e.preventDefault();
        if (isActive) {
          setIsMinimized(prev => !prev);
          playClickSound();
        }
      }
      // Fun mode shortcut
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        toggleFunMode();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      if (x > windowWidth - 80 && y < 80) {
        setTouchCount(prev => prev + 1);
        playClickSound();
        
        setTimeout(() => setTouchCount(0), 2000);
        
        if (touchCount >= 4) {
          setIsActive(true);
          setTouchCount(0);
          playSuccessSound();
          console.log('📱 Mobile SUDO MODE activated! 5 taps detected.');
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && isMinimized) {
        const newX = e.clientX - dragOffset.x;
        const newY = e.clientY - dragOffset.y;
        
        const maxX = window.innerWidth - 64;
        const maxY = window.innerHeight - 64;
        
        setPosition({
          x: Math.max(0, Math.min(newX, maxX)),
          y: Math.max(0, Math.min(newY, maxY))
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('sudo-mode-toggle', handleSudoToggle);
    document.addEventListener('keydown', handleKeyboardShortcut);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('sudo-mode-toggle', handleSudoToggle);
      document.removeEventListener('keydown', handleKeyboardShortcut);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [touchCount, isActive, isDragging, dragOffset, soundEnabled]);

  const themes = [
    { id: 'default', name: 'Optra', class: '', emoji: '🎨' },
    { id: 'classic-optra', name: 'Classic', class: 'optra-classic-theme', emoji: '🏛️' },
    { id: 'neon', name: 'Neon', class: 'neon-theme', emoji: '⚡' },
    { id: 'retro', name: 'Retro', class: 'retro-theme', emoji: '📺' },
    { id: 'cyberpunk', name: 'Cyber', class: 'cyberpunk-theme', emoji: '🤖' },
    { id: 'mono', name: 'Mono', class: 'mono-theme', emoji: '⚫' },
    { id: 'vibrant', name: 'Ultra', class: 'vibrant-theme', emoji: '🌈' },
    { id: 'matrix', name: 'Matrix', class: 'matrix-theme', emoji: '💊' },
    { id: 'synthwave', name: 'Synth', class: 'synthwave-theme', emoji: '🌆' }
  ];

  const layouts = [
    { id: 'default', name: 'Default', class: '', emoji: '📐' },
    { id: 'compact', name: 'Compact', class: 'text-sm scale-95 tracking-tight', emoji: '📱' },
    { id: 'spacious', name: 'Spacious', class: 'text-lg scale-105 tracking-wide', emoji: '🖥️' },
    { id: 'zen', name: 'Zen', class: 'tracking-widest leading-relaxed', emoji: '🧘' }
  ];

  const applyTheme = (themeId: string) => {
    const themeObj = themes.find(t => t.id === themeId);
    if (themeObj) {
      // Remove all theme classes
      document.body.classList.remove(
        'optra-classic-theme', 'neon-theme', 'retro-theme', 'cyberpunk-theme', 
        'mono-theme', 'vibrant-theme', 'matrix-theme', 'synthwave-theme'
      );
      
      // Apply new theme
      if (themeObj.class) {
        document.body.classList.add(themeObj.class);
      }
      
      setTheme(themeId);
      playClickSound();
      console.log(`🎨 Theme changed to: ${themeObj.name}`);
    }
  };

  const applyLayout = (layoutId: string) => {
    const layoutObj = layouts.find(l => l.id === layoutId);
    if (layoutObj) {
      const main = document.querySelector('main') || document.body;
      main.className = layoutObj.class;
      setLayout(layoutId);
      playClickSound();
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      setShowLogin(false);
      setEmail('');
      setPassword('');
      playSuccessSound();
      triggerConfetti();
      console.log('🎉 Welcome back, Aniketh! Admin powers activated.');
    } else {
      playSound(200, 0.5);
      alert('❌ Invalid credentials - only Aniketh has access!');
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMinimized) {
      setIsDragging(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      playClickSound();
    }
  };

  if (!isActive) return null;

  return (
    <>
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-40">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-10px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {['🎉', '✨', '🎊', '⭐', '💫'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}
      
      <div 
        className={`fixed z-50 bg-background/95 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl animate-fade-in glow-hover transition-all duration-300 ${
          isMinimized ? 'w-16 h-16 cursor-move hover:scale-110' : 'p-6 max-w-sm w-80 top-4 left-4'
        } ${funMode ? 'animate-pulse border-rainbow' : ''}`}
        style={isMinimized ? { 
          top: `${position.y}px`, 
          left: `${position.x}px`,
          userSelect: 'none'
        } : {}}
        onMouseDown={handleMouseDown}
      >
        {isMinimized ? (
          <div className="w-full h-full flex items-center justify-center">
            <button
              onClick={() => {
                setIsMinimized(false);
                playClickSound();
              }}
              className="w-full h-full flex items-center justify-center hover:bg-white/10 rounded-3xl transition-colors group"
            >
              <Settings className={`w-6 h-6 text-gradient group-hover:scale-110 transition-transform ${funMode ? 'animate-spin' : 'animate-pulse'}`} style={{ animationDuration: '3s' }} />
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Settings className={`w-6 h-6 text-gradient ${funMode ? 'animate-spin' : 'animate-pulse'}`} style={{ animationDuration: '3s' }} />
                <h3 className="font-bold text-gradient text-lg">SUDO MODE</h3>
                <span className="text-xs bg-red-500/30 text-red-400 px-3 py-1 rounded-full animate-pulse font-bold">ADMIN</span>
                {funMode && <Rainbow className="w-5 h-5 text-rainbow animate-spin" />}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setSoundEnabled(!soundEnabled);
                    playClickSound();
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                  title={soundEnabled ? "Disable Sound" : "Enable Sound"}
                >
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                  )}
                </button>
                <button
                  onClick={() => {
                    setIsMinimized(true);
                    playClickSound();
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                  title="Minimize (Ctrl+Shift+M)"
                >
                  <Minimize2 className="w-4 h-4 text-foreground/70 group-hover:text-white transition-colors" />
                </button>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border-b border-white/20 pb-4">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 p-3 bg-green-500/20 rounded-xl">
                      <User className="w-5 h-5 text-green-400" />
                      <div className="flex-1">
                        <div className="text-sm font-bold text-green-400">Aniketh</div>
                        <div className="text-xs text-green-400/70">Founder & Admin</div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          playClickSound();
                        }}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        setShowLogin(!showLogin);
                        playClickSound();
                      }}
                      className="flex items-center gap-3 p-3 text-sm bg-blue-500/20 text-blue-400 rounded-xl hover:bg-blue-500/30 transition-all w-full justify-center hover:scale-105"
                    >
                      <LogIn className="w-5 h-5" />
                      <span className="font-semibold">Founder Login</span>
                    </button>
                    
                    {showLogin && (
                      <form onSubmit={handleLogin} className="mt-4 space-y-3 animate-fade-in">
                        <input
                          type="email"
                          placeholder="aniketh@optra.me"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 text-sm bg-white/10 border border-white/30 rounded-xl focus:border-white/50 transition-colors"
                        />
                        <input
                          type="password"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-3 text-sm bg-white/10 border border-white/30 rounded-xl focus:border-white/50 transition-colors"
                        />
                        <button
                          type="submit"
                          className="w-full p-3 text-sm bg-green-500/20 text-green-400 rounded-xl hover:bg-green-500/30 transition-all hover:scale-105 font-semibold"
                        >
                          <Sparkles className="w-4 h-4 inline mr-2" />
                          Access Admin Panel
                        </button>
                      </form>
                    )}
                  </div>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Wand2 className="w-5 h-5" />
                  <span className="text-sm font-bold">Fun Controls</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={toggleFunMode}
                    className={`w-full p-3 text-sm rounded-xl hover:scale-105 transition-all font-semibold ${
                      funMode 
                        ? 'bg-rainbow text-white animate-pulse' 
                        : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30'
                    }`}
                  >
                    <Gamepad2 className="w-4 h-4 inline mr-2" />
                    {funMode ? 'Disable Fun Mode' : 'Enable Fun Mode'}
                  </button>
                  <button
                    onClick={() => {
                      triggerConfetti();
                      playFunSound();
                    }}
                    className="w-full p-3 text-sm bg-yellow-500/20 text-yellow-400 rounded-xl hover:bg-yellow-500/30 transition-all hover:scale-105 font-semibold"
                  >
                    🎉 Trigger Confetti
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Bug className="w-5 h-5" />
                  <span className="text-sm font-bold">Developer Tools</span>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      navigate('/test-404');
                      playClickSound();
                    }}
                    className="w-full p-3 text-sm bg-orange-500/20 text-orange-400 rounded-xl hover:bg-orange-500/30 transition-all hover:scale-105 font-semibold"
                  >
                    Test 404 Page
                  </button>
                  <button
                    onClick={() => {
                      navigate('/non-existent-route');
                      playClickSound();
                    }}
                    className="w-full p-3 text-sm bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all hover:scale-105 font-semibold"
                  >
                    Trigger Real 404
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-5 h-5" />
                  <span className="text-sm font-bold">Visual Theme</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map(themeObj => (
                    <button
                      key={themeObj.id}
                      onClick={() => applyTheme(themeObj.id)}
                      className={`p-3 text-xs rounded-xl border transition-all duration-300 hover:scale-105 font-semibold ${
                        theme === themeObj.id 
                          ? 'border-white/50 bg-white/20 scale-105 text-white' 
                          : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                      }`}
                    >
                      {themeObj.emoji} {themeObj.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Layout className="w-5 h-5" />
                  <span className="text-sm font-bold">Layout Mode</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {layouts.map(layoutObj => (
                    <button
                      key={layoutObj.id}
                      onClick={() => applyLayout(layoutObj.id)}
                      className={`p-3 text-xs rounded-xl border transition-all duration-300 hover:scale-105 font-semibold ${
                        layout === layoutObj.id 
                          ? 'border-white/50 bg-white/20 scale-105 text-white' 
                          : 'border-white/20 hover:border-white/40 hover:bg-white/10'
                      }`}
                    >
                      {layoutObj.emoji} {layoutObj.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  document.body.className = '';
                  setTheme('default');
                  setLayout('default');
                  setFunMode(false);
                  playSuccessSound();
                  console.log('🔄 All customizations reset!');
                }}
                className="w-full p-3 text-sm bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition-all hover:scale-105 font-bold"
              >
                <Zap className="w-4 h-4 inline mr-2" />
                Reset Everything
              </button>
            </div>

            <div className="text-xs text-foreground/60 mt-6 space-y-1 leading-relaxed">
              <p><strong>Desktop:</strong> Top-left corner or Ctrl+Shift+S</p>
              <p><strong>Mobile:</strong> <Smartphone className="w-3 h-3 inline mx-1" />Tap top-right corner 5x quickly</p>
              <p><strong>Minimize:</strong> Ctrl+Shift+M or click minimize button</p>
              <p><strong>Fun Mode:</strong> Ctrl+Shift+F or use fun controls</p>
              <p><strong>Drag:</strong> Click and drag minimized window to move</p>
              <p><strong>Note:</strong> Visual changes are temporary, blog edits are permanent</p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SudoMode;
