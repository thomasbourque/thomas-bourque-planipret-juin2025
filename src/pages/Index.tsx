
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import GoogleReviewsPopup from "@/components/GoogleReviewsPopup";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

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

  // For demo purposes, showing a welcome toast
  useEffect(() => {
    toast({
      title: "Bienvenue",
      description: "Découvrez comment je peux vous aider avec votre prêt hypothécaire.",
    });
  }, [toast]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <GoogleReviewsPopup />
    </div>
  );
};

export default Index;
