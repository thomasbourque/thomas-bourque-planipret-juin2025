
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex flex-col items-center">
      {/* Small white line above imitating a house roof */}
      <div className="w-16 h-0.5 bg-white mb-1"></div>
      <div className="flex flex-col">
        <span className="text-xl font-serif font-bold leading-tight text-inherit">Bourque</span>
        <span className="text-sm font-serif font-medium leading-tight text-inherit opacity-90">hypothèques</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
