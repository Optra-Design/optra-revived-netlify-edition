import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Progress } from '../components/ui/progress';
import { TrendingUp, Zap, BarChart3, Coffee, Target, Rocket, Crown, Gem, Users, Heart } from 'lucide-react';

const Pulse = () => {
  const [metrics, setMetrics] = useState({
    clients: 0,
    satisfaction: 0,
    growth: 0
  });

  const [progressValues, setProgressValues] = useState({
    projectCompletion: 0,
    creativityLevel: 0,
    skillDevelopment: 0,
    marketPresence: 0,
    teamProductivity: 0,
    qualityScore: 0
  });

  const [isAnimating, setIsAnimating] = useState(false);

  const playPulseSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log('Audio not supported');
    }
  };

  useEffect(() => {
    setIsAnimating(true);
    playPulseSound();
    
    // Animate counters
    const animateValue = (key: keyof typeof metrics, end: number, duration: number = 2000) => {
      const start = 0;
      const increment = end / (duration / 16);
      let current = start;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setMetrics(prev => ({ ...prev, [key]: Math.round(current) }));
      }, 16);
    };

    // Animate progress bars
    const animateProgress = (key: keyof typeof progressValues, end: number, delay: number = 0) => {
      setTimeout(() => {
        const start = 0;
        const increment = end / (2000 / 16);
        let current = start;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= end) {
            current = end;
            clearInterval(timer);
          }
          setProgressValues(prev => ({ ...prev, [key]: Math.round(current) }));
        }, 16);
      }, delay);
    };

    setTimeout(() => animateValue('clients', 23), 200);
    setTimeout(() => animateValue('satisfaction', 97), 400);
    setTimeout(() => animateValue('growth', 285), 600);

    // Animate progress bars with staggered delays
    setTimeout(() => animateProgress('projectCompletion', 94, 1000), 0);
    setTimeout(() => animateProgress('creativityLevel', 98, 1200), 0);
    setTimeout(() => animateProgress('skillDevelopment', 89, 1400), 0);
    setTimeout(() => animateProgress('marketPresence', 91, 1600), 0);
    setTimeout(() => animateProgress('teamProductivity', 96, 1800), 0);
    setTimeout(() => animateProgress('qualityScore', 98, 2000), 0);
    
    setTimeout(() => setIsAnimating(false), 3000);
  }, []);

  const pulseData = [
    {
      icon: <Users className="w-8 h-8" />,
      label: "Happy Clients",
      value: metrics.clients,
      suffix: "",
      color: "text-emerald-400",
      bgColor: "bg-gradient-to-br from-emerald-500/20 to-green-500/20",
      borderColor: "border-emerald-400/30"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      label: "Satisfaction Rate",
      value: metrics.satisfaction,
      suffix: "%",
      color: "text-pink-400",
      bgColor: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-400/30"
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      label: "Growth Rate",
      value: metrics.growth,
      suffix: "%",
      color: "text-purple-400",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-violet-500/20",
      borderColor: "border-purple-400/30"
    }
  ];

  const progressData = [
    {
      label: "Project Completion Rate",
      value: progressValues.projectCompletion,
      color: "from-blue-400 to-blue-600",
      description: "On-time delivery performance",
      emoji: "🎯"
    },
    {
      label: "Creativity Level",
      value: progressValues.creativityLevel,
      color: "from-pink-400 to-pink-600",
      description: "Innovation and artistic expression",
      emoji: "🎨"
    },
    {
      label: "Skill Development",
      value: progressValues.skillDevelopment,
      color: "from-purple-400 to-purple-600",
      description: "Continuous learning and growth",
      emoji: "📚"
    },
    {
      label: "Market Presence",
      value: progressValues.marketPresence,
      color: "from-orange-400 to-orange-600",
      description: "Industry recognition and reach",
      emoji: "🌟"
    },
    {
      label: "Team Productivity",
      value: progressValues.teamProductivity,
      color: "from-green-400 to-green-600",
      description: "Efficiency and output quality",
      emoji: "⚡"
    },
    {
      label: "Quality Score",
      value: progressValues.qualityScore,
      color: "from-yellow-400 to-yellow-600",
      description: "Design and delivery excellence",
      emoji: "💎"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navigation />
      
      {/* Premium background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-blue-900/5 to-pink-900/10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,107,53,0.15),transparent_50%)]" />
      
      <div className="pt-24 pb-16 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Premium Hero */}
          <div className="text-center mb-16 animate-fade-in relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-400/30">
                <Crown className="w-4 h-4 text-yellow-400 animate-pulse" />
                <span className="text-xs font-bold text-yellow-400">PREMIUM STUDIO METRICS</span>
                <Gem className="w-4 h-4 text-yellow-400 animate-pulse" />
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 mb-6 mt-8">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center animate-pulse">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gradient">
                Studio Pulse
              </h1>
              <div className="flex gap-2">
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0s' }}>💓</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>✨</span>
                <span className="text-2xl animate-bounce" style={{ animationDelay: '0.4s' }}>🚀</span>
              </div>
            </div>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              📊 Real-time insights into our premium studio's heartbeat. 
              Track our journey, growth, and creative impact in the design world.
            </p>
            <div className="mt-4 text-sm text-foreground/50">
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full animate-pulse">
                ✅ Live Premium Data
              </span>
            </div>
          </div>

          {/* Enhanced Metrics Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pulseData.map((metric, index) => (
              <div 
                key={index}
                className={`glass p-8 rounded-3xl text-center hover:bg-white/10 transition-all duration-500 glow-hover animate-fade-in hover:scale-105 ${metric.bgColor} border ${metric.borderColor} backdrop-blur-sm shadow-2xl`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => playPulseSound()}
              >
                <div className={`${metric.color} mb-4 flex justify-center hover:animate-bounce cursor-pointer`}>
                  {metric.icon}
                </div>
                <div className="text-4xl font-bold text-gradient mb-2">
                  {metric.value}{metric.suffix}
                </div>
                <div className="text-foreground/70 text-sm font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Metrics */}
          <div className="glass p-8 rounded-3xl mb-16 hover:glow-hover transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-gradient mb-8 text-center flex items-center justify-center gap-3">
              <BarChart3 className="w-8 h-8 animate-pulse" />
              Performance Metrics
              <TrendingUp className="w-8 h-8 animate-bounce" />
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {progressData.map((item, index) => (
                <div 
                  key={index} 
                  className="space-y-3 animate-fade-in p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 0.1 + 1}s` }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/90 font-medium flex items-center gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      {item.label}
                    </span>
                    <span className="text-gradient font-bold text-lg">{item.value}%</span>
                  </div>
                  <Progress 
                    value={item.value} 
                    className="h-4 bg-white/10 overflow-hidden shadow-inner"
                  />
                  <p className="text-sm text-foreground/60">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="glass p-8 rounded-3xl mb-16 hover:glow-hover transition-all duration-300 backdrop-blur-sm border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-gradient mb-8 text-center flex items-center justify-center gap-3">
              <Zap className="w-8 h-8 animate-spin" style={{ animationDuration: '2s' }} />
              Current Status
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gradient mb-4 flex items-center gap-2">
                  🎯 Focus Areas
                </h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Premium brand identity projects</span>
                    <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Active</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105">
                    <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>Interactive web experiences</span>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">Growing</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105">
                    <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>Design system development</span>
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">Expanding</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span>Creative consultation services</span>
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">New</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gradient mb-4 flex items-center gap-2">
                  🚀 Recent Milestones
                </h3>
                <ul className="space-y-3 text-foreground/80">
                  <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-pink-400 rounded-full animate-bounce"></div>
                    <span>Launched 5 major rebrands this quarter</span>
                    <span className="text-xs">🎉</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce"></div>
                    <span>97% client satisfaction achieved</span>
                    <span className="text-xs">✨</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-bounce"></div>
                    <span>23 premium projects delivered</span>
                    <span className="text-xs">💯</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-all hover:scale-105">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-bounce"></div>
                    <span>Premium studio processes refined</span>
                    <span className="text-xs">⚙️</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="text-center glass p-12 rounded-3xl hover:glow-hover transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <h2 className="text-3xl font-bold text-gradient">
                Premium Availability
              </h2>
              <div className="flex gap-1">
                <span className="text-xl animate-bounce" style={{ animationDelay: '0s' }}>🟢</span>
                <span className="text-xl animate-bounce" style={{ animationDelay: '0.2s' }}>⚡</span>
                <span className="text-xl animate-bounce" style={{ animationDelay: '0.4s' }}>🚀</span>
              </div>
            </div>
            <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
              We're actively taking on premium projects and would love to hear about your vision. 
              Let's create something extraordinary together! ✨
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="mailto:aniketh@optra.me"
                className="group flex items-center gap-2 px-8 py-4 bg-optra-gradient text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 glow-hover animate-pulse shadow-2xl"
                onClick={() => playPulseSound()}
              >
                Get Premium Consultation
                <Zap className="w-5 h-5 group-hover:animate-bounce" />
              </a>
              
              <div className="text-sm text-foreground/50 flex items-center gap-2">
                <Coffee className="w-4 h-4" />
                Premium response time: Within 24 hours ⏰
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pulse;
