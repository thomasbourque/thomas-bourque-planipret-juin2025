
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DownPaymentCalculator from "@/components/DownPaymentCalculator";

const DownPaymentPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <DownPaymentCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default DownPaymentPreview;
