
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MortgageSlider from "./MortgageSlider";

const RatioCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(0);
  const [monthlyDebts, setMonthlyDebts] = useState(0);
  const [mortgageAmount, setMortgageAmount] = useState(0);
  const [qualificationRate, setQualificationRate] = useState([5.25]);
  const [amortization, setAmortization] = useState(25);
  const [annualTaxes, setAnnualTaxes] = useState(0);
  const [monthlyHeating, setMonthlyHeating] = useState(0);

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<number>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '') {
        setter(0);
      } else {
        const numValue = Number(value);
        if (!isNaN(numValue)) {
          setter(numValue);
        }
      }
    };

  // Calcul du paiement hypothécaire mensuel
  const calculateMonthlyPayment = (principal: number, annualRate: number, amortizationYears: number) => {
    if (principal === 0 || annualRate === 0) return 0;
    
    const amortizationMonths = amortizationYears * 12;
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    const numerator = principal * monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, amortizationMonths);
    const denominator = Math.pow(1 + monthlyEquivalentRate, amortizationMonths) - 1;
    
    return numerator / denominator;
  };

  const monthlyPayment = calculateMonthlyPayment(mortgageAmount, qualificationRate[0], amortization);
  const monthlyIncome = annualIncome / 12;
  const monthlyTaxes = annualTaxes / 12;

  // Calcul des ratios
  const housingCosts = monthlyPayment + monthlyTaxes + monthlyHeating;
  const totalDebtService = housingCosts + monthlyDebts;

  const abdRatio = monthlyIncome > 0 ? (housingCosts / monthlyIncome) * 100 : 0;
  const atdRatio = monthlyIncome > 0 ? (totalDebtService / monthlyIncome) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Calculateur de ratios ABD et ATD
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Calculez vos ratios d'amortissement brut de la dette (ABD) et d'amortissement total de la dette (ATD).
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <Label htmlFor="annualIncome" className="block text-lg font-medium text-slate-900 mb-3">
                  Revenus annuels
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={annualIncome === 0 ? '' : annualIncome}
                    onChange={handleInputChange(setAnnualIncome)}
                    step={1000}
                    min={0}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="monthlyDebts" className="block text-lg font-medium text-slate-900 mb-3">
                  Dettes mensuelles
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="monthlyDebts"
                    type="number"
                    value={monthlyDebts === 0 ? '' : monthlyDebts}
                    onChange={handleInputChange(setMonthlyDebts)}
                    step={50}
                    min={0}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mortgageAmount" className="block text-lg font-medium text-slate-900 mb-3">
                  Montant de l'hypothèque
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="mortgageAmount"
                    type="number"
                    value={mortgageAmount === 0 ? '' : mortgageAmount}
                    onChange={handleInputChange(setMortgageAmount)}
                    step={1000}
                    min={0}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <MortgageSlider
                  label="Taux de qualification"
                  value={qualificationRate}
                  onValueChange={setQualificationRate}
                  min={1}
                  max={10}
                  step={0.01}
                  formatValue={(value) => `${value.toFixed(2)}%`}
                />
              </div>

              <div>
                <Label className="block text-lg font-medium text-slate-900 mb-3">
                  Amortissement
                </Label>
                <Select value={amortization.toString()} onValueChange={(value) => setAmortization(Number(value))}>
                  <SelectTrigger className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 30 }, (_, i) => {
                      const years = i + 1;
                      return (
                        <SelectItem key={years} value={years.toString()}>
                          {years} {years === 1 ? 'an' : 'ans'}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="annualTaxes" className="block text-lg font-medium text-slate-900 mb-3">
                  Taxes (annuelles)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="annualTaxes"
                    type="number"
                    value={annualTaxes === 0 ? '' : annualTaxes}
                    onChange={handleInputChange(setAnnualTaxes)}
                    step={100}
                    min={0}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="monthlyHeating" className="block text-lg font-medium text-slate-900 mb-3">
                  Chauffage (mensuel)
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="monthlyHeating"
                    type="number"
                    value={monthlyHeating === 0 ? '' : monthlyHeating}
                    onChange={handleInputChange(setMonthlyHeating)}
                    step={25}
                    min={0}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Résultats des calculs */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Détails des calculs
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Paiement hypothécaire mensuel:</span>
                    <span className="font-semibold">
                      {formatCurrency(monthlyPayment)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Revenus mensuels:</span>
                    <span className="font-semibold">
                      {formatCurrency(monthlyIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Taxes mensuelles:</span>
                    <span className="font-semibold">
                      {formatCurrency(monthlyTaxes)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Coûts de logement totaux:</span>
                    <span className="font-semibold">
                      {formatCurrency(housingCosts)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Service de la dette total:</span>
                    <span className="font-semibold">
                      {formatCurrency(totalDebtService)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ratios */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">
                  Ratios calculés
                </h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">Ratio ABD</div>
                    <div className={`text-3xl font-bold ${abdRatio <= 39 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(abdRatio)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      (Maximum recommandé: 39%)
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-slate-600 mb-1">Ratio ATD</div>
                    <div className={`text-3xl font-bold ${atdRatio <= 44 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatPercentage(atdRatio)}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      (Maximum recommandé: 44%)
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Explication des ratios */}
            <div className="mt-6 bg-slate-50 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">Explication des ratios</h4>
              <div className="text-sm text-slate-700 space-y-1">
                <p><strong>Ratio ABD (Amortissement Brut de la Dette):</strong> Inclut le paiement hypothécaire, les taxes et le chauffage. Ne doit pas dépasser 39% du revenu brut.</p>
                <p><strong>Ratio ATD (Amortissement Total de la Dette):</strong> Inclut tous les éléments du ratio ABD plus toutes les autres dettes mensuelles. Ne doit pas dépasser 44% du revenu brut.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatioCalculator;
