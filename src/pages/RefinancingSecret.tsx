import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RefinancingCalculator from "@/components/RefinancingCalculator";

const RefinancingSecret = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <RefinancingCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default RefinancingSecret;