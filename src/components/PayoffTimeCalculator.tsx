
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, TrendingUp } from "lucide-react";

const PayoffTimeCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [monthlyPayment, setMonthlyPayment] = useState(1850);
  const [extraPaymentAmount, setExtraPaymentAmount] = useState(0);
  const [extraPaymentType, setExtraPaymentType] = useState("monthly");
  const [extraPaymentStartMonth, setExtraPaymentStartMonth] = useState(1);

  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setLoanAmount(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setLoanAmount(numValue);
      }
    }
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setInterestRate(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setInterestRate(numValue);
      }
    }
  };

  const handleMonthlyPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setMonthlyPayment(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setMonthlyPayment(numValue);
      }
    }
  };

  const handleExtraPaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setExtraPaymentAmount(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        setExtraPaymentAmount(numValue);
      }
    }
  };

  const handleExtraPaymentStartMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setExtraPaymentStartMonth(1);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue >= 1) {
        setExtraPaymentStartMonth(numValue);
      }
    }
  };

  // Calculate payoff time
  const calculatePayoffTime = () => {
    if (loanAmount <= 0 || interestRate <= 0 || monthlyPayment <= 0) {
      return { months: 0, totalInterest: 0, totalPayments: 0 };
    }

    const monthlyRate = interestRate / 100 / 12;
    let balance = loanAmount;
    let month = 1;
    let totalInterest = 0;
    let totalPayments = 0;

    while (balance > 0.01 && month <= 600) { // Max 50 years
      const interestPayment = balance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment;
      
      // Add extra payment if applicable
      let extraPayment = 0;
      if (month >= extraPaymentStartMonth && extraPaymentAmount > 0) {
        if (extraPaymentType === "monthly") {
          extraPayment = extraPaymentAmount;
        } else if (extraPaymentType === "yearly" && (month - extraPaymentStartMonth + 1) % 12 === 1) {
          extraPayment = extraPaymentAmount;
        }
      }

      principalPayment += extraPayment;
      
      if (principalPayment > balance) {
        principalPayment = balance;
      }

      balance -= principalPayment;
      totalInterest += interestPayment;
      totalPayments += interestPayment + principalPayment;
      month++;
    }

    return {
      months: month - 1,
      totalInterest,
      totalPayments
    };
  };

  const { months, totalInterest, totalPayments } = calculatePayoffTime();
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  // Calculate regular payoff time (without extra payments)
  const calculateRegularPayoffTime = () => {
    if (loanAmount <= 0 || interestRate <= 0 || monthlyPayment <= 0) {
      return { months: 0, totalInterest: 0 };
    }

    const monthlyRate = interestRate / 100 / 12;
    let balance = loanAmount;
    let month = 1;
    let totalInterest = 0;

    while (balance > 0.01 && month <= 600) {
      const interestPayment = balance * monthlyRate;
      let principalPayment = monthlyPayment - interestPayment;
      
      if (principalPayment > balance) {
        principalPayment = balance;
      }

      balance -= principalPayment;
      totalInterest += interestPayment;
      month++;
    }

    return {
      months: month - 1,
      totalInterest
    };
  };

  const regularPayoff = calculateRegularPayoffTime();
  const timeSaved = regularPayoff.months - months;
  const interestSaved = regularPayoff.totalInterest - totalInterest;

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
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
              Calculez le temps nécessaire pour rembourser votre prêt en fonction de vos paramètres et remboursements anticipés.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            {/* Input Parameters */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div>
                <Label htmlFor="loanAmount" className="block text-lg font-medium text-slate-900 mb-3">
                  Montant du prêt
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount === 0 ? '' : loanAmount}
                    onChange={handleLoanAmountChange}
                    step={10000}
                    min={50000}
                    max={2000000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="interestRate" className="block text-lg font-medium text-slate-900 mb-3">
                  Taux d'intérêt (%)
                </Label>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate === 0 ? '' : interestRate}
                  onChange={handleInterestRateChange}
                  step={0.1}
                  min={0.1}
                  max={15}
                  className="text-lg"
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="monthlyPayment" className="block text-lg font-medium text-slate-900 mb-3">
                  Paiement mensuel
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="monthlyPayment"
                    type="number"
                    value={monthlyPayment === 0 ? '' : monthlyPayment}
                    onChange={handleMonthlyPaymentChange}
                    step={100}
                    min={500}
                    max={10000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="extraPaymentAmount" className="block text-lg font-medium text-slate-900 mb-3">
                  Remboursement anticipé
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="extraPaymentAmount"
                    type="number"
                    value={extraPaymentAmount === 0 ? '' : extraPaymentAmount}
                    onChange={handleExtraPaymentAmountChange}
                    step={100}
                    min={0}
                    max={50000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="extraPaymentType" className="block text-lg font-medium text-slate-900 mb-3">
                  Fréquence remboursement anticipé
                </Label>
                <Select value={extraPaymentType} onValueChange={setExtraPaymentType}>
                  <SelectTrigger className="text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Mensuel</SelectItem>
                    <SelectItem value="yearly">Annuel</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {extraPaymentAmount > 0 && (
                <div>
                  <Label htmlFor="extraPaymentStartMonth" className="block text-lg font-medium text-slate-900 mb-3">
                    Débuter au versement #
                  </Label>
                  <Input
                    id="extraPaymentStartMonth"
                    type="number"
                    value={extraPaymentStartMonth}
                    onChange={handleExtraPaymentStartMonthChange}
                    step={1}
                    min={1}
                    max={360}
                    className="text-lg"
                  />
                </div>
              )}
            </div>

            {/* Results */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-900 text-lg flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Temps de remboursement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-700">
                    {years > 0 && `${years} an${years > 1 ? 's' : ''}`}
                    {remainingMonths > 0 && ` ${remainingMonths} mois`}
                  </div>
                  <div className="text-sm text-blue-600 mt-2">
                    {months} versements au total
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 bg-green-50">
                <CardHeader>
                  <CardTitle className="text-green-900 text-lg">
                    Intérêts totaux
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-700">
                    {formatCurrency(totalInterest)}
                  </div>
                  <div className="text-sm text-green-600 mt-2">
                    Coût total: {formatCurrency(totalPayments)}
                  </div>
                </CardContent>
              </Card>

              {extraPaymentAmount > 0 && (
                <Card className="border-orange-200 bg-orange-50">
                  <CardHeader>
                    <CardTitle className="text-orange-900 text-lg flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Économies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="text-lg font-bold text-orange-700">
                          {formatCurrency(interestSaved)}
                        </div>
                        <div className="text-sm text-orange-600">
                          Intérêts économisés
                        </div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-orange-700">
                          {Math.floor(timeSaved / 12)} an{Math.floor(timeSaved / 12) > 1 ? 's' : ''} {timeSaved % 12} mois
                        </div>
                        <div className="text-sm text-orange-600">
                          Temps économisé
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PayoffTimeCalculator;
