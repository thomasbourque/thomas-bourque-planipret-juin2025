
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MortgagePaymentCalculator from "@/components/MortgagePaymentCalculator";
import BorrowingCapacityCalculator from "@/components/BorrowingCapacityCalculator";
import MortgageCalculator from "@/components/MortgageCalculator";

const Calculatrices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container py-8 md:py-12">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
              Calculatrices hypothécaires
            </h1>
            <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto px-4">
              Utilisez nos calculatrices pour planifier votre financement hypothécaire et prendre des décisions éclairées.
            </p>
          </div>

          <Tabs defaultValue="payment" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 md:mb-8">
              <TabsTrigger value="payment" className="text-xs md:text-sm">Paiement hypothécaire</TabsTrigger>
              <TabsTrigger value="capacity" className="text-xs md:text-sm">Capacité d'emprunt</TabsTrigger>
              <TabsTrigger value="savings" className="text-xs md:text-sm">Écart de taux</TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment" className="mt-4 md:mt-8">
              <MortgagePaymentCalculator />
            </TabsContent>
            
            <TabsContent value="capacity" className="mt-4 md:mt-8">
              <BorrowingCapacityCalculator />
            </TabsContent>
            
            <TabsContent value="savings" className="mt-4 md:mt-8">
              <MortgageCalculator />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculatrices;
