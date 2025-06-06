import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

interface BorrowingCapacityFormProps {
  annualIncome: number;
  setAnnualIncome: (value: number) => void;
  downPayment: number;
  setDownPayment: (value: number) => void;
  amortization: number;
  setAmortization: (value: number) => void;
  interestRate: number[];
  setInterestRate: (value: number[]) => void;
  monthlyDebts: number;
  setMonthlyDebts: (value: number) => void;
  heatingCosts: number;
  setHeatingCosts: (value: number) => void;
  propertyTaxes: number;
  setPropertyTaxes: (value: number) => void;
  condoFees: number;
  setCondoFees: (value: number) => void;
}

const BorrowingCapacityForm = ({
  annualIncome,
  setAnnualIncome,
  downPayment,
  setDownPayment,
  amortization,
  setAmortization,
  interestRate,
  setInterestRate,
  monthlyDebts,
  setMonthlyDebts,
  heatingCosts,
  setHeatingCosts,
  propertyTaxes,
  setPropertyTaxes,
  condoFees,
  setCondoFees
}: BorrowingCapacityFormProps) => {
  const handleInputFocus = (value: number, setValue: (val: number) => void) => {
    if (value === 0) {
      setValue(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: (val: number) => void) => {
    const value = e.target.value;
    if (value === '') {
      setValue(0);
    } else {
      setValue(Number(value));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="annualIncome" className="flex items-center gap-2 text-base md:text-lg font-medium text-slate-900 mb-2">
          Revenu brut annuel
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" className="focus:outline-none">
                <Info className="w-4 h-4 text-slate-500 cursor-help" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-white border shadow-lg z-[70]" side="top">
              <div className="space-y-2">
                <p className="text-sm">
                  En présence de deux coemprunteurs ou plus, additionner le revenu brut total de tous les coemprunteurs.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
          <Input
            id="annualIncome"
            type="number"
            value={annualIncome === 0 ? '' : annualIncome}
            onFocus={() => handleInputFocus(annualIncome, setAnnualIncome)}
            onChange={(e) => handleInputChange(e, setAnnualIncome)}
            className="text-base md:text-lg pl-8"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="downPayment" className="block text-base md:text-lg font-medium text-slate-900 mb-2">
          Mise de fonds
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
          <Input
            id="downPayment"
            type="number"
            value={downPayment === 0 ? '' : downPayment}
            onFocus={() => handleInputFocus(downPayment, setDownPayment)}
            onChange={(e) => handleInputChange(e, setDownPayment)}
            className="text-base md:text-lg pl-8"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="amortization" className="block text-base md:text-lg font-medium text-slate-900 mb-2">
          Période d'amortissement (années)
        </Label>
        <Select value={amortization.toString()} onValueChange={(value) => setAmortization(Number(value))}>
          <SelectTrigger className="text-base md:text-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="20">20 ans</SelectItem>
            <SelectItem value="25">25 ans</SelectItem>
            <SelectItem value="30">30 ans</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="flex items-center gap-2 text-base md:text-lg font-medium text-slate-900 mb-4">
          Taux de qualification
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" className="focus:outline-none">
                <Info className="w-4 h-4 text-slate-500 cursor-help" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-white border shadow-lg z-[70]" side="top">
              <div className="space-y-2">
                <p className="text-sm">
                  Le taux de qualification (aussi appelé stress test) est un taux d'intérêt utilisé pour déterminer si vous êtes en mesure d'assumer un prêt hypothécaire même si les taux augmentent ou que votre situation financière change.
                </p>
                <p className="text-sm font-medium">
                  Il s'agit du plus élevé entre le taux de référence en vigueur actuellement et le taux contractuel majoré de 2%.
                </p>
              </div>
            </PopoverContent>
          </Popover>
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
            <span className="text-lg md:text-xl font-semibold text-slate-700">
              {interestRate[0].toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="monthlyDebts" className="flex items-center gap-2 text-base md:text-lg font-medium text-slate-900 mb-2">
          Dettes mensuelles
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" className="focus:outline-none">
                <Info className="w-4 h-4 text-slate-500 cursor-help" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-white border shadow-lg z-[70]" side="top">
              <div className="space-y-2">
                <p className="text-sm">
                  Le total de vos paiements ou remboursements mensuels actuels pour vos cartes de crédit, vos prêts personnels, vos prêts auto (ou frais de location d'auto) et vos marges de crédit.
                </p>
                <p className="text-sm">
                  Pour les cartes et marges de crédit, entrez le total des versements mensuels moyens que vous effectuez habituellement.
                </p>
                <p className="text-sm font-medium">
                  Ces engagements excluent votre loyer actuel ou le versement mensuel du prêt hypothécaire de votre résidence actuelle.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
          <Input
            id="monthlyDebts"
            type="number"
            value={monthlyDebts === 0 ? '' : monthlyDebts}
            onFocus={() => handleInputFocus(monthlyDebts, setMonthlyDebts)}
            onChange={(e) => handleInputChange(e, setMonthlyDebts)}
            className="text-base md:text-lg pl-8"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="heatingCosts" className="block text-base md:text-lg font-medium text-slate-900 mb-2">
          Coût de chauffage mensuel
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
          <Input
            id="heatingCosts"
            type="number"
            value={heatingCosts === 0 ? '' : heatingCosts}
            onFocus={() => handleInputFocus(heatingCosts, setHeatingCosts)}
            onChange={(e) => handleInputChange(e, setHeatingCosts)}
            className="text-base md:text-lg pl-8"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="propertyTaxes" className="block text-base md:text-lg font-medium text-slate-900 mb-2">
          Taxes résidentielles annuelles
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
          <Input
            id="propertyTaxes"
            type="number"
            value={propertyTaxes === 0 ? '' : propertyTaxes}
            onFocus={() => handleInputFocus(propertyTaxes, setPropertyTaxes)}
            onChange={(e) => handleInputChange(e, setPropertyTaxes)}
            className="text-base md:text-lg pl-8"
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="condoFees" className="flex items-center gap-2 text-base md:text-lg font-medium text-slate-900 mb-2">
          Frais de copropriété mensuels (si applicable)
          <Popover>
            <PopoverTrigger asChild>
              <button type="button" className="focus:outline-none">
                <Info className="w-4 h-4 text-slate-500 cursor-help" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-white border shadow-lg z-[70]" side="top">
              <div className="space-y-2">
                <p className="text-sm">
                  Les ratios ABD et ATD incluent la moitié de ces frais dans le calcul.
                </p>
                <p className="text-sm font-medium">
                  Entrez 0 si la propriété n'est pas en copropriété.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
          <Input
            id="condoFees"
            type="number"
            value={condoFees === 0 ? '' : condoFees}
            onFocus={() => handleInputFocus(condoFees, setCondoFees)}
            onChange={(e) => handleInputChange(e, setCondoFees)}
            className="text-base md:text-lg pl-8"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default BorrowingCapacityForm;
