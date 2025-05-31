
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Triangular shape above imitating a house roof */}
      <div className="relative mb-2">
        <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[8px] border-l-transparent border-r-transparent border-b-[#C1944B]"></div>
        <div className="w-16 h-0.5 bg-[#C1944B] mt-0.5"></div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-serif font-bold leading-tight text-inherit">Thomas Bourque</span>
        <span className="text-sm font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
