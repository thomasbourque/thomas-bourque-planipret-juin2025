
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center">
      <div className="relative mr-3">
        {/* House outline inspired by the reference */}
        <div className="relative">
          {/* Main roof - larger triangle */}
          <div className="w-0 h-0 border-l-[16px] border-r-[16px] border-b-[12px] border-l-transparent border-r-transparent border-b-primary mx-auto"></div>
          
          {/* House body - rectangle outline */}
          <div className="w-8 h-6 border-2 border-primary bg-transparent mx-auto -mt-0.5 relative">
            {/* TB initials inside the house */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-primary font-bold text-xs">TB</span>
            </div>
          </div>
          
          {/* House base line */}
          <div className="w-10 h-0.5 bg-primary mx-auto"></div>
          
          {/* Small chimney detail */}
          <div className="absolute top-1 right-1 w-1 h-3 bg-primary"></div>
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
