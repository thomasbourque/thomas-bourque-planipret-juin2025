
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Clock, TrendingDown, CheckCircle } from "lucide-react";

const DelayPurchaseCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [currentPrice, setCurrentPrice] = useState(400000);
  const [houseGrowthRate, setHouseGrowthRate] = useState([4.5]);
  const [incomeGrowthRate, setIncomeGrowthRate] = useState([2.5]);
  const [yearsDelay, setYearsDelay] = useState(3);

  const handleAnnualIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setAnnualIncome(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setAnnualIncome(numValue);
      }
    }
  };

  const handleCurrentPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setCurrentPrice(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setCurrentPrice(numValue);
      }
    }
  };

  const handleYearsDelayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setYearsDelay(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue >= 0 && numValue <= 20) {
        setYearsDelay(numValue);
      }
    }
  };

  // Calculate future values
  const futurePrice = currentPrice * Math.pow(1 + houseGrowthRate[0] / 100, yearsDelay);
  const futureIncome = annualIncome * Math.pow(1 + incomeGrowthRate[0] / 100, yearsDelay);
  
  // Calculate price-to-income ratios
  const currentRatio = annualIncome > 0 ? currentPrice / annualIncome : 0;
  const futureRatio = futureIncome > 0 ? futurePrice / futureIncome : 0;
  
  // Calculate purchasing power loss
  const purchasingPowerLoss = futurePrice - currentPrice;

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
              <Clock className="h-8 w-8" />
              Combien me coûte le fait d'attendre pour acheter?
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Découvrez l'impact financier de reporter votre achat immobilier et comment le pouvoir d'achat évolue avec le temps.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            {/* Input Parameters */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <Label htmlFor="annualIncome" className="block text-lg font-medium text-slate-900 mb-3">
                  Revenu annuel brut
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={annualIncome === 0 ? '' : annualIncome}
                    onChange={handleAnnualIncomeChange}
                    step={5000}
                    min={30000}
                    max={500000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="currentPrice" className="block text-lg font-medium text-slate-900 mb-3">
                  Prix de la propriété aujourd'hui
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="currentPrice"
                    type="number"
                    value={currentPrice === 0 ? '' : currentPrice}
                    onChange={handleCurrentPriceChange}
                    step={10000}
                    min={100000}
                    max={2000000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="yearsDelay" className="block text-lg font-medium text-slate-900 mb-3">
                  Années d'attente
                </Label>
                <Input
                  id="yearsDelay"
                  type="number"
                  value={yearsDelay === 0 ? '' : yearsDelay}
                  onChange={handleYearsDelayChange}
                  step={1}
                  min={0}
                  max={20}
                  className="text-lg"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Sliders */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <Label className="block text-lg font-medium text-slate-900">
                  Croissance annuelle du prix des maisons: {houseGrowthRate[0]}%
                </Label>
                <Slider
                  value={houseGrowthRate}
                  onValueChange={setHouseGrowthRate}
                  min={0}
                  max={10}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>0%</span>
                  <span>10%</span>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="block text-lg font-medium text-slate-900">
                  Croissance anticipée du revenu: {incomeGrowthRate[0]}%
                </Label>
                <Slider
                  value={incomeGrowthRate}
                  onValueChange={setIncomeGrowthRate}
                  min={0}
                  max={8}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>0%</span>
                  <span>8%</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900 text-lg">
                    Prix après {yearsDelay} an{yearsDelay > 1 ? 's' : ''}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-700">
                    {formatCurrency(futurePrice)}
                  </div>
                  <div className="text-sm text-blue-600 mt-2">
                    Aujourd'hui: {formatCurrency(currentPrice)}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-orange-900 text-lg">
                    Ratios prix/revenu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-orange-700">Aujourd'hui:</span>
                      <span className="font-semibold text-orange-800">
                        {formatNumber(currentRatio, 1)}x
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-orange-700">Dans {yearsDelay} an{yearsDelay > 1 ? 's' : ''}:</span>
                      <span className="font-semibold text-orange-800">
                        {formatNumber(futureRatio, 1)}x
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-red-900 text-lg flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Perte de pouvoir d'achat
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-700">
                    {formatCurrency(purchasingPowerLoss)}
                  </div>
                  <div className="text-sm text-red-600 mt-2">
                    Coût d'attendre {yearsDelay} an{yearsDelay > 1 ? 's' : ''}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Messages */}
            <Card className="border-green-200 bg-green-50 mb-6">
              <CardHeader>
                <CardTitle className="text-green-900 text-xl flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  Le meilleur moment pour acheter c'est maintenant!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="h-5 w-5 text-green-700 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 font-medium mb-2">
                        Statistique québécoise sur 10 ans:
                      </p>
                      <p className="text-green-700 text-sm">
                        Au Québec, le prix des maisons a augmenté en moyenne de 4,8% par année depuis 2013, 
                        tandis que les salaires n'ont progressé que de 2,3% annuellement. Cette différence 
                        signifie que le pouvoir d'achat immobilier diminue chaque année.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-700 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-green-800 font-medium mb-2">
                        Je peux vous aider à entrer sur le marché le plus rapidement possible!
                      </p>
                      <p className="text-green-700 text-sm">
                        Contactez-moi pour découvrir les stratégies qui vous permettront d'acheter 
                        votre propriété sans attendre et maximiser votre pouvoir d'achat.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Summary */}
            {yearsDelay > 0 && (
              <div className="p-6 bg-slate-100 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">
                  Analyse de votre situation
                </h3>
                
                <div className="space-y-3 text-sm text-slate-700">
                  <p>
                    <strong>Impact d'attendre {yearsDelay} an{yearsDelay > 1 ? 's' : ''}:</strong>
                  </p>
                  
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>
                      Le prix de la propriété passerait de {formatCurrency(currentPrice)} à {formatCurrency(futurePrice)}, 
                      soit une augmentation de {formatCurrency(purchasingPowerLoss)}.
                    </li>
                    <li>
                      Votre ratio prix/revenu {futureRatio > currentRatio ? 'augmenterait' : 'diminuerait'} 
                      de {formatNumber(currentRatio, 1)}x à {formatNumber(futureRatio, 1)}x.
                    </li>
                    <li>
                      {futureRatio > currentRatio ? 
                        'Il sera plus difficile de qualifier pour le même montant d\'hypothèque.' :
                        'Votre capacité d\'emprunt relative s\'améliorerait légèrement.'
                      }
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DelayPurchaseCalculator;
