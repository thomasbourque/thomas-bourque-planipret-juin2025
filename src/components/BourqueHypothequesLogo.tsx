
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex items-center gap-1">
      {/* Logo B doré - encore plus gros et plus proche */}
      <img 
        src="/lovable-uploads/d334ed50-2338-4946-8525-666d74e2684b.png" 
        alt="Logo B" 
        className="h-32 w-auto"
      />
      
      <div className="flex flex-col">
        <span className="text-xl sm:text-2xl font-serif font-bold leading-tight text-inherit whitespace-nowrap">Thomas Bourque</span>
        <span className="text-xs sm:text-sm font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
