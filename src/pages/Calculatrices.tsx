
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MortgagePaymentCalculator from "@/components/MortgagePaymentCalculator";
import BorrowingCapacityCalculator from "@/components/BorrowingCapacityCalculator";
import MortgageCalculator from "@/components/MortgageCalculator";
import PaymentRhythmCalculator from "@/components/PaymentRhythmCalculator";
import DownPaymentCalculator from "@/components/DownPaymentCalculator";
import RatioCalculator from "@/components/RatioCalculator";

const Calculatrices = () => {
  const handleScenariosClick = () => {
    window.location.href = '/comparateur-scenarios';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <div className="container py-8 md:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
              Calculatrices hypothécaires
            </h1>
            <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto px-2 sm:px-4">
              Utilisez nos calculatrices pour planifier votre financement hypothécaire et prendre des décisions éclairées.
            </p>
          </div>

          <Tabs defaultValue="payment" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1 mb-6 md:mb-8 h-auto p-1">
              <TabsTrigger value="payment" className="text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-3 w-full text-center">
                Paiement hypothécaire
              </TabsTrigger>
              <TabsTrigger value="capacity" className="text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-3 w-full text-center">
                Capacité d'emprunt
              </TabsTrigger>
              <TabsTrigger value="savings" className="text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-3 w-full text-center">
                Écart de taux
              </TabsTrigger>
              <TabsTrigger value="rhythm" className="text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-3 w-full text-center">
                Rythme de paiement
              </TabsTrigger>
              <TabsTrigger value="downpayment" className="text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-3 w-full text-center">
                Mise de fonds
              </TabsTrigger>
              <TabsTrigger value="ratios" className="text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-3 w-full text-center">
                Ratios ABD/ATD
              </TabsTrigger>
              <TabsTrigger value="scenarios" className="text-xs sm:text-sm py-2 sm:py-3 px-1 sm:px-3 w-full text-center" onClick={handleScenariosClick}>
                Scénarios
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
            
            <TabsContent value="rhythm" className="mt-4 md:mt-8 w-full px-0">
              <div className="w-full">
                <PaymentRhythmCalculator />
              </div>
            </TabsContent>
            
            <TabsContent value="downpayment" className="mt-4 md:mt-8 w-full px-0">
              <div className="w-full">
                <DownPaymentCalculator />
              </div>
            </TabsContent>
            
            <TabsContent value="ratios" className="mt-4 md:mt-8 w-full px-0">
              <div className="w-full">
                <RatioCalculator />
              </div>
            </TabsContent>
            
            <TabsContent value="scenarios" className="mt-4 md:mt-8 w-full px-0">
              {/* This content won't be shown as we redirect to /comparateur-scenarios */}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculatrices;
