
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MortgageSlider from "./MortgageSlider";

const LtvCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [downPayment, setDownPayment] = useState(100000);
  const [interestRate, setInterestRate] = useState(5.0);
  const [amortization, setAmortization] = useState(25);
  const [appreciationRate, setAppreciationRate] = useState([5]);
  const [extraPayment, setExtraPayment] = useState(0);
  const [extraPaymentFrequency, setExtraPaymentFrequency] = useState('monthly');
  const [extraPaymentStartYear, setExtraPaymentStartYear] = useState(1);

  const mortgageAmount = purchasePrice - downPayment;

  const calculateMonthlyPayment = (principal: number, annualRate: number, amortizationYears: number) => {
    if (principal === 0 || annualRate === 0) return principal / (amortizationYears * 12);
    
    const amortizationMonths = amortizationYears * 12;
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    const numerator = principal * monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, amortizationMonths);
    const denominator = Math.pow(1 + monthlyEquivalentRate, amortizationMonths) - 1;
    
    return numerator / denominator;
  };

  const calculateAmortizationSchedule = () => {
    const monthlyPayment = calculateMonthlyPayment(mortgageAmount, interestRate, amortization);
    const semiAnnualRate = interestRate / 2;
    const monthlyRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    let balance = mortgageAmount;
    const schedule = [];
    
    let extraPerMonth = 0;
    if (extraPayment > 0) {
      switch (extraPaymentFrequency) {
        case 'monthly':
          extraPerMonth = extraPayment;
          break;
        case 'yearly':
          extraPerMonth = extraPayment / 12;
          break;
        case 'one-time':
          break;
      }
    }

    for (let year = 1; year <= amortization; year++) {
      for (let month = 1; month <= 12 && balance > 0; month++) {
        const interestPayment = balance * monthlyRate;
        let principalPayment = monthlyPayment - interestPayment;
        
        let extraThisMonth = 0;
        if (year >= extraPaymentStartYear) {
          if (extraPaymentFrequency === 'monthly' || extraPaymentFrequency === 'yearly') {
            extraThisMonth = extraPerMonth;
          } else if (extraPaymentFrequency === 'one-time' && year === extraPaymentStartYear && month === 1) {
            extraThisMonth = extraPayment;
          }
        }
        
        const totalPrincipalPayment = Math.min(principalPayment + extraThisMonth, balance);
        balance = Math.max(0, balance - totalPrincipalPayment);
        
        if (balance <= 0) break;
      }
      
      const homeValue = purchasePrice * Math.pow(1 + appreciationRate[0] / 100, year);
      const equity = homeValue - balance;
      const ltv = balance > 0 ? (balance / homeValue) * 100 : 0;
      const maxRefinancing = Math.max(0, homeValue * 0.8 - balance);
      
      schedule.push({
        year,
        balance: Math.round(balance),
        equity: Math.round(equity),
        homeValue: Math.round(homeValue),
        ltv: ltv,
        maxRefinancing: Math.round(maxRefinancing)
      });
      
      if (balance <= 0) break;
    }
    
    return schedule;
  };

  const schedule = calculateAmortizationSchedule();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('fr-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  };

  const getLtvRowClass = (ltv: number) => {
    if (ltv <= 65) return "bg-green-50 border-green-200";
    if (ltv <= 80) return "bg-yellow-50 border-yellow-200";
    return "";
  };

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Calculateur RPV evolutif
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Calculez l evolution de votre ratio pret-valeur et vos options de refinancement annee apres annee.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              <div>
                <Label htmlFor="purchasePrice" className="block text-lg font-medium text-slate-900 mb-3">
                  Prix d achat
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={purchasePrice === 0 ? '' : purchasePrice}
                    onChange={(e) => setPurchasePrice(Number(e.target.value) || 0)}
                    step={25000}
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
                    onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                    step={5000}
                    className="text-lg pl-8"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="interestRate" className="block text-lg font-medium text-slate-900 mb-3">
                  Taux d interet (%)
                </Label>
                <Input
                  id="interestRate"
                  type="number"
                  value={interestRate === 0 ? '' : interestRate.toFixed(2)}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                  step={0.01}
                  min={0}
                  max={15}
                  className="text-lg"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-8">
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
                  label="Appreciation annuelle de la propriete"
                  value={appreciationRate}
                  onValueChange={setAppreciationRate}
                  min={0}
                  max={10}
                  step={0.5}
                  formatValue={(value) => `${value.toFixed(1)}%`}
                />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">
                Remboursements anticipes (optionnel)
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="extraPayment" className="block text-sm font-medium text-slate-700 mb-2">
                    Montant du remboursement anticipe
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="extraPayment"
                      type="number"
                      value={extraPayment === 0 ? '' : extraPayment}
                      onChange={(e) => setExtraPayment(Number(e.target.value) || 0)}
                      step={100}
                      min={0}
                      className="pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    Frequence
                  </Label>
                  <Select value={extraPaymentFrequency} onValueChange={setExtraPaymentFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Mensuel</SelectItem>
                      <SelectItem value="yearly">Annuel</SelectItem>
                      <SelectItem value="one-time">Une seule fois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="block text-sm font-medium text-slate-700 mb-2">
                    A partir de l annee
                  </Label>
                  <Select value={extraPaymentStartYear.toString()} onValueChange={(value) => setExtraPaymentStartYear(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: amortization }, (_, i) => {
                        const year = i + 1;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            Annee {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Annee</TableHead>
                    <TableHead>Solde hypothecaire</TableHead>
                    <TableHead>Valeur de la maison</TableHead>
                    <TableHead>Equite</TableHead>
                    <TableHead>RPV (%)</TableHead>
                    <TableHead>Refinancement max.</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedule.map((row) => (
                    <TableRow key={row.year} className={getLtvRowClass(row.ltv)}>
                      <TableCell className="font-medium">{row.year}</TableCell>
                      <TableCell>{formatCurrency(row.balance)}</TableCell>
                      <TableCell>{formatCurrency(row.homeValue)}</TableCell>
                      <TableCell>{formatCurrency(row.equity)}</TableCell>
                      <TableCell className="font-semibold">
                        {row.ltv.toFixed(2)}%
                        {row.ltv <= 65 && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Marge ouverte
                          </span>
                        )}
                        {row.ltv > 65 && row.ltv <= 80 && (
                          <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            Marge fermee
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{formatCurrency(row.maxRefinancing)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="font-semibold text-green-800 mb-2">RPV ≤ 65%</div>
                <p className="text-green-700">Acces a une marge de credit hypothecaire ouverte</p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="font-semibold text-yellow-800 mb-2">65% < RPV ≤ 80%</div>
                <p className="text-yellow-700">Acces a une marge de credit hypothecaire avec pret ferme</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="font-semibold text-blue-800 mb-2">Refinancement</div>
                <p className="text-blue-700">Montant maximum disponible pour refinancement a 80% de la valeur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LtvCalculator;
