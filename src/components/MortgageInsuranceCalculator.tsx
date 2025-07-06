
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertCircle } from "lucide-react";

const MortgageInsuranceCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(400000);
  const [downPaymentValue, setDownPaymentValue] = useState(10);
  const [amortization, setAmortization] = useState(25);

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

  const handleDownPaymentValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setDownPaymentValue(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setDownPaymentValue(numValue);
      }
    }
  };

  // Déterminer automatiquement si c'est un pourcentage ou un montant
  const isPercentage = downPaymentValue <= 100;
  const downPaymentAmount = isPercentage 
    ? purchasePrice * downPaymentValue / 100 
    : downPaymentValue;
  const downPaymentPercent = isPercentage 
    ? downPaymentValue 
    : purchasePrice > 0 ? (downPaymentValue / purchasePrice) * 100 : 0;

  // Calculate mortgage insurance
  const calculateMortgageInsurance = () => {
    const downPaymentRatio = purchasePrice > 0 ? (downPaymentAmount / purchasePrice) * 100 : 0;
    const loanAmount = purchasePrice - downPaymentAmount;

    // No insurance needed if down payment >= 20%
    if (downPaymentRatio >= 20) {
      return {
        insuranceRequired: false,
        premiumRate: 0,
        premiumAmount: 0,
        totalLoanAmount: loanAmount,
        downPaymentRatio
      };
    }

    // Determine premium rate based on down payment ratio and amortization
    let premiumRate = 0;
    
    if (amortization <= 25) {
      if (downPaymentRatio >= 15) {
        premiumRate = 2.8; // 15-19.99%
      } else if (downPaymentRatio >= 10) {
        premiumRate = 3.1; // 10-14.99%
      } else {
        premiumRate = 4.0; // 5-9.99%
      }
    } else { // 30 years
      if (downPaymentRatio >= 15) {
        premiumRate = 3.0; // 15-19.99%
      } else if (downPaymentRatio >= 10) {
        premiumRate = 3.3; // 10-14.99%
      } else {
        premiumRate = 4.2; // 5-9.99%
      }
    }

    const premiumAmount = loanAmount * (premiumRate / 100);
    const totalLoanAmount = loanAmount + premiumAmount;

    return {
      insuranceRequired: true,
      premiumRate,
      premiumAmount,
      totalLoanAmount,
      downPaymentRatio
    };
  };

  const insuranceData = calculateMortgageInsurance();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const formatNumber = (num: number, decimals: number = 1) => {
    return num.toFixed(decimals);
  };

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4 flex items-center justify-center gap-2">
              <Shield className="h-8 w-8" />
              Prime d'assurance hypothécaire
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Calculez le montant de la prime d'assurance hypothécaire selon votre mise de fonds et la durée d'amortissement.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            {/* Input Parameters */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
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
                    step={10000}
                    min={100000}
                    max={2000000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="downPaymentValue" className="block text-lg font-medium text-slate-900 mb-3">
                  Mise de fonds {isPercentage ? '(%)' : '($)'}
                </Label>
                <div className="relative">
                  {!isPercentage && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>}
                  <Input
                    id="downPaymentValue"
                    type="number"
                    value={downPaymentValue === 0 ? '' : downPaymentValue}
                    onChange={handleDownPaymentValueChange}
                    step={isPercentage ? 0.5 : 5000}
                    min={isPercentage ? 5 : 5000}
                    max={isPercentage ? 100 : purchasePrice}
                    className={`text-lg ${!isPercentage ? 'pl-8' : ''}`}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="amortization" className="block text-lg font-medium text-slate-900 mb-3">
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
            </div>

            {/* Results */}
            {!insuranceData.insuranceRequired ? (
              <Card className="border-green-200 bg-green-50 mb-6">
                <CardHeader>
                  <CardTitle className="text-green-900 text-xl flex items-center gap-2">
                    <Shield className="h-6 w-6" />
                    Aucune assurance hypothécaire requise
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-800">
                    Avec une mise de fonds de {formatNumber(insuranceData.downPaymentRatio, 1)}% 
                    ({formatCurrency(downPaymentAmount)}), 
                    vous n'avez pas besoin d'assurance hypothécaire car votre mise de fonds est de 20% ou plus.
                  </p>
                  <div className="mt-4 p-4 bg-green-100 rounded-lg">
                    <div className="text-2xl font-bold text-green-700">
                      Montant du prêt: {formatCurrency(purchasePrice - downPaymentAmount)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-3 gap-6 mb-6">
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-blue-900 text-lg">
                      Taux de prime
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-700">
                      {insuranceData.premiumRate}%
                    </div>
                    <div className="text-sm text-blue-600 mt-2">
                      Mise de fonds: {formatNumber(insuranceData.downPaymentRatio, 1)}%
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="text-orange-900 text-lg">
                      Prime d'assurance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-700">
                      {formatCurrency(insuranceData.premiumAmount)}
                    </div>
                    <div className="text-sm text-orange-600 mt-2">
                      Ajoutée au montant du prêt
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-red-50">
                  <CardHeader>
                    <CardTitle className="text-red-900 text-lg">
                      Montant total du prêt
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-700">
                      {formatCurrency(insuranceData.totalLoanAmount)}
                    </div>
                    <div className="text-sm text-red-600 mt-2">
                      Incluant l'assurance
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Information about mortgage insurance */}
            <Card className="border-slate-200 bg-slate-50">
              <CardHeader>
                <CardTitle className="text-slate-900 text-xl flex items-center gap-2">
                  <AlertCircle className="h-6 w-6" />
                  À propos de l'assurance hypothécaire
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-700">
                  <p>
                    <strong>Quand l'assurance est-elle requise?</strong><br />
                    L'assurance hypothécaire est obligatoire lorsque la mise de fonds est inférieure à 20% du prix d'achat.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium mb-2">Taux pour 25 ans d'amortissement:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>5-9,99% mise de fonds: 4,0%</li>
                        <li>10-14,99% mise de fonds: 3,1%</li>
                        <li>15-19,99% mise de fonds: 2,8%</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-medium mb-2">Taux pour 30 ans d'amortissement:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li>5-9,99% mise de fonds: 4,2%</li>
                        <li>10-14,99% mise de fonds: 3,3%</li>
                        <li>15-19,99% mise de fonds: 3,0%</li>
                      </ul>
                    </div>
                  </div>
                  
                  <p>
                    <strong>Comment ça fonctionne?</strong><br />
                    La prime d'assurance est calculée sur le montant du prêt et ajoutée au capital emprunté. 
                    Elle est donc financée sur toute la durée du prêt hypothécaire.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageInsuranceCalculator;
