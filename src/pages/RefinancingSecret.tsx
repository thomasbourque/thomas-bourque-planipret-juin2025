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
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-blue-600/90 to-blue-700/90 text-white py-12 px-4 overflow-hidden">
          <div className="container max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full text-center">
                <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Faites travailler votre maison pour vous!
                </h1>
                <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center gap-2 mx-auto">
                  Testez notre calculateur gratuit →
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <main>
          <RefinancingCalculatorSteps />
        </main>
      </div>
    </div>
  );
};

export default RefinancingSecret;