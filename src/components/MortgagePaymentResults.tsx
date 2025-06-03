
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
      
      <div className="space-y-6">
        {/* Paiement principal */}
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-xl border text-slate-900">
          <div className="text-sm font-medium mb-2">
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

        {/* Montant total financé */}
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

        {/* Encadré pour la durée du terme */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
          <h4 className="text-lg font-semibold text-blue-900 mb-4 text-center">
            Pendant le terme de {term} {term === 1 ? 'an' : 'ans'}
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 p-4 rounded-lg text-white text-center">
              <div className="text-sm font-medium mb-1">
                Solde à la fin du terme
              </div>
              <div className="text-lg font-bold">
                {results.termResults.remainingBalance.toLocaleString('fr-CA', { 
                  style: 'currency', 
                  currency: 'CAD',
                  minimumFractionDigits: 0 
                })}
              </div>
            </div>

            <div className="bg-yellow-500 p-4 rounded-lg text-slate-900 text-center">
              <div className="text-sm font-medium mb-1">
                Intérêts payés
              </div>
              <div className="text-lg font-bold">
                {results.termResults.totalInterest.toLocaleString('fr-CA', { 
                  style: 'currency', 
                  currency: 'CAD',
                  minimumFractionDigits: 0 
                })}
              </div>
            </div>

            <div className="bg-blue-600 p-4 rounded-lg text-white text-center">
              <div className="text-sm font-medium mb-1">
                Capital payé
              </div>
              <div className="text-lg font-bold">
                {results.termResults.totalPrincipal.toLocaleString('fr-CA', { 
                  style: 'currency', 
                  currency: 'CAD',
                  minimumFractionDigits: 0 
                })}
              </div>
            </div>

            <div className="bg-yellow-600 p-4 rounded-lg text-white text-center">
              <div className="text-sm font-medium mb-1">
                Coût total durant le terme
              </div>
              <div className="text-lg font-bold">
                {results.termResults.totalPayments.toLocaleString('fr-CA', { 
                  style: 'currency', 
                  currency: 'CAD',
                  minimumFractionDigits: 0 
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Encadré pour la durée totale de l'amortissement */}
        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
          <h4 className="text-lg font-semibold text-yellow-900 mb-4 text-center">
            Pendant l'amortissement complet de {formatAmortization(amortization)}
          </h4>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-500 p-4 rounded-lg text-white text-center">
              <div className="text-sm font-medium mb-1">
                Intérêts payés
              </div>
              <div className="text-lg font-bold">
                {results.amortizationResults.totalInterest.toLocaleString('fr-CA', { 
                  style: 'currency', 
                  currency: 'CAD',
                  minimumFractionDigits: 0 
                })}
              </div>
            </div>

            <div className="bg-yellow-600 p-4 rounded-lg text-white text-center">
              <div className="text-sm font-medium mb-1">
                Coût total de l'amortissement
              </div>
              <div className="text-lg font-bold">
                {results.amortizationResults.totalPayments.toLocaleString('fr-CA', { 
                  style: 'currency', 
                  currency: 'CAD',
                  minimumFractionDigits: 0 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgagePaymentResults;
