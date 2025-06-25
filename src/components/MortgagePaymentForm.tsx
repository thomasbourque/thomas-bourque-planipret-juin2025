
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
  setPaymentFrequency
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
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setInterestRate([value]);
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
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            step={25000}
            className="text-lg pl-8"
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
              value={downPayment}
              onChange={(e) => handleDownPaymentAmountChange(Number(e.target.value))}
              step={5000}
              className="text-lg pl-8"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="relative">
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500">%</span>
              <Input
                type="number"
                value={downPaymentPercentage}
                onChange={(e) => handleDownPaymentPercentageChange(Number(e.target.value))}
                className="text-lg pr-8"
                min="5"
                max="100"
              />
            </div>
            <p className="text-sm text-slate-600">
              Montant: {downPayment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
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
          value={interestRate[0].toFixed(2)}
          onChange={handleInterestRateChange}
          step={0.01}
          min={2}
          max={10}
          className="text-lg"
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
    </div>
  );
};

export default MortgagePaymentForm;
