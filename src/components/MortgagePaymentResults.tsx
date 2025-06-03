
import React from "react";
import { MortgagePaymentResult } from "@/utils/mortgagePaymentCalculations";

interface MortgagePaymentResultsProps {
  results: MortgagePaymentResult;
  term: number;
  amortization: number;
  paymentFrequency: string;
}

const MortgagePaymentResults = ({ results, term, amortization, paymentFrequency }: MortgagePaymentResultsProps) => {
  const getPaymentFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'monthly': return 'mensuel';
      case 'biweekly': return 'aux deux semaines';
      case 'biweekly-accelerated': return 'aux deux semaines (accéléré)';
      case 'weekly': return 'hebdomadaire';
      default: return 'mensuel';
    }
  };

  const formatAmortization = (years: number) => {
    const wholeYears = Math.floor(years);
    const remainingMonths = Math.round((years - wholeYears) * 12);
    
    if (remainingMonths === 0) {
      return `${wholeYears} ${wholeYears === 1 ? 'an' : 'ans'}`;
    }
    
    return `${wholeYears} ${wholeYears === 1 ? 'an' : 'ans'} et ${remainingMonths} mois`;
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Résultats du calcul
      </h3>
      
      <div className="space-y-4">
        <div className="bg-primary text-white p-6 rounded-xl">
          <div className="text-sm font-medium mb-2 opacity-90">
            Paiement {getPaymentFrequencyText(paymentFrequency)}
          </div>
          <div className="text-3xl font-bold">
            {results.regularPayment.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </div>
        </div>

        <div className="bg-slate-100 p-6 rounded-xl">
          <div className="text-sm font-medium text-slate-600 mb-2">
            Montant total financé
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {results.mortgageAmount.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-700 mb-1">
              Coût total pendant le terme
            </div>
            <div className="text-lg font-bold text-blue-900">
              {results.termResults.totalPayments.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </div>
            <div className="text-xs text-blue-600 mt-1">
              Terme de {term} {term === 1 ? 'an' : 'ans'}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="text-sm font-medium text-green-700 mb-1">
              Coût total sur l'amortissement complet
            </div>
            <div className="text-lg font-bold text-green-900">
              {results.amortizationResults.totalPayments.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </div>
            <div className="text-xs text-green-600 mt-1">
              Amortissement de {formatAmortization(amortization)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="text-sm font-medium text-orange-700 mb-1">
              Intérêts pendant le terme
            </div>
            <div className="text-lg font-bold text-orange-900">
              {results.termResults.totalInterest.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <div className="text-sm font-medium text-purple-700 mb-1">
              Intérêts sur l'amortissement complet
            </div>
            <div className="text-lg font-bold text-purple-900">
              {results.amortizationResults.totalInterest.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgagePaymentResults;
