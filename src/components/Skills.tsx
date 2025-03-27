
import React, { useEffect, useRef } from 'react';
import { scrollReveal, sequentialReveal } from '@/lib/animations';
import gsap from 'gsap';
import { Code, Braces, Database, Globe, Layout, Terminal, Figma, Server, PanelLeft, Laptop } from 'lucide-react';

interface TechSkill {
  name: string;
  Icon: React.ElementType;
  color: string;
}

const techSkills: TechSkill[] = [
  { name: 'React', Icon: Braces, color: '#61DAFB' },
  { name: 'JavaScript', Icon: Code, color: '#F7DF1E' },
  // { name: 'TypeScript', Icon: Code, color: '#3178C6' },
  { name: 'HTML', Icon: Layout, color: '#E34F26' },
  { name: 'Next.js', Icon: Layout, color: '#111111' },
  { name: 'CSS', Icon: PanelLeft, color: '#1572B6' },
  { name: 'Node.js', Icon: Server, color: '#339933' },
  { name: 'MongoDB', Icon: Database, color: '#47A248' },
  { name: 'Git', Icon: Terminal, color: '#F05032' },
  // { name: 'Figma', Icon: Figma, color: '#F24E1E' },
  { name: 'Responsive Design', Icon: Laptop, color: '#38B2AC' },
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Scroll trigger animation
    const scrollTrigger = {
      trigger: sectionRef.current,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    };

    // Animate the title
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        ease: 'power3.out',
        scrollTrigger 
      }
    );

    // Animate the skills grid
    if (skillsRef.current) {
      const skillCards = skillsRef.current.querySelectorAll('.skill-card');
      gsap.fromTo(
        skillCards,
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          stagger: 0.1, 
          duration: 0.6, 
          ease: 'power3.out',
          scrollTrigger 
        }
      );
    }

    // Setup hover animations for skill cards
    const cards = document.querySelectorAll('.skill-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -5,
          scale: 1.03,
          boxShadow: '0 10px 30px -15px rgba(0, 0, 0, 0.3)',
          borderColor: 'rgba(var(--primary-rgb), 0.3)',
          duration: 0.3
        });
        
        // Animate the icon
        const icon = card.querySelector('.skill-icon');
        if (icon) {
          gsap.to(icon, {
            scale: 1.1,
            rotation: 5,
            duration: 0.3
          });
        }
      });
      
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          boxShadow: '0 4px 20px -10px rgba(0, 0, 0, 0.15)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          duration: 0.3
        });
        
        // Reset the icon animation
        const icon = card.querySelector('.skill-icon');
        if (icon) {
          gsap.to(icon, {
            scale: 1,
            rotation: 0,
            duration: 0.3
          });
        }
      });
    });
  }, []);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="section-padding grid-pattern bg-background relative"
    >
      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="section-title">Technical Skills</h2>
        
        <div 
          ref={skillsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6"
        >
          {techSkills.map((skill, index) => (
            <div 
              key={index}
              className="skill-card tech-card-glow glassmorphism rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 border border-white/10"
              style={{ '--glow-color': skill.color } as React.CSSProperties}
            >
              <div 
                className="skill-icon mb-4 p-3 rounded-full"
                style={{ backgroundColor: `${skill.color}20` }}
              >
                <skill.Icon 
                  size={24} 
                  className="transition-all duration-300"
                  style={{ color: skill.color }}
                />
              </div>
              <h3 className="text-sm font-medium">{skill.name}</h3>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-foreground/80 max-w-2xl mx-auto mb-8">
            I'm constantly learning and adding new technologies to my toolkit. My approach combines technical expertise with a strong emphasis on clean code, performance, and user experience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3">
            {['Front-End', 'Back-End', 'Responsive', 'Performance', 'Accessibility'].map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 text-xs font-medium bg-secondary rounded-full text-foreground/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
