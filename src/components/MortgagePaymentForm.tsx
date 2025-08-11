
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MortgagePaymentFormProps {
  purchasePrice: number;
  setPurchasePrice: (value: number) => void;
  downPayment: number;
  setDownPayment: (value: number) => void;
  downPaymentType: 'amount' | 'percentage';
  setDownPaymentType: (value: 'amount' | 'percentage') => void;
  downPaymentPercentage: number;
  setDownPaymentPercentage: (value: number) => void;
  amortizationYears: number;
  setAmortizationYears: (value: number) => void;
  amortizationMonths: number;
  setAmortizationMonths: (value: number) => void;
  term: number;
  setTerm: (value: number) => void;
  interestRate: number[];
  setInterestRate: (value: number[]) => void;
  paymentFrequency: string;
  setPaymentFrequency: (value: string) => void;
  extraPayment?: number;
  setExtraPayment?: (value: number) => void;
  extraPaymentFrequency?: string;
  setExtraPaymentFrequency?: (value: string) => void;
  extraPaymentStartYear?: number;
  setExtraPaymentStartYear?: (value: number) => void;
}

const MortgagePaymentForm = ({
  purchasePrice,
  setPurchasePrice,
  downPayment,
  setDownPayment,
  downPaymentType,
  setDownPaymentType,
  downPaymentPercentage,
  setDownPaymentPercentage,
  amortizationYears,
  setAmortizationYears,
  amortizationMonths,
  setAmortizationMonths,
  term,
  setTerm,
  interestRate,
  setInterestRate,
  paymentFrequency,
  setPaymentFrequency,
  extraPayment = 0,
  setExtraPayment,
  extraPaymentFrequency = 'monthly',
  setExtraPaymentFrequency,
  extraPaymentStartYear = 1,
  setExtraPaymentStartYear
}: MortgagePaymentFormProps) => {
  
  const handleDownPaymentTypeChange = (type: 'amount' | 'percentage') => {
    setDownPaymentType(type);
    if (type === 'percentage') {
      setDownPayment(purchasePrice * (downPaymentPercentage / 100));
    }
  };

  const handleDownPaymentPercentageChange = (percentage: number) => {
    setDownPaymentPercentage(percentage);
    setDownPayment(purchasePrice * (percentage / 100));
  };

  const handleDownPaymentAmountChange = (amount: number) => {
    setDownPayment(amount);
    setDownPaymentPercentage((amount / purchasePrice) * 100);
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setInterestRate([0]);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setInterestRate([numValue]);
      }
    }
  };

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

  const handleDownPaymentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      handleDownPaymentAmountChange(0);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        handleDownPaymentAmountChange(numValue);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="purchasePrice" className="block text-lg font-medium text-slate-900 mb-2">
          Prix d'achat
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
          <Input
            id="purchasePrice"
            type="number"
            value={purchasePrice === 0 ? '' : purchasePrice}
            onChange={handlePurchasePriceChange}
            step={25000}
            className="text-lg pl-8"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <Label className="block text-lg font-medium text-slate-900 mb-3">
          Mise de fonds
        </Label>
        <RadioGroup
          value={downPaymentType}
          onValueChange={handleDownPaymentTypeChange}
          className="mb-3"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="amount" id="amount" />
            <Label htmlFor="amount">Montant ($)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="percentage" id="percentage" />
            <Label htmlFor="percentage">Pourcentage (%)</Label>
          </div>
        </RadioGroup>
        
        {downPaymentType === 'amount' ? (
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
            <Input
              type="number"
              value={downPayment === 0 ? '' : downPayment}
              onChange={handleDownPaymentInputChange}
              step={5000}
              className="text-lg pl-8"
              placeholder="0"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="relative">
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">%</span>
              <Input
                type="number"
                value={downPaymentPercentage === 0 ? '' : downPaymentPercentage}
                onChange={(e) => handleDownPaymentPercentageChange(Number(e.target.value))}
                className="text-lg pr-8"
                min="5"
                max="100"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            <p className="text-sm text-slate-600">
              Montant: {downPayment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })} ({downPaymentPercentage.toFixed(2)}%)
            </p>
          </div>
        )}
      </div>

      <div>
        <Label className="block text-lg font-medium text-slate-900 mb-2">
          Période d'amortissement
        </Label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="amortizationYears" className="block text-sm text-slate-600 mb-1">
              Années
            </Label>
            <Select value={amortizationYears.toString()} onValueChange={(value) => setAmortizationYears(Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: 31}, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>{i} an{i !== 1 ? 's' : ''}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="amortizationMonths" className="block text-sm text-slate-600 mb-1">
              Mois
            </Label>
            <Select value={amortizationMonths.toString()} onValueChange={(value) => setAmortizationMonths(Number(value))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({length: 12}, (_, i) => (
                  <SelectItem key={i} value={i.toString()}>{i} mois</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="term" className="block text-lg font-medium text-slate-900 mb-2">
          Terme (années)
        </Label>
        <Select value={term.toString()} onValueChange={(value) => setTerm(Number(value))}>
          <SelectTrigger className="text-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 an</SelectItem>
            <SelectItem value="2">2 ans</SelectItem>
            <SelectItem value="3">3 ans</SelectItem>
            <SelectItem value="4">4 ans</SelectItem>
            <SelectItem value="5">5 ans</SelectItem>
            <SelectItem value="6">6 ans</SelectItem>
            <SelectItem value="7">7 ans</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="interestRate" className="block text-lg font-medium text-slate-900 mb-2">
          Taux d'intérêt (%)
        </Label>
        <Input
          id="interestRate"
          type="number"
          value={interestRate[0] === 0 ? '' : interestRate[0]}
          onChange={handleInterestRateChange}
          step={0.01}
          min={0}
          max={10}
          className="text-lg"
          placeholder="0.00"
        />
      </div>

      <div>
        <Label htmlFor="paymentFrequency" className="block text-lg font-medium text-slate-900 mb-2">
          Fréquence des paiements
        </Label>
        <Select value={paymentFrequency} onValueChange={setPaymentFrequency}>
          <SelectTrigger className="text-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Mensuel</SelectItem>
            <SelectItem value="biweekly-accelerated">Aux deux semaines (accéléré)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Extra Payment Section */}
      {setExtraPayment && setExtraPaymentFrequency && setExtraPaymentStartYear && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Remboursements anticipés (optionnel)
          </h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="extraPayment" className="block text-sm font-medium text-slate-700 mb-2">
                Montant du remboursement anticipé
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
                    <SelectItem value="one-time">Une seule fois</SelectItem>
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
      )}
    </div>
  );
};

export default MortgagePaymentForm;
