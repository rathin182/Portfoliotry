
import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

interface SocialLink {
  icon: React.ElementType;
  url: string;
  label: string;
}

const socialLinks: SocialLink[] = [
  { 
    icon: Github, 
    url: 'https://github.com/rathin182', 
    label: 'GitHub'
  },
  { 
    icon: Linkedin, 
    url: 'https://www.linkedin.com/in/rathin-bagchi-988b85244/', 
    label: 'LinkedIn'
  },
  // { 
  //   icon: Twitter, 
  //   url: 'https://github.com/rathin182', 
  //   label: 'Twitter'
  // },
  { 
    icon: Mail, 
    url: 'mailto:rathinb745@gmail.com', 
    label: 'Email'
  }
];

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    
    // Simple appear animation
    const footerElements = footerRef.current.querySelectorAll('.footer-animate');
    footerElements.forEach((el, index) => {
      const delay = 0.1 * index;
      el.classList.add('opacity-0', 'translate-y-4');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.remove('opacity-0', 'translate-y-4');
              el.classList.add('opacity-100', 'translate-y-0');
            }, delay * 1000);
            observer.unobserve(el);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(el);
    });
  }, []);

  return (
    <footer 
      ref={footerRef} 
      className="py-8 px-4 border-t border-white/10 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Logo and Copyright */}
          <div className="footer-animate transition-all duration-500 ease-out">
            <a href="#home" className="text-foreground/90 hover:text-primary transition-colors duration-300">
              <span className="font-mono font-semibold text-lg">Rathin Bagchi</span>
            </a>
            <p className="text-foreground/60 text-sm mt-2">
              © 2023-2025 Rathin Bagchi, Inc. Rathin Bagchi
            </p>
          </div>
          
          {/* Social Links */}
          <div className="footer-animate transition-all duration-500 ease-out">
            <div className="flex items-center space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-foreground/70 hover:text-primary transition-colors duration-300 p-2"
                >
                  <link.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Back to top button */}
        <div className="mt-8 text-center footer-animate transition-all duration-500 ease-out">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-secondary/80 hover:bg-secondary text-foreground transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Back to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
