
import React, { useState, useEffect, useCallback } from 'react';
import Navigation from '../components/Navigation';
import { Gamepad2, Target, Zap, Star, Heart, Trophy, Rocket, Diamond, Crown, Gift } from 'lucide-react';

const Minigames = () => {
  const [activeGame, setActiveGame] = useState(0);
  const [totalScore, setTotalScore] = useState(0);

  const games = [
    {
      title: "Click Rush",
      description: "Click as fast as you can!",
      icon: <Target className="w-6 h-6" />,
      component: <ClickRush onScore={(score) => setTotalScore(prev => prev + score)} />
    },
    {
      title: "Catch the Stars",
      description: "Collect falling stars",
      icon: <Star className="w-6 h-6" />,
      component: <CatchStars onScore={(score) => setTotalScore(prev => prev + score)} />
    },
    {
      title: "Memory Cards",
      description: "Test your memory",
      icon: <Heart className="w-6 h-6" />,
      component: <MemoryGame onScore={(score) => setTotalScore(prev => prev + score)} />
    },
    {
      title: "Snake Classic",
      description: "The classic snake game",
      icon: <Zap className="w-6 h-6" />,
      component: <SnakeGame onScore={(score) => setTotalScore(prev => prev + score)} />
    },
    {
      title: "Rocket Dodge",
      description: "Avoid the obstacles",
      icon: <Rocket className="w-6 h-6" />,
      component: <RocketDodge onScore={(score) => setTotalScore(prev => prev + score)} />
    }
  ];

  const playGameSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Gamepad2 className="w-12 h-12 text-gradient animate-bounce-subtle" />
              <h1 className="text-5xl md:text-7xl font-bold text-gradient">
                Metaverse Games
              </h1>
              <Trophy className="w-8 h-8 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
              🎮 Welcome to the OPTRA Metaverse! Play games, earn points, and have fun!
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full animate-pulse">
                <Trophy className="w-4 h-4 inline mr-2" />
                Total Score: {totalScore}
              </div>
            </div>
          </div>

          {/* Game Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {games.map((game, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveGame(index);
                  playGameSound();
                }}
                className={`group flex items-center gap-3 px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
                  activeGame === index
                    ? 'bg-optra-gradient text-white scale-105 shadow-lg glow-hover'
                    : 'bg-white/10 text-foreground/70 hover:bg-white/20 border border-white/20'
                }`}
              >
                <span className="group-hover:rotate-12 transition-transform duration-300">
                  {game.icon}
                </span>
                {game.title}
              </button>
            ))}
          </div>

          {/* Active Game */}
          <div className="glass p-8 rounded-3xl mb-8 min-h-[600px] hover:glow-hover transition-all duration-300">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient mb-2 animate-fade-in">
                {games[activeGame].title}
              </h2>
              <p className="text-foreground/70">
                {games[activeGame].description}
              </p>
            </div>
            
            <div className="flex items-center justify-center h-96">
              {games[activeGame].component}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Click Rush Game
const ClickRush = ({ onScore }: { onScore: (score: number) => void }) => {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
      onScore(clicks * 10);
    }
  }, [timeLeft, gameActive, clicks, onScore]);

  const startGame = () => {
    setClicks(0);
    setTimeLeft(10);
    setGameActive(true);
  };

  const handleClick = () => {
    if (gameActive) {
      setClicks(clicks + 1);
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800 + clicks * 50, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      } catch (e) {
        console.log('Audio not supported');
      }
    }
  };

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="text-4xl font-bold text-gradient mb-2">Clicks: {clicks}</div>
        <div className="text-2xl text-foreground/70">Time: {timeLeft}s</div>
      </div>
      
      {!gameActive ? (
        <button
          onClick={startGame}
          className="bg-optra-gradient text-white px-8 py-4 rounded-full text-xl font-bold hover:scale-105 transition-transform"
        >
          Start Game!
        </button>
      ) : (
        <button
          onClick={handleClick}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-12 py-8 rounded-full text-2xl font-bold hover:scale-110 transition-transform animate-pulse"
        >
          CLICK ME!
        </button>
      )}
    </div>
  );
};

