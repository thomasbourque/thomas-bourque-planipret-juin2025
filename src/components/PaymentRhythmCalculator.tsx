
import React, { useState } from "react";
import { calculatePaymentRhythms } from "@/utils/paymentRhythmCalculations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MortgageSlider from "./MortgageSlider";

const PaymentRhythmCalculator = () => {
  const [mortgageAmount, setMortgageAmount] = useState(400000);
  const [interestRate, setInterestRate] = useState([4.5]);
  const [amortization, setAmortization] = useState(25);

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

  const results = calculatePaymentRhythms(mortgageAmount, interestRate[0], amortization);
  
  // Calcul des économies par rapport au mensuel
  const monthlyInterest = results.monthlyDetails.totalInterest;
  const monthlyTime = results.monthlyDetails.payoffTime;

  const paymentOptions = [
    { 
      name: "Mensuel", 
      payment: results.monthlyPayment,
      details: results.monthlyDetails,
      color: "bg-slate-100"
    },
    { 
      name: "Aux deux semaines", 
      payment: results.biweeklyPayment,
      details: { 
        ...results.biweeklyDetails, 
        interestSavings: monthlyInterest - results.biweeklyDetails.totalInterest,
        timeSavings: monthlyTime - results.biweeklyDetails.payoffTime
      },
      color: "bg-blue-50"
    },
    { 
      name: "Accéléré aux deux semaines", 
      payment: results.acceleratedBiweeklyPayment,
      details: { 
        ...results.acceleratedBiweeklyDetails, 
        interestSavings: monthlyInterest - results.acceleratedBiweeklyDetails.totalInterest,
        timeSavings: monthlyTime - results.acceleratedBiweeklyDetails.payoffTime
      },
      color: "bg-green-50"
    },
    { 
      name: "Hebdomadaire", 
      payment: results.weeklyPayment,
      details: { 
        ...results.weeklyDetails, 
        interestSavings: monthlyInterest - results.weeklyDetails.totalInterest,
        timeSavings: monthlyTime - results.weeklyDetails.payoffTime
      },
      color: "bg-yellow-50"
    },
    { 
      name: "Hebdomadaire accéléré", 
      payment: results.acceleratedWeeklyPayment,
      details: { 
        ...results.acceleratedWeeklyDetails, 
        interestSavings: monthlyInterest - results.acceleratedWeeklyDetails.totalInterest,
        timeSavings: monthlyTime - results.acceleratedWeeklyDetails.payoffTime
      },
      color: "bg-purple-50"
    }
  ];

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Calculateur de rythme de paiement
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Découvrez l'impact des différents rythmes de paiement sur votre hypothèque et les économies potentielles.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
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
                    min={50000}
                    max={2000000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
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
                <MortgageSlider
                  label="Taux d'intérêt"
                  value={interestRate}
                  onValueChange={setInterestRate}
                  min={1}
                  max={8}
                  step={0.01}
                  formatValue={(value) => `${value.toFixed(2)}%`}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Comparaison des rythmes de paiement
              </h3>
              
              <div className="grid gap-4">
                {paymentOptions.map((option, index) => (
                  <div key={index} className={`${option.color} border rounded-lg p-4`}>
                    <div className="grid md:grid-cols-5 gap-4 items-center">
                      <div>
                        <h4 className="font-semibold text-slate-900">{option.name}</h4>
                        <p className="text-lg font-bold text-slate-700">
                          {option.payment.toLocaleString('fr-CA', { 
                            style: 'currency', 
                            currency: 'CAD',
                            minimumFractionDigits: 0 
                          })}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-slate-600">Intérêts totaux</p>
                        <p className="font-semibold">
                          {option.details.totalInterest.toLocaleString('fr-CA', { 
                            style: 'currency', 
                            currency: 'CAD',
                            minimumFractionDigits: 0 
                          })}
                        </p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm text-slate-600">Durée</p>
                        <p className="font-semibold">
                          {Math.round(option.details.payoffTime)} mois
                        </p>
                      </div>
                      
                      {option.details.interestSavings > 0 && (
                        <>
                          <div className="text-center">
                            <p className="text-sm text-green-600">Économie d'intérêts</p>
                            <p className="font-semibold text-green-700">
                              {option.details.interestSavings.toLocaleString('fr-CA', { 
                                style: 'currency', 
                                currency: 'CAD',
                                minimumFractionDigits: 0 
                              })}
                            </p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-green-600">Économie de temps</p>
                            <p className="font-semibold text-green-700">
                              {Math.round(option.details.timeSavings)} mois
                            </p>
                          </div>
                        </>
                      )}
                      
                      {option.details.interestSavings === 0 && (
                        <div className="md:col-span-2 text-center text-slate-500">
                          <p className="text-sm">Référence de base</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentRhythmCalculator;
