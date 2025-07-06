
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SavingsPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <section className="section bg-slate-50">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-lg text-slate-900 mb-4">
                Calculateur d'écart de taux
              </h2>
              <p className="body-md text-slate-700 mb-8">
                Cette calculatrice sera bientôt disponible pour vous aider à comparer les économies réalisées en choisissant un taux d'intérêt plus avantageux.
              </p>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-slate-500">
                  Calculatrice disponible bientôt
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SavingsPreview;
