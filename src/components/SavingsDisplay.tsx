
import React from "react";
import { MortgageSavings } from "@/utils/mortgageCalculations";

interface SavingsDisplayProps {
  savings: MortgageSavings;
  termYears: number;
}

const SavingsDisplay = ({ savings, termYears }: SavingsDisplayProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Vos économies potentielles
      </h3>
      
      <div className="grid gap-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
          <div className="text-sm text-green-700 font-medium mb-1">
            Économie sur les paiements
          </div>
          <div className="text-2xl font-bold text-green-800">
            {savings.termPaymentSavings.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </div>
          <div className="text-xs text-green-600 mt-1">
            à la fin du terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
          <div className="text-sm text-blue-700 font-medium mb-1">
            Économie sur le solde en capital
          </div>
          <div className="text-2xl font-bold text-blue-800">
            {savings.principalBalanceDifference.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </div>
          <div className="text-xs text-blue-600 mt-1">
            à la fin du terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
          <div className="text-sm text-purple-700 font-medium mb-1">
            Économie totale
          </div>
          <div className="text-3xl font-bold text-purple-800">
            {savings.totalTermSavings.toLocaleString('fr-CA', { 
              style: 'currency', 
              currency: 'CAD',
              minimumFractionDigits: 0 
            })}
          </div>
          <div className="text-xs text-purple-600 mt-1">
            à la fin du terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
          </div>
        </div>
      </div>

      <div className="bg-slate-50 p-4 rounded-lg">
        <p className="text-sm text-slate-600">
          Ces calculs montrent l'impact financier d'une différence de taux pendant le terme de votre hypothèque. 
          Un courtier hypothécaire peut vous aider à obtenir les meilleurs taux disponibles.
        </p>
      </div>
    </div>
  );
};

export default SavingsDisplay;
