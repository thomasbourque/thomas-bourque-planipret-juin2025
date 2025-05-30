
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

const MortgageCalculator = () => {
  const [mortgageBalance, setMortgageBalance] = useState([400000]);
  const [rateVariation, setRateVariation] = useState([0.25]);

  const calculateSavings = () => {
    const balance = mortgageBalance[0];
    const variation = rateVariation[0];
    
    // 15$ par mois pour chaque 0.25% de variation sur chaque 100k
    const baseSavings = 15;
    const baseVariation = 0.25;
    const baseAmount = 100000;
    
    const monthlyPer100k = (variation / baseVariation) * baseSavings;
    const monthlyTotal = (balance / baseAmount) * monthlyPer100k;
    const yearlyTotal = monthlyTotal * 12;
    const fiveYearTotal = yearlyTotal * 5;
    
    return {
      yearly: Math.round(yearlyTotal),
      fiveYear: Math.round(fiveYearTotal)
    };
  };

  const savings = calculateSavings();

  return (
    <section className="section bg-primary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-slate-900 mb-6">
              Économisez gros en trouvant le taux le plus bas
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Je magasine pour vous trouver le meilleur taux parmi ceux offerts dans une vingtaine d'institutions financières. Découvrez combien une baisse de taux, aussi minime soit-elle, peut vous faire économiser!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 relative pb-16 md:pb-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-medium text-slate-900 mb-4">
                    Montant de financement
                  </label>
                  <div className="space-y-4">
                    <Slider
                      value={mortgageBalance}
                      onValueChange={setMortgageBalance}
                      max={1000000}
                      min={150000}
                      step={50000}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-2xl font-bold text-primary">
                        {mortgageBalance[0].toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-slate-900 mb-4">
                    Réduction de taux obtenue
                  </label>
                  <div className="space-y-4">
                    <Slider
                      value={rateVariation}
                      onValueChange={setRateVariation}
                      max={1}
                      min={0.05}
                      step={0.05}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-xl font-semibold text-slate-700">
                        {rateVariation[0].toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <div className="text-center p-6 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 mb-2">Vous pourriez avoir ce montant de plus dans vos poches chaque année</p>
                  <p className="text-3xl font-bold text-green-600">
                    {savings.yearly.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary mb-2">Économies totales sur 5 ans*</p>
                  <p className="text-3xl font-bold text-primary">
                    {savings.fiveYear.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                  </p>
                </div>

                <div className="text-center pt-4">
                  <p className="text-sm text-slate-600 mb-4">
                    Ces économies représentent la différence que pourrait faire un meilleur taux sur votre hypothèque.
                  </p>
                  <a 
                    href="https://calendly.com/tbourque-planipret" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
                  >
                    Planifier un appel gratuit
                  </a>
                </div>
              </div>
            </div>
            
            {/* Disclaimer repositionné pour éviter l'overlap sur mobile */}
            <div className="absolute bottom-4 left-4 right-4 md:right-auto text-xs text-slate-500 max-w-xs">
              *Le calcul approximatif est basé sur une économie moyenne de 15$ par mois pour chaque variation de 0,25 % du taux d'intérêt par tranche de 100 000$ d'hypothèque.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;
