
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Logo "B" doré */}
      <div className="flex-shrink-0">
        <div className="w-12 h-12 bg-[#B8860B] rounded-sm flex items-center justify-center">
          <span className="text-white text-2xl font-serif font-bold">B</span>
        </div>
      </div>
      
      {/* Texte à côté */}
      <div className="flex flex-col">
        <span className="text-xl font-serif font-bold leading-tight text-inherit">Thomas Bourque</span>
        <span className="text-xs font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
