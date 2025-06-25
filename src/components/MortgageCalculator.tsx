import React, { useState } from "react";
import { calculateMortgagePayments } from "@/utils/mortgageCalculations";
import MortgageSlider from "./MortgageSlider";
import SavingsDisplay from "./SavingsDisplay";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MortgageCalculator = () => {
  const [mortgageBalance, setMortgageBalance] = useState(400000);
  const [term, setTerm] = useState([5]);
  const [amortization, setAmortization] = useState(25);
  const [bankRate, setBankRate] = useState([4.5]);
  const [brokerRate, setBrokerRate] = useState([4.2]);

  const handleMortgageBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setMortgageBalance(value);
    }
  };

  const savings = calculateMortgagePayments(
    mortgageBalance,
    term[0],
    bankRate[0],
    brokerRate[0],
    amortization
  );

  return (
    <section className="section bg-primary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Économisez gros en trouvant le taux le plus bas
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              L'offre de financement reçue par votre banque est rarement la meilleure. Cessez de laisser de l'argent sur la table et découvrez combien un taux plus avantageux trouvé par votre courtier hypothécaire peut vous faire économiser!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8 relative pb-16 md:pb-8">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="mortgageBalance" className="block text-lg font-medium text-slate-900 mb-3">
                    Montant de financement
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="mortgageBalance"
                      type="number"
                      value={mortgageBalance}
                      onChange={handleMortgageBalanceChange}
                      step={1000}
                      min={50000}
                      max={2000000}
                      className="text-lg pl-8"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-xl font-semibold text-slate-700">
                      {mortgageBalance.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <MortgageSlider
                  label="Terme"
                  value={term}
                  onValueChange={setTerm}
                  min={1}
                  max={7}
                  step={1}
                  formatValue={(value) => `${value} ${value === 1 ? 'an' : 'ans'}`}
                />

                <div>
                  <Label className="block text-lg font-medium text-slate-900 mb-3">
                    Amortissement
                  </Label>
                  <Select value={amortization.toString()} onValueChange={(value) => setAmortization(Number(value))}>
                    <SelectTrigger className="text-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25">25 ans</SelectItem>
                      <SelectItem value="30">30 ans</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <MortgageSlider
                  label="Taux proposé par votre banque"
                  value={bankRate}
                  onValueChange={setBankRate}
                  min={3}
                  max={6}
                  step={0.01}
                  formatValue={(value) => `${value.toFixed(2)}%`}
                />

                <MortgageSlider
                  label="Taux obtenu par un courtier hypothécaire"
                  value={brokerRate}
                  onValueChange={setBrokerRate}
                  min={3}
                  max={6}
                  step={0.01}
                  formatValue={(value) => `${value.toFixed(2)}%`}
                />
              </div>

              <SavingsDisplay savings={savings} termYears={term[0]} />
            </div>
            
            <div className="absolute bottom-2 left-4 right-4 text-xs text-slate-500">
              *Calculs basés sur un amortissement de {amortization} ans.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;
