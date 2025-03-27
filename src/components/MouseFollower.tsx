
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const MouseFollower: React.FC = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const follower = followerRef.current;
    const cursor = cursorRef.current;
    
    if (!follower || !cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let cursorX = 0;
    let cursorY = 0;

    gsap.set(follower, { xPercent: -50, yPercent: -50 });
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const followMouse = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      gsap.set(follower, { x: followerX, y: followerY });
      gsap.set(cursor, { x: cursorX, y: cursorY });
      
      requestAnimationFrame(followMouse);
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Handle hover state for buttons and links
    const handleMouseEnter = () => {
      gsap.to(follower, { 
        scale: 1.5, 
        opacity: 0.6, 
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        duration: 0.3 
      });
    };

    const handleMouseLeave = () => {
      gsap.to(follower, { 
        scale: 1, 
        opacity: 0.15, 
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        duration: 0.3 
      });
    };

    const elements = document.querySelectorAll('a, button');
    elements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    followMouse();

    return () => {
      elements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Hide cursor on mobile devices
  if (typeof window !== 'undefined') {
    const isMobile = window.innerWidth <= 768;
    if (isMobile) return null;
  }

  return (
    <>
      <div 
        ref={followerRef} 
        className="pointer-events-none fixed z-50 h-8 w-8 rounded-full bg-white/2 border border-white/10 opacity-15 transition-transform duration-300 ease-out hidden md:block"
        style={{ top: 0, left: 0 }}
      />
      <div 
        ref={cursorRef} 
        className="pointer-events-none fixed z-50 h-2 w-2 rounded-full bg-primary opacity-70 transition-transform duration-100 ease-out hidden md:block"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
};

export default MouseFollower;
