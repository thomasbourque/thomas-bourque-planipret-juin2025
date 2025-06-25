
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MortgagePaymentCalculator from "@/components/MortgagePaymentCalculator";
import BorrowingCapacityCalculator from "@/components/BorrowingCapacityCalculator";
import MortgageCalculator from "@/components/MortgageCalculator";

const Calculatrices = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <div className="container py-8 md:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-4 md:mb-6">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 sm:mb-0">
                Calculatrices hypothécaires
              </h1>
              <Button asChild variant="outline" size="sm" className="rounded-full text-xs px-3 py-2 h-8 text-slate-600 border-slate-300 hover:bg-slate-50">
                <a href="/comparateur-scenarios">
                  Scénarios
                </a>
              </Button>
            </div>
            <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto px-2 sm:px-4">
              Utilisez nos calculatrices pour planifier votre financement hypothécaire et prendre des décisions éclairées.
            </p>
          </div>

          <Tabs defaultValue="payment" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 mb-6 md:mb-8 h-auto p-1">
              <TabsTrigger value="payment" className="text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-3 w-full text-center">
                Paiement hypothécaire
              </TabsTrigger>
              <TabsTrigger value="capacity" className="text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-3 w-full text-center">
                Capacité d'emprunt
              </TabsTrigger>
              <TabsTrigger value="savings" className="text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-3 w-full text-center">
                Écart de taux
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="payment" className="mt-4 md:mt-8 w-full px-0">
              <div className="w-full">
                <MortgagePaymentCalculator />
              </div>
            </TabsContent>
            
            <TabsContent value="capacity" className="mt-4 md:mt-8 w-full px-0">
              <div className="w-full">
                <BorrowingCapacityCalculator />
              </div>
            </TabsContent>
            
            <TabsContent value="savings" className="mt-4 md:mt-8 w-full px-0">
              <div className="w-full">
                <MortgageCalculator />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculatrices;
