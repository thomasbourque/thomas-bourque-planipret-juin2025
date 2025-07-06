
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FixedVariableCalculator from "@/components/FixedVariableCalculator";

const FixedVariablePreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <FixedVariableCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default FixedVariablePreview;
