import React, { useState, useEffect } from "react";
import { calculateRefinancingSavings, calculateRefinancingCapacity, calculateInvestmentStrategy, calculateMonthlyPayment, calculateRemainingBalance } from "@/utils/refinancingCalculations";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useIsMobile } from "@/hooks/use-mobile";

const RefinancingCalculatorSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentBalance, setCurrentBalance] = useState(400000);
  const [homeValue, setHomeValue] = useState(600000);
  const [termEndDate, setTermEndDate] = useState("2027-12-31");
  const [amortizationYears, setAmortizationYears] = useState(25);
  const [amortizationMonths, setAmortizationMonths] = useState(0);
  const [currentRate, setCurrentRate] = useState(5.5);
  const [newRate, setNewRate] = useState(4.25);
  const [refinancingAmount, setRefinancingAmount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const isMobile = useIsMobile();

  // Auto-scroll to calculator section on mobile when component mounts
  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        const calculatorElement = document.querySelector('[data-calculator="refinancing"]');
        if (calculatorElement) {
          calculatorElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 500);
    }
  }, [isMobile]);

  const handleCurrentBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setCurrentBalance(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setCurrentBalance(numValue);
      }
    }
  };

  const handleHomeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setHomeValue(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setHomeValue(numValue);
      }
    }
  };

  const handleRefinancingAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setRefinancingAmount(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setRefinancingAmount(numValue);
      }
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  // Auto-scroll on mobile when step changes
  useEffect(() => {
    if (currentStep > 1) {
      // Small delay to ensure the content is rendered
      setTimeout(() => {
        const nextStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        if (nextStepElement && isMobile) {
          nextStepElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          });
        }
      }, 100);
    }
  }, [currentStep, isMobile]);

  const isStepValid = (step: number) => {
    switch (step) {
      case 1: return currentBalance > 0;
      case 2: return homeValue > 0;
      case 3: return termEndDate !== "";
      case 4: return true; // Amortization has defaults
      case 5: return currentRate > 0;
      case 6: return newRate > 0;
      case 7: return refinancingAmount >= 0;
      default: return false;
    }
  };

  const savings = calculateRefinancingSavings(
    currentBalance,
    currentRate,
    newRate,
    amortizationYears,
    amortizationMonths,
    termEndDate
  );

  const refinancingCapacity = calculateRefinancingCapacity(homeValue, currentBalance);
  const remainingAmortization = amortizationYears + amortizationMonths / 12;
  
  // Set refinancing amount to max capacity if not set yet
  const effectiveRefinancingAmount = refinancingAmount > 0 ? refinancingAmount : refinancingCapacity;
  
  const investmentStrategy = calculateInvestmentStrategy(
    effectiveRefinancingAmount,
    newRate,
    remainingAmortization,
    currentBalance
  );

  const steps = [
    {
      id: 1,
      title: "Solde hypothécaire actuel",
      content: (
        <div className="space-y-4">
          <Label htmlFor="currentBalance" className="block text-lg font-medium text-slate-900">
            Quel est le solde actuel de votre hypothèque?
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
            <Input
              id="currentBalance"
              type="number"
              value={currentBalance === 0 ? '' : currentBalance}
              onChange={handleCurrentBalanceChange}
              step={1000}
              min={50000}
              max={2000000}
              className="text-lg pl-8"
              placeholder="0"
            />
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Valeur de la maison",
      content: (
        <div className="space-y-4">
          <Label htmlFor="homeValue" className="block text-lg font-medium text-slate-900">
            Quelle est la valeur actuelle de votre maison?
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
            <Input
              id="homeValue"
              type="number"
              value={homeValue === 0 ? '' : homeValue}
              onChange={handleHomeValueChange}
              step={1000}
              min={100000}
              max={5000000}
              className="text-lg pl-8"
              placeholder="0"
            />
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Date d'échéance",
      content: (
        <div className="space-y-4">
          <Label htmlFor="termEndDate" className="block text-lg font-medium text-slate-900">
            Quand votre terme actuel se termine-t-il?
          </Label>
          <div className="flex justify-center">
            <Input
              id="termEndDate"
              type="date"
              value={termEndDate}
              onChange={(e) => setTermEndDate(e.target.value)}
              className="text-lg max-w-xs"
            />
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Amortissement",
      content: (
        <div className="space-y-4">
          <Label className="block text-lg font-medium text-slate-900">
            Quelle est la période d'amortissement restante?
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-slate-700 mb-2">
                Années
              </Label>
              <Select value={amortizationYears.toString()} onValueChange={(value) => setAmortizationYears(Number(value))}>
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
              <Label className="block text-sm font-medium text-slate-700 mb-2">
                Mois
              </Label>
              <Select value={amortizationMonths.toString()} onValueChange={(value) => setAmortizationMonths(Number(value))}>
                <SelectTrigger className="text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i} mois
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Taux actuel",
      content: (
        <div className="space-y-4">
          <Label htmlFor="currentRate" className="block text-lg font-medium text-slate-900">
            Quel est votre taux d'intérêt actuel?
          </Label>
          <div className="relative">
            <Input
              id="currentRate"
              type="number"
              value={currentRate.toFixed(2)}
              onChange={(e) => setCurrentRate(Number(e.target.value))}
              step={0.01}
              min={3}
              max={8}
              className="text-lg pr-8"
              placeholder="5.50"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">%</span>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Nouveau taux",
      content: (
        <div className="space-y-4">
          <Label htmlFor="newRate" className="block text-lg font-medium text-slate-900">
            Quel est le nouveau taux proposé?
          </Label>
          <div className="relative">
            <Input
              id="newRate"
              type="number"
              value={newRate}
              onChange={(e) => setNewRate(Number(e.target.value))}
              step={0.01}
              min={3}
              max={8}
              className="text-lg pr-8"
              placeholder="4.25"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">%</span>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Montant de refinancement",
      content: (
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
            <Input
              id="refinancingAmount"
              type="number"
              value={refinancingAmount === 0 ? refinancingCapacity : refinancingAmount}
              onChange={handleRefinancingAmountChange}
              step={1000}
              min={0}
              max={refinancingCapacity}
              className="text-lg pl-8"
              placeholder={refinancingCapacity.toString()}
            />
          </div>
          <p className="text-sm text-slate-600">
            Montant de refinancement maximal possible : {refinancingCapacity.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
          </p>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 px-4 min-h-screen" style={{ backgroundColor: 'hsl(217, 91%, 60%)' }} data-calculator="refinancing">
      <div className="container max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Calculateur de refinancement
          </h2>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto">
            Découvrez en quelques secondes combien vous pourriez économiser en faisant travailler la valeur de votre maison.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 w-full md:max-w-4xl mx-auto">
          {/* Step Progress */}
          <div className="mb-8">
            {/* Desktop Progress */}
            <div className="hidden md:block">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      currentStep > step.id 
                        ? 'bg-green-500 text-white' 
                        : currentStep === step.id 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-600'
                    }`}>
                      {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-0.5 mx-2 ${
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Progress - Pastilles simples */}
            <div className="md:hidden">
              <div className="text-center mb-6">
                <p className="text-lg font-semibold text-gray-700">
                  Étape {currentStep} sur {steps.length}
                </p>
              </div>
            </div>
          </div>

          {/* Current Step */}
          <div className="space-y-6">
            {steps.slice(0, currentStep).map((step) => (
              <div key={step.id} className={`${currentStep === step.id ? '' : 'opacity-60'}`} data-step={step.id}>
                <div className="flex items-center gap-3 mb-4">
                  {/* Pastille sur mobile */}
                  <div className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep > step.id 
                      ? 'bg-green-500 text-white' 
                      : currentStep === step.id 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>
                </div>
                {step.content}
                {currentStep === step.id && isStepValid(step.id) && currentStep < steps.length && (
                  <Button 
                    onClick={nextStep}
                    className="mt-4"
                    style={{ backgroundColor: 'hsl(217, 91%, 60%)', color: 'white' }}
                  >
                    Suivant
                  </Button>
                )}
              </div>
            ))}

            {/* Results */}
            {showResults && (
              <div className="space-y-6" data-results="true">
                <Card>
                      <CardHeader>
                        <CardTitle className="text-xl text-slate-900">Économies de refinancement</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'hsl(217, 91%, 95%)' }}>
                          <p className="text-sm text-slate-600 mb-2">Économies d'ici la fin du terme</p>
                          <p className="text-3xl font-bold" style={{ color: 'hsl(217, 91%, 60%)' }}>
                            {savings.termSavings.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="text-sm text-slate-600">Paiement actuel</p>
                            <p className="text-lg font-semibold text-slate-900">
                              {savings.currentMonthlyPayment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                            </p>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-lg">
                            <p className="text-sm text-slate-600">Nouveau paiement</p>
                            <p className="text-lg font-semibold text-slate-900">
                              {savings.newMonthlyPayment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                            </p>
                          </div>
                        </div>

                        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-lg font-semibold text-green-800">
                            Vous économisez {savings.termSavings.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })} d'ici à la fin de votre terme
                          </p>
                          <p className="text-green-700 mt-2">
                            en conservant le même montant de prêt.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-slate-900">Stratégie d'investissement</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-sm text-slate-600 mb-2">Montant de refinancement</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {effectiveRefinancingAmount.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                      </p>
                    </div>

                    {/* Graphique adaptatif */}
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-slate-900 mb-4">Évolution financière</h4>
                      
                      {/* Version desktop - Graphique linéaire */}
                      <div className="hidden md:block h-80">
                        <ResponsiveContainer width="100%" height="100%">
                         <LineChart 
                           data={(() => {
                             const chartData = [];
                             const years = Math.ceil(remainingAmortization);
                             const newTotalBalance = currentBalance + effectiveRefinancingAmount;
                             const newAmortizationMonths = remainingAmortization * 12;
                             
                             for (let year = 0; year <= years; year++) {
                               const investmentValue = effectiveRefinancingAmount * Math.pow(1 + 0.065/2, year * 2);
                               const mortgageCost = effectiveRefinancingAmount * Math.pow(1 + (newRate/100)/2, year * 2);
                               const savings = investmentValue - mortgageCost;
                               const monthsPaid = year * 12;
                               const remainingBalance = calculateRemainingBalance(newTotalBalance, newRate, newAmortizationMonths, monthsPaid);
                               
                                chartData.push({
                                  year,
                                  investment: Math.round(investmentValue),
                                  mortgageCost: Math.round(mortgageCost),
                                  savings: Math.round(savings),
                                  remainingBalance: Math.round(Math.max(0, remainingBalance)),
                                });
                             }
                             return chartData;
                           })()}
                           margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                         >
                           <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                           <XAxis 
                             dataKey="year" 
                             stroke="#64748b"
                             fontSize={12}
                             tickLine={false}
                             axisLine={false}
                           />
                           <YAxis 
                             stroke="#64748b"
                             fontSize={12}
                             tickLine={false}
                             axisLine={false}
                             tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                           />
                           <Tooltip 
                             formatter={(value: number, name: string) => {
                               const labelMap = {
                                 'investment': 'Croissance en bourse',
                                 'mortgageCost': 'Coût hypothécaire',
                                 'savings': 'Économie',
                                 'remainingBalance': 'Solde hypothécaire restant'
                               };
                               return [
                                 value.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 }),
                                 labelMap[name] || name
                               ];
                             }}
                             labelFormatter={(label) => `Année ${label}`}
                             contentStyle={{
                               backgroundColor: 'white',
                               border: '1px solid #e2e8f0',
                               borderRadius: '8px',
                               boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                             }}
                           />
                           <Legend 
                             wrapperStyle={{ paddingTop: '20px' }}
                             iconType="line"
                           />
                           <Line 
                             type="monotone" 
                             dataKey="investment" 
                             stroke="#16a34a" 
                             strokeWidth={3}
                             dot={false}
                             name="Croissance en bourse (6,5%)"
                           />
                           <Line 
                             type="monotone" 
                             dataKey="mortgageCost" 
                             stroke="#dc2626" 
                             strokeWidth={3}
                             dot={false}
                             name={`Coût hypothécaire (${newRate.toFixed(2)}%)`}
                           />
                           <Line 
                             type="monotone" 
                             dataKey="savings" 
                             stroke="#3b82f6" 
                             strokeWidth={2}
                             dot={false}
                             name="Économie"
                           />
                           <Line 
                             type="monotone" 
                             dataKey="remainingBalance" 
                             stroke="#9ca3af" 
                             strokeWidth={2}
                             dot={false}
                             strokeDasharray="5 5"
                             name="Solde hypothécaire restant"
                           />
                         </LineChart>
                        </ResponsiveContainer>
                      </div>
                      
                      {/* Version mobile - Cartes de données */}
                      <div className="md:hidden space-y-4">
                        {(() => {
                          const finalYear = Math.round(remainingAmortization);
                          const investmentValue = effectiveRefinancingAmount * Math.pow(1 + 0.065/2, finalYear * 2);
                          const mortgageCost = effectiveRefinancingAmount * Math.pow(1 + (newRate/100)/2, finalYear * 2);
                          const savings = investmentValue - mortgageCost;
                          
                          return (
                            <>
                                <div className="grid grid-cols-2 gap-3">
                                  <div className="bg-green-50 p-3 rounded-lg text-center border border-green-200">
                                    <div className="text-sm font-bold text-green-700 break-words">
                                      {Math.round(investmentValue).toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                                    </div>
                                    <div className="text-xs text-green-600 mt-1">Croissance bourse</div>
                                    <div className="text-xs text-green-500">après {finalYear} ans</div>
                                  </div>
                                  
                                  <div className="bg-red-50 p-3 rounded-lg text-center border border-red-200">
                                    <div className="text-sm font-bold text-red-700 break-words">
                                      {Math.round(mortgageCost).toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                                    </div>
                                    <div className="text-xs text-red-600 mt-1">Coût hypothécaire</div>
                                    <div className="text-xs text-red-500">après {finalYear} ans</div>
                                  </div>
                                </div>
                              
                               <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                                 <div className="text-xl font-bold text-blue-700">
                                   {Math.round(savings).toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                                 </div>
                                 <div className="text-sm text-blue-600 mt-1">Économie nette</div>
                                 <div className="text-xs text-blue-500">Différence après {finalYear} ans</div>
                               </div>
                            </>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-lg font-semibold text-green-800 mb-3">
                          Vous pourriez avoir {investmentStrategy.netBenefit.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })} de plus dans vos poches
                        </p>
                        <p className="text-green-700 mb-3">
                          au bout de {Math.round(remainingAmortization)} ans avec cette stratégie d'investissement.
                        </p>
                        <div className="bg-green-100 p-3 rounded-lg border border-green-300">
                          <p className="text-green-800 font-semibold">
                            Vous pourriez décider de payer votre maison au complet {investmentStrategy.yearsMonthsSaved.years} {investmentStrategy.yearsMonthsSaved.years === 1 ? "an" : "ans"}
                            {investmentStrategy.yearsMonthsSaved.months > 0 && ` et ${investmentStrategy.yearsMonthsSaved.months} mois`} plus vite avec ces économies, et ce, sans aucun frais ni effort supplémentaire.
                          </p>
                        </div>
                      </div>
                      
                      <div className="text-center mt-6">
                         <Button 
                           size="lg"
                           style={{ backgroundColor: 'hsl(217, 91%, 60%)', color: 'white' }}
                           className="hover:opacity-90 transition-opacity w-full max-w-xs mx-auto block text-sm px-3 py-2"
                           onClick={() => window.open('https://expertisegestionprivee.com/contact/', '_blank')}
                         >
                           Refinancez maintenant!
                         </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === steps.length && !showResults && (
              <div className="text-center">
                <Button 
                  onClick={() => {
                    setShowResults(true);
                    // Auto-scroll to results after a short delay
                    setTimeout(() => {
                      const resultsElement = document.querySelector('[data-results="true"]');
                      if (resultsElement) {
                        resultsElement.scrollIntoView({ 
                          behavior: 'smooth', 
                          block: 'start' 
                        });
                      }
                    }, 200);
                  }}
                  size="lg"
                  style={{ backgroundColor: 'hsl(45, 93%, 47%)', color: 'hsl(217, 91%, 60%)' }}
                >
                  Calculer mes économies
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefinancingCalculatorSteps;