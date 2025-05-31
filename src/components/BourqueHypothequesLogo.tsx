
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex items-center gap-3">
      {/* Logo B doré */}
      <img 
        src="/lovable-uploads/d334ed50-2338-4946-8525-666d74e2684b.png" 
        alt="Logo B" 
        className="h-12 w-auto"
      />
      
      <div className="flex flex-col">
        <span className="text-xl font-serif font-bold leading-tight text-inherit">Thomas Bourque</span>
        <span className="text-xs font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
