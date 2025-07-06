
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MortgagePaymentCalculator from "@/components/MortgagePaymentCalculator";

const MortgagePaymentPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <MortgagePaymentCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default MortgagePaymentPreview;
