
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { revealAnimation, sequentialReveal } from '@/lib/animations';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const bgShapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    // Create animation timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Animate title
    if (titleRef.current) {
      // Split the title text into individual characters
      const title = titleRef.current;
      const originalText = title.innerText;
      const chars = originalText.split('');
      
      title.innerHTML = chars
        .map(char => (char === ' ' ? ' ' : `<span class="inline-block">${char}</span>`))
        .join('');
      
      tl.fromTo(
        title.querySelectorAll('span'),
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, duration: 0.5, delay: 0.5 }
      );
    }

    // Animate subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.2'
      );
    }

    // Animate background elements
    if (bgShapesRef.current) {
      const shapes = bgShapesRef.current.querySelectorAll('.bg-shape');
      tl.fromTo(
        shapes,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 1 },
        '-=0.5'
      );
    }

    // Mouse movement effect for background elements
    if (bgShapesRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;
        
        gsap.to('.bg-shape-1', {
          x: moveX * 20,
          y: moveY * 20,
          duration: 1,
          ease: 'power1.out'
        });
        
        gsap.to('.bg-shape-2', {
          x: moveX * -30,
          y: moveY * -30,
          duration: 1,
          ease: 'power1.out'
        });
        
        gsap.to('.bg-shape-3', {
          x: moveX * 40,
          y: moveY * 40,
          duration: 1,
          ease: 'power1.out'
        });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern"
    >
      {/* Background Shapes */}
      <div ref={bgShapesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="bg-shape bg-shape-1 absolute top-[20%] left-[15%] w-96 h-96 rounded-full bg-primary/5 blur-3xl transform -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
        <div className="bg-shape bg-shape-2 absolute bottom-[15%] right-[10%] w-80 h-80 rounded-full bg-blue-500/5 blur-3xl transform -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
        <div className="bg-shape bg-shape-3 absolute top-[60%] right-[25%] w-64 h-64 rounded-full bg-purple-500/5 blur-3xl transform -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 
            ref={titleRef} 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gradient"
          >
            Hi, I'm Rathin Bagchi, a Web Developer crafting modern experiences.
          </h1>
          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-foreground/80 mb-8"
          >
            Building beautiful, responsive and performance-focused web applications with attention to detail.
          </p>
          
          <div className="flex justify-center space-x-4 pt-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center h-10 px-6 py-2 bg-primary/90 text-primary-foreground rounded-full text-sm font-medium transition-all hover:bg-primary hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center h-10 px-6 py-2 bg-transparent border border-primary/30 text-foreground rounded-full text-sm font-medium transition-all hover:bg-primary/10 hover:border-primary/50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#contact')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-foreground/50 rounded-full mt-1 animate-bounce"></div>
        </div>
        <span className="text-foreground/50 text-xs mt-2">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
