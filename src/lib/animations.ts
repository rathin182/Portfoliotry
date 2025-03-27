
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

// Reveal animation
export const revealAnimation = (element: string | Element, delay = 0, y = 50) => {
  return gsap.fromTo(
    element,
    { 
      opacity: 0, 
      y: y 
    },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1, 
      ease: "power3.out", 
      delay: delay 
    }
  );
};

// Sequential reveal animation for children elements
export const sequentialReveal = (parent: string, children: string, stagger = 0.1, y = 20) => {
  return gsap.fromTo(
    `${parent} ${children}`,
    { 
      opacity: 0, 
      y: y 
    },
    { 
      opacity: 1, 
      y: 0, 
      stagger: stagger, 
      duration: 0.8, 
      ease: "power3.out" 
    }
  );
};

// Parallax scroll effect
export const parallaxEffect = (element: string, strength = 0.1) => {
  return gsap.to(element, {
    yPercent: strength * 100,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });
};

// Scroll reveal animation
export const scrollReveal = (element: string, trigger: string = element) => {
  return gsap.fromTo(
    element,
    { 
      opacity: 0, 
      y: 50 
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Hover effect animation
export const hoverAnimation = (element: Element) => {
  const enter = () => {
    gsap.to(element, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const leave = () => {
    gsap.to(element, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  element.addEventListener("mouseenter", enter);
  element.addEventListener("mouseleave", leave);

  // Return cleanup function
  return () => {
    element.removeEventListener("mouseenter", enter);
    element.removeEventListener("mouseleave", leave);
  };
};

// Text split and reveal animation
export const splitTextReveal = (element: string, trigger: string = element) => {
  const text = document.querySelector(element);
  if (!text) return;

  const originalText = text.innerHTML;
  const chars = originalText.split("");
  
  text.innerHTML = chars
    .map(char => (char === " " ? " " : `<span>${char}</span>`))
    .join("");

  return gsap.fromTo(
    `${element} span`,
    { 
      opacity: 0, 
      y: 20 
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: trigger,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    }
  );
};

// Scale animation
export const scaleAnimation = (element: string, trigger: string = element) => {
  return gsap.fromTo(
    element,
    { 
      scale: 0.9, 
      opacity: 0 
    },
    {
      scale: 1,
      opacity: 1,
      duration: 0.7,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: trigger,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    }
  );
};
