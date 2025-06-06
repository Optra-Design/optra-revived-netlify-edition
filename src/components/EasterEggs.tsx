
import React, { useEffect, useState } from 'react';
import { Sparkles, Zap, Heart, Star } from 'lucide-react';

const EasterEggs = () => {
  const [konami, setKonami] = useState('');
  const [showSecret, setShowSecret] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [rainbowMode, setRainbowMode] = useState(false);
  const [discoBall, setDiscoBall] = useState(false);

  useEffect(() => {
    const konamiCode = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA';
    
    const handleKeyPress = (e: KeyboardEvent) => {
      const newKonami = konami + e.code;
      if (konamiCode.startsWith(newKonami)) {
        setKonami(newKonami);
        if (newKonami === konamiCode) {
          setShowSecret(true);
          console.log('🎉 KONAMI CODE ACTIVATED! Welcome to the secret zone!');
          setTimeout(() => setShowSecret(false), 5000);
          setKonami('');
        }
      } else {
        setKonami('');
      }
    };

    const handleTripleClick = (e: MouseEvent) => {
      setClickCount(prev => prev + 1);
      if (clickCount >= 2) {
        const newParticles = Array.from({length: 15}, (_, i) => ({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY
        }));
        setParticles(prev => [...prev, ...newParticles]);
        setTimeout(() => setParticles([]), 2000);
        setClickCount(0);
        
        // Play party sound
        try {
          const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
          const notes = [523, 659, 784, 1047, 1319]; // C major scale
          notes.forEach((freq, i) => {
            setTimeout(() => {
              const oscillator = audioContext.createOscillator();
              const gainNode = audioContext.createGain();
              
              oscillator.connect(gainNode);
              gainNode.connect(audioContext.destination);
              
              oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
              gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
              gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
              
              oscillator.start(audioContext.currentTime);
              oscillator.stop(audioContext.currentTime + 0.3);
            }, i * 100);
          });
        } catch (e) {
          console.log('Audio not supported');
        }
      }
      setTimeout(() => setClickCount(0), 1000);
    };

    const handleMagicKey = (e: KeyboardEvent) => {
      if (e.key === 'm' && e.ctrlKey && e.shiftKey) {
        setRainbowMode(!rainbowMode);
        document.body.style.filter = rainbowMode ? '' : 'hue-rotate(180deg) saturate(1.5)';
        setTimeout(() => {
          if (!rainbowMode) document.body.style.filter = '';
        }, 3000);
      }
      
      if (e.key === 'd' && e.ctrlKey && e.shiftKey) {
        setDiscoBall(!discoBall);
        console.log('🪩 DISCO MODE ACTIVATED! Let\'s party!');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleTripleClick);
    document.addEventListener('keydown', handleMagicKey);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleTripleClick);
      document.removeEventListener('keydown', handleMagicKey);
    };
  }, [konami, clickCount, rainbowMode, discoBall]);

  return (
    <>
      {/* Secret SUDO Access */}
      <div 
        className="fixed top-0 left-0 w-12 h-12 z-50 cursor-pointer opacity-0 hover:opacity-30 hover:bg-gradient-to-br hover:from-pink-500 hover:to-purple-500 rounded-full transition-all duration-300"
        onClick={() => {
          document.dispatchEvent(new CustomEvent('sudo-mode-toggle'));
          console.log('🔓 SUDO MODE ACTIVATED! Use Ctrl+Shift+S for quick access');
        }}
        title="🔓 Secret SUDO Access"
      />

      {/* Disco Ball */}
      {discoBall && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-40 animate-spin">
          <div className="w-16 h-16 bg-gradient-to-br from-silver to-white rounded-full relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full opacity-50 animate-pulse"></div>
            <span className="absolute inset-0 flex items-center justify-center text-2xl animate-bounce">🪩</span>
          </div>
        </div>
      )}

      {/* Konami Secret */}
      {showSecret && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center backdrop-blur-sm">
          <div className="glass p-12 rounded-3xl text-center animate-scale-in glow-hover">
            <Sparkles className="w-20 h-20 text-gradient mx-auto mb-6 animate-spin" />
            <h2 className="text-5xl font-bold text-gradient mb-4 animate-pulse">🎊 KONAMI MASTER! 🎊</h2>
            <p className="text-2xl text-foreground/90 mb-2">You unlocked the legendary code!</p>
            <p className="text-lg text-foreground/70 mb-4">The ancient ways still work ✨</p>
            <p className="text-sm text-foreground/60 mb-2">Try Ctrl+Shift+M for rainbow magic!</p>
            <p className="text-sm text-foreground/60">Or Ctrl+Shift+D for disco mode! 🪩</p>
          </div>
        </div>
      )}

      {/* Triple Click Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-40"
          style={{ 
            left: particle.x - 12, 
            top: particle.y - 12,
            animation: 'explode 2s ease-out forwards'
          }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
        </div>
      ))}

      {/* Fun Interactive Elements */}
      <div className="fixed bottom-6 right-24 animate-bounce-subtle opacity-70 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-3xl" onClick={() => {
          console.log('🎨 Aniketh says: Design is everywhere! Click me for XP!');
          document.body.style.animation = 'pulse 1s ease-in-out';
          setTimeout(() => document.body.style.animation = '', 1000);
        }}>🎨</span>
      </div>
      
      <div className="fixed top-1/3 right-8 animate-float opacity-60 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-2xl" onClick={() => {
          console.log('✨ Magic happens when design meets passion! +5 XP gained!');
          document.querySelectorAll('.glass').forEach(el => {
            (el as HTMLElement).style.animation = 'glow 1s ease-in-out';
            setTimeout(() => (el as HTMLElement).style.animation = '', 1000);
          });
        }}>✨</span>
      </div>

      <div className="fixed top-16 left-1/4 animate-pulse opacity-50 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-xl" onClick={() => {
          console.log('🚀 Ready to launch something amazing? Blast off with +10 XP!');
        }}>🚀</span>
      </div>

      {/* New Interactive Elements */}
      <div className="fixed bottom-1/3 left-8 animate-bounce opacity-60 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-2xl" onClick={() => {
          console.log('👑 You found the crown! Royal +15 XP bonus!');
          // Trigger crown effect
          document.body.style.filter = 'sepia(0.5) hue-rotate(45deg)';
          setTimeout(() => document.body.style.filter = '', 2000);
        }}>👑</span>
      </div>

      <div className="fixed top-2/3 left-1/3 animate-float opacity-50 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-xl" onClick={() => {
          console.log('💎 Diamond discovered! Precious +20 XP!');
          // Create diamond sparkle effect
          const sparkles = Array.from({length: 10}, (_, i) => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.className = 'fixed text-cyan-400 text-lg animate-ping pointer-events-none z-50';
            sparkle.style.left = Math.random() * window.innerWidth + 'px';
            sparkle.style.top = Math.random() * window.innerHeight + 'px';
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
          });
        }}>💎</span>
      </div>

      <div className="fixed bottom-1/2 right-1/3 animate-pulse opacity-40 hover:opacity-100 transition-all cursor-pointer hover:scale-125">
        <span className="text-xl" onClick={() => {
          console.log('🎮 Gaming time! Access minigames for +25 XP!');
          // Suggest visiting minigames
          window.location.hash = '#minigames-unlock';
        }}>🎮</span>
      </div>
    </>
  );
};

export default EasterEggs;
