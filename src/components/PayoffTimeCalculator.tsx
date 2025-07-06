
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar } from "lucide-react";

const PayoffTimeCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(320000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [amortizationYears, setAmortizationYears] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(1780);
  const [extraPayment, setExtraPayment] = useState(200);
  const [extraPaymentFrequency, setExtraPaymentFrequency] = useState('monthly');
  const [extraPaymentStartYear, setExtraPaymentStartYear] = useState(1);

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setInterestRate(0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setInterestRate(numValue);
      }
    }
  };

  const calculatePayoffTime = () => {
    const monthlyRate = interestRate / 100 / 12;
    let balance = loanAmount;
    let months = 0;
    let totalInterest = 0;
    const maxMonths = amortizationYears * 12 * 2; // Safety limit
    
    // Calculate extra payment per month
    let extraPerMonth = 0;
    if (extraPayment > 0) {
      switch (extraPaymentFrequency) {
        case 'monthly':
          extraPerMonth = extraPayment;
          break;
        case 'yearly':
          extraPerMonth = extraPayment / 12;
          break;
      }
    }

    const extraPaymentStartMonth = (extraPaymentStartYear - 1) * 12;
    
    while (balance > 0.01 && months < maxMonths) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment;
      
      // Add extra payment if we've reached the start period
      if (months >= extraPaymentStartMonth) {
        principalPayment += extraPerMonth;
      }
      
      // Ensure we don't overpay
      principalPayment = Math.min(principalPayment, balance);
      
      balance -= principalPayment;
      totalInterest += interestPayment;
      months++;
    }
    
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    // Calculate without extra payments for comparison
    let balanceNoExtra = loanAmount;
    let monthsNoExtra = 0;
    let totalInterestNoExtra = 0;
    
    while (balanceNoExtra > 0.01 && monthsNoExtra < maxMonths) {
      const interestPayment = balanceNoExtra * monthlyRate;
      const principalPayment = Math.min(monthlyPayment - interestPayment, balanceNoExtra);
      
      balanceNoExtra -= principalPayment;
      totalInterestNoExtra += interestPayment;
      monthsNoExtra++;
    }
    
    const timeSaved = monthsNoExtra - months;
    const interestSaved = totalInterestNoExtra - totalInterest;
    
    return {
      payoffTimeYears: years,
      payoffTimeMonths: remainingMonths,
      totalMonths: months,
      totalInterest,
      timeSavedMonths: timeSaved,
      interestSaved
    };
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

  const formatTime = (years: number, months: number) => {
    if (years === 0) {
      return `${months} mois`;
    } else if (months === 0) {
      return `${years} ${years === 1 ? 'an' : 'ans'}`;
    } else {
      return `${years} ${years === 1 ? 'an' : 'ans'} et ${months} mois`;
    }
  };

  const formatMonths = (totalMonths: number) => {
    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;
    return formatTime(years, months);
  };

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4 flex items-center justify-center gap-2">
              <Clock className="h-8 w-8" />
              Temps pour rembourser
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Calculez le temps nécessaire pour rembourser votre prêt hypothécaire avec ou sans remboursements anticipés.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Input Parameters */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Paramètres du prêt
                </h3>

                <div>
                  <Label htmlFor="loanAmount" className="block text-lg font-medium text-slate-900 mb-2">
                    Montant du prêt
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="loanAmount"
                      type="number"
                      value={loanAmount || ''}
                      onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                      step={10000}
                      className="text-lg pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="interestRate" className="block text-lg font-medium text-slate-900 mb-2">
                    Taux d'intérêt (%)
                  </Label>
                  <Input
                    id="interestRate"
                    type="number"
                    value={interestRate || ''}
                    onChange={handleInterestRateChange}
                    step={0.01}
                    min={0}
                    max={15}
                    className="text-lg"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="amortizationYears" className="block text-lg font-medium text-slate-900 mb-2">
                    Amortissement (années)
                  </Label>
                  <Select value={amortizationYears.toString()} onValueChange={(value) => setAmortizationYears(Number(value))}>
                    <SelectTrigger className="text-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({length: 31}, (_, i) => i + 10).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year} ans</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="monthlyPayment" className="block text-lg font-medium text-slate-900 mb-2">
                    Paiement mensuel
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="monthlyPayment"
                      type="number"
                      value={monthlyPayment || ''}
                      onChange={(e) => setMonthlyPayment(Number(e.target.value) || 0)}
                      step={50}
                      className="text-lg pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Extra Payment Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Remboursements anticipés
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="extraPayment" className="block text-sm font-medium text-slate-700 mb-2">
                        Montant supplémentaire
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          id="extraPayment"
                          type="number"
                          value={extraPayment || ''}
                          onChange={(e) => setExtraPayment(Number(e.target.value) || 0)}
                          step={50}
                          min={0}
                          className="pl-8"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="block text-sm font-medium text-slate-700 mb-2">
                          Fréquence
                        </Label>
                        <Select value={extraPaymentFrequency} onValueChange={setExtraPaymentFrequency}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="monthly">Mensuel</SelectItem>
                            <SelectItem value="yearly">Annuel</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="block text-sm font-medium text-slate-700 mb-2">
                          À partir de l'année
                        </Label>
                        <Select value={extraPaymentStartYear.toString()} onValueChange={(value) => setExtraPaymentStartYear(Number(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: amortizationYears }, (_, i) => {
                              const year = i + 1;
                              return (
                                <SelectItem key={year} value={year.toString()}>
                                  Année {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  Résultats
                </h3>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <CardTitle className="text-green-900 text-lg">
                      Temps de remboursement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-700">
                      {formatTime(results.payoffTimeYears, results.payoffTimeMonths)}
                    </div>
                    {extraPayment > 0 && (
                      <div className="text-sm text-green-600 mt-2">
                        Avec remboursements anticipés
                      </div>
                    )}
                  </CardContent>
                </Card>

                {results.timeSavedMonths > 0 && extraPayment > 0 && (
                  <Card className="border-blue-200 bg-blue-50">
                    <CardHeader>
                      <CardTitle className="text-blue-900 text-lg">
                        Temps économisé
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-700">
                        {formatMonths(results.timeSavedMonths)}
                      </div>
                      <div className="text-sm text-blue-600 mt-2">
                        Grâce aux remboursements anticipés
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="text-orange-900 text-lg">
                      Intérêts totaux
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-700">
                      {formatCurrency(results.totalInterest)}
                    </div>
                    <div className="text-sm text-orange-600 mt-2">
                      Sur la durée du prêt
                    </div>
                  </CardContent>
                </Card>

                {results.interestSaved > 0 && extraPayment > 0 && (
                  <Card className="border-purple-200 bg-purple-50">
                    <CardHeader>
                      <CardTitle className="text-purple-900 text-lg">
                        Économies d'intérêts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-purple-700">
                        {formatCurrency(results.interestSaved)}
                      </div>
                      <div className="text-sm text-purple-600 mt-2">
                        Grâce aux remboursements anticipés
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayoffTimeCalculator;
