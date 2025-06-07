
import React, { useState, useRef, useEffect } from 'react';
import { Download, Palette, Type, Sparkles, Grid } from 'lucide-react';

const InstagramGenerator = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [customText, setCustomText] = useState('Your Amazing Content');
  const [customSubtext, setCustomSubtext] = useState('Make it happen ✨');
  const [selectedFont, setSelectedFont] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const templates = [
    {
      name: 'Optra Fire',
      id: 'optra-gradient',
      preview: '🔥',
      colors: ['#FF6B35', '#E91E63', '#9C27B0'],
      textColor: '#FFFFFF'
    },
    {
      name: 'Neon Cyber',
      id: 'neon-cyber',
      preview: '⚡',
      colors: ['#00F5FF', '#FF1493', '#8A2BE2'],
      textColor: '#FFFFFF'
    },
    {
      name: 'Sunset Vibes',
      id: 'sunset-vibes',
      preview: '🌅',
      colors: ['#FF8C00', '#FF4500', '#DC143C'],
      textColor: '#FFFFFF'
    },
    {
      name: 'Ocean Deep',
      id: 'ocean-deep',
      preview: '🌊',
      colors: ['#0077BE', '#00CED1', '#20B2AA'],
      textColor: '#FFFFFF'
    },
    {
      name: 'Gold Luxury',
      id: 'gold-luxury',
      preview: '👑',
      colors: ['#FFD700', '#FFA500', '#FF8C00'],
      textColor: '#000000'
    },
    {
      name: 'Purple Rain',
      id: 'purple-rain',
      preview: '💜',
      colors: ['#9932CC', '#8A2BE2', '#4B0082'],
      textColor: '#FFFFFF'
    }
  ];

  const fonts = [
    { name: 'Bold', family: 'Inter', weight: '900' },
    { name: 'Elegant', family: 'serif', weight: '700' },
    { name: 'Mono', family: 'JetBrains Mono', weight: '700' },
    { name: 'Classic', family: 'Inter', weight: '600' }
  ];

  const generatePost = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1080;

    const template = templates[selectedTemplate];
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    
    gradient.addColorStop(0, template.colors[0]);
    gradient.addColorStop(0.5, template.colors[1]);
    gradient.addColorStop(1, template.colors[2]);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add texture
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 800; i++) {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2);
    }
    ctx.globalAlpha = 1;

    const font = fonts[selectedFont];
    ctx.fillStyle = template.textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Main text
    ctx.font = `${font.weight} 120px ${font.family}`;
    const lines = customText.split('\n');
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, canvas.height / 2 - 60 + (index * 140));
    });

    // Subtext
    ctx.font = `600 60px ${font.family}`;
    ctx.globalAlpha = 0.9;
    ctx.fillText(customSubtext, canvas.width / 2, canvas.height / 2 + 200);
    ctx.globalAlpha = 1;

    // Branding
    ctx.font = '500 40px Inter';
    ctx.globalAlpha = 0.7;
    ctx.fillText('Created with Optra', canvas.width / 2, canvas.height - 80);
  };

  const downloadPost = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `optra-instagram-post-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  useEffect(() => {
    generatePost();
  }, [selectedTemplate, customText, customSubtext, selectedFont]);

  return (
    <div className="w-full space-y-3 sm:space-y-4">
      {/* Templates - Mobile optimized */}
      <div className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-gradient flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Templates
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {templates.map((template, index) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(index)}
              className={`p-2 sm:p-3 rounded-lg border transition-all duration-200 ${
                selectedTemplate === index
                  ? 'border-white/50 bg-white/20 scale-105'
                  : 'border-white/20 hover:border-white/40'
              }`}
              style={{ background: `linear-gradient(135deg, ${template.colors.join(', ')})` }}
            >
              <div className="text-lg sm:text-xl mb-1">{template.preview}</div>
              <div className="text-white font-medium text-xs">{template.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Text Controls */}
      <div className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-gradient flex items-center gap-2">
          <Type className="w-4 h-4" />
          Content
        </h3>
        <div className="space-y-2">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Main text"
            className="w-full p-3 text-sm bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-white/50 transition-colors"
          />
          <input
            type="text"
            value={customSubtext}
            onChange={(e) => setCustomSubtext(e.target.value)}
            placeholder="Subtext"
            className="w-full p-3 text-sm bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-white/50 transition-colors"
          />
        </div>
      </div>

      {/* Font Selection */}
      <div className="space-y-2">
        <h3 className="text-sm sm:text-base font-bold text-gradient flex items-center gap-2">
          <Palette className="w-4 h-4" />
          Font
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {fonts.map((font, index) => (
            <button
              key={font.name}
              onClick={() => setSelectedFont(index)}
              className={`p-2 sm:p-3 rounded-lg border transition-all duration-200 ${
                selectedFont === index
                  ? 'border-white/50 bg-white/20 scale-105'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              <div 
                className="text-white font-medium text-xs"
                style={{ fontFamily: font.family, fontWeight: font.weight }}
              >
                {font.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm sm:text-base font-bold text-gradient flex items-center gap-2">
            <Grid className="w-4 h-4" />
            Preview
          </h3>
          <button
            onClick={downloadPost}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-xs sm:text-sm font-semibold hover:scale-105 transition-all duration-200"
          >
            <Download className="w-4 h-4" />
            Download
          </button>
        </div>
        
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            className="w-full max-w-64 h-auto rounded-xl shadow-xl border border-white/20"
            style={{ aspectRatio: '1/1' }}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setCustomText('Success\nMindset')}
          className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-xs font-medium"
        >
          💪 Motivation
        </button>
        <button
          onClick={() => setCustomText('Tech\nInnovation')}
          className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors text-xs font-medium"
        >
          🚀 Tech
        </button>
      </div>
    </div>
  );
};

export default InstagramGenerator;
