
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative mr-3">
        {/* Simple triangle roof above the square */}
        <div className="w-0 h-0 border-l-[12px] border-r-[12px] border-b-[10px] border-l-transparent border-r-transparent border-b-primary mx-auto mb-1"></div>
        
        {/* Original square with TB initials */}
        <div className="bg-primary text-primary-foreground w-8 h-8 flex items-center justify-center font-bold text-sm">
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
