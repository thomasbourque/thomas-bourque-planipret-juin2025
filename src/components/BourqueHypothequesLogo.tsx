
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Logo B doré - taille adaptative pour mobile */}
      <img 
        src="/lovable-uploads/d334ed50-2338-4946-8525-666d74e2684b.png" 
        alt="Logo B" 
        className="h-16 w-auto md:h-28"
      />
      
      <div className="flex flex-col">
        {/* Fine ligne dorée au-dessus du nom */}
        <div className="w-full h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 mb-1"></div>
        <span className="text-lg md:text-2xl font-serif font-bold leading-tight text-inherit whitespace-nowrap">Thomas Bourque</span>
        <span className="text-xs md:text-sm font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
