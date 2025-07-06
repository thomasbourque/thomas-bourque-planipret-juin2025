
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
    <div className="space-y-3 flex flex-col items-center">
      <h3 className="text-lg font-semibold text-slate-900 mb-2 text-center">
        Résultats du calcul
      </h3>
      
      <div className="space-y-3 w-full max-w-4xl">
        {/* Paiement principal - en couleur */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-3 rounded-lg border text-white text-center">
          <div className="text-sm font-medium mb-1">
            Paiement {getPaymentFrequencyText(paymentFrequency)}
          </div>
          <div className="text-xl font-bold">
            {results.regularPayment.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 2 
            })}
          </div>
        </div>

        {/* Montant total financé - style formulaire */}
        <div className="bg-slate-50 border border-slate-300 p-3 rounded-lg text-slate-700 text-center">
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

        {/* Encadré pour la durée du terme - style formulaire */}
        <div className="bg-slate-50 border border-slate-300 p-3 rounded-lg shadow-sm">
          <h4 className="text-md font-semibold text-slate-700 mb-2 text-center">
            Pendant le terme de {term} {term === 1 ? 'an' : 'ans'}
          </h4>
          
          <div className="space-y-2">
            {/* Économie d'intérêts pour le terme */}
            {results.termResults.interestSavings && results.termResults.interestSavings > 0 && (
              <div className="bg-gradient-to-r from-green-400 to-green-500 p-3 rounded-lg text-white text-center">
                <div className="text-sm font-medium mb-1">
                  Économies d'intérêts durant le terme grâce aux paiements accélérés
                </div>
                <div className="text-xl font-bold">
                  {results.termResults.interestSavings.toLocaleString('fr-CA', { 
                    style: 'currency', 
                    currency: 'CAD',
                    minimumFractionDigits: 0 
                  })}
                </div>
                <div className="text-xs mt-1">
                  comparé aux paiements mensuels
                </div>
              </div>
            )}

            {/* Première ligne: Solde et Capital payé */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-slate-200 p-2.5 rounded-lg text-slate-700 text-center">
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

              <div className="bg-white border border-slate-200 p-2.5 rounded-lg text-slate-700 text-center">
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
            </div>

            {/* Deuxième ligne: Intérêts payés et Coût total */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-slate-200 p-2.5 rounded-lg text-slate-700 text-center">
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

              <div className="bg-white border border-slate-200 p-2.5 rounded-lg text-slate-700 text-center">
                <div className="text-xs font-medium mb-1">
                  Coût total durant le terme
                </div>
                <div className="text-md font-bold">
                  {results.termResults.totalPayments.toLocaleString('fr-CA', { 
                    style: 'currency', 
                    currency: 'CAD',
                    minimumFractionDigits: 0 
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Encadré pour la durée totale de l'amortissement - style formulaire */}
        <div className="bg-slate-50 border border-slate-300 p-3 rounded-lg shadow-sm">
          <h4 className="text-md font-semibold text-slate-700 mb-2 text-center">
            Pendant l'amortissement complet de {formatAmortization(amortization)}
          </h4>
          
          <div className="space-y-2">
            {/* Économie d'intérêts durant la durée totale de l'amortissement */}
            {results.interestSavings && results.interestSavings > 0 && (
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 rounded-lg border text-white text-center">
                <div className="text-sm font-medium mb-1">
                  Économies d'intérêts durant la durée totale de l'amortissement grâce aux paiements accélérés
                </div>
                <div className="text-xl font-bold">
                  {results.interestSavings.toLocaleString('fr-CA', { 
                    style: 'currency', 
                    currency: 'CAD',
                    minimumFractionDigits: 0 
                  })}
                </div>
                <div className="text-xs mt-1">
                  comparé aux paiements mensuels (amortissement complet)
                </div>
              </div>
            )}

            {/* Première ligne: Solde et Capital payé */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-slate-200 p-2.5 rounded-lg text-slate-700 text-center">
                <div className="text-xs font-medium mb-1">
                  Solde à la fin de l'amortissement
                </div>
                <div className="text-md font-bold">
                  0 $
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-2.5 rounded-lg text-slate-700 text-center">
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
            </div>

            {/* Deuxième ligne: Intérêts payés et Coût total */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white border border-slate-200 p-2.5 rounded-lg text-slate-700 text-center">
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

              <div className="bg-white border border-slate-200 p-2.5 rounded-lg text-slate-700 text-center">
                <div className="text-xs font-medium mb-1">
                  Coût total de l'amortissement
                </div>
                <div className="text-md font-bold">
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
    </div>
  );
};

export default MortgagePaymentResults;
