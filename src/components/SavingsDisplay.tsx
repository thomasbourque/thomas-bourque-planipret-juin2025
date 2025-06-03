
import React from "react";
import { MortgageSavings } from "@/utils/mortgageCalculations";

interface SavingsDisplayProps {
  savings: MortgageSavings;
  termYears: number;
}

const SavingsDisplay = ({ savings, termYears }: SavingsDisplayProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-6 text-center">
        Vos économies potentielles
      </h3>
      
      <div className="grid gap-4">
        <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 rounded-xl border text-white text-center">
          <div className="text-sm font-medium mb-1 text-slate-200">
            Économie sur les paiements
          </div>
          <div className="text-2xl font-bold">
            {savings.termPaymentSavings.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </div>
          <div className="text-xs text-slate-300 mt-1">
            à la fin du terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
          </div>
        </div>

        <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 rounded-xl border text-white text-center">
          <div className="text-sm font-medium mb-1 text-slate-200">
            Économie sur le solde en capital
          </div>
          <div className="text-2xl font-bold">
            {savings.principalBalanceDifference.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </div>
          <div className="text-xs text-slate-300 mt-1">
            à la fin du terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6 rounded-xl border text-slate-900 text-center">
          <div className="text-sm font-medium mb-1">
            Économie totale
          </div>
          <div className="text-3xl font-bold">
            {savings.totalTermSavings.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </div>
          <div className="text-xs mt-1">
            à la fin du terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600 text-center">
          Ces calculs montrent l'impact financier d'une différence de taux pendant le terme de votre hypothèque. 
          Un courtier hypothécaire peut vous aider à obtenir les meilleurs taux disponibles.
        </p>
      </div>
    </div>
  );
};

export default SavingsDisplay;
