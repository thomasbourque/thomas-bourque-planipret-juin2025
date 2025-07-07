
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import WhyBroker from "@/components/WhyBroker";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Fonctionnement from "@/components/Fonctionnement";

const Index = () => {
  useEffect(() => {
    // Animation on scroll logic
    const animateElements = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementHeight = el.getBoundingClientRect().height;
        const windowHeight = window.innerHeight;
        
        // If element is partially visible in the viewport
        if (elementTop < windowHeight - elementHeight / 3) {
          el.classList.add('is-visible');
        }
      });
    };
    
    // Initial check for elements already in view
    animateElements();
    
    // Add scroll event listener
    window.addEventListener('scroll', animateElements);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', animateElements);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Hidden Content for Keywords */}
      <div className="sr-only">
        <h1>Thomas Bourque - Courtier hypothécaire au Québec</h1>
        <p>Meilleur courtier hypothécaire Québec, taux hypothécaire avantageux, prêt hypothécaire, financement immobilier, refinancement, achat maison, courtier Planiprêt, service gratuit</p>
      </div>
      
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Fonctionnement />
        <Services />
        <WhyBroker />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
