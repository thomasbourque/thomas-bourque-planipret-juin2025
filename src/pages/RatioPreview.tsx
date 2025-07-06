
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RatioCalculator from "@/components/RatioCalculator";

const RatioPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <RatioCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default RatioPreview;
