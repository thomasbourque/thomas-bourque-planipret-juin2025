
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MortgageInsuranceCalculator from "@/components/MortgageInsuranceCalculator";

const MortgageInsurancePreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <MortgageInsuranceCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default MortgageInsurancePreview;
