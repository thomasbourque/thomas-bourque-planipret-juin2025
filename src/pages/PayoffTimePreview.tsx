
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PayoffTimeCalculator from "@/components/PayoffTimeCalculator";

const PayoffTimePreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <PayoffTimeCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default PayoffTimePreview;
