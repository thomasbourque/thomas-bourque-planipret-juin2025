
import React, { useState } from "react";
import { calculateDownPaymentComparison } from "@/utils/downPaymentCalculations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MortgageSlider from "./MortgageSlider";

const DownPaymentCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [downPayment1, setDownPayment1] = useState([20]);
  const [downPayment2, setDownPayment2] = useState([10]);
  const [interestRate, setInterestRate] = useState([4.5]);
  const [amortization, setAmortization] = useState(25);
  const [investmentReturn, setInvestmentReturn] = useState([7]);

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

  const results = calculateDownPaymentComparison(
    purchasePrice,
    downPayment1[0],
    downPayment2[0],
    interestRate[0],
    amortization,
    investmentReturn[0]
  );

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Calculateur de mise de fonds
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Comparez l'impact d'augmenter votre mise de fonds versus investir l'argent économisé en bourse.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
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
                    max={2000000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <MortgageSlider
                  label="Taux d'intérêt hypothécaire"
                  value={interestRate}
                  onValueChange={setInterestRate}
                  min={1}
                  max={8}
                  step={0.01}
                  formatValue={(value) => `${value.toFixed(2)}%`}
                />
              </div>

              <div>
                <Label className="block text-lg font-medium text-slate-900 mb-3">
                  Amortissement: {amortization} ans
                </Label>
                <div className="flex gap-2">
                  {[20, 25, 30].map(years => (
                    <button
                      key={years}
                      onClick={() => setAmortization(years)}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        amortization === years
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {years} ans
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <MortgageSlider
                  label="Mise de fonds - Scénario 1"
                  value={downPayment1}
                  onValueChange={setDownPayment1}
                  min={5}
                  max={50}
                  step={1}
                  formatValue={(value) => `${value}%`}
                />
              </div>

              <div>
                <MortgageSlider
                  label="Mise de fonds - Scénario 2"
                  value={downPayment2}
                  onValueChange={setDownPayment2}
                  min={5}
                  max={50}
                  step={1}
                  formatValue={(value) => `${value}%`}
                />
              </div>

              <div>
                <MortgageSlider
                  label="Rendement espéré des investissements"
                  value={investmentReturn}
                  onValueChange={setInvestmentReturn}
                  min={2}
                  max={15}
                  step={0.1}
                  formatValue={(value) => `${value.toFixed(1)}%`}
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Scénario 1 */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">
                  Scénario 1: Maximiser la mise de fonds et investir mensuellement l'économie de paiement
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Mise de fonds:</span>
                    <span className="font-semibold">
                      {results.scenario1.downPayment.toLocaleString('fr-CA', {
                        style: 'currency',
                        currency: 'CAD',
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Montant hypothécaire:</span>
                    <span className="font-semibold">
                      {results.scenario1.mortgageAmount.toLocaleString('fr-CA', {
                        style: 'currency',
                        currency: 'CAD',
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Paiement mensuel:</span>
                    <span className="font-semibold">
                      {results.scenario1.monthlyPayment.toLocaleString('fr-CA', {
                        style: 'currency',
                        currency: 'CAD',
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                  {results.scenario1.insurancePremium > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Prime d'assurance SCHL:</span>
                      <span>
                        {results.scenario1.insurancePremium.toLocaleString('fr-CA', {
                          style: 'currency',
                          currency: 'CAD',
                          minimumFractionDigits: 0
                        })}
                      </span>
                    </div>
                  )}
                  {results.scenario1.monthlyInvestment > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Investissement mensuel:</span>
                      <span>
                        {results.scenario1.monthlyInvestment.toLocaleString('fr-CA', {
                          style: 'currency',
                          currency: 'CAD',
                          minimumFractionDigits: 0
                        })}
                      </span>
                    </div>
                  )}
                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between font-semibold text-blue-700">
                      <span>Valeur finale des investissements:</span>
                      <span>
                        {results.scenario1.finalInvestmentValue.toLocaleString('fr-CA', {
                          style: 'currency',
                          currency: 'CAD',
                          minimumFractionDigits: 0
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scénario 2 */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-900 mb-4">
                  Scénario 2: Réduire la mise de fonds et investir le reste des économies dès le jour 1
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-700">Mise de fonds:</span>
                    <span className="font-semibold">
                      {results.scenario2.downPayment.toLocaleString('fr-CA', {
                        style: 'currency',
                        currency: 'CAD',
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Montant hypothécaire:</span>
                    <span className="font-semibold">
                      {results.scenario2.mortgageAmount.toLocaleString('fr-CA', {
                        style: 'currency',
                        currency: 'CAD',
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-700">Paiement mensuel:</span>
                    <span className="font-semibold">
                      {results.scenario2.monthlyPayment.toLocaleString('fr-CA', {
                        style: 'currency',
                        currency: 'CAD',
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                  {results.scenario2.insurancePremium > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Prime d'assurance SCHL:</span>
                      <span>
                        {results.scenario2.insurancePremium.toLocaleString('fr-CA', {
                          style: 'currency',
                          currency: 'CAD',
                          minimumFractionDigits: 0
                        })}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Investissement initial:</span>
                    <span>
                      {(results.scenario1.downPayment - results.scenario2.downPayment).toLocaleString('fr-CA', {
                        style: 'currency',
                        currency: 'CAD',
                        minimumFractionDigits: 0
                      })}
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-4">
                    <div className="flex justify-between font-semibold text-green-700">
                      <span>Valeur finale des investissements:</span>
                      <span>
                        {results.scenario2.finalInvestmentValue.toLocaleString('fr-CA', {
                          style: 'currency',
                          currency: 'CAD',
                          minimumFractionDigits: 0
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Résultat final */}
            <div className="mt-8 text-center">
              <div className={`inline-block px-6 py-4 rounded-lg ${
                results.advantageousScenario === 'scenario1' ? 'bg-blue-100 border-blue-300' : 'bg-green-100 border-green-300'
              } border-2`}>
                <h3 className="text-xl font-bold mb-2">
                  {results.advantageousScenario === 'scenario1' 
                    ? 'Scénario 1 plus avantageux' 
                    : 'Scénario 2 plus avantageux'
                  }
                </h3>
                <p className="text-lg">
                  Avantage de{' '}
                  <span className="font-bold">
                    {results.difference.toLocaleString('fr-CA', {
                      style: 'currency',
                      currency: 'CAD',
                      minimumFractionDigits: 0
                    })}
                  </span>
                  {' '}après {amortization} ans
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownPaymentCalculator;
