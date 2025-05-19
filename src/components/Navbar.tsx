
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#" className="text-xl font-serif font-bold">
          Thomas Bourque
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            À propos
          </a>
          <a href="#services" className="text-sm font-medium hover:text-primary transition-colors">
            Services
          </a>
          <a href="#testimonials" className="text-sm font-medium hover:text-primary transition-colors">
            Témoignages
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contact
          </a>
          <Button asChild size="sm">
            <a href="#contact">Prendre Rendez-vous</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4">
          <a
            href="#about"
            className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            À propos
          </a>
          <a
            href="#services"
            className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="#testimonials"
            className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Témoignages
          </a>
          <a
            href="#contact"
            className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
          <Button asChild size="sm" className="mt-2">
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Prendre Rendez-vous
            </a>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
