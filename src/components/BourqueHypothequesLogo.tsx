
import React from "react";

const BourqueHypothequesLogo = () => {
  return (
    <div className="flex flex-col items-center">
      {/* House-shaped border around the name */}
      <div className="relative p-4 border-2 border-[#C1944B]" style={{
        clipPath: 'polygon(0% 20%, 50% 0%, 100% 20%, 100% 100%, 0% 100%)'
      }}>
        <div className="flex flex-col pt-3">
          <span className="text-xl font-serif font-bold leading-tight text-inherit">Thomas Bourque</span>
          <span className="text-sm font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
        </div>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;
