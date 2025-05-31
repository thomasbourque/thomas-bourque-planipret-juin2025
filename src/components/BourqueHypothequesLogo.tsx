
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex items-center gap-2">
      {/* Logo B doré - encore plus gros et plus proche */}
      <img 
        src="/lovable-uploads/d334ed50-2338-4946-8525-666d74e2684b.png" 
        alt="Logo B" 
        className="h-28 w-auto"
      />
      
      <div className="flex flex-col">
        <span className="text-2xl font-serif font-bold leading-tight text-inherit">Thomas Bourque</span>
        <span className="text-sm font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
