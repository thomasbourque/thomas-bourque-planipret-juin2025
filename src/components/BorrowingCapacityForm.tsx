
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
  coborrowersIncome: number;
  setCoborrowersIncome: (value: number) => void;
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
  coborrowersIncome,
  setCoborrowersIncome,
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
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="annualIncome" className="block text-base md:text-lg font-medium text-slate-900 mb-2">
          Revenu brut annuel
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
          <Input
            id="annualIncome"
            type="number"
            value={annualIncome}
            onChange={(e) => setAnnualIncome(Number(e.target.value))}
            className="text-base md:text-lg pl-8"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="coborrowersIncome" className="block text-base md:text-lg font-medium text-slate-900 mb-2">
          Revenu brut annuel des coemprunteurs (optionnel)
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
          <Input
            id="coborrowersIncome"
            type="number"
            value={coborrowersIncome}
            onChange={(e) => setCoborrowersIncome(Number(e.target.value))}
            className="text-base md:text-lg pl-8"
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
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="text-base md:text-lg pl-8"
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
              <Info className="w-4 h-4 text-slate-500 cursor-help" />
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
              <Info className="w-4 h-4 text-slate-500 cursor-help" />
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
            value={monthlyDebts}
            onChange={(e) => setMonthlyDebts(Number(e.target.value))}
            className="text-base md:text-lg pl-8"
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
            value={heatingCosts}
            onChange={(e) => setHeatingCosts(Number(e.target.value))}
            className="text-base md:text-lg pl-8"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="propertyTaxes" className="flex items-center gap-2 text-base md:text-lg font-medium text-slate-900 mb-2">
          Taxes résidentielles mensuelles
          <Popover>
            <PopoverTrigger asChild>
              <Info className="w-4 h-4 text-slate-500 cursor-help" />
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 bg-white border shadow-lg z-[70]" side="top">
              <div className="space-y-2">
                <p className="text-sm">
                  Valeur par défaut : 1% du prix d'achat annuellement, divisé par 12 mois.
                </p>
                <p className="text-sm font-medium">
                  Vous pouvez ajuster cette valeur selon les taxes réelles de votre municipalité.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
          <Input
            id="propertyTaxes"
            type="number"
            value={propertyTaxes}
            onChange={(e) => setPropertyTaxes(Number(e.target.value))}
            className="text-base md:text-lg pl-8"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="condoFees" className="flex items-center gap-2 text-base md:text-lg font-medium text-slate-900 mb-2">
          Frais de copropriété mensuels (si applicable)
          <Popover>
            <PopoverTrigger asChild>
              <Info className="w-4 h-4 text-slate-500 cursor-help" />
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
            value={condoFees}
            onChange={(e) => setCondoFees(Number(e.target.value))}
            className="text-base md:text-lg pl-8"
          />
        </div>
      </div>
    </div>
  );
};

export default BorrowingCapacityForm;
