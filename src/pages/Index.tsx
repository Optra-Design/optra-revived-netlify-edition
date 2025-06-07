import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import AnimatedHeroText from '../components/AnimatedHeroText';
import SecretSudoButton from '../components/SecretSudoButton';
import { ArrowRight, Eye, Code2, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  useEffect(() => {
    // SEO meta tags
    document.title = 'Optra Design - Premium Design Studio by Aniketh | Brand Identity & Digital Experiences';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Optra Design is a premium design studio founded by Aniketh in Bangalore. We create distinctive brand identities, interactive digital experiences, and strategic creative direction that elevates your business.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Optra Design is a premium design studio founded by Aniketh in Bangalore. We create distinctive brand identities, interactive digital experiences, and strategic creative direction that elevates your business.';
      document.head.appendChild(meta);
    }

    // Keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'design studio, brand identity, UI UX design, digital experiences, creative direction, Bangalore designer, Aniketh, Optra Design, web design, graphic design';
      document.head.appendChild(meta);
    }

    console.log(`
    🎨 Welcome to Optra Design's console!
    
    ╔═══════════════════════════════════════╗
    ║           OPTRA DESIGN               ║
    ║        Shape. Style. Scale.          ║
    ║         Founded by Aniketh           ║
    ╚═══════════════════════════════════════╝
    
    Try typing:
    - optra.sudo() for hidden features
    - optra.magic() for something special
    - optra.contact() for quick contact
    
    Built with ❤️ by Aniketh in Bangalore
    `);

    (window as any).optra = {
      sudo: () => {
        document.dispatchEvent(new CustomEvent('sudo-mode-toggle'));
        console.log('🔓 Sudo mode toggled! Welcome to the admin zone, Aniketh!');
      },
      magic: () => {
        document.body.classList.add('glitch');
        setTimeout(() => document.body.classList.remove('glitch'), 2000);
        console.log('✨ Magic activated by the founder!');
      },
      contact: () => {
        window.location.href = 'mailto:aniketh@optra.me';
        console.log('📧 Opening contact to Aniketh...');
      }
    };
  }, []);

  const capabilities = [
    {
      icon: <Eye className="w-7 h-7" />,
      title: "Visual Identity",
      description: "Comprehensive brand systems that capture essence and drive market recognition through strategic design."
    },
    {
      icon: <Code2 className="w-7 h-7" />,
      title: "Digital Products",
      description: "User-centered interfaces and interactions that convert visitors into customers through thoughtful UX."
    },
    {
      icon: <Layers className="w-7 h-7" />,
      title: "Creative Strategy",
      description: "Data-driven creative direction that aligns design decisions with measurable business outcomes."
    }
  ];

  return (
    <div className="min-h-screen relative bg-zinc-950 overflow-hidden">
      <Navigation />
      <SecretSudoButton />
      
      {/* Enhanced Fun Background Elements with More Vibrant Colors */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated colorful orbs with enhanced vibrancy */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/40 to-purple-400/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/40 to-cyan-400/40 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-orange-400/35 to-yellow-400/35 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Enhanced fun animated grid pattern with more color */}
        <div className="absolute inset-0 opacity-[0.1]">
          <div className="absolute inset-0 animate-pulse" style={{
            backgroundImage: `
              linear-gradient(rgba(255,107,53,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(233,30,99,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            animationDuration: '8s'
          }} />
        </div>
        
        {/* Enhanced floating geometric shapes with brighter colors */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-gradient-to-r from-pink-500 to-purple-500 rotate-45 animate-bounce opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-bounce opacity-70" style={{animationDelay: '3s'}}></div>
        <div className="absolute bottom-32 left-40 w-5 h-5 bg-gradient-to-r from-orange-500 to-yellow-500 rotate-12 animate-bounce opacity-65" style={{animationDelay: '5s'}}></div>
        <div className="absolute top-60 right-60 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-bounce opacity-60" style={{animationDelay: '7s'}}></div>
        <div className="absolute bottom-60 left-60 w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rotate-45 animate-bounce opacity-55" style={{animationDelay: '9s'}}></div>
        <div className="absolute top-80 left-80 w-5 h-5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full animate-bounce opacity-65" style={{animationDelay: '11s'}}></div>
      </div>
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative z-10">
        {/* Enhanced subtle grid pattern with more vibrance */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,107,53,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(233,30,99,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }} />
        </div>
        
        <AnimatedHeroText />
        
        {/* Enhanced accent element with more vibrant color */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-px h-16 bg-gradient-to-b from-purple-400/90 via-pink-400/70 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-px bg-gradient-to-r from-pink-400/90 to-transparent" />
              <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Capabilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-6 max-w-3xl">
              Precision-crafted solutions that bridge the gap between 
              <span className="font-medium italic text-zinc-300"> vision and reality</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg group-hover:border-zinc-700 transition-colors">
                    <div className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                      {capability.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium text-white mb-3 group-hover:text-zinc-200 transition-colors">
                      {capability.title}
                    </h3>
                    <p className="text-zinc-400 leading-relaxed text-sm">
                      {capability.description}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-gradient-to-r from-zinc-800 to-transparent group-hover:from-zinc-700 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Preview Section */}
      <section className="py-32 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-gradient-to-r from-cyan-500/60 to-transparent" />
                <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Recent Work</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-8">
                Projects that demonstrate our commitment to 
                <span className="font-medium italic text-zinc-300"> exceptional craft</span>
              </h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Shriniketana School</h4>
                    <p className="text-zinc-400 text-sm">Complete brand identity and digital presence for educational institution</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse" style={{animationDelay: '1s'}} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Nyve Design</h4>
                    <p className="text-zinc-400 text-sm">
                      Social media marketing strategy - 
                      <a href="https://www.nyvedesign.com" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 transition-colors ml-1">
                        www.nyvedesign.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 animate-pulse" style={{animationDelay: '2s'}} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Enterprise Rebrand</h4>
                    <p className="text-zinc-400 text-sm">Complete visual identity overhaul resulting in 40% increase in brand recognition</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden relative hover:border-purple-500/30 transition-colors duration-500">
                <img 
                  src="/lovable-uploads/67b4cc52-5a7d-48bb-a24d-a7ff5c22d39d.png"
                  alt="Nyve Design Website Screenshot"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 px-6 relative border-t border-zinc-900 z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
            <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Get Started</span>
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-500/60 to-transparent" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light text-white leading-tight mb-8">
            Ready to elevate your brand?
          </h2>
          <p className="text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can transform your vision into a compelling digital presence that drives results.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link 
              to="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg transition-all duration-200 hover:from-purple-600 hover:to-pink-600 hover:scale-105"
            >
              Start a Project
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <Link 
              to="/services"
              className="inline-flex items-center gap-3 px-8 py-4 border border-zinc-800 text-zinc-300 font-medium rounded-lg transition-all duration-200 hover:border-purple-500/50 hover:text-white hover:scale-105"
            >
              View Services
            </Link>
          </div>

          <div className="mt-16 pt-8 border-t border-zinc-900">
            <p className="text-sm text-zinc-500">
              Aniketh • Bangalore • Response within 24 hours
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
