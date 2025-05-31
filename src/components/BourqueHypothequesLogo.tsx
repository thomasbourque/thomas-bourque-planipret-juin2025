
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Ligne dorée au-dessus du nom */}
      <div className="w-32 h-0.5 bg-[#C1944B] mb-3"></div>
      
      <div className="flex flex-col items-center">
        <span className="text-3xl font-serif font-bold leading-tight text-inherit tracking-wide">THOMAS BOURQUE</span>
        <span className="text-sm font-serif font-light leading-tight text-inherit opacity-80 tracking-widest mt-1">COURTIER HYPOTHÉCAIRE</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
