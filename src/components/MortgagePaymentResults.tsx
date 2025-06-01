
import React from "react";
import { MortgagePaymentResult } from "@/utils/mortgagePaymentCalculations";

interface MortgagePaymentResultsProps {
  results: MortgagePaymentResult;
  term: number;
  amortization: number;
}

const MortgagePaymentResults = ({ results, term, amortization }: MortgagePaymentResultsProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center p-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
        <p className="text-sm mb-2 font-medium">
          Paiement hypothécaire régulier
        </p>
        <p className="text-3xl font-bold">
          {results.regularPayment.toLocaleString('fr-CA', { 
            style: 'currency', 
            currency: 'CAD', 
            minimumFractionDigits: 0 
          })}
        </p>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-4 text-center">
          Résultats pour le terme ({term} ans)
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-white rounded">
            <p className="text-slate-600 mb-1">Nombre de versements</p>
            <p className="font-bold text-slate-900">{term * 12}</p>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <p className="text-slate-600 mb-1">Total des paiements</p>
            <p className="font-bold text-slate-900">
              {results.termResults.totalPayments.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <p className="text-slate-600 mb-1">Paiement en capital</p>
            <p className="font-bold text-green-600">
              {results.termResults.totalPrincipal.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <p className="text-slate-600 mb-1">Paiement en intérêts</p>
            <p className="font-bold text-red-600">
              {results.termResults.totalInterest.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
        </div>
        <div className="mt-4 text-center p-3 bg-slate-800 text-white rounded">
          <p className="text-sm mb-1">Solde restant après le terme</p>
          <p className="font-bold text-lg">
            {results.termResults.remainingBalance.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </p>
        </div>
      </div>

      <div className="bg-slate-100 p-6 rounded-lg">
        <h4 className="font-semibold text-slate-900 mb-4 text-center">
          Résultats pour l'amortissement complet ({amortization} ans)
        </h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-3 bg-white rounded">
            <p className="text-slate-600 mb-1">Nombre de versements</p>
            <p className="font-bold text-slate-900">{amortization * 12}</p>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <p className="text-slate-600 mb-1">Coût total</p>
            <p className="font-bold text-slate-900">
              {results.amortizationResults.totalPayments.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <p className="text-slate-600 mb-1">Capital total</p>
            <p className="font-bold text-green-600">
              {results.amortizationResults.totalPrincipal.toLocaleString('fr-CA', { 
                style: 'currency', 
                currency: 'CAD',
                minimumFractionDigits: 0 
              })}
            </p>
          </div>
          <div className="text-center p-3 bg-white rounded">
            <p className="text-slate-600 mb-1">Intérêts totaux</p>
            <p className="font-bold text-red-600">
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
        <p className="text-sm text-slate-600 mb-4">
          Calculs basés sur une capitalisation semi-annuelle. Consultez-moi pour une évaluation personnalisée.
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

export default MortgagePaymentResults;
