
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Logo B doré - plus gros */}
      <div className="w-14 h-14 flex-shrink-0">
        <img 
          src="/lovable-uploads/1b73abc7-bc68-43fe-9103-694ab6226566.png" 
          alt="Logo Thomas Bourque" 
          className="w-full h-full object-contain"
          style={{ backgroundColor: 'transparent' }}
        />
      </div>
      
      {/* Texte à côté du logo */}
      <div className="flex flex-col">
        <span className="text-2xl font-serif font-bold leading-tight text-inherit">Thomas Bourque</span>
        <span className="text-sm font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
