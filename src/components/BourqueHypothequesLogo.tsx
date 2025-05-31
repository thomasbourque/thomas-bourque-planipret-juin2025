
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex items-center gap-4">
      {/* Logo B doré - beaucoup plus gros */}
      <img 
        src="/lovable-uploads/d334ed50-2338-4946-8525-666d74e2684b.png" 
        alt="Logo B" 
        className="h-20 w-auto"
      />
      
      <div className="flex flex-col">
        <span className="text-3xl font-serif font-bold leading-tight text-inherit">Thomas Bourque</span>
        <span className="text-base font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
