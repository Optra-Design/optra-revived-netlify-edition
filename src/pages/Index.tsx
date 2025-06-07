
import React, { useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import AnimatedHeroText from '../components/AnimatedHeroText';
import SecretSudoButton from '../components/SecretSudoButton';
import { ArrowRight, Eye, Code2, Layers, Sparkles, Target, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      icon: <Eye className="w-8 h-8" />,
      title: "Visual Identity",
      description: "Comprehensive brand systems that capture essence and drive market recognition through strategic design principles and cohesive visual storytelling.",
      features: ["Logo Design", "Brand Guidelines", "Color Palettes", "Typography Systems"]
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Digital Products",
      description: "User-centered interfaces and interactions that convert visitors into customers through thoughtful UX research and data-driven design decisions.",
      features: ["UI/UX Design", "Prototyping", "User Research", "Conversion Optimization"]
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: "Creative Strategy",
      description: "Data-driven creative direction that aligns design decisions with measurable business outcomes and long-term growth objectives.",
      features: ["Brand Strategy", "Design Systems", "Content Strategy", "Performance Analytics"]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Digital Experiences",
      description: "Immersive digital experiences that engage audiences through innovative interactions and cutting-edge design technologies.",
      features: ["Interactive Design", "Motion Graphics", "3D Visualization", "Web Experiences"]
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Brand Positioning",
      description: "Strategic positioning that differentiates your brand in competitive markets through unique value propositions and market insights.",
      features: ["Market Research", "Competitive Analysis", "Brand Messaging", "Value Proposition"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Consultation",
      description: "Expert guidance and strategic advice to help businesses make informed design decisions that drive growth and market success.",
      features: ["Design Audits", "Strategy Sessions", "Team Training", "Process Optimization"]
    }
  ];

  return (
    <div className="min-h-screen relative bg-zinc-950 overflow-hidden">
      <Navigation />
      <SecretSudoButton />
      
      {/* Scroll blur overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[1] transition-all duration-500"
        style={{
          backdropFilter: `blur(${Math.min(scrollY / 50, 2)}px)`,
          background: `rgba(9, 9, 11, ${Math.min(scrollY / 1000, 0.1)})`
        }}
      />
      
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

      {/* Enhanced Capabilities Section */}
      <section className="py-40 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-12 h-px bg-gradient-to-r from-pink-400/90 to-transparent" />
              <span className="text-sm font-medium text-zinc-400 tracking-wider uppercase">Capabilities</span>
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-8 max-w-5xl">
              Precision-crafted solutions that bridge the gap between 
              <span className="font-medium italic text-zinc-300"> vision and reality</span>
            </h2>
            <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
              Our comprehensive suite of design services transforms your brand vision into compelling digital experiences that drive measurable business results.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {capabilities.map((capability, index) => (
              <div 
                key={index}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-8 h-full transition-all duration-500 hover:border-zinc-700/70 hover:bg-zinc-900/70 hover:shadow-2xl hover:shadow-purple-500/10">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="p-4 bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-xl group-hover:border-zinc-600 transition-all duration-300 group-hover:shadow-lg">
                      <div className="text-zinc-300 group-hover:text-white transition-colors duration-300">
                        {capability.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-zinc-100 transition-colors">
                        {capability.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed text-base mb-6 group-hover:text-zinc-300 transition-colors">
                        {capability.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {capability.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 flex-shrink-0" />
                        <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
