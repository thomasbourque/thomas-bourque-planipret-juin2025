
import React from "react";
import { MortgagePaymentResult } from "@/utils/mortgagePaymentCalculations";

interface MortgagePaymentResultsProps {
  results: MortgagePaymentResult;
  term: number;
  amortization: number;
  paymentFrequency: string;
}

const MortgagePaymentResults = ({ results, term, amortization, paymentFrequency }: MortgagePaymentResultsProps) => {
  const getPaymentLabel = () => {
    switch (paymentFrequency) {
      case 'monthly':
        return 'mensuel';
      case 'biweekly':
        return 'aux 2 semaines';
      case 'biweekly-accelerated':
        return 'aux 2 semaines (accéléré)';
      case 'weekly':
        return 'hebdomadaire';
      default:
        return 'régulier';
    }
  };

  const getPaymentsCount = (years: number) => {
    switch (paymentFrequency) {
      case 'monthly':
        return years * 12;
      case 'biweekly':
      case 'biweekly-accelerated':
        return years * 26;
      case 'weekly':
        return years * 52;
      default:
        return years * 12;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg text-slate-800 shadow-lg">
        <p className="text-sm mb-2 font-medium">
          Paiement hypothécaire {getPaymentLabel()}
        </p>
        <p className="text-3xl font-bold">
          {results.regularPayment.toLocaleString('fr-CA', { 
            style: 'currency', 
            currency: 'CAD', 
            minimumFractionDigits: 0 
          })}
        </p>
      </div>

      <div className="bg-slate-50 p-4 md:p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-4 text-center text-sm md:text-base">
          Résultats pour le terme ({term} ans)
        </h4>
        <div className="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
          <div className="text-center p-2 md:p-3 bg-white rounded">
            <p className="text-slate-600 mb-1 text-xs">Nombre de versements</p>
            <p className="font-bold text-slate-900 text-sm md:text-base">{getPaymentsCount(term)}</p>
          </div>
          <div className="text-center p-2 md:p-3 bg-white rounded">
            <p className="text-slate-600 mb-1 text-xs">Total des paiements</p>
            <p className="font-bold text-slate-900 text-xs md:text-sm">
              {results.termResults.totalPayments.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
          <div className="text-center p-2 md:p-3 bg-white rounded">
            <p className="text-slate-600 mb-1 text-xs">Paiement en capital</p>
            <p className="font-bold text-green-600 text-xs md:text-sm">
              {results.termResults.totalPrincipal.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
          <div className="text-center p-2 md:p-3 bg-white rounded">
            <p className="text-slate-600 mb-1 text-xs">Paiement en intérêts</p>
            <p className="font-bold text-red-600 text-xs md:text-sm">
              {results.termResults.totalInterest.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
        </div>
        <div className="mt-4 text-center p-2 md:p-3 bg-slate-800 text-white rounded">
          <p className="text-xs mb-1">Solde restant après le terme</p>
          <p className="font-bold text-sm md:text-lg">
            {results.termResults.remainingBalance.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </p>
        </div>
      </div>

      <div className="bg-slate-100 p-4 md:p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-4 text-center text-sm md:text-base">
          Résultats pour l'amortissement complet ({Math.floor(amortization)} ans {Math.round((amortization % 1) * 12)} mois)
        </h4>
        <div className="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm">
          <div className="text-center p-2 md:p-3 bg-white rounded">
            <p className="text-slate-600 mb-1 text-xs">Nombre de versements</p>
            <p className="font-bold text-slate-900 text-sm md:text-base">{getPaymentsCount(amortization)}</p>
          </div>
          <div className="text-center p-2 md:p-3 bg-white rounded">
            <p className="text-slate-600 mb-1 text-xs">Coût total</p>
            <p className="font-bold text-slate-900 text-xs md:text-sm">
              {results.amortizationResults.totalPayments.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
          <div className="text-center p-2 md:p-3 bg-white rounded">
            <p className="text-slate-600 mb-1 text-xs">Capital total</p>
            <p className="font-bold text-green-600 text-xs md:text-sm">
              {results.amortizationResults.totalPrincipal.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
          <div className="text-center p-2 md:p-3 bg-white rounded">
            <p className="text-slate-600 mb-1 text-xs">Intérêts totaux</p>
            <p className="font-bold text-red-600 text-xs md:text-sm">
              {results.amortizationResults.totalInterest.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-xs md:text-sm text-slate-600 mb-4">
          Calculs basés sur une capitalisation semi-annuelle. Consultez-moi pour une évaluation personnalisée.
        </p>
        <a 
          href="https://calendly.com/tbourque-planipret" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors text-sm md:text-base"
        >
          Discuter de votre projet
        </a>
      </div>
    </div>
  );
};

export default MortgagePaymentResults;
