import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import MortgageSlider from "./MortgageSlider";

const LtvCalculator = () => {
  const [currentHomeValue, setCurrentHomeValue] = useState(600000);
  const [currentMortgageBalance, setCurrentMortgageBalance] = useState(300000);
  const [currentInterestRate, setCurrentInterestRate] = useState(5.5);
  const [remainingAmortization, setRemainingAmortization] = useState(20);
  const [newInterestRate, setNewInterestRate] = useState(4.5);
  const [newAmortization, setNewAmortization] = useState(25);
  const [appreciationRate, setAppreciationRate] = useState([3]);
  const [refinancingAmount, setRefinancingAmount] = useState(0);
  const [hasExistingCreditLine, setHasExistingCreditLine] = useState(true);

  // Calcul du RPV actuel
  const currentLTV = (currentMortgageBalance / currentHomeValue) * 100;

  // Calcul du refinancement maximum (80% de la valeur)
  const maxRefinancing = Math.max(0, currentHomeValue * 0.8 - currentMortgageBalance);

  // Calcul de la marge ouverte disponible (65% de la valeur)
  const maxOpenCreditLine = Math.max(0, currentHomeValue * 0.65 - currentMortgageBalance);

  // Calcul du montant total après refinancement
  const totalNewMortgage = currentMortgageBalance + refinancingAmount;
  const newLTV = (totalNewMortgage / currentHomeValue) * 100;

  const calculateMonthlyPayment = (principal: number, annualRate: number, amortizationYears: number) => {
    if (principal === 0 || annualRate === 0) return principal / (amortizationYears * 12);
    
    const amortizationMonths = amortizationYears * 12;
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    const numerator = principal * monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, amortizationMonths);
    const denominator = Math.pow(1 + monthlyEquivalentRate, amortizationMonths) - 1;
    
    return numerator / denominator;
  };

  // Paiement mensuel actuel basé sur l'amortissement restant
  const currentMonthlyPayment = calculateMonthlyPayment(currentMortgageBalance, currentInterestRate, remainingAmortization);
  
  // Nouveau paiement mensuel après refinancement
  const newMonthlyPayment = calculateMonthlyPayment(totalNewMortgage, newInterestRate, newAmortization);

  // Économies/différence mensuelle
  const monthlyDifference = currentMonthlyPayment - newMonthlyPayment;

  const calculateFutureSchedule = () => {
    const schedule = [];
    let balance = totalNewMortgage;
    const semiAnnualRate = newInterestRate / 2;
    const monthlyRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    const monthlyPayment = newMonthlyPayment;

    for (let year = 1; year <= Math.min(newAmortization, 30); year++) {
      // Calcul du solde après une année de paiements
      for (let month = 1; month <= 12 && balance > 0; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        balance = Math.max(0, balance - principalPayment);
        
        if (balance <= 0) break;
      }
      
      const futureHomeValue = currentHomeValue * Math.pow(1 + appreciationRate[0] / 100, year);
      const equity = futureHomeValue - balance;
      const ltv = balance > 0 ? (balance / futureHomeValue) * 100 : 0;
      const maxRefinancingFuture = Math.max(0, futureHomeValue * 0.8 - balance);
      const maxOpenCreditLineFuture = Math.max(0, futureHomeValue * 0.65 - balance);
      
      schedule.push({
        year,
        balance: Math.round(balance),
        equity: Math.round(equity),
        homeValue: Math.round(futureHomeValue),
        ltv: ltv,
        maxRefinancing: Math.round(maxRefinancingFuture),
        maxOpenCreditLine: Math.round(maxOpenCreditLineFuture)
      });
      
      if (balance <= 0) break;
    }
    
    return schedule;
  };

  const schedule = calculateFutureSchedule();

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
    return "bg-red-50 border-red-200";
  };

  const getCurrentLtvClass = (ltv: number) => {
    if (ltv <= 65) return "text-green-600 font-bold";
    if (ltv <= 80) return "text-yellow-600 font-bold";
    return "text-red-600 font-bold";
  };

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Calculateur RPV évolutif
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Calculez votre ratio prêt-valeur actuel et explorez vos options de refinancement année après année.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            {/* Situation actuelle */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Situation actuelle</h3>
              <div className="grid lg:grid-cols-4 gap-6">
                <div>
                  <Label htmlFor="currentHomeValue" className="block text-lg font-medium text-slate-900 mb-3">
                    Valeur actuelle de la maison
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="currentHomeValue"
                      type="number"
                      value={currentHomeValue === 0 ? '' : currentHomeValue}
                      onChange={(e) => setCurrentHomeValue(Number(e.target.value) || 0)}
                      step={25000}
                      className="text-lg pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentMortgageBalance" className="block text-lg font-medium text-slate-900 mb-3">
                    Solde hypothécaire actuel
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="currentMortgageBalance"
                      type="number"
                      value={currentMortgageBalance === 0 ? '' : currentMortgageBalance}
                      onChange={(e) => setCurrentMortgageBalance(Number(e.target.value) || 0)}
                      step={5000}
                      className="text-lg pl-8"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentInterestRate" className="block text-lg font-medium text-slate-900 mb-3">
                    Taux d'intérêt actuel (%)
                  </Label>
                  <Input
                    id="currentInterestRate"
                    type="number"
                    value={currentInterestRate === 0 ? '' : currentInterestRate.toFixed(2)}
                    onChange={(e) => setCurrentInterestRate(Number(e.target.value) || 0)}
                    step={0.01}
                    min={0}
                    max={15}
                    className="text-lg"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label htmlFor="remainingAmortization" className="block text-lg font-medium text-slate-900 mb-3">
                    Amortissement restant (années)
                  </Label>
                  <Select value={remainingAmortization.toString()} onValueChange={(value) => setRemainingAmortization(Number(value))}>
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
              </div>

              {/* Case à cocher pour la marge existante */}
              <div className="mt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="hasExistingCreditLine" 
                    checked={hasExistingCreditLine}
                    onCheckedChange={(checked) => setHasExistingCreditLine(checked === true)}
                  />
                  <Label htmlFor="hasExistingCreditLine" className="text-lg font-medium text-slate-900">
                    J'ai déjà une marge de crédit hypothécaire
                  </Label>
                </div>
              </div>

              {/* RPV actuel et marges disponibles */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-100 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-slate-900">RPV actuel :</span>
                    <span className={`text-2xl ${getCurrentLtvClass(currentLTV)}`}>
                      {currentLTV.toFixed(2)}%
                    </span>
                  </div>
                </div>
                
                {hasExistingCreditLine && currentLTV <= 65 && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="text-sm font-semibold text-green-800 mb-1">Montant disponible dans la marge</div>
                    <div className="text-xl font-bold text-green-700">
                      {formatCurrency(maxOpenCreditLine)}
                    </div>
                  </div>
                )}
                
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="text-sm font-semibold text-blue-800 mb-1">
                    {hasExistingCreditLine && currentLTV <= 65 ? 'Refinancement maximal' : 
                     hasExistingCreditLine && currentLTV <= 80 ? 'Refinancement maximal / Prêt lié max.' : 
                     'Refinancement maximal'}
                  </div>
                  <div className="text-xl font-bold text-blue-700">
                    {formatCurrency(maxRefinancing)}
                  </div>
                </div>
              </div>
            </div>

            {/* Options de refinancement */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Options de refinancement</h3>
              <div className="grid lg:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="refinancingAmount" className="block text-lg font-medium text-slate-900 mb-3">
                    Montant de refinancement souhaité
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                    <Input
                      id="refinancingAmount"
                      type="number"
                      value={refinancingAmount === 0 ? '' : refinancingAmount}
                      onChange={(e) => setRefinancingAmount(Number(e.target.value) || 0)}
                      step={5000}
                      max={maxRefinancing}
                      className="text-lg pl-8"
                      placeholder="0"
                    />
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    Maximum : {formatCurrency(maxRefinancing)}
                  </p>
                </div>

                <div>
                  <Label htmlFor="newInterestRate" className="block text-lg font-medium text-slate-900 mb-3">
                    Nouveau taux d'intérêt (%)
                  </Label>
                  <Input
                    id="newInterestRate"
                    type="number"
                    value={newInterestRate === 0 ? '' : newInterestRate.toFixed(2)}
                    onChange={(e) => setNewInterestRate(Number(e.target.value) || 0)}
                    step={0.01}
                    min={0}
                    max={15}
                    className="text-lg"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <Label className="block text-lg font-medium text-slate-900 mb-3">
                    Nouvel amortissement
                  </Label>
                  <Select value={newAmortization.toString()} onValueChange={(value) => setNewAmortization(Number(value))}>
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
              </div>

              <div className="mt-6">
                <MortgageSlider
                  label="Appréciation annuelle de la propriété"
                  value={appreciationRate}
                  onValueChange={setAppreciationRate}
                  min={0}
                  max={10}
                  step={0.5}
                  formatValue={(value) => `${value.toFixed(1)}%`}
                />
              </div>

              {/* Comparaison des paiements */}
              <div className="mt-6 grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="font-semibold text-blue-800 mb-2">Paiement mensuel actuel</div>
                  <p className="text-2xl font-bold text-blue-900">{formatCurrency(currentMonthlyPayment)}</p>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="font-semibold text-green-800 mb-2">Nouveau paiement mensuel</div>
                  <p className="text-2xl font-bold text-green-900">{formatCurrency(newMonthlyPayment)}</p>
                </div>
                <div className={`border rounded-lg p-4 ${monthlyDifference >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className={`font-semibold mb-2 ${monthlyDifference >= 0 ? 'text-green-800' : 'text-red-800'}`}>
                    {monthlyDifference >= 0 ? 'Économie mensuelle' : 'Augmentation mensuelle'}
                  </div>
                  <p className={`text-2xl font-bold ${monthlyDifference >= 0 ? 'text-green-900' : 'text-red-900'}`}>
                    {formatCurrency(Math.abs(monthlyDifference))}
                  </p>
                </div>
              </div>

              {(refinancingAmount > 0 || newAmortization !== remainingAmortization) && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-blue-900">Nouveau RPV après refinancement :</span>
                    <span className={`text-2xl font-bold ${getCurrentLtvClass(newLTV)}`}>
                      {newLTV.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-medium text-blue-900">Montant total du nouveau prêt :</span>
                    <span className="text-xl font-semibold text-blue-800">
                      {formatCurrency(totalNewMortgage)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Tableau de projection */}
            <div className="overflow-x-auto">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Projection future</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Année</TableHead>
                    <TableHead>Solde hypothécaire</TableHead>
                    <TableHead>Valeur de la maison</TableHead>
                    <TableHead>Équité</TableHead>
                    <TableHead>RPV (%)</TableHead>
                    <TableHead>Montant disponible dans la marge</TableHead>
                    <TableHead>Refinancement maximal</TableHead>
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
                        {hasExistingCreditLine && row.ltv <= 65 && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded whitespace-nowrap">
                            Marge ouverte
                          </span>
                        )}
                        {hasExistingCreditLine && row.ltv > 65 && row.ltv <= 80 && (
                          <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded whitespace-nowrap">
                            Prêt lié
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{formatCurrency(row.maxOpenCreditLine)}</TableCell>
                      <TableCell>{formatCurrency(row.maxRefinancing)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="font-semibold text-green-800 mb-2">RPV ≤ 65%</div>
                <p className="text-green-700">
                  {hasExistingCreditLine ? 
                    "Accès à une marge de crédit hypothécaire ouverte" : 
                    "Refinancement jusqu'à 65% de la valeur"}
                </p>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="font-semibold text-yellow-800 mb-2">65% &lt; RPV ≤ 80%</div>
                <p className="text-yellow-700">
                  {hasExistingCreditLine ? 
                    "Accès à un prêt lié dans la marge" : 
                    "Refinancement jusqu'à 80% de la valeur"}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="font-semibold text-blue-800 mb-2">Refinancement</div>
                <p className="text-blue-700">Montant maximum disponible pour refinancement à 80% de la valeur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LtvCalculator;