// Catch Stars Game
const CatchStars = ({ onScore }: { onScore: (score: number) => void }) => {
  const [stars, setStars] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);

  useEffect(() => {
    if (gameActive) {
      const starInterval = setInterval(() => {
        setStars(prev => [...prev, {
          id: Date.now(),
          x: Math.random() * 400,
          y: 0
        }]);
      }, 1000);

      const moveInterval = setInterval(() => {
        setStars(prev => prev.map(star => ({ ...star, y: star.y + 5 })).filter(star => star.y < 300));
      }, 50);

      return () => {
        clearInterval(starInterval);
        clearInterval(moveInterval);
      };
    }
  }, [gameActive]);

  const catchStar = (id: number) => {
    setStars(prev => prev.filter(star => star.id !== id));
    setScore(prev => prev + 1);
    onScore(10);
    
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-2xl font-bold text-gradient">Stars Caught: {score}</div>
      </div>
      
      <div className="relative w-96 h-72 border border-white/20 rounded-lg bg-black/20 mx-auto overflow-hidden">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute cursor-pointer hover:scale-125 transition-transform"
            style={{ left: `${star.x}px`, top: `${star.y}px` }}
            onClick={() => catchStar(star.id)}
          >
            <Star className="w-6 h-6 text-yellow-400 animate-pulse" />
          </div>
        ))}
      </div>
      
      <button
        onClick={() => setGameActive(!gameActive)}
        className="mt-4 bg-optra-gradient text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        {gameActive ? 'Stop Game' : 'Start Catching!'}
      </button>
    </div>
  );
};

// Memory Game
const MemoryGame = ({ onScore }: { onScore: (score: number) => void }) => {
  const [cards, setCards] = useState<Array<{ id: number; emoji: string; flipped: boolean; matched: boolean }>>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matches, setMatches] = useState(0);

  const emojis = ['🎮', '🚀', '⭐', '💎', '🎯', '🔥', '💫', '🎊'];

  const initializeGame = () => {
    const gameCards = [...emojis, ...emojis].map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false
    })).sort(() => Math.random() - 0.5);
    
    setCards(gameCards);
    setFlippedCards([]);
    setMatches(0);
  };

  const flipCard = (id: number) => {
    if (flippedCards.length === 2) return;
    
    setCards(prev => prev.map(card => 
      card.id === id ? { ...card, flipped: true } : card
    ));
    
    setFlippedCards(prev => [...prev, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const firstCard = cards.find(card => card.id === first);
      const secondCard = cards.find(card => card.id === second);
      
      setTimeout(() => {
        if (firstCard?.emoji === secondCard?.emoji) {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, matched: true }
              : card
          ));
          setMatches(prev => prev + 1);
          onScore(20);
        } else {
          setCards(prev => prev.map(card => 
            card.id === first || card.id === second 
              ? { ...card, flipped: false }
              : card
          ));
        }
        setFlippedCards([]);
      }, 1000);
    }
  }, [flippedCards, cards, onScore]);

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-2xl font-bold text-gradient">Matches: {matches}/8</div>
      </div>
      
      <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto mb-4">
        {cards.map(card => (
          <div
            key={card.id}
            className={`w-16 h-16 rounded-lg cursor-pointer transition-all duration-300 flex items-center justify-center text-2xl ${
              card.flipped || card.matched 
                ? 'bg-optra-gradient text-white' 
                : 'bg-white/20 hover:bg-white/30'
            }`}
            onClick={() => flipCard(card.id)}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </div>
        ))}
      </div>
      
      <button
        onClick={initializeGame}
        className="bg-optra-gradient text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        New Game
      </button>
    </div>
  );
};

