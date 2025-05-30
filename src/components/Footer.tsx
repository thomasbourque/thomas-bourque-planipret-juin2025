
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
            <div className="text-white scale-150 mb-4">
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
        
        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-slate-400">
            © {currentYear} Thomas Bourque, Courtier hypothécaire. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
