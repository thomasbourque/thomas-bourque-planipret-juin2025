
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LtvCalculator from "@/components/LtvCalculator";

const LtvPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <LtvCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default LtvPreview;
