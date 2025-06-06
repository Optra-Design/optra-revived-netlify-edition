
import React, { useState, useEffect } from 'react';
import { Star, Heart, Zap, Crown, Gem, Gift, Sparkles, Rocket, Coffee, Music, Gamepad2, Pizza, Cake, Rainbow } from 'lucide-react';

const FloatingElements = () => {
  const [elements, setElements] = useState<Array<{
    id: number;
    x: number;
    y: number;
    icon: React.ReactNode;
    color: string;
    speed: number;
    rotation: number;
    scale: number;
  }>>([]);

  const funIcons = [
    { icon: <Star className="w-6 h-6" />, color: 'text-yellow-400' },
    { icon: <Heart className="w-6 h-6" />, color: 'text-pink-400' },
    { icon: <Zap className="w-6 h-6" />, color: 'text-blue-400' },
    { icon: <Crown className="w-6 h-6" />, color: 'text-purple-400' },
    { icon: <Gem className="w-6 h-6" />, color: 'text-cyan-400' },
    { icon: <Gift className="w-6 h-6" />, color: 'text-green-400' },
    { icon: <Sparkles className="w-6 h-6" />, color: 'text-orange-400' },
    { icon: <Rocket className="w-6 h-6" />, color: 'text-red-400' },
    { icon: <Coffee className="w-6 h-6" />, color: 'text-amber-400' },
    { icon: <Music className="w-6 h-6" />, color: 'text-indigo-400' },
    { icon: <Gamepad2 className="w-6 h-6" />, color: 'text-emerald-400' },
    { icon: <Pizza className="w-6 h-6" />, color: 'text-rose-400' },
    { icon: <Cake className="w-6 h-6" />, color: 'text-violet-400' },
    { icon: <Rainbow className="w-6 h-6" />, color: 'text-fuchsia-400' }
  ];

  useEffect(() => {
    const createElements = () => {
      const newElements = Array.from({ length: 20 }, (_, i) => {
        const iconData = funIcons[Math.floor(Math.random() * funIcons.length)];
        return {
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          icon: iconData.icon,
          color: iconData.color,
          speed: Math.random() * 3 + 1,
          rotation: 0,
          scale: Math.random() * 0.5 + 0.8
        };
      });
      setElements(newElements);
    };

    createElements();
    window.addEventListener('resize', createElements);
    return () => window.removeEventListener('resize', createElements);
  }, []);

  useEffect(() => {
    const animate = () => {
      setElements(prev => prev.map(element => ({
        ...element,
        y: element.y - element.speed,
        rotation: element.rotation + (element.speed * 2),
        // Reset position when element goes off screen
        ...(element.y < -100 ? {
          y: window.innerHeight + 100,
          x: Math.random() * window.innerWidth,
          scale: Math.random() * 0.5 + 0.8
        } : {})
      })));
    };

    const interval = setInterval(animate, 80);
    return () => clearInterval(interval);
  }, []);

  const handleElementClick = (id: number) => {
    // Enhanced sound effect with multiple tones
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(600 + Math.random() * 600, audioContext.currentTime);
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    } catch (e) {
      console.log('Audio not supported');
    }

    // Create burst effect
    setElements(prev => prev.filter(element => element.id !== id));
    
    // Fun console messages
    const messages = [
      '🎉 Fun icon collected!',
      '✨ Magic sparkles gained!',
      '🚀 Awesome click!',
      '🎨 Creative energy +1!',
      '💫 Design powers activated!'
    ];
    console.log(messages[Math.floor(Math.random() * messages.length)]);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {elements.map(element => (
        <div
          key={element.id}
          className={`absolute cursor-pointer pointer-events-auto hover:scale-150 transition-all duration-300 ${element.color} opacity-70 hover:opacity-100`}
          style={{
            left: `${element.x}px`,
            top: `${element.y}px`,
            transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
            filter: 'drop-shadow(0 0 15px currentColor)',
            animation: `bounce 2s infinite ${element.id * 0.1}s ease-in-out alternate`
          }}
          onClick={() => handleElementClick(element.id)}
          title="Click for fun!"
        >
          {element.icon}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;
