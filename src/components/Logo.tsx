
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="bg-primary text-primary-foreground w-10 h-10 rounded-lg flex items-center justify-center font-serif font-bold text-lg mr-3">
        TB
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-serif font-bold leading-tight">Thomas Bourque</span>
        <span className="text-xs text-muted-foreground font-sans leading-tight">Courtier Hypothécaire</span>
      </div>
    </div>
  );
};

export default Logo;
