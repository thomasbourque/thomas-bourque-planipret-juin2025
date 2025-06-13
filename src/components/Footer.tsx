
import React from "react";
import BourqueHypothequesLogo from "./BourqueHypothequesLogo";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="text-white scale-100 md:scale-150 mb-4">
              <BourqueHypothequesLogo />
            </div>
          </div>
          
          <div className="flex justify-center">
            <a 
              href="https://www.planipret.com/fr/courtier/thomas-bourque" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
            >
              <img 
                src="/lovable-uploads/b4f91d0a-9255-40cc-bfec-c67b07ffaf9a.png" 
                alt="Planiprêt - Cabinet en courtage hypothécaire" 
                className="h-20 w-auto filter brightness-0 invert"
              />
            </a>
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Suivez-moi sur les réseaux sociaux</h3>
            <div className="flex gap-4">
              <a 
                href="https://www.linkedin.com/in/thomas-bourque" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.facebook.com/thomasbourque.planipret/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a 
                href="https://www.instagram.com/thomasbourque.courtier/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8">
          <div className="bg-primary p-4 rounded-lg mb-6 text-center">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-white">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="font-medium">418-569-6482</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
                <a href="mailto:tbourque@planipret.com" className="font-medium hover:underline">
                  tbourque@planipret.com
                </a>
              </div>
            </div>
          </div>
          <p className="text-slate-400 text-center">
            © {currentYear} Thomas Bourque, Courtier hypothécaire. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
