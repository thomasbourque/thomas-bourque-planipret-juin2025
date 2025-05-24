
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative mr-3">
        {/* Logo maison moderne */}
        <div className="relative">
          {/* Toit principal avec angle plus doux */}
          <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-b-[14px] border-l-transparent border-r-transparent border-b-primary mx-auto relative z-10"></div>
          
          {/* Corps de la maison avec les initiales */}
          <div className="bg-primary text-primary-foreground w-9 h-7 flex items-center justify-center font-serif font-bold text-xs relative -mt-0.5 mx-auto">
            TB
          </div>
          
          {/* Base/fondation de la maison */}
          <div className="bg-primary/80 w-9 h-1 mx-auto"></div>
          
          {/* Détails architecturaux - petite cheminée */}
          <div className="absolute -top-1 right-1 w-1 h-2 bg-primary/70"></div>
          
          {/* Porte d'entrée stylisée */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-3 bg-primary-foreground/30 rounded-t-sm"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-serif font-bold leading-tight">Thomas Bourque</span>
        <span className="text-xs text-muted-foreground font-sans leading-tight">Courtier Hypothécaire</span>
      </div>
    </div>
  );
};

export default Logo;
