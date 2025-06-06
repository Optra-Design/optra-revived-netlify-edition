
import React, { useState, useEffect } from 'react';
import { User, Star, Trophy, Zap, Gift, Crown } from 'lucide-react';

const MetaverseHUD = () => {
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 0,
    xpToNext: 100,
    coins: 0,
    achievements: 0
  });

  const [currentQuote, setCurrentQuote] = useState("Adventure awaits!");

  const quotes = [
    "Adventure awaits!",
    "Design is thinking made visual",
    "Innovation distinguishes leaders",
    "Creativity takes courage",
    "The future belongs to creators",
    "Dream big, build bigger",
    "Code poetry into reality",
    "Every pixel tells a story",
    "Imagination is everything",
    "Create, iterate, inspire"
  ];

  useEffect(() => {
    // Listen for metaverse events
    const handleXPGain = () => {
      setUserStats(prev => {
        const newXP = prev.xp + 10;
        const newLevel = Math.floor(newXP / 100) + 1;
        
        if (newLevel > prev.level) {
          // Change quote when leveling up
          setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
        }
        
        return {
          ...prev,
          xp: newXP,
          level: newLevel,
          coins: prev.coins + 5
        };
      });
    };

    const handleAchievement = () => {
      setUserStats(prev => ({ ...prev, achievements: prev.achievements + 1 }));
      // Change quote on achievement
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    };

    // Add event listeners for clicks and interactions
    document.addEventListener('click', handleXPGain);
    
    // Change quote periodically
    const quoteInterval = setInterval(() => {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 15000);
    
    return () => {
      document.removeEventListener('click', handleXPGain);
      clearInterval(quoteInterval);
    };
  }, []);

  return (
    <>
      {/* Compact Level & Quote Panel */}
      <div className="fixed top-4 right-4 z-50 glass p-3 rounded-xl max-w-xs">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 bg-optra-gradient rounded-full flex items-center justify-center">
            <Crown className="w-4 h-4 text-white" />
          </div>
          <div className="text-sm">
            <div className="font-bold text-gradient">Level {userStats.level}</div>
            <div className="text-xs text-foreground/60">{userStats.xp % 100}/100 XP</div>
          </div>
        </div>
        
        {/* Quote */}
        <div className="text-xs text-foreground/80 italic border-l-2 border-optra-gradient pl-2">
          "{currentQuote}"
        </div>
      </div>
    </>
  );
};

export default MetaverseHUD;
