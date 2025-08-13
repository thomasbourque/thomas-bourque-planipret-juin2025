import React from "react";
import RefinancingCalculatorSteps from "@/components/RefinancingCalculatorSteps";

const RefinancingSecret = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12 px-4 overflow-hidden">
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
  );
};

export default RefinancingSecret;