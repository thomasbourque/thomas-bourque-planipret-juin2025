import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BourqueHypothequesLogo from "./BourqueHypothequesLogo";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on the FAQ page
  const isFAQPage = location.pathname === '/faq';

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

  // On FAQ page, always use dark colors. On other pages, use conditional colors based on scroll
  const getTextColor = () => {
    if (isFAQPage) return 'text-slate-900';
    return isScrolled ? 'text-slate-900' : 'text-white';
  };

  const getLogoColor = () => {
    if (isFAQPage) return 'text-slate-900';
    return isScrolled ? 'text-slate-900' : 'text-white';
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isFAQPage ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="/" className={`flex items-center gap-3 ${getLogoColor()}`}>
            <BourqueHypothequesLogo />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/#thomas-bourque" className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()}`}>
            À propos
          </a>
          <a href="/#fonctionnement" className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()}`}>
            Approche
          </a>
          <a href="/#services" className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()}`}>
            Services
          </a>
          <a href="/faq" className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()}`}>
            FAQ
          </a>
          <a href="/#contact" className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()}`}>
            Contact
          </a>
          <Button asChild size="sm" className="rounded-full">
            <a href="https://calendly.com/tbourque-planipret" target="_blank" rel="noopener noreferrer">
              Planifier un appel
            </a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${getTextColor()}`}
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

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md p-4 flex flex-col space-y-4">
          <a
            href="/#thomas-bourque"
            className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            À propos
          </a>
          <a
            href="/#fonctionnement"
            className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Approche
          </a>
          <a
            href="/#services"
            className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </a>
          <a
            href="/faq"
            className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            FAQ
          </a>
          <a
            href="/#contact"
            className="px-4 py-2 hover:bg-secondary rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </a>
          <Button asChild size="sm" className="mt-2 rounded-full">
            <a 
              href="https://calendly.com/tbourque-planipret" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Planifier un appel
            </a>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
