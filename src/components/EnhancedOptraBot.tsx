
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Brain, Minimize2, Sparkles, Zap, Heart, Star } from 'lucide-react';
import { chatService } from '../services/chatService';
import { toast } from 'sonner';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

const EnhancedOptraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hey there! ✨ I'm OptraBot, your AI-powered design consultant! Ready to transform your brand into something extraordinary? Let's create magic together! 🚀",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [satisfactionLevel, setSatisfactionLevel] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced dopamine-inducing button press effect
  const handleDopaminePress = (callback: () => void) => {
    setButtonPressCount(prev => prev + 1);
    setSatisfactionLevel(prev => Math.min(prev + 1, 100));
    
    // Visual feedback with more intensity
    const button = document.activeElement as HTMLElement;
    button?.classList.add('animate-pulse', 'scale-110');
    setTimeout(() => button?.classList.remove('animate-pulse', 'scale-110'), 300);
    
    // More engaging feedback based on interaction count
    if (buttonPressCount > 0) {
      const encouragements = [
        "🎯 Great choice!",
        "⚡ You're on fire!",
        "🌟 Brilliant!",
        "🚀 Unstoppable!",
        "💎 Perfect timing!",
        "🔥 Amazing!",
        "✨ Fantastic!"
      ];
      
      if (buttonPressCount % 3 === 0) {
        const randomEncouragement = encouragements[Math.floor(Math.random() * encouragements.length)];
        toast.success(randomEncouragement, { 
          duration: 1200,
          style: {
            background: 'linear-gradient(135deg, #FF6B35, #E91E63)',
            color: 'white',
            border: 'none'
          }
        });
      }
    }
    
    callback();
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      const response = await chatService.sendMessage(text.trim());
      
      setTimeout(() => {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: response.reply,
          isBot: true,
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
        
        // Satisfaction boost instead of generic notification
        setSatisfactionLevel(prev => Math.min(prev + 5, 100));
      }, 600 + Math.random() * 300); // Faster response time
      
    } catch (error) {
      setIsTyping(false);
      toast.error("Hold on! Let me get that for you... 💫", { duration: 1500 });
    }
  };

  const quickReplies = [
    "🎨 Tell me about your design magic",
    "💼 What services do you offer?", 
    "📸 Show me your amazing work",
    "🤝 Let's collaborate!"
  ];

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => handleDopaminePress(() => setIsOpen(true))}
          className="relative w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white shadow-2xl transition-all duration-500 hover:scale-125 hover:rotate-12 animate-bounce group overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #FF6B35 0%, #E91E63 50%, #9C27B0 100%)',
            boxShadow: '0 15px 50px rgba(255, 107, 53, 0.4), 0 0 30px rgba(233, 30, 99, 0.3), 0 0 60px rgba(156, 39, 176, 0.2)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
          <MessageCircle size={32} className="relative z-10 drop-shadow-lg" />
          <Sparkles size={18} className="absolute top-2 right-2 animate-spin" />
          <Star size={14} className="absolute bottom-2 left-2 animate-pulse" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-pink-400/20 animate-ping"></div>
        </button>
        
        {/* Floating encouragement bubble */}
        {buttonPressCount > 3 && (
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-2xl shadow-lg animate-bounce text-sm font-medium">
            Click me! I'm waiting to help! 💫
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white/95"></div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-3xl shadow-2xl flex flex-col transition-all duration-700 ease-out ${
      isMinimized ? 'w-20 h-20' : 'w-96 h-[650px]'
    }`}
    style={{
      boxShadow: `0 25px 60px -12px rgba(0, 0, 0, 0.6), 
                  0 0 40px rgba(255, 107, 53, 0.15),
                  0 0 80px rgba(233, 30, 99, 0.1)`
    }}>
      
      {isMinimized ? (
        <div className="w-full h-full flex items-center justify-center">
          <button
            onClick={() => handleDopaminePress(() => setIsMinimized(false))}
            className="w-full h-full flex items-center justify-center hover:bg-white/10 rounded-3xl transition-all duration-300 group relative overflow-hidden"
          >
            <Brain className="w-8 h-8 text-gradient animate-pulse group-hover:scale-125 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500"></div>
          </button>
        </div>
      ) : (
        <>
          {/* Enhanced Header with satisfaction indicator */}
          <div className="p-5 border-b border-gray-700/50 flex items-center gap-3 flex-shrink-0 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-t-3xl relative overflow-hidden">
            <div className="relative">
              <div className="w-5 h-5 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
              <div className="absolute inset-0 w-5 h-5 bg-green-400 rounded-full animate-ping opacity-75"></div>
              <div className="absolute inset-0 w-5 h-5 bg-yellow-400 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 flex items-center gap-2 text-lg">
                <Brain className="w-6 h-6 text-purple-400 animate-pulse" />
                OptraBot
                <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
              </h3>
              <p className="text-xs text-gray-300 flex items-center gap-1">
                <Heart className="w-3 h-3 text-red-400 animate-pulse" />
                Your AI Design Partner
                {satisfactionLevel > 50 && <Star className="w-3 h-3 text-yellow-400 animate-spin" />}
              </p>
            </div>
            
            {/* Satisfaction level indicator */}
            <div className="flex flex-col items-center gap-1">
              <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all duration-1000 ease-out"
                  style={{ width: `${satisfactionLevel}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-400">Joy: {satisfactionLevel}%</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => handleDopaminePress(() => setIsMinimized(true))}
                className="p-2 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-110 group"
              >
                <Minimize2 className="w-4 h-4 text-gray-300 group-hover:text-white" />
              </button>
              <button
                onClick={() => handleDopaminePress(() => setIsOpen(false))}
                className="p-2 hover:bg-red-500/20 rounded-lg transition-all duration-200 hover:scale-110 group"
              >
                <X className="w-4 h-4 text-gray-300 hover:text-red-400 group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>
            
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ping" style={{ top: '20%', left: '10%', animationDelay: '0s' }}></div>
              <div className="absolute w-1 h-1 bg-pink-400 rounded-full animate-ping" style={{ top: '70%', right: '15%', animationDelay: '1s' }}></div>
              <div className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping" style={{ top: '40%', right: '30%', animationDelay: '2s' }}></div>
            </div>
          </div>

          {/* Messages with parallax effect */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 min-h-0 custom-scrollbar relative">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
                style={{
                  transform: `translateY(${index * 0.5}px)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <div className={`flex items-start gap-3 max-w-[85%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-lg transition-all duration-300 hover:scale-110 ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400' 
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400'
                  }`}>
                    {message.isBot ? (
                      <Brain size={18} className="animate-pulse" />
                    ) : (
                      <div className="w-5 h-5 bg-white rounded-full shadow-inner" />
                    )}
                  </div>
                  <div
                    className={`p-4 rounded-2xl shadow-lg border break-words leading-relaxed transition-all duration-300 hover:scale-[1.02] ${
                      message.isBot
                        ? 'bg-gray-800/90 text-white border-gray-600/30 backdrop-blur-sm hover:bg-gray-700/90'
                        : 'bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white border-transparent hover:shadow-2xl'
                    }`}
                    style={{ 
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word',
                      lineHeight: '1.7',
                      maxWidth: '100%'
                    }}
                  >
                    <p className="text-sm whitespace-pre-wrap font-medium">{message.text}</p>
                    <div className="flex items-center justify-between mt-3 text-xs opacity-70">
                      <span className="flex items-center gap-1">
                        <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </span>
                      {message.isBot && (
                        <div className="flex items-center gap-1">
                          <Brain className="w-3 h-3 animate-pulse" />
                          <span>AI</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-start gap-3 max-w-[85%]">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1 animate-pulse">
                    <Brain size={18} className="animate-bounce" />
                  </div>
                  <div className="bg-gray-800/90 p-4 rounded-2xl border border-gray-600/30 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-400 animate-pulse">Crafting the perfect response...</span>
                      <Sparkles className="w-3 h-3 text-yellow-400 animate-spin" />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Input Area */}
          <div className="p-5 border-t border-gray-700/50 flex-shrink-0 bg-gray-800/30 rounded-b-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleDopaminePress(() => handleSendMessage(reply.replace(/[^\w\s]/gi, '')))}
                  className="text-xs px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-600 text-gray-200 rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 border border-gray-600/50 hover:border-transparent shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isTyping}
                >
                  {reply}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isTyping && inputText.trim() && handleSendMessage(inputText)}
                placeholder="Ask me anything about transforming your brand..."
                className="flex-1 bg-gray-800/80 border border-gray-600/50 rounded-full px-5 py-3 text-sm text-white focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300 placeholder-gray-400 backdrop-blur-sm hover:bg-gray-700/80"
                disabled={isTyping}
                style={{ fontSize: '14px', lineHeight: '1.5' }}
              />
              <button
                onClick={() => handleDopaminePress(() => inputText.trim() && handleSendMessage(inputText))}
                className="w-12 h-12 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl disabled:hover:scale-100 group"
                disabled={isTyping || !inputText.trim()}
              >
                <Send size={18} className="text-white group-hover:animate-pulse" />
              </button>
            </div>
          </div>
        </>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(45deg, #FF6B35, #E91E63);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(45deg, #E91E63, #9C27B0);
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default EnhancedOptraBot;
