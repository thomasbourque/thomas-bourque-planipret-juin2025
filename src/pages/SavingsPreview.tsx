
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SavingsDisplay from "@/components/SavingsDisplay";

const SavingsPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <SavingsDisplay />
      </main>
      <Footer />
    </div>
  );
};

export default SavingsPreview;
