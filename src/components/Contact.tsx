import React, { useEffect, useRef } from "react";
import { scrollReveal, scaleAnimation } from "@/lib/animations";
import gsap from "gsap";
import { Mail, Phone, Github, Linkedin, Twitter } from "lucide-react";

interface ContactMethod {
  icon: React.ElementType;
  label: string;
  value: string;
  url?: string;
}

const contactMethods: ContactMethod[] = [
  {
    icon: Mail,
    label: "Email",
    value: "rathinb745@gmail.com",
    url: "mailto:rathinb745@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 (983) 662-8250",
    url: "tel:+919836628250",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "@rathin182",
    url: "https://github.com/rathin182",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Rathin Bagchi",
    url: "https://www.linkedin.com/in/rathin-bagchi-988b85244/",
  },
  // {
  //   icon: Twitter,
  //   label: 'Twitter',
  //   value: '@rathinbagchi',
  //   url: 'https://twitter.com/rathinbagchi'
  // }
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animate contact cards
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".contact-card");
      gsap.fromTo(
        cards,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Add hover animations
      cards.forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            backgroundColor: "rgba(255, 255, 255, 0.07)",
            borderColor: "rgba(var(--primary-rgb), 0.3)",
            boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.2)",
            duration: 0.3,
          });

          // Animate the icon
          const icon = card.querySelector(".contact-icon");
          if (icon) {
            gsap.to(icon, {
              scale: 1.1,
              color: "rgba(var(--primary-rgb), 1)",
              duration: 0.3,
            });
          }
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            backgroundColor: "rgba(255, 255, 255, 0.03)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 20px -10px rgba(0, 0, 0, 0.15)",
            duration: 0.3,
          });

          // Reset the icon animation
          const icon = card.querySelector(".contact-icon");
          if (icon) {
            gsap.to(icon, {
              scale: 1,
              color: "rgba(255, 255, 255, 0.9)",
              duration: 0.3,
            });
          }
        });
      });
    }
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative bg-gradient-to-b from-background/95 to-background"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-32 top-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -right-32 bottom-20 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 ref={titleRef} className="section-title">
          Get In Touch
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto mb-10">
          Feel free to reach out for collaborations, opportunities, or just a
          friendly chat about web development and technology.
        </p>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.url}
              target={method.url?.startsWith("http") ? "_blank" : undefined}
              rel={
                method.url?.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="contact-card glassmorphism rounded-xl p-5 flex items-center gap-4 transition-all duration-300 border border-white/10 hover:no-underline"
            >
              <div className="contact-icon p-3 rounded-full bg-white/5">
                <method.icon
                  size={20}
                  className="text-foreground transition-all duration-300"
                />
              </div>
              <div className="text-left">
                <div className="text-xs text-foreground/60 mb-1">
                  {method.label}
                </div>
                <div className="text-sm font-medium">{method.value}</div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-16">
          <div className="glassmorphism rounded-2xl p-8 border border-white/10 max-w-xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Open for Opportunities</h3>
            <p className="text-foreground/70 mb-6">
              Currently available for freelance projects, full-time positions,
              and interesting collaborations. Let's build something amazing
              together!
            </p>
            <a
              href="mailto:rathinb745@gmail.com"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary/90 text-primary-foreground rounded-full text-sm font-medium transition-all hover:bg-primary hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
            >
              <Mail size={18} className="mr-2" />
              Send Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
