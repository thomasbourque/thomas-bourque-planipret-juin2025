
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PaymentRhythmCalculator from "@/components/PaymentRhythmCalculator";

const PaymentRhythmPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <PaymentRhythmCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default PaymentRhythmPreview;
