
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MouseFollower from '@/components/MouseFollower';
import gsap from 'gsap';

const Index = () => {
  useEffect(() => {
    // Initial loading animation
    gsap.fromTo(
      'body',
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' }
    );
    
    // Preload all animations by importing the required GSAP plugins
    import('@/lib/animations').then(() => {
      console.log('GSAP animations loaded');
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Skills />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <MouseFollower />
    </div>
  );
};

export default Index;
