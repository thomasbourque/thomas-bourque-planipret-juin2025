
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MortgageSlider from "./MortgageSlider";

const PayoffTimeCalculator = () => {
  const [mortgageAmount, setMortgageAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [amortization, setAmortization] = useState(25);
  const [extraPayment, setExtraPayment] = useState([0]);
  const [paymentFrequency, setPaymentFrequency] = useState("monthly");

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

  const calculatePayoffTime = () => {
    if (mortgageAmount === 0 || interestRate === 0) return { years: 0, months: 0, totalInterest: 0, savings: 0 };

    const principal = mortgageAmount;
    const annualRate = interestRate / 100;
    const semiAnnualRate = annualRate / 2;
    const monthlyRate = Math.pow(1 + semiAnnualRate, 2/12) - 1;
    
    // Calculate base payment
    const amortizationMonths = amortization * 12;
    const basePayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, amortizationMonths)) / (Math.pow(1 + monthlyRate, amortizationMonths) - 1);
    
    // Adjust payment based on frequency
    let actualPayment = basePayment;
    let paymentsPerYear = 12;
    
    if (paymentFrequency === "biweekly") {
      actualPayment = basePayment / 2;
      paymentsPerYear = 26;
    } else if (paymentFrequency === "weekly") {
      actualPayment = basePayment / 4;
      paymentsPerYear = 52;
    }
    
    // Add extra payment
    actualPayment += extraPayment[0];
    
    // Calculate payoff time
    let balance = principal;
    let totalPayments = 0;
    let totalInterest = 0;
    const monthlyRateAdjusted = paymentsPerYear === 12 ? monthlyRate : Math.pow(1 + monthlyRate, 12/paymentsPerYear) - 1;
    
    while (balance > 0.01 && totalPayments < 40 * paymentsPerYear) {
      const interestPayment = balance * monthlyRateAdjusted;
      const principalPayment = Math.min(actualPayment - interestPayment, balance);
      
      balance -= principalPayment;
      totalInterest += interestPayment;
      totalPayments++;
    }
    
    // Calculate original total interest for comparison
    const originalTotalInterest = (basePayment * amortizationMonths) - principal;
    const savings = originalTotalInterest - totalInterest;
    
    const years = Math.floor(totalPayments / paymentsPerYear);
    const months = Math.round((totalPayments / paymentsPerYear - years) * 12);
    
    return { years, months, totalInterest, savings };
  };

  const results = calculatePayoffTime();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Calculateur de temps pour rembourser
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Découvrez combien de temps vous pourriez économiser sur votre hypothèque avec des paiements supplémentaires.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                  label="Taux d'intérêt"
                  value={[interestRate]}
                  onValueChange={(value) => setInterestRate(value[0])}
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
                <Label className="block text-lg font-medium text-slate-900 mb-3">
                  Fréquence de paiement
                </Label>
                <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
                  <SelectTrigger className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                    <SelectItem value="biweekly">Aux 2 semaines</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="lg:col-span-2">
                <MortgageSlider
                  label="Paiement supplémentaire"
                  value={extraPayment}
                  onValueChange={setExtraPayment}
                  min={0}
                  max={2000}
                  step={25}
                  formatValue={(value) => `${formatCurrency(value)}`}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Temps de remboursement - blue theme */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Temps de remboursement
                </h3>
                <div className="text-2xl font-bold text-blue-700">
                  {results.years} ans {results.months} mois
                </div>
              </div>

              {/* Économie de temps - golden theme */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Économie de temps
                </h3>
                <div className="text-2xl font-bold text-yellow-700">
                  {Math.max(0, amortization - results.years)} ans
                </div>
              </div>

              {/* Intérêts totaux - blue theme */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Intérêts totaux
                </h3>
                <div className="text-2xl font-bold text-blue-700">
                  {formatCurrency(results.totalInterest)}
                </div>
              </div>

              {/* Économies d'intérêts - golden theme */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                  Économies d'intérêts
                </h3>
                <div className="text-2xl font-bold text-yellow-700">
                  {formatCurrency(Math.max(0, results.savings))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayoffTimeCalculator;
