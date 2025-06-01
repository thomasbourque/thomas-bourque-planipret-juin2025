
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
        <div className="container py-12">
          <div className="text-center mb-12">
            <h1 className="heading-xl text-slate-900 mb-6">
              Calculatrices hypothécaires
            </h1>
            <p className="body-lg text-slate-700 max-w-3xl mx-auto">
              Utilisez nos calculatrices pour planifier votre financement hypothécaire et prendre des décisions éclairées.
            </p>
          </div>

          <Tabs defaultValue="payment" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="payment">Paiement hypothécaire</TabsTrigger>
              <TabsTrigger value="capacity">Capacité d'emprunt</TabsTrigger>
              <TabsTrigger value="savings">Taux plus bas</TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment" className="mt-8">
              <MortgagePaymentCalculator />
            </TabsContent>
            
            <TabsContent value="capacity" className="mt-8">
              <BorrowingCapacityCalculator />
            </TabsContent>
            
            <TabsContent value="savings" className="mt-8">
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
