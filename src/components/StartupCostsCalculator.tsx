
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Info } from "lucide-react";

const StartupCostsCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [amortization, setAmortization] = useState<string>("25");
  const [city, setCity] = useState<string>("montreal");
  
  // Manual fees
  const [notaryFees, setNotaryFees] = useState(1500);
  const [inspection, setInspection] = useState(500);
  const [taxAdjustments, setTaxAdjustments] = useState(1000);
  const [homeInsurance, setHomeInsurance] = useState(800);
  const [otherFees, setOtherFees] = useState(2000);

  const handlePurchasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setPurchasePrice(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setPurchasePrice(numValue);
      }
    }
  };

  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setDownPayment(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setDownPayment(numValue);
      }
    }
  };

  // Calculate mortgage insurance premium and tax
  const calculateMortgageInsuranceTax = () => {
    if (purchasePrice === 0) return 0;
    
    const downPaymentPercentage = (downPayment / purchasePrice) * 100;
    
    // No insurance needed if 25% or more down payment
    if (downPaymentPercentage >= 25) return 0;
    
    let premiumRate = 0;
    
    if (amortization === "25") {
      if (downPaymentPercentage >= 20) premiumRate = 2.8;
      else if (downPaymentPercentage >= 15) premiumRate = 3.1;
      else if (downPaymentPercentage >= 10) premiumRate = 3.1;
      else premiumRate = 4.0;
    } else if (amortization === "30") {
      if (downPaymentPercentage >= 20) premiumRate = 3.0;
      else if (downPaymentPercentage >= 15) premiumRate = 3.3;
      else if (downPaymentPercentage >= 10) premiumRate = 3.3;
      else premiumRate = 4.2;
    }
    
    const loanAmount = purchasePrice - downPayment;
    const premiumAmount = loanAmount * (premiumRate / 100);
    const taxOnPremium = premiumAmount * 0.09; // 9% tax
    
    return taxOnPremium;
  };

  // Calculate welcome tax (taxe de bienvenue)
  const calculateWelcomeTax = () => {
    if (purchasePrice === 0) return 0;
    
    // Basic calculation for Montreal (simplified)
    // First $50,000: 0.5%
    // Next $200,000 (up to $250,000): 1.0%
    // Above $250,000: 1.5%
    
    let tax = 0;
    
    if (purchasePrice <= 50000) {
      tax = purchasePrice * 0.005;
    } else if (purchasePrice <= 250000) {
      tax = 50000 * 0.005 + (purchasePrice - 50000) * 0.01;
    } else {
      tax = 50000 * 0.005 + 200000 * 0.01 + (purchasePrice - 250000) * 0.015;
    }
    
    return tax;
  };

  const mortgageInsuranceTax = calculateMortgageInsuranceTax();
  const welcomeTax = calculateWelcomeTax();
  const totalFees = mortgageInsuranceTax + welcomeTax + notaryFees + inspection + taxAdjustments + homeInsurance + otherFees;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const downPaymentPercentage = purchasePrice > 0 ? (downPayment / purchasePrice) * 100 : 0;

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4 flex items-center justify-center gap-2">
              <Calculator className="h-8 w-8" />
              Frais de démarrage
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Calculez tous les frais associés à l'achat de votre propriété pour mieux planifier votre budget.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            {/* Purchase Details */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div>
                <Label htmlFor="purchasePrice" className="block text-lg font-medium text-slate-900 mb-3">
                  Prix d'achat
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={purchasePrice === 0 ? '' : purchasePrice}
                    onChange={handlePurchasePriceChange}
                    step={1000}
                    min={100000}
                    max={5000000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="downPayment" className="block text-lg font-medium text-slate-900 mb-3">
                  Mise de fonds
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment === 0 ? '' : downPayment}
                    onChange={handleDownPaymentChange}
                    step={1000}
                    min={0}
                    max={purchasePrice}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
                <div className="mt-1 text-sm text-slate-600">
                  {downPaymentPercentage.toFixed(1)}% du prix d'achat
                </div>
              </div>

              <div>
                <Label className="block text-lg font-medium text-slate-900 mb-3">
                  Amortissement
                </Label>
                <Select value={amortization} onValueChange={setAmortization}>
                  <SelectTrigger className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25 ans</SelectItem>
                    <SelectItem value="30">30 ans</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="block text-lg font-medium text-slate-900 mb-3">
                  Ville
                </Label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="montreal">Montréal</SelectItem>
                    <SelectItem value="quebec">Québec</SelectItem>
                    <SelectItem value="laval">Laval</SelectItem>
                    <SelectItem value="gatineau">Gatineau</SelectItem>
                    <SelectItem value="other">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Automatic Calculations */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center gap-2">
                    <Info className="h-5 w-5" />
                    Frais calculés automatiquement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-slate-700">Taxe sur assurance prêt hypothécaire:</span>
                        {downPaymentPercentage >= 25 && (
                          <Badge variant="secondary" className="ml-2 text-xs">Non requis</Badge>
                        )}
                      </div>
                      <span className="font-semibold text-blue-700">
                        {formatCurrency(mortgageInsuranceTax)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Taxe de bienvenue ({city}):</span>
                      <span className="font-semibold text-blue-700">
                        {formatCurrency(welcomeTax)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Manual Fees */}
              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-900">
                    Frais à saisir manuellement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="notaryFees" className="text-slate-700">Frais de notaire:</Label>
                      <div className="relative w-32">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">$</span>
                        <Input
                          id="notaryFees"
                          type="number"
                          value={notaryFees}
                          onChange={(e) => setNotaryFees(Number(e.target.value) || 0)}
                          className="text-sm pl-6"
                          step={100}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Label htmlFor="inspection" className="text-slate-700">Inspection pré-achat:</Label>
                      <div className="relative w-32">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">$</span>
                        <Input
                          id="inspection"
                          type="number"
                          value={inspection}
                          onChange={(e) => setInspection(Number(e.target.value) || 0)}
                          className="text-sm pl-6"
                          step={50}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Label htmlFor="taxAdjustments" className="text-slate-700">Ajustements taxes/condo:</Label>
                      <div className="relative w-32">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">$</span>
                        <Input
                          id="taxAdjustments"
                          type="number"
                          value={taxAdjustments}
                          onChange={(e) => setTaxAdjustments(Number(e.target.value) || 0)}
                          className="text-sm pl-6"
                          step={100}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Label htmlFor="homeInsurance" className="text-slate-700">Assurance habitation:</Label>
                      <div className="relative w-32">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">$</span>
                        <Input
                          id="homeInsurance"
                          type="number"
                          value={homeInsurance}
                          onChange={(e) => setHomeInsurance(Number(e.target.value) || 0)}
                          className="text-sm pl-6"
                          step={100}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <Label htmlFor="otherFees" className="text-slate-700">Autres frais divers:</Label>
                      <div className="relative w-32">
                        <span className="absolute left-2 top-1/2 transform -translate-y-1/2 text-slate-500 text-sm">$</span>
                        <Input
                          id="otherFees"
                          type="number"
                          value={otherFees}
                          onChange={(e) => setOtherFees(Number(e.target.value) || 0)}
                          className="text-sm pl-6"
                          step={100}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Total Summary */}
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-green-900 text-xl">
                  Estimation totale des frais de démarrage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between">
                      <span>Taxe assurance prêt:</span>
                      <span>{formatCurrency(mortgageInsuranceTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxe de bienvenue:</span>
                      <span>{formatCurrency(welcomeTax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frais de notaire:</span>
                      <span>{formatCurrency(notaryFees)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inspection:</span>
                      <span>{formatCurrency(inspection)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ajustements:</span>
                      <span>{formatCurrency(taxAdjustments)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Assurance habitation:</span>
                      <span>{formatCurrency(homeInsurance)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Autres frais:</span>
                      <span>{formatCurrency(otherFees)}</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-green-800">Total estimé:</span>
                      <span className="text-2xl font-bold text-green-700">
                        {formatCurrency(totalFees)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Information Note */}
            <div className="mt-8 p-6 bg-slate-100 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <Info className="h-5 w-5" />
                À propos de ces frais
              </h3>
              
              <div className="space-y-3 text-sm text-slate-700">
                <p>
                  <strong>Taxe sur l'assurance prêt hypothécaire:</strong> Appliquée uniquement si la mise de fonds est inférieure à 25%. La taxe de 9% est calculée sur la prime d'assurance SCHL/Sagen/Canada Guaranty.
                </p>
                
                <p>
                  <strong>Taxe de bienvenue:</strong> Calculée selon les barèmes municipaux. Les taux peuvent varier selon la ville et sont basés sur le plus élevé entre le prix d'achat et la valeur marchande.
                </p>
                
                <p>
                  <strong>Frais variables:</strong> Les montants pour le notaire, l'inspection, les ajustements, l'assurance et autres frais sont des estimations. Les coûts réels peuvent varier selon votre situation spécifique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupCostsCalculator;
