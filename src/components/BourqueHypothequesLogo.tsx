
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Ligne dorée au-dessus du nom - plus longue */}
      <div className="w-24 h-0.5 bg-[#C1944B] mb-2"></div>
      
      <div className="flex flex-col items-center">
        <span className="text-2xl font-serif font-bold leading-tight text-inherit">Thomas Bourque</span>
        <span className="text-xs font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
