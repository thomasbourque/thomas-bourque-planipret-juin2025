
import React, { useState } from "react";
import { calculateMortgagePayments } from "@/utils/mortgageCalculations";
import MortgageSlider from "./MortgageSlider";
import SavingsDisplay from "./SavingsDisplay";

const MortgageCalculator = () => {
  const [mortgageBalance, setMortgageBalance] = useState([400000]);
  const [term, setTerm] = useState([5]);
  const [bankRate, setBankRate] = useState([4.5]);
  const [brokerRate, setBrokerRate] = useState([4.2]);

  const savings = calculateMortgagePayments(
    mortgageBalance[0],
    term[0],
    bankRate[0],
    brokerRate[0]
  );

  return (
    <section className="section bg-primary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-slate-900 mb-6">
              Économisez gros en trouvant le taux le plus bas
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Je magasine pour vous trouver le meilleur taux parmi ceux offerts dans une vingtaine d'institutions financières. Découvrez combien une différence de taux peut vous faire économiser!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 relative pb-20 md:pb-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-8">
                <MortgageSlider
                  label="Montant de financement"
                  value={mortgageBalance}
                  onValueChange={setMortgageBalance}
                  min={100000}
                  max={1500000}
                  step={50000}
                  formatValue={(value) => 
                    value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })
                  }
                />

                <MortgageSlider
                  label="Terme"
                  value={term}
                  onValueChange={setTerm}
                  min={1}
                  max={7}
                  step={1}
                  formatValue={(value) => `${value} ${value === 1 ? 'an' : 'ans'}`}
                />

                <MortgageSlider
                  label="Taux proposé par votre banque"
                  value={bankRate}
                  onValueChange={setBankRate}
                  min={3}
                  max={6}
                  step={0.05}
                  formatValue={(value) => `${value.toFixed(2)}%`}
                />

                <MortgageSlider
                  label="Taux obtenu par un courtier hypothécaire"
                  value={brokerRate}
                  onValueChange={setBrokerRate}
                  min={3}
                  max={6}
                  step={0.05}
                  formatValue={(value) => `${value.toFixed(2)}%`}
                />
              </div>

              <SavingsDisplay savings={savings} termYears={term[0]} />
            </div>
            
            <div className="absolute bottom-2 left-4 right-4 text-xs text-slate-500">
              *Calculs basés sur un amortissement de 25 ans. Les économies varient selon votre profil de crédit et les conditions du marché.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;