// Snake Game (simplified)
const SnakeGame = ({ onScore }: { onScore: (score: number) => void }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 0 });
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (!gameActive) return;

    const moveSnake = () => {
      setSnake(prev => {
        const newSnake = [...prev];
        const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };
        
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 15) {
          setGameActive(false);
          return prev;
        }
        
        newSnake.unshift(head);
        
        if (head.x === food.x && head.y === food.y) {
          setFood({ x: Math.floor(Math.random() * 20), y: Math.floor(Math.random() * 15) });
          setScore(prev => prev + 1);
          onScore(10);
        } else {
          newSnake.pop();
        }
        
        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 200);
    return () => clearInterval(interval);
  }, [direction, food, gameActive, onScore]);

  const startGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 1, y: 0 });
    setGameActive(true);
    setScore(0);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-2xl font-bold text-gradient">Score: {score}</div>
      </div>
      
      <div className="grid grid-cols-20 gap-1 max-w-md mx-auto mb-4 bg-black/20 p-4 rounded-lg">
        {Array.from({ length: 300 }, (_, i) => {
          const x = i % 20;
          const y = Math.floor(i / 20);
          const isSnake = snake.some(segment => segment.x === x && segment.y === y);
          const isFood = food.x === x && food.y === y;
          
          return (
            <div
              key={i}
              className={`w-3 h-3 ${
                isSnake ? 'bg-green-500' : isFood ? 'bg-red-500' : 'bg-gray-800'
              }`}
            />
          );
        })}
      </div>
      
      <div className="flex gap-2 justify-center mb-4">
        <button onClick={() => setDirection({ x: 0, y: -1 })} className="bg-white/20 p-2 rounded">↑</button>
        <button onClick={() => setDirection({ x: -1, y: 0 })} className="bg-white/20 p-2 rounded">←</button>
        <button onClick={() => setDirection({ x: 1, y: 0 })} className="bg-white/20 p-2 rounded">→</button>
        <button onClick={() => setDirection({ x: 0, y: 1 })} className="bg-white/20 p-2 rounded">↓</button>
      </div>
      
      <button
        onClick={startGame}
        className="bg-optra-gradient text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        {gameActive ? 'Restart' : 'Start Snake!'}
      </button>
    </div>
  );
};

// Rocket Dodge Game
const RocketDodge = ({ onScore }: { onScore: (score: number) => void }) => {
  const [rocketY, setRocketY] = useState(150);
  const [obstacles, setObstacles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (gameActive) {
      const obstacleInterval = setInterval(() => {
        setObstacles(prev => [...prev, {
          id: Date.now(),
          x: 400,
          y: Math.random() * 250
        }]);
      }, 1500);

      const moveInterval = setInterval(() => {
        setObstacles(prev => prev.map(obs => ({ ...obs, x: obs.x - 5 })).filter(obs => obs.x > -50));
        setScore(prev => prev + 1);
        if (score % 10 === 0) onScore(1);
      }, 50);

      return () => {
        clearInterval(obstacleInterval);
        clearInterval(moveInterval);
      };
    }
  }, [gameActive, score, onScore]);

  const moveRocket = (direction: 'up' | 'down') => {
    setRocketY(prev => {
      const newY = direction === 'up' ? prev - 20 : prev + 20;
      return Math.max(0, Math.min(250, newY));
    });
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div className="text-2xl font-bold text-gradient">Distance: {score}</div>
      </div>
      
      <div className="relative w-96 h-64 border border-white/20 rounded-lg bg-black/20 mx-auto overflow-hidden">
        <div
          className="absolute left-4 transition-all duration-100"
          style={{ top: `${rocketY}px` }}
        >
          <Rocket className="w-8 h-8 text-blue-400" />
        </div>
        
        {obstacles.map(obstacle => (
          <div
            key={obstacle.id}
            className="absolute w-4 h-4 bg-red-500 rounded"
            style={{ left: `${obstacle.x}px`, top: `${obstacle.y}px` }}
          />
        ))}
      </div>
      
      <div className="flex gap-4 justify-center mt-4">
        <button
          onClick={() => moveRocket('up')}
          className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:scale-105 transition-transform"
        >
          ↑ Up
        </button>
        <button
          onClick={() => moveRocket('down')}
          className="bg-blue-500 text-white px-4 py-2 rounded font-bold hover:scale-105 transition-transform"
        >
          ↓ Down
        </button>
      </div>
      
      <button
        onClick={() => {
          setGameActive(!gameActive);
          if (!gameActive) setScore(0);
        }}
        className="mt-4 bg-optra-gradient text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
      >
        {gameActive ? 'Stop' : 'Start Flying!'}
      </button>
    </div>
  );
};

export default Minigames;
