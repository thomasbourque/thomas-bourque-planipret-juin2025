import React from "react";
import RefinancingCalculator from "@/components/RefinancingCalculator";

const RefinancingSecret = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-4 overflow-hidden">
        <div className="container max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3 mb-8 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Réduisez vos paiements.
                <br />
                Augmentez vos placements.
              </h1>
              <button className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition-colors inline-flex items-center gap-2">
                Testez notre calculateur gratuit →
              </button>
            </div>
            <div className="lg:w-1/3 flex justify-end">
              <div className="text-right">
                <div className="text-yellow-400 text-2xl lg:text-3xl font-bold">
                  THOMAS
                  <br />
                  BOURQUE
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Curved Arrow SVG */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <svg width="200" height="120" viewBox="0 0 200 120" fill="none" className="text-yellow-400">
            <path d="M20 100 Q 100 20 180 60" stroke="currentColor" strokeWidth="8" fill="none"/>
            <path d="M165 45 L180 60 L175 75" stroke="currentColor" strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      
      <main>
        <RefinancingCalculator />
      </main>
    </div>
  );
};

export default RefinancingSecret;