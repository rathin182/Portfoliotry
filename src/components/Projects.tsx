
import React, { useEffect, useRef } from 'react';
import { scrollReveal, hoverAnimation } from '@/lib/animations';
import gsap from 'gsap';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
}

const projects: Project[] = [
  // {
  //   title: "E-Commerce Platform",
  //   description: "A full-featured online shopping platform with cart functionality, user authentication, and payment processing integration.",
  //   image: "https://images.unsplash.com/photo-1661956602944-249bcd04b63f?q=80&w=3270&auto=format&fit=crop",
  //   technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  //   githubUrl: "https://github.com",
  //   liveUrl: "https://netlify.com"
  // },
  {
    title: "Secure Signup and Login Web App with Next.js",
    description: "This is a secure and modern authentication web application built with Next.js (App Router). It features a seamless signup and login system with JWT-based authentication and bcrypt for password hashing. The app ensures user data protection while providing a smooth user experience.",
    image: "./public/authentication.png",
    technologies: ["Nextjs", "JWT", "bcrypt", "MongoDB"],
    githubUrl: "https://github.com/rathin182/Authentication",
    liveUrl: "https://authenticationa.netlify.app/"
  },
  {
    title: "ChessMate: Offline Chess Game",
    description: "Enjoy a classic game of chess anytime, anywhere with ChessMate, a simple and lightweight offline chess game. Play against the AI with different difficulty levels, improve your strategy, and sharpen your skills without needing an internet connection. Perfect for both beginners and experienced players!",
    image: "./public/chess.png",
    technologies: ["React", "javaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/rathin182",
    liveUrl: "https://visionary-crisp-ae54a2.netlify.app/"
  }
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate the title
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Animate each project card
    projectRefs.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(
        card,
        { 
          y: 50, 
          opacity: 0 
        },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          delay: 0.1 * index, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
      
      // Setup hover effect for project cards
      card.addEventListener('mouseenter', () => {
        const image = card.querySelector('.project-image');
        const content = card.querySelector('.project-content');
        
        gsap.to(card, {
          y: -10,
          boxShadow: '0 20px 40px -20px rgba(0, 0, 0, 0.3)',
          borderColor: 'rgba(var(--primary-rgb), 0.3)',
          duration: 0.3
        });
        
        gsap.to(image, {
          scale: 1.05,
          duration: 0.5
        });
        
        gsap.to(content, {
          y: -5,
          duration: 0.3
        });
      });
      
      card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.project-image');
        const content = card.querySelector('.project-content');
        
        gsap.to(card, {
          y: 0,
          boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.15)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          duration: 0.3
        });
        
        gsap.to(image, {
          scale: 1,
          duration: 0.5
        });
        
        gsap.to(content, {
          y: 0,
          duration: 0.3
        });
      });
    });
  }, []);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="section-padding relative overflow-hidden bg-gradient-to-b from-background to-background/95"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-32 top-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -left-32 bottom-20 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <h2 ref={titleRef} className="section-title">Featured Projects</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              ref={el => projectRefs.current[index] = el}
              className="project-card glassmorphism rounded-xl overflow-hidden border border-white/10 transition-all duration-300"
            >
              <div className="relative overflow-hidden h-48">
                <div 
                  className="project-image absolute inset-0 bg-cover bg-center transition-transform duration-500"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
              </div>
              
              <div className="project-content p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-foreground/70 text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="text-xs font-medium bg-primary/10 text-primary/90 rounded-full px-2.5 py-0.5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex space-x-3">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-9 px-4 bg-primary/90 text-primary-foreground rounded-lg text-sm font-medium transition-all hover:bg-primary hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <ExternalLink size={16} className="mr-1.5" />
                    View More
                  </a>
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-9 px-4 bg-secondary text-foreground rounded-lg text-sm font-medium transition-all hover:bg-secondary/80 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 focus:ring-offset-background"
                  >
                    <Github size={16} className="mr-1.5" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="https://github.com/rathin182" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-primary/30 text-foreground rounded-full text-sm font-medium transition-all hover:bg-primary/10 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
          >
            View All Projects
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="ml-2">
              <path d="M1.16663 7.00008H12.8333M12.8333 7.00008L6.99996 1.16675M12.8333 7.00008L6.99996 12.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
