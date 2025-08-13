import React, { useState } from "react";
import { calculateRefinancingSavings, calculateRefinancingCapacity, calculateInvestmentStrategy } from "@/utils/refinancingCalculations";
import MortgageSlider from "./MortgageSlider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RefinancingCalculator = () => {
  const [currentBalance, setCurrentBalance] = useState(400000);
  const [homeValue, setHomeValue] = useState(600000);
  const [termEndDate, setTermEndDate] = useState("2027-12-31");
  const [amortizationYears, setAmortizationYears] = useState(25);
  const [amortizationMonths, setAmortizationMonths] = useState(0);
  const [currentRate, setCurrentRate] = useState([5.5]);
  const [newRate, setNewRate] = useState([4.25]);
  const [refinancingAmount, setRefinancingAmount] = useState(50000);
  const [showResults, setShowResults] = useState(false);

  const handleCurrentBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setCurrentBalance(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setCurrentBalance(numValue);
      }
    }
  };

  const handleHomeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setHomeValue(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setHomeValue(numValue);
      }
    }
  };

  const handleRefinancingAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setRefinancingAmount(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setRefinancingAmount(numValue);
      }
    }
  };

  const savings = calculateRefinancingSavings(
    currentBalance,
    currentRate[0],
    newRate[0],
    amortizationYears,
    amortizationMonths,
    termEndDate
  );

  const refinancingCapacity = calculateRefinancingCapacity(homeValue, currentBalance);
  const remainingAmortization = amortizationYears + amortizationMonths / 12;
  const investmentStrategy = calculateInvestmentStrategy(
    refinancingAmount,
    newRate[0],
    remainingAmortization
  );

  return (
    <section className="section bg-primary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Calculatrice de refinancement
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Déterminez le montant économisé en refinançant avec un nouveau taux plus bas et optimisez votre stratégie d'investissement.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="currentBalance" className="block text-lg font-medium text-slate-900 mb-3">
                    Solde hypothécaire actuel
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="currentBalance"
                      type="number"
                      value={currentBalance === 0 ? '' : currentBalance}
                      onChange={handleCurrentBalanceChange}
                      step={1000}
                      min={50000}
                      max={2000000}
                      className="text-lg pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="homeValue" className="block text-lg font-medium text-slate-900 mb-3">
                    Valeur de la maison
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="homeValue"
                      type="number"
                      value={homeValue === 0 ? '' : homeValue}
                      onChange={handleHomeValueChange}
                      step={1000}
                      min={100000}
                      max={5000000}
                      className="text-lg pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="termEndDate" className="block text-lg font-medium text-slate-900 mb-3">
                    Date d'échéance du terme
                  </Label>
                  <Input
                    id="termEndDate"
                    type="date"
                    value={termEndDate}
                    onChange={(e) => setTermEndDate(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-lg font-medium text-slate-900 mb-3">
                      Amortissement (années)
                    </Label>
                    <Select value={amortizationYears.toString()} onValueChange={(value) => setAmortizationYears(Number(value))}>
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
                    <Label className="block text-lg font-medium text-slate-900 mb-3">
                      Amortissement (mois)
                    </Label>
                    <Select value={amortizationMonths.toString()} onValueChange={(value) => setAmortizationMonths(Number(value))}>
                      <SelectTrigger className="text-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i} mois
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <MortgageSlider
                  label="Taux actuel"
                  value={currentRate}
                  onValueChange={setCurrentRate}
                  min={3}
                  max={8}
                  step={0.01}
                  formatValue={(value) => `${value.toFixed(2)}%`}
                />

                <MortgageSlider
                  label="Nouveau taux"
                  value={newRate}
                  onValueChange={setNewRate}
                  min={3}
                  max={8}
                  step={0.01}
                  formatValue={(value) => `${value.toFixed(2)}%`}
                />

                <div>
                  <Label htmlFor="refinancingAmount" className="block text-lg font-medium text-slate-900 mb-3">
                    Montant de refinancement souhaité
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="refinancingAmount"
                      type="number"
                      value={refinancingAmount === 0 ? '' : refinancingAmount}
                      onChange={handleRefinancingAmountChange}
                      step={1000}
                      min={0}
                      max={refinancingCapacity}
                      className="text-lg pl-8"
                      placeholder="0"
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Maximum disponible: {refinancingCapacity.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">Économies de refinancement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <p className="text-sm text-slate-600 mb-2">Économies d'ici la fin du terme</p>
                      <p className="text-3xl font-bold text-primary">
                        {savings.termSavings.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600">Paiement actuel</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {savings.currentMonthlyPayment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <p className="text-sm text-slate-600">Nouveau paiement</p>
                        <p className="text-lg font-semibold text-slate-900">
                          {savings.newMonthlyPayment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-lg font-semibold text-green-800">
                        Vous économisez {savings.termSavings.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })} d'ici à la fin de votre terme
                      </p>
                      <p className="text-green-700 mt-2">
                        en plus d'avoir accès à votre montant de {refinancingAmount.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })} en refinancement.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button 
                    onClick={() => setShowResults(!showResults)}
                    size="lg"
                    className="w-full"
                  >
                    Calculer l'impact de mon refinancement
                  </Button>
                </div>

                {showResults && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl text-slate-900">Stratégie d'investissement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-slate-600 mb-2">Espace de refinancement disponible</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {refinancingCapacity.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">80% de la valeur - solde hypothécaire</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600">Croissance en bourse (6,5%)</p>
                          <p className="text-lg font-semibold text-green-600">
                            {investmentStrategy.investmentGrowth.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                          </p>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-lg">
                          <p className="text-sm text-slate-600">Valeur hypothécaire (4,25%)</p>
                          <p className="text-lg font-semibold text-red-600">
                            {investmentStrategy.mortgageInterestCost.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                          </p>
                        </div>
                      </div>

                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-lg font-semibold text-green-800 mb-3">
                          Vous pourriez avoir {investmentStrategy.netBenefit.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })} de plus dans vos poches
                        </p>
                        <p className="text-green-700 mb-3">
                          au bout de {Math.round(remainingAmortization)} ans avec cette stratégie d'investissement.
                        </p>
                        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                          <p className="text-blue-800 font-semibold">
                            Vous pourriez payer votre maison {investmentStrategy.yearsMonthsSaved.years} {investmentStrategy.yearsMonthsSaved.years === 1 ? 'an' : 'ans'} 
                            {investmentStrategy.yearsMonthsSaved.months > 0 && ` et ${investmentStrategy.yearsMonthsSaved.months} mois`} plus vite
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefinancingCalculator;