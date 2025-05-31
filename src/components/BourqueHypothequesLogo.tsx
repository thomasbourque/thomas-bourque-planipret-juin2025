
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Ligne dorée au-dessus du nom */}
      <div className="w-16 h-0.5 bg-[#C1944B] mb-2"></div>
      
      <div className="flex flex-col">
        <span className="text-xl font-serif font-bold leading-tight text-inherit">Thomas Bourque</span>
        <span className="text-sm font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
