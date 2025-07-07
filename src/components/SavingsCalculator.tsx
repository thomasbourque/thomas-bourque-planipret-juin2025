
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateMortgagePayments } from "@/utils/mortgageCalculations";

const SavingsCalculator = () => {
  const [mortgageBalance, setMortgageBalance] = useState(400000);
  const [termYears, setTermYears] = useState(5);
  const [bankRate, setBankRate] = useState(5.5);
  const [brokerRate, setBrokerRate] = useState(4.8);
  const [amortizationYears, setAmortizationYears] = useState(25);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const savings = calculateMortgagePayments(
      mortgageBalance,
      termYears,
      bankRate,
      brokerRate,
      amortizationYears
    );
    setResults(savings);
  };

  return (
    <div className="container py-8 md:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
          Calculateur d'écart de taux
        </h1>
        <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto px-2 sm:px-4">
          Comparez les économies potentielles entre différents taux d'intérêt hypothécaires.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Paramètres de comparaison</CardTitle>
            <CardDescription>
              Entrez les détails de votre hypothèque pour comparer les taux
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="mortgageBalance">Solde hypothécaire ($)</Label>
                <Input
                  id="mortgageBalance"
                  type="number"
                  value={mortgageBalance}
                  onChange={(e) => setMortgageBalance(Number(e.target.value))}
                  placeholder="400000"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="termYears">Durée du terme (années)</Label>
                <Input
                  id="termYears"
                  type="number"
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  placeholder="5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bankRate">Taux de la banque (%)</Label>
                <Input
                  id="bankRate"
                  type="number"
                  step="0.01"
                  value={bankRate}
                  onChange={(e) => setBankRate(Number(e.target.value))}
                  placeholder="5.5"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brokerRate">Taux du courtier (%)</Label>
                <Input
                  id="brokerRate"
                  type="number"
                  step="0.01"
                  value={brokerRate}
                  onChange={(e) => setBrokerRate(Number(e.target.value))}
                  placeholder="4.8"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amortizationYears">Amortissement (années)</Label>
                <Input
                  id="amortizationYears"
                  type="number"
                  value={amortizationYears}
                  onChange={(e) => setAmortizationYears(Number(e.target.value))}
                  placeholder="25"
                />
              </div>
            </div>

            <Button onClick={handleCalculate} className="w-full">
              Calculer les économies
            </Button>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Vos économies potentielles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 rounded-xl border text-white text-center">
                  <div className="text-sm font-medium mb-1 text-slate-200">
                    Économie sur les paiements
                  </div>
                  <div className="text-2xl font-bold">
                    {results.termPaymentSavings.toLocaleString('fr-CA', { 
                      style: 'currency', 
                      currency: 'CAD',
                      minimumFractionDigits: 0 
                    })}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    à la fin du terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 rounded-xl border text-white text-center">
                  <div className="text-sm font-medium mb-1 text-slate-200">
                    Économie sur le solde en capital
                  </div>
                  <div className="text-2xl font-bold">
                    {results.principalBalanceDifference.toLocaleString('fr-CA', { 
                      style: 'currency', 
                      currency: 'CAD',
                      minimumFractionDigits: 0 
                    })}
                  </div>
                  <div className="text-xs text-slate-300 mt-1">
                    à la fin du terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-xl border text-slate-900 text-center">
                  <div className="text-sm font-medium mb-1">
                    Économie totale
                  </div>
                  <div className="text-3xl font-bold">
                    {results.totalTermSavings.toLocaleString('fr-CA', { 
                      style: 'currency', 
                      currency: 'CAD',
                      minimumFractionDigits: 0 
                    })}
                  </div>
                  <div className="text-xs mt-1">
                    à la fin du terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SavingsCalculator;
