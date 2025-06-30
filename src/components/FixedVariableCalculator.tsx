
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MortgageSlider from "./MortgageSlider";

const FixedVariableCalculator = () => {
  const [mortgageAmount, setMortgageAmount] = useState(500000);
  const [amortization, setAmortization] = useState(25);
  const [fixedRate, setFixedRate] = useState(5.5);
  const [variableRate, setVariableRate] = useState(4.5);
  const [rateAdjustment, setRateAdjustment] = useState([0]);

  const handleMortgageAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setMortgageAmount(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setMortgageAmount(numValue);
      }
    }
  };

  const handleFixedRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setFixedRate(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setFixedRate(numValue);
      }
    }
  };

  const handleVariableRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setVariableRate(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setVariableRate(numValue);
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

  const fixedMonthlyPayment = calculateMonthlyPayment(mortgageAmount, fixedRate, amortization);
  const variableMonthlyPayment = calculateMonthlyPayment(mortgageAmount, variableRate, amortization);
  const adjustedVariableRate = variableRate + rateAdjustment[0];
  const adjustedVariablePayment = calculateMonthlyPayment(mortgageAmount, adjustedVariableRate, amortization);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const formatRateAdjustment = (value: number) => {
    if (value === 0) return "Aucun ajustement";
    if (value > 0) return `+${value.toFixed(2)}%`;
    return `${value.toFixed(2)}%`;
  };

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Calculateur Fixe ou Variable
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Comparez les taux fixes et variables et analysez l'impact des hausses ou baisses du taux directeur.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            {/* Paramètres communs */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <Label htmlFor="mortgageAmount" className="block text-lg font-medium text-slate-900 mb-3">
                  Montant de financement
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="mortgageAmount"
                    type="number"
                    value={mortgageAmount === 0 ? '' : mortgageAmount}
                    onChange={handleMortgageAmountChange}
                    step={1000}
                    min={0}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label className="block text-lg font-medium text-slate-900 mb-3">
                  Durée d'amortissement
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
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Taux fixe */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Taux fixe
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fixedRate" className="block text-sm font-medium text-slate-700 mb-2">
                      Taux d'intérêt fixe (%)
                    </Label>
                    <Input
                      id="fixedRate"
                      type="number"
                      value={fixedRate === 0 ? '' : fixedRate}
                      onChange={handleFixedRateChange}
                      step={0.01}
                      min={0}
                      max={15}
                      className="text-lg"
                      placeholder="0.00"
                    />
                  </div>
                  <div className="text-center pt-4">
                    <div className="text-sm text-slate-600 mb-1">Paiement mensuel</div>
                    <div className="text-2xl font-bold text-blue-700">
                      {formatCurrency(fixedMonthlyPayment)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Taux variable */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">
                  Taux variable
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="variableRate" className="block text-sm font-medium text-slate-700 mb-2">
                      Taux d'intérêt variable (%)
                    </Label>
                    <Input
                      id="variableRate"
                      type="number"
                      value={variableRate === 0 ? '' : variableRate}
                      onChange={handleVariableRateChange}
                      step={0.01}
                      min={0}
                      max={15}
                      className="text-lg"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <MortgageSlider
                      label="Ajustement du taux directeur"
                      value={rateAdjustment}
                      onValueChange={setRateAdjustment}
                      min={-3}
                      max={3}
                      step={0.25}
                      formatValue={formatRateAdjustment}
                    />
                  </div>

                  <div className="text-center pt-4 space-y-2">
                    <div className="text-sm text-slate-600">Taux ajusté</div>
                    <div className="text-lg font-semibold text-green-700">
                      {adjustedVariableRate.toFixed(2)}%
                    </div>
                    <div className="text-sm text-slate-600">Paiement mensuel</div>
                    <div className="text-2xl font-bold text-green-700">
                      {formatCurrency(adjustedVariablePayment)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparaison */}
            <div className="mt-8 bg-slate-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4 text-center">
                Comparaison des paiements
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-1">Taux fixe</div>
                  <div className="text-xl font-bold text-blue-700">
                    {formatCurrency(fixedMonthlyPayment)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-1">Taux variable initial</div>
                  <div className="text-xl font-bold text-green-700">
                    {formatCurrency(variableMonthlyPayment)}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-600 mb-1">Taux variable ajusté</div>
                  <div className="text-xl font-bold text-green-700">
                    {formatCurrency(adjustedVariablePayment)}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <div className="text-sm text-slate-600">Différence mensuelle (ajusté vs fixe)</div>
                <div className={`text-lg font-bold ${adjustedVariablePayment < fixedMonthlyPayment ? 'text-green-600' : 'text-red-600'}`}>
                  {adjustedVariablePayment < fixedMonthlyPayment ? '-' : '+'}{formatCurrency(Math.abs(adjustedVariablePayment - fixedMonthlyPayment))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FixedVariableCalculator;
