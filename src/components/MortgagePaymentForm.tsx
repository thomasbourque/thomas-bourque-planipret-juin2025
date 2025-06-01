
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MortgagePaymentFormProps {
  purchasePrice: number;
  setPurchasePrice: (value: number) => void;
  downPayment: number;
  setDownPayment: (value: number) => void;
  amortization: number;
  setAmortization: (value: number) => void;
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
  amortization,
  setAmortization,
  term,
  setTerm,
  interestRate,
  setInterestRate,
  paymentFrequency,
  setPaymentFrequency
}: MortgagePaymentFormProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="purchasePrice" className="block text-lg font-medium text-slate-900 mb-2">
          Prix d'achat
        </Label>
        <Input
          id="purchasePrice"
          type="number"
          value={purchasePrice}
          onChange={(e) => setPurchasePrice(Number(e.target.value))}
          className="text-lg"
        />
      </div>

      <div>
        <Label htmlFor="downPayment" className="block text-lg font-medium text-slate-900 mb-2">
          Mise de fonds
        </Label>
        <Input
          id="downPayment"
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          className="text-lg"
        />
      </div>

      <div>
        <Label htmlFor="amortization" className="block text-lg font-medium text-slate-900 mb-2">
          Période d'amortissement (années)
        </Label>
        <Select value={amortization.toString()} onValueChange={(value) => setAmortization(Number(value))}>
          <SelectTrigger className="text-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="15">15 ans</SelectItem>
            <SelectItem value="20">20 ans</SelectItem>
            <SelectItem value="25">25 ans</SelectItem>
            <SelectItem value="30">30 ans</SelectItem>
          </SelectContent>
        </Select>
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
        <Label className="block text-lg font-medium text-slate-900 mb-4">
          Taux d'intérêt
        </Label>
        <div className="space-y-4">
          <Slider
            value={interestRate}
            onValueChange={setInterestRate}
            max={10}
            min={2}
            step={0.05}
            className="w-full"
          />
          <div className="text-center">
            <span className="text-xl font-semibold text-slate-700">
              {interestRate[0].toFixed(2)}%
            </span>
          </div>
        </div>
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
            <SelectItem value="biweekly">Aux deux semaines</SelectItem>
            <SelectItem value="weekly">Hebdomadaire</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default MortgagePaymentForm;
