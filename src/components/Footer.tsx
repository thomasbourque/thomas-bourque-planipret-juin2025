
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
          
          <div>
            <h3 className="font-medium text-lg mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-slate-300 hover:text-white transition-colors">
                  À propos
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-300 hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors">
                  Témoignages
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
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
          <svg 
            className="h-8 w-auto opacity-70" 
            viewBox="0 0 200 60" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <text 
              x="10" 
              y="25" 
              className="fill-white" 
              style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: 'serif' }}
            >
              Planiprêt
            </text>
            <text 
              x="10" 
              y="45" 
              className="fill-slate-300" 
              style={{ fontSize: '12px', fontFamily: 'sans-serif' }}
            >
              Cabinet en courtage hypothécaire
            </text>
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
