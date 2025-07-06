
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MinimumDownPaymentCalculator from "@/components/MinimumDownPaymentCalculator";

const MinimumDownPaymentPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <MinimumDownPaymentCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default MinimumDownPaymentPreview;
