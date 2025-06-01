
import React from "react";
import { MortgageSavings } from "@/utils/mortgageCalculations";

interface SavingsDisplayProps {
  savings: MortgageSavings;
  termYears: number;
}

const SavingsDisplay = ({ savings, termYears }: SavingsDisplayProps) => {
  return (
    <div className="flex flex-col justify-center space-y-6">
      <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
        <p className="text-sm text-primary mb-2">
          Économies réalisées sur vos paiements mensuels durant votre terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
        </p>
        <p className="text-3xl font-bold text-primary">
          {savings.termPaymentSavings.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
        </p>
      </div>

      <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-700 mb-2">Différence du solde en capital à la fin du terme</p>
        <p className="text-3xl font-bold text-blue-600">
          {savings.principalBalanceDifference.toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
        </p>
      </div>

      <div className="text-center p-6 bg-yellow-50 rounded-lg border border-yellow-200">
        <p className="text-sm text-yellow-700 mb-2">
          Économies totales à la fin de votre terme de {termYears} {termYears === 1 ? 'an' : 'ans'}
        </p>
        <p className="text-3xl font-bold text-yellow-600">
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
          Planifier un appel gratuit
        </a>
      </div>
    </div>
  );
};

export default SavingsDisplay;
