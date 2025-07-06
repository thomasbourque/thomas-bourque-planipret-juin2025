
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const SavingsPreview = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <section className="section bg-slate-50">
          <div className="container">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="heading-lg text-slate-900 mb-4 flex items-center justify-center gap-2">
                  <TrendingUp className="h-8 w-8" />
                  Écart de taux
                </h2>
                <p className="body-md text-slate-700 max-w-3xl mx-auto">
                  Comparez les économies réalisées en choisissant un taux d'intérêt plus avantageux.
                </p>
              </div>
              
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle>Calculatrice disponible bientôt</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    Cette calculatrice sera disponible prochainement pour vous aider à comparer différents taux d'intérêt.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SavingsPreview;
