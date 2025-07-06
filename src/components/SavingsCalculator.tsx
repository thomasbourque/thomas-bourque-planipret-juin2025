
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TrendingUp, Calculator, DollarSign } from "lucide-react";

const SavingsCalculator = () => {
  const [loanAmount, setLoanAmount] = useState<string>("300000");
  const [currentRate, setCurrentRate] = useState<string>("5.5");
  const [newRate, setNewRate] = useState<string>("4.5");
  const [amortizationYears, setAmortizationYears] = useState<string>("25");
  const [results, setResults] = useState<{
    currentPayment: number;
    newPayment: number;
    monthlySavings: number;
    yearlySavings: number;
    totalSavings: number;
  } | null>(null);

  const calculateSavings = () => {
    const principal = parseFloat(loanAmount);
    const currentRateMonthly = parseFloat(currentRate) / 100 / 12;
    const newRateMonthly = parseFloat(newRate) / 100 / 12;
    const totalPayments = parseFloat(amortizationYears) * 12;

    // Calcul paiement mensuel avec taux actuel
    const currentPayment = principal * 
      (currentRateMonthly * Math.pow(1 + currentRateMonthly, totalPayments)) /
      (Math.pow(1 + currentRateMonthly, totalPayments) - 1);

    // Calcul paiement mensuel avec nouveau taux
    const newPayment = principal * 
      (newRateMonthly * Math.pow(1 + newRateMonthly, totalPayments)) /
      (Math.pow(1 + newRateMonthly, totalPayments) - 1);

    const monthlySavings = currentPayment - newPayment;
    const yearlySavings = monthlySavings * 12;
    const totalSavings = monthlySavings * totalPayments;

    setResults({
      currentPayment,
      newPayment,
      monthlySavings,
      yearlySavings,
      totalSavings
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4 flex items-center justify-center gap-2">
              <TrendingUp className="h-8 w-8" />
              Calculatrice d'écart de taux
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Comparez les économies réalisées en choisissant un taux d'intérêt plus avantageux.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Formulaire */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Paramètres de calcul
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount">Montant du prêt ($)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="300000"
                  />
                </div>

                <div>
                  <Label htmlFor="currentRate">Taux actuel (%)</Label>
                  <Input
                    id="currentRate"
                    type="number"
                    step="0.01"
                    value={currentRate}
                    onChange={(e) => setCurrentRate(e.target.value)}
                    placeholder="5.5"
                  />
                </div>

                <div>
                  <Label htmlFor="newRate">Nouveau taux (%)</Label>
                  <Input
                    id="newRate"
                    type="number"
                    step="0.01"
                    value={newRate}
                    onChange={(e) => setNewRate(e.target.value)}
                    placeholder="4.5"
                  />
                </div>

                <div>
                  <Label htmlFor="amortizationYears">Période d'amortissement (années)</Label>
                  <Input
                    id="amortizationYears"
                    type="number"
                    value={amortizationYears}
                    onChange={(e) => setAmortizationYears(e.target.value)}
                    placeholder="25"
                  />
                </div>

                <Button 
                  onClick={calculateSavings} 
                  className="w-full"
                  size="lg"
                >
                  Calculer les économies
                </Button>
              </CardContent>
            </Card>

            {/* Résultats */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Résultats de comparaison
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <p className="text-sm text-slate-600 mb-1">Paiement actuel</p>
                        <p className="text-lg font-semibold text-red-600">
                          {formatCurrency(results.currentPayment)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-sm text-slate-600 mb-1">Nouveau paiement</p>
                        <p className="text-lg font-semibold text-green-600">
                          {formatCurrency(results.newPayment)}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Économies mensuelles:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.monthlySavings)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-700">Économies annuelles:</span>
                        <span className="font-semibold text-green-600">
                          {formatCurrency(results.yearlySavings)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                        <span className="font-medium text-slate-800">Économies totales:</span>
                        <span className="text-xl font-bold text-green-600">
                          {formatCurrency(results.totalSavings)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Écart de taux:</strong> {(parseFloat(currentRate) - parseFloat(newRate)).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Calculator className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Entrez vos paramètres et cliquez sur "Calculer" pour voir les résultats</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;
