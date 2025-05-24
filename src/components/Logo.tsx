
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative mr-3">
        {/* Structure de maison complète */}
        <div className="relative">
          {/* Toit de la maison */}
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-b-[16px] border-l-transparent border-r-transparent border-b-primary mx-auto"></div>
          {/* Corps de la maison avec les initiales */}
          <div className="bg-primary text-primary-foreground w-10 h-8 flex items-center justify-center font-serif font-bold text-sm relative -mt-1">
            TB
          </div>
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
