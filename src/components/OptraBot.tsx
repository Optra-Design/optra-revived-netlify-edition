
import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Send, Brain, Minimize2 } from 'lucide-react';

const OptraBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey there! I'm OptraBot ✨ Your AI assistant. I can help you discover Aniketh's work, learn about services, or connect you directly. What would you like to explore?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationContext, setConversationContext] = useState<string[]>([]);

  const quickReplies = [
    "About Aniketh",
    "Services",
    "Recent work",
    "Contact"
  ];

  // Fast LLM-like response system
  const generateFastResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Quick pattern matching for fast responses
    if (input.match(/^(hi|hello|hey)/)) {
      return "Hello! 👋 Great to meet you! I'm here to help you explore Optra. What interests you most?";
    }

    if (input.includes('aniketh') || input.includes('founder')) {
      return "Aniketh is the visionary founder behind Optra Design! 🎯 He's a passionate creative based in Bangalore who founded this boutique studio. He personally handles each project to ensure exceptional quality. Want to know about his design philosophy? 🚀";
    }

    if (input.includes('service') || input.includes('offer')) {
      return "Optra specializes in premium digital experiences: 🎨 Brand Identity Design, 🌐 Interactive Web Experiences, 🎯 Creative Direction, and 💡 Design Consultation. Each service is tailored to your needs. What type of project are you considering? ✨";
    }

    if (input.includes('work') || input.includes('portfolio') || input.includes('project')) {
      return "Optra's work includes transformative brand identities and innovative digital experiences! 🌟 Recent projects show 250% increased recognition and 300% improved engagement. For detailed case studies, reach out to aniketh@optra.me! 📊";
    }

    if (input.includes('contact') || input.includes('meeting') || input.includes('schedule')) {
      return "Ready to connect with Aniketh! 🤝 Send an email to aniketh@optra.me with your project details. He responds within 48 hours with initial thoughts. Include your timeline and any inspiration references! 📧";
    }

    if (input.includes('price') || input.includes('cost') || input.includes('budget')) {
      return "Optra's pricing reflects boutique quality - each project is custom-scoped. 💰 Think investment: clients typically see 2-3x returns. For accurate pricing, Aniketh provides detailed proposals after understanding your needs. Want to discuss specifics? 📈";
    }

    if (input.includes('thank') || input.includes('great') || input.includes('awesome')) {
      return "You're very welcome! 😊 I'm glad I could help! Is there anything else you'd like to explore about our services or Aniketh's approach? ✨";
    }

    // Default fast response
    return "That's a great question! 🤔 For the most comprehensive answer, I'd recommend connecting with Aniketh at aniketh@optra.me. Meanwhile, what else would you like to know about our design approach? 💡";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOpen && messages.length === 1) {
        setIsOpen(true);
        addBotMessage("Still exploring? I'm here with quick insights about Aniketh's work! 🎉");
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [isOpen, messages.length]);

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    // Fast response time - 500ms max
    const thinkingTime = 300 + Math.random() * 200;
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text,
        isBot: true,
        timestamp: new Date()
      }]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const handleSendMessage = (text: string) => {
    const userMessage = {
      id: Date.now(),
      text,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Update conversation context
    const newContext = [...conversationContext, text].slice(-3);
    setConversationContext(newContext);

    // Generate fast response
    const response = generateFastResponse(text);
    addBotMessage(response);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-optra-gradient text-white shadow-lg transition-all duration-300 hover:scale-110 glow-hover animate-bounce-subtle"
      >
        <MessageCircle size={28} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-background/95 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl flex flex-col glow-hover transition-all duration-300 ${
      isMinimized ? 'w-16 h-16' : 'w-80 h-[32rem]'
    }`}>
      {isMinimized ? (
        <div className="w-full h-full flex items-center justify-center">
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center justify-center hover:bg-white/10 rounded-3xl transition-colors group"
          >
            <Brain className="w-6 h-6 text-gradient animate-pulse group-hover:scale-110 transition-transform" />
          </button>
        </div>
      ) : (
        <>
          <div className="p-4 border-b border-white/20 flex items-center gap-3 flex-shrink-0">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <h3 className="font-bold text-gradient flex items-center gap-2">
                <Brain className="w-4 h-4" />
                OptraBot
              </h3>
              <p className="text-xs text-foreground/70">Fast AI Assistant</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <Minimize2 className="w-4 h-4 text-foreground/70" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4 text-foreground/70" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 min-h-0">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed ${
                    message.isBot
                      ? 'bg-white/10 text-foreground border border-white/20'
                      : 'bg-optra-gradient text-white'
                  }`}
                >
                  <p>{message.text}</p>
                  {message.isBot && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-foreground/50">
                      <Brain className="w-3 h-3" />
                      <span>AI</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl border border-white/20">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-400 animate-pulse" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 border-t border-white/20 flex-shrink-0">
            <div className="flex flex-wrap gap-2 mb-3">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs px-3 py-2 bg-white/10 text-foreground rounded-full hover:bg-white/20 transition-all hover:scale-105 border border-white/20"
                >
                  {reply}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && inputText.trim() && handleSendMessage(inputText)}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/10 border border-white/30 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-white/50 transition-colors text-foreground placeholder:text-foreground/50"
              />
              <button
                onClick={() => inputText.trim() && handleSendMessage(inputText)}
                className="w-10 h-10 bg-optra-gradient rounded-full flex items-center justify-center hover:scale-105 transition-transform duration-200 disabled:opacity-50"
                disabled={!inputText.trim()}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OptraBot;
