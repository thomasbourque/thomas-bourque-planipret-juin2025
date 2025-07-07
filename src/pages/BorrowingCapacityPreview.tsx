
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BorrowingCapacityCalculator from "@/components/BorrowingCapacityCalculator";

const BorrowingCapacityPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <BorrowingCapacityCalculator />
      </main>
      <Footer />
    </div>
  );
};

export default BorrowingCapacityPreview;
