
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '#home', label: 'Home' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' }
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);

  // Handle scroll effect and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      // Check if scrolled for navbar styling
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Determine active section
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial animation
  useEffect(() => {
    gsap.fromTo(
      '.navbar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
    );
    
    gsap.fromTo(
      '.nav-link',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.8 }
    );
  }, []);

  // Animate logo text on hover
  useEffect(() => {
    const logoText = document.querySelector('.logo-text');
    if (!logoText) return;
    
    const handleMouseEnter = () => {
      gsap.to('.logo-text span', {
        y: -2,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to('.logo-text span', {
        y: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    };
    
    logoText.addEventListener('mouseenter', handleMouseEnter);
    logoText.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      logoText.removeEventListener('mouseenter', handleMouseEnter);
      logoText.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Split logo text into spans
  const renderLogoText = () => {
    const text = "Rathin-Portfolio-WEB";
    return text.split('').map((char, index) => (
      <span key={index} className="inline-block transition-transform">
        {char}
      </span>
    ));
  };

  return (
    <header className={cn(
      'navbar fixed top-0 left-0 w-full z-40 transition-all duration-300',
      scrolled ? 'py-3 glassmorphism shadow-md' : 'py-4 bg-transparent'
    )}>
      <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="logo-text text-lg md:text-xl font-mono font-semibold tracking-tighter text-gradient">
          {renderLogoText()}
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'nav-link text-sm font-medium transition-all duration-300 hover:text-primary relative py-1',
                activeSection === link.href.substring(1)
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-foreground'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              {link.label}
              {activeSection === link.href.substring(1) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </a>
          ))}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className={cn(
            'w-6 h-5 relative flex flex-col justify-between transition-all duration-300',
            menuOpen ? 'transform' : ''
          )}>
            <span className={cn(
              'w-full h-0.5 bg-foreground rounded-full transition-all duration-300',
              menuOpen ? 'rotate-45 translate-y-2' : ''
            )}></span>
            <span className={cn(
              'w-full h-0.5 bg-foreground rounded-full transition-all duration-300',
              menuOpen ? 'opacity-0' : ''
            )}></span>
            <span className={cn(
              'w-full h-0.5 bg-foreground rounded-full transition-all duration-300',
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            )}></span>
          </div>
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        'md:hidden glassmorphism absolute w-full transition-all duration-300 overflow-hidden',
        menuOpen ? 'max-h-80 border-t border-white/10 shadow-lg' : 'max-h-0'
      )}>
        <nav className="flex flex-col py-4 px-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                'py-3 text-sm font-medium transition-all duration-200',
                activeSection === link.href.substring(1)
                  ? 'text-primary'
                  : 'text-foreground/80 hover:text-foreground'
              )}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector(link.href)?.scrollIntoView({
                  behavior: 'smooth'
                });
                setMenuOpen(false);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
