
import React from "react";
import { BorrowingCapacityResult } from "@/utils/borrowingCapacityCalculations";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Info } from "lucide-react";

interface BorrowingCapacityResultsProps {
  results: BorrowingCapacityResult;
}

const BorrowingCapacityResults = ({ results }: BorrowingCapacityResultsProps) => {
  return (
    <div className="flex flex-col justify-center space-y-6">
      {/* Prix d'achat maximal - Encadré principal en évidence */}
      <div className="text-center p-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg border border-yellow-500 shadow-lg">
        <p className="text-sm text-slate-800 mb-2 font-medium">
          Prix d'achat maximal
        </p>
        <p className="text-3xl font-bold text-slate-800">
          {results.maxPurchasePrice.toLocaleString('fr-CA', { 
            style: 'currency', 
            currency: 'CAD', 
            minimumFractionDigits: 0 
          })}
        </p>
        {(results.isConstrainedByDownPayment || results.isConstrainedByMinimumDownPayment) && (
          <p className="text-xs text-slate-700 mt-2">
            Limité par la règle de mise de fonds minimale
          </p>
        )}
      </div>

      {/* Capacité d'emprunt */}
      <div className="text-center p-6 bg-slate-800 rounded-lg border border-slate-700">
        <p className="text-sm text-white mb-2">
          Capacité d'emprunt maximale
        </p>
        <p className="text-2xl font-bold text-white">
          {results.maxBorrowingAmount.toLocaleString('fr-CA', { 
            style: 'currency', 
            currency: 'CAD', 
            minimumFractionDigits: 0 
          })}
        </p>
      </div>

      {/* Prime d'assurance hypothécaire (si applicable) */}
      {results.mortgageInsurancePremium > 0 && (
        <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-sm text-orange-700 mb-1">
            Prime d'assurance hypothécaire
          </p>
          <p className="text-lg font-bold text-orange-800">
            {results.mortgageInsurancePremium.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD', 
              minimumFractionDigits: 0 
            })} ({results.mortgageInsuranceRate.toFixed(1)}%)
          </p>
          <p className="text-xs text-orange-600 mt-1">
            Ratio prêt-valeur: {results.loanToValueRatio}%
          </p>
        </div>
      )}

      {/* Mise de fonds minimale requise (si contrainte) */}
      {results.isConstrainedByMinimumDownPayment && (
        <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-sm text-red-700 mb-1">
            Mise de fonds minimale requise
          </p>
          <p className="text-lg font-bold text-red-800">
            {results.minimumDownPaymentRequired.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD', 
              minimumFractionDigits: 0 
            })}
          </p>
          <p className="text-xs text-red-600 mt-1">
            5% sur les premiers 500 000$ + 10% sur l'excédent
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-4 bg-slate-100 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <p className="text-xs text-slate-600">Ratio ABD</p>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="w-3 h-3 text-slate-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-white border shadow-lg z-[70]" side="top">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Ratio ABD (Amortissement Brut de la Dette)</p>
                  <p className="text-sm">
                    Calcul : (Paiement hypothécaire + chauffage + taxes + 50% des frais de condo) ÷ revenu mensuel brut
                  </p>
                  <p className="text-sm font-medium">
                    Maximum accepté : 39%
                  </p>
                  <p className="text-sm">
                    Paiement disponible ABD: {results.abdAvailablePayment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className={`text-lg font-bold ${results.abdRatio > 39 ? 'text-red-600' : 'text-green-600'}`}>
            {results.abdRatio.toFixed(1)}%
          </p>
          <p className="text-xs text-slate-500">Max: 39%</p>
        </div>
        
        <div className="text-center p-4 bg-slate-100 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <p className="text-xs text-slate-600">Ratio ATD</p>
            <Popover>
              <PopoverTrigger asChild>
                <Info className="w-3 h-3 text-slate-500 cursor-help" />
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4 bg-white border shadow-lg z-[70]" side="top">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Ratio ATD (Amortissement Total de la Dette)</p>
                  <p className="text-sm">
                    Calcul : (Paiement hypothécaire + chauffage + taxes + 50% des frais de condo + dettes mensuelles) ÷ revenu mensuel brut
                  </p>
                  <p className="text-sm font-medium">
                    Maximum accepté : 44%
                  </p>
                  <p className="text-sm">
                    Paiement disponible ATD: {results.atdAvailablePayment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}
                  </p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <p className={`text-lg font-bold ${results.atdRatio > 44 ? 'text-red-600' : 'text-green-600'}`}>
            {results.atdRatio.toFixed(1)}%
          </p>
          <p className="text-xs text-slate-500">Max: 44%</p>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-2">Détails du calcul :</h4>
        <div className="text-sm text-slate-700 space-y-1">
          <p>Paiement hypothécaire mensuel : {results.monthlyPayment.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</p>
          <p>Charges de logement totales : {results.housingCosts.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</p>
          <p>Revenu mensuel brut : {results.monthlyIncome.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD' })}</p>
          {(results.isConstrainedByDownPayment || results.isConstrainedByMinimumDownPayment) && (
            <p className="text-orange-700 font-medium">
              Note: Le calcul est limité par la règle de mise de fonds minimale (5 % du premier 500 000$ et 10 % de l'excédent)
            </p>
          )}
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-sm text-slate-600 mb-4">
          Ces calculs sont basés sur les ratios d'endettement standards. Ces ratios varient d'un prêteur à l'autre. Il ne s'agit que d'une estimation à haut niveau pour vous donner une idée de votre capacité d'emprunt. Consultez-moi pour que l'on revoit vos calculs ensemble.
        </p>
        <a 
          href="https://calendly.com/tbourque-planipret" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
        >
          Discuter de votre projet
        </a>
      </div>
    </div>
  );
};

export default BorrowingCapacityResults;
