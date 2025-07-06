
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateMortgagePayments, MortgageSavings } from "@/utils/mortgageCalculations";
import SavingsDisplay from "./SavingsDisplay";

const SavingsCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [currentRate, setCurrentRate] = useState("");
  const [newRate, setNewRate] = useState("");
  const [termYears, setTermYears] = useState("5");
  const [amortizationYears, setAmortizationYears] = useState("25");
  const [savings, setSavings] = useState<MortgageSavings | null>(null);

  const handleCalculate = () => {
    const price = parseFloat(purchasePrice);
    const down = parseFloat(downPayment);
    const current = parseFloat(currentRate);
    const newRateValue = parseFloat(newRate);
    const term = parseInt(termYears);
    const amortization = parseInt(amortizationYears);

    if (price && down && current && newRateValue && term && amortization) {
      const mortgageAmount = price - down;
      const calculatedSavings = calculateMortgagePayments(
        mortgageAmount,
        term,
        current,
        newRateValue,
        amortization
      );
      setSavings(calculatedSavings);
    }
  };

  const handleReset = () => {
    setPurchasePrice("");
    setDownPayment("");
    setCurrentRate("");
    setNewRate("");
    setTermYears("5");
    setAmortizationYears("25");
    setSavings(null);
  };

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="heading-lg text-slate-900 mb-4">
              Calculateur d'écart de taux
            </h2>
            <p className="body-md text-slate-700">
              Comparez les économies réalisées en choisissant un taux d'intérêt plus avantageux
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Informations sur votre hypothèque</CardTitle>
                <CardDescription>
                  Entrez les détails de votre hypothèque pour calculer vos économies
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="purchasePrice">Prix d'achat ($)</Label>
                    <Input
                      id="purchasePrice"
                      type="number"
                      value={purchasePrice}
                      onChange={(e) => setPurchasePrice(e.target.value)}
                      placeholder="500000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="downPayment">Mise de fonds ($)</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(e.target.value)}
                      placeholder="100000"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
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
                  <div className="space-y-2">
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
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="termYears">Terme (années)</Label>
                    <Select value={termYears} onValueChange={setTermYears}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 an</SelectItem>
                        <SelectItem value="2">2 ans</SelectItem>
                        <SelectItem value="3">3 ans</SelectItem>
                        <SelectItem value="4">4 ans</SelectItem>
                        <SelectItem value="5">5 ans</SelectItem>
                        <SelectItem value="7">7 ans</SelectItem>
                        <SelectItem value="10">10 ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amortizationYears">Amortissement (années)</Label>
                    <Select value={amortizationYears} onValueChange={setAmortizationYears}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 ans</SelectItem>
                        <SelectItem value="20">20 ans</SelectItem>
                        <SelectItem value="25">25 ans</SelectItem>
                        <SelectItem value="30">30 ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleCalculate} className="flex-1">
                    Calculer les économies
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Réinitialiser
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Résultats</CardTitle>
                <CardDescription>
                  Vos économies potentielles avec le nouveau taux
                </CardDescription>
              </CardHeader>
              <CardContent>
                {savings ? (
                  <SavingsDisplay savings={savings} termYears={parseInt(termYears)} />
                ) : (
                  <div className="text-center text-slate-500 py-8">
                    Entrez vos informations et cliquez sur "Calculer les économies" pour voir vos résultats
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
