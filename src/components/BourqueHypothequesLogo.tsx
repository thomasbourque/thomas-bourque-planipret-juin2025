
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo B doré */}
      <div className="w-10 h-10 flex-shrink-0">
        <img 
          src="/lovable-uploads/1b73abc7-bc68-43fe-9103-694ab6226566.png" 
          alt="Logo Thomas Bourque" 
          className="w-full h-full object-contain"
        />
      </div>
      
      {/* Texte à côté du logo */}
      <div className="flex flex-col">
        <span className="text-xl font-serif font-bold leading-tight text-inherit">Thomas Bourque</span>
        <span className="text-xs font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
