import React from "react";
import RefinancingCalculatorSteps from "@/components/RefinancingCalculatorSteps";

const RefinancingSecret = () => {
  return (
    <div className="relative min-h-screen">
      {/* Fond d'écran avec image de maison */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
        style={{
          backgroundImage: `url('/lovable-uploads/98dd4d40-cb71-4f09-9405-a4485a47e92b.png')`
        }}
      ></div>
      <div className="fixed inset-0 bg-black/60 -z-10"></div>
      
      <div className="relative z-10 min-h-screen bg-white/95 backdrop-blur-sm">        
        <main>
          <RefinancingCalculatorSteps />
        </main>
      </div>
    </div>
  );
};

export default RefinancingSecret;