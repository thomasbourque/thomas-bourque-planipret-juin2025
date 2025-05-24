
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative mr-3">
        {/* Toit de maison */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-4 border-l-transparent border-r-transparent border-b-primary"></div>
        {/* Initiales avec fond */}
        <div className="bg-primary text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center font-serif font-bold text-lg relative">
          TB
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-serif font-bold leading-tight">Thomas Bourque</span>
        <span className="text-xs text-muted-foreground font-sans leading-tight">Courtier Hypothécaire</span>
      </div>
    </div>
  );
};

export default Logo;
