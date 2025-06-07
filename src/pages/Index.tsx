import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-36 md:py-64 bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10 overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Shape. Style. Scale.
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Premium design solutions for brands ready to make a difference. We specialize in brand identity, UI/UX design, and creative direction.
              </p>
              <div className="space-x-4">
                <Button size="lg" asChild>
                  <Link to="/contact">Get in Touch</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/projects">View Projects</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img
                  src="/hero-image.webp"
                  alt="Abstract design elements"
                  className="rounded-3xl shadow-2xl w-full object-cover aspect-video"
                  style={{ height: '400px' }}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-red-500 opacity-20 rounded-3xl mix-blend-overlay"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(244,244,244,0.1)_0%,rgba(244,244,244,0)_50%)]"></div>
      </section>

      {/* Capabilities */}
      <section className="py-32 relative backdrop-blur-2xl bg-background/90">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Our Capabilities
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-20 max-w-3xl mx-auto leading-relaxed">
              We blend artistic vision with strategic thinking to create experiences that don't just look beautiful—they perform exceptionally and drive meaningful results for your business.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: "Brand Identity Design",
                  description: "Comprehensive brand systems that capture your essence and resonate with your audience. From logos to complete visual identities, we create cohesive brand experiences that stand the test of time.",
                  icon: "🎨"
                },
                {
                  title: "UI/UX Design",
                  description: "User-centered design that prioritizes both aesthetics and functionality. We craft intuitive interfaces that guide users effortlessly through digital experiences while maintaining visual excellence.",
                  icon: "💻"
                },
                {
                  title: "Creative Direction",
                  description: "Strategic creative leadership that aligns your vision with market realities. We guide creative decisions from concept to execution, ensuring consistency across all touchpoints.",
                  icon: "🎯"
                },
                {
                  title: "Digital Experiences",
                  description: "Immersive digital solutions that engage and convert. From websites to applications, we create digital experiences that tell your story and drive business growth.",
                  icon: "🚀"
                },
                {
                  title: "Visual Storytelling",
                  description: "Compelling narratives through visual design. We transform complex ideas into clear, engaging visual stories that connect with your audience on an emotional level.",
                  icon: "📖"
                },
                {
                  title: "Strategic Consulting",
                  description: "Design-driven business strategy that positions you for success. We help you understand how design can be a competitive advantage and drive sustainable growth.",
                  icon: "💡"
                }
              ].map((capability, index) => (
                <div 
                  key={index}
                  className="group p-8 rounded-2xl bg-card/60 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl"
                >
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                    {capability.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">
                    {capability.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {capability.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Selected Work
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Project 1 */}
              <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <img
                  src="/project1.webp"
                  alt="Project 1"
                  className="object-cover w-full h-64 md:h-96 transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-background/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="lg" asChild>
                    <Link to="/project1">View Project</Link>
                  </Button>
                </div>
              </div>

              {/* Project 2 */}
              <div className="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <img
                  src="/project2.webp"
                  alt="Project 2"
                  className="object-cover w-full h-64 md:h-96 transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-background/70 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button size="lg" asChild>
                    <Link to="/project2">View Project</Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/projects">Explore All Projects</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative bg-card">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
              What Our Clients Say
            </h2>
            <ScrollArea className="h-[300px]">
              <div className="space-y-8">
                {/* Testimonial 1 */}
                <div className="p-6 rounded-2xl bg-muted/30 backdrop-blur-lg border border-border">
                  <p className="text-lg text-muted-foreground italic mb-4">
                    "Optra Design transformed our brand identity into something truly special. Their attention to detail and creative vision exceeded our expectations."
                  </p>
                  <p className="text-foreground font-semibold">- Sarah L., Marketing Director</p>
                </div>

                {/* Testimonial 2 */}
                <div className="p-6 rounded-2xl bg-muted/30 backdrop-blur-lg border border-border">
                  <p className="text-lg text-muted-foreground italic mb-4">
                    "The UI/UX design for our new app is fantastic. It's intuitive, beautiful, and has significantly improved user engagement."
                  </p>
                  <p className="text-foreground font-semibold">- Michael K., CEO</p>
                </div>

                {/* Testimonial 3 */}
                <div className="p-6 rounded-2xl bg-muted/30 backdrop-blur-lg border border-border">
                  <p className="text-lg text-muted-foreground italic mb-4">
                    "Their strategic consulting helped us understand the true value of design in our business. We're now seeing a direct impact on our bottom line."
                  </p>
                  <p className="text-foreground font-semibold">- Emily R., Founder</p>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 relative bg-gradient-to-br from-orange-500/10 via-red-500/10 to-pink-500/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Ready to Elevate Your Brand?
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Let's discuss how we can help you achieve your business goals through exceptional design.
            </p>
            <Button size="lg" asChild>
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} Optra Design. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
