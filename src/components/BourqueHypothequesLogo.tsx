
import React, { useState } from "react";
import { Skeleton } from "./ui/skeleton";

const BourqueHypothequesLogo = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {/* Logo B doré - taille adaptative pour mobile */}
      <div className="relative h-16 w-auto md:h-28 flex items-center">
        {!loaded && (
          <Skeleton className="absolute h-16 w-16 md:h-28 md:w-28 rounded" />
        )}
        <img
          src="/lovable-uploads/d334ed50-2338-4946-8525-666d74e2684b.png"
          alt="Logo B"
          className={`h-16 w-auto md:h-28 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
      </div>
      <div className="flex flex-col">
        <span className="text-lg md:text-2xl font-serif font-bold leading-tight text-inherit whitespace-nowrap">Thomas Bourque</span>
        <span className="text-xs md:text-sm font-serif font-medium leading-tight text-inherit opacity-90">courtier hypothécaire</span>
      </div>
    </div>
  );
};

export default BourqueHypothequesLogo;

