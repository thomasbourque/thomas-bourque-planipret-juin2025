
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Partners from "@/components/Partners";
import Services from "@/components/Services";
import MortgageCalculator from "@/components/MortgageCalculator";
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
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Fonctionnement />
        <Services />
        <MortgageCalculator />
        <WhyBroker />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
