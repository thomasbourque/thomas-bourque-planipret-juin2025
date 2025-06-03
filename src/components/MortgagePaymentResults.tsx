
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

  const getPaymentsPerYear = (frequency: string) => {
    switch (frequency) {
      case 'monthly': return 12;
      case 'biweekly': return 26;
      case 'biweekly-accelerated': return 26;
      case 'weekly': return 52;
      default: return 12;
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

  const paymentsPerYear = getPaymentsPerYear(paymentFrequency);
  const totalTermPayments = term * paymentsPerYear;
  const totalAmortizationPayments = amortization * paymentsPerYear;

  return (
    <div className="space-y-3 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
        Résultats du calcul
      </h3>
      
      <div className="space-y-3 w-full max-w-4xl">
        {/* Paiement principal */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-lg border text-white text-center">
          <div className="text-sm font-medium mb-1">
            Paiement {getPaymentFrequencyText(paymentFrequency)}
          </div>
          <div className="text-xl font-bold">
            {results.regularPayment.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </div>
        </div>

        {/* Montant total financé */}
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-3 rounded-lg text-white text-center">
          <div className="text-sm font-medium mb-1">
            Montant total financé
          </div>
          <div className="text-xl font-bold">
            {results.mortgageAmount.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </div>
        </div>

        {/* Encadré pour la durée du terme - style discret */}
        <div className="bg-white border border-slate-300 p-3 rounded-lg shadow-sm">
          <h4 className="text-md font-semibold text-slate-700 mb-2 text-center">
            Pendant le terme de {term} {term === 1 ? 'an' : 'ans'}
          </h4>
          
          <div className="space-y-2">
            {/* Première ligne: Nombre de versements et Solde */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2.5 rounded-lg text-white text-center">
                <div className="text-xs font-medium mb-1">
                  Nombre de versements
                </div>
                <div className="text-md font-bold">
                  {totalTermPayments}
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-2.5 rounded-lg text-white text-center">
                <div className="text-xs font-medium mb-1">
                  Solde à la fin du terme
                </div>
                <div className="text-md font-bold">
                  {results.termResults.remainingBalance.toLocaleString('fr-CA', { 
                    style: 'currency', 
                    currency: 'CAD',
                    minimumFractionDigits: 0 
                  })}
                </div>
              </div>
            </div>

            {/* Deuxième ligne: Capital payé et Intérêts payés */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-2.5 rounded-lg text-white text-center">
                <div className="text-xs font-medium mb-1">
                  Capital payé
                </div>
                <div className="text-md font-bold">
                  {results.termResults.totalPrincipal.toLocaleString('fr-CA', { 
                    style: 'currency', 
                    currency: 'CAD',
                    minimumFractionDigits: 0 
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-2.5 rounded-lg text-white text-center">
                <div className="text-xs font-medium mb-1">
                  Intérêts payés
                </div>
                <div className="text-md font-bold">
                  {results.termResults.totalInterest.toLocaleString('fr-CA', { 
                    style: 'currency', 
                    currency: 'CAD',
                    minimumFractionDigits: 0 
                  })}
                </div>
              </div>
            </div>

            {/* Troisième ligne: Coût total en évidence */}
            <div className="bg-slate-100 border border-slate-300 p-2.5 rounded-lg text-slate-700 text-center">
              <div className="text-xs font-medium mb-1">
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

        {/* Encadré pour la durée totale de l'amortissement - style discret */}
        <div className="bg-white border border-slate-300 p-3 rounded-lg shadow-sm">
          <h4 className="text-md font-semibold text-slate-700 mb-2 text-center">
            Pendant l'amortissement complet de {formatAmortization(amortization)}
          </h4>
          
          <div className="space-y-2">
            {/* Première ligne: Nombre de versements et Solde */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2.5 rounded-lg text-white text-center">
                <div className="text-xs font-medium mb-1">
                  Nombre de versements
                </div>
                <div className="text-md font-bold">
                  {Math.round(totalAmortizationPayments)}
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-2.5 rounded-lg text-white text-center">
                <div className="text-xs font-medium mb-1">
                  Solde à la fin de l'amortissement
                </div>
                <div className="text-md font-bold">
                  0 $
                </div>
              </div>
            </div>

            {/* Deuxième ligne: Capital payé et Intérêts payés */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gradient-to-r from-blue-700 to-blue-800 p-2.5 rounded-lg text-white text-center">
                <div className="text-xs font-medium mb-1">
                  Capital payé
                </div>
                <div className="text-md font-bold">
                  {results.amortizationResults.totalPrincipal.toLocaleString('fr-CA', { 
                    style: 'currency', 
                    currency: 'CAD',
                    minimumFractionDigits: 0 
                  })}
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-2.5 rounded-lg text-white text-center">
                <div className="text-xs font-medium mb-1">
                  Intérêts payés
                </div>
                <div className="text-md font-bold">
                  {results.amortizationResults.totalInterest.toLocaleString('fr-CA', { 
                    style: 'currency', 
                    currency: 'CAD',
                    minimumFractionDigits: 0 
                  })}
                </div>
              </div>
            </div>

            {/* Troisième ligne: Coût total en évidence */}
            <div className="bg-slate-100 border border-slate-300 p-2.5 rounded-lg text-slate-700 text-center">
              <div className="text-xs font-medium mb-1">
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
