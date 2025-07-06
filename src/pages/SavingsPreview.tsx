
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SavingsCalculator from "@/components/SavingsCalculator";

const SavingsPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <SavingsCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default SavingsPreview;
