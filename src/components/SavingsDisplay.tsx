
import React from "react";
import { MortgageSavings } from "@/utils/mortgageCalculations";

interface SavingsDisplayProps {
  savings: MortgageSavings;
  termYears: number;
}

const SavingsDisplay = ({ savings, termYears }: SavingsDisplayProps) => {
  return (
    <div className="flex flex-col justify-center space-y-6">
      <div className="text-center p-6 bg-slate-800 rounded-lg border border-slate-700">
        <p className="text-sm text-white mb-2">
          Économies réalisées sur vos paiements mensuels durant votre terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
        </p>
        <p className="text-3xl font-bold text-white">
          {savings.termPaymentSavings.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
        </p>
      </div>

      <div className="text-center p-6 bg-slate-800 rounded-lg border border-slate-700">
        <p className="text-sm text-white mb-2">
          Différence sur le solde en capital de votre hypothèque à la fin du terme de {termYears} {termYears === 1 ? 'an' : 'année'}
        </p>
        <p className="text-3xl font-bold text-white">
          {savings.principalBalanceDifference.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
        </p>
      </div>

      <div className="text-center p-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg border border-yellow-500 shadow-lg">
        <p className="text-sm text-slate-800 mb-2 font-medium">
          Économies totales à la fin de votre terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
        </p>
        <p className="text-3xl font-bold text-slate-800">
          {savings.totalTermSavings.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
        </p>
      </div>

      <div className="text-center pt-4 mb-8 md:mb-0">
        <p className="text-sm text-slate-600 mb-4">
          Ça vous parle d'avoir tout cet argent en plus dans vos poches? Prenons le temps de valider les calculs ensemble.
        </p>
        <a 
          href="https://calendly.com/tbourque-planipret" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
        >
          Planifier une rencontre gratuite
        </a>
      </div>
    </div>
  );
};

export default SavingsDisplay;
