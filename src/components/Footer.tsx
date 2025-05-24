
import React from "react";
import TBLogo from "./TBLogo";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="flex items-center gap-4">
            <TBLogo />
            <h3 className="font-serif text-xl font-bold">Thomas Bourque</h3>
          </div>
          
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/03f2c8ca-2bf4-487b-bd8b-b48cbd6f44e9.png" 
              alt="Logo Planiprêt" 
              className="h-32 w-auto"
            />
          </div>
          
          <div>
            <h3 className="font-medium text-lg mb-4">Trouvez-moi sur les réseaux sociaux</h3>
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
                href="https://www.instagram.com/thomas.bourque.planipret" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary/10 p-3 rounded-full hover:bg-primary/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-center md:text-left">
            © {currentYear} Thomas Bourque, Courtier hypothécaire. Tous droits réservés.
          </p>
          <a 
            href="https://www.planipret.com/fr/courtier/thomas-bourque" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img 
              src="/lovable-uploads/b4f91d0a-9255-40cc-bfec-c67b07ffaf9a.png" 
              alt="Planiprêt - Cabinet en courtage hypothécaire" 
              className="h-12 opacity-70"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
