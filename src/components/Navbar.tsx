import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BourqueHypothequesLogo from "./BourqueHypothequesLogo";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we're on pages that should always have dark colors
  const isDarkPage = [
    '/faq', 
    '/blog',
    '/calculatrices', 
    '/comparateur-scenarios',
    '/preview-rythme-paiement',
    '/preview-mise-de-fonds',
    '/preview-paiement-hypothecaire',
    '/preview-capacite-emprunt',
    '/preview-ecart-taux',
    '/preview-mise-fonds-minimale',
    '/preview-temps-remboursement',
    '/preview-assurance-hypothecaire',
    '/preview-ratios',
    '/preview-fixe-variable',
    '/preview-rpv-evolutif'
  ].includes(location.pathname);

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

  // Effect to handle scrolling to section when arriving from another page with hash
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // Small delay to ensure page is loaded
    }
  }, [location]);

  // On calculator pages, always use dark colors regardless of scroll position
  const getTextColor = () => {
    if (isDarkPage) return 'text-slate-900';
    return isScrolled ? 'text-slate-900' : 'text-white';
  };

  const getLogoColor = () => {
    if (isDarkPage) return 'text-slate-900';
    return isScrolled ? 'text-slate-900' : 'text-white';
  };

  const handleSectionNavigation = (sectionId: string) => {
    if (location.pathname === '/') {
      // Si on est déjà sur la page d'accueil, scroll direct
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Si on est sur une autre page, utiliser navigate avec hash pour React Router
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isDarkPage ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
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
          <button 
            onClick={() => handleSectionNavigation('thomas-bourque')}
            className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()} cursor-pointer`}
          >
            À propos
          </button>
          <button 
            onClick={() => handleSectionNavigation('fonctionnement')}
            className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()} cursor-pointer`}
          >
            Approche
          </button>
          <button 
            onClick={() => handleSectionNavigation('services')}
            className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()} cursor-pointer`}
          >
            Services
          </button>
          <a href="/calculatrices" className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()}`}>
            Calculatrices
          </a>
          <a href="/blog" className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()}`}>
            Blog
          </a>
          <a href="/faq" className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()}`}>
            FAQ
          </a>
          <button 
            onClick={() => handleSectionNavigation('contact')}
            className={`text-sm font-medium hover:opacity-80 transition-opacity ${getTextColor()} cursor-pointer`}
          >
            Contact
          </button>
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90 backdrop-blur-md shadow-xl border-t border-white/20">
          <div className="p-6 space-y-2">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSectionNavigation('thomas-bourque');
              }}
              className="block w-full text-left px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
            >
              À propos
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSectionNavigation('fonctionnement');
              }}
              className="block w-full text-left px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
            >
              Approche
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSectionNavigation('services');
              }}
              className="block w-full text-left px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
            >
              Services
            </button>
            <a
              href="/calculatrices"
              className="block px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calculatrices
            </a>
            <a
              href="/blog"
              className="block px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="/faq"
              className="block px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handleSectionNavigation('contact');
              }}
              className="block w-full text-left px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
            >
              Contact
            </button>
            
            <div className="pt-4 space-y-2">
              <Button asChild size="sm" className="w-full rounded-full bg-white text-primary hover:bg-white/90">
                <a 
                  href="https://calendly.com/tbourque-planipret" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Planifier un appel
                </a>
              </Button>
              
              {/* Contact Information */}
              <div className="pt-4 space-y-3 border-t border-white/20 mt-4">
                <a 
                  href="tel:418-569-6482" 
                  className="flex items-center justify-center gap-2 text-white hover:text-white/80 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="font-medium">418-569-6482</span>
                </a>
                
                <a 
                  href="mailto:tbourque@planipret.com" 
                  className="flex items-center justify-center gap-2 text-white hover:text-white/80 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span className="font-medium">tbourque@planipret.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
