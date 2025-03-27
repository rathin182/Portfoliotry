
import React, { useEffect, useRef } from 'react';
import { scrollReveal } from '@/lib/animations';
import gsap from 'gsap';
import { Download } from 'lucide-react';

const About: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
    
    // Animate content
    if (contentRef.current) {
      timeline.fromTo(
        contentRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }
    
    // Animate image
    if (imageRef.current) {
      timeline.fromTo(
        imageRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
      
      // Add parallax effect to image
      gsap.to(imageRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
    
    // Animate download button
    const downloadBtn = sectionRef.current.querySelector('.download-btn');
    if (downloadBtn) {
      timeline.fromTo(
        downloadBtn,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
        '-=0.4'
      );
    }
  }, []);

  // Download resume handler
  const handleDownload = () => {
    // In a real implementation, this would download the actual resume file
    alert('Resume download functionality would be implemented here with a real file.');
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left content */}
          <div ref={contentRef} className="lg:w-3/5 order-2 lg:order-1">
            <h2 className="section-title">About Me</h2>
            
            <div className="space-y-4 text-foreground/80">
              <p>
              I’m a passionate developer constantly working on new projects and expanding my skills. My first completed project, ChessMate, is a simple and lightweight offline chess game where players can challenge AI opponents with varying difficulty levels. It’s designed to help users improve their strategy without needing an internet connection.
              </p>
              <p>
              Right now, my projects are still in development, but I'm always ready to take on new opportunities. My first completed project is a small offline chess game, and many more are on the way! I'm eager to learn, grow, and collaborate on exciting projects. If you're looking for someone who’s ready to take on challenges, let's connect!
              </p>
            </div>
            
            {/* <button 
              onClick={handleDownload}
              className="download-btn mt-8 inline-flex items-center px-5 py-2.5 bg-secondary/80 hover:bg-secondary text-foreground rounded-lg text-sm font-medium transition-all hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            >
              <Download size={18} className="mr-2" />
              Download Resume
            </button> */}
          </div>
          
          {/* Right image */}
          <div ref={imageRef} className="lg:w-2/5 order-1 lg:order-2">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden glassmorphism border border-white/10">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf?q=80&w=2071&auto=format&fit=crop)' }}
                ></div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-xl bg-primary/10 -z-10"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 rounded-lg bg-blue-500/10 -z-10"></div>
              
              {/* Experience badge */}
              <div className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-secondary glassmorphism rounded-xl px-4 py-3 border border-white/10">
                <div className="text-center">
                  <span className="block text-2xl font-bold text-primary">fresher</span>
                  <span className="text-xs text-foreground/70">no Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
