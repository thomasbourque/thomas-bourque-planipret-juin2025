
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";

const MortgageCalculator = () => {
  const [mortgageBalance, setMortgageBalance] = useState([400000]);
  const [term, setTerm] = useState([5]);
  const [bankRate, setBankRate] = useState([4.5]);
  const [brokerRate, setBrokerRate] = useState([4.2]);

  const calculateMortgagePayments = () => {
    const balance = mortgageBalance[0];
    const termYears = term[0];
    const bankRateValue = bankRate[0] / 100;
    const brokerRateValue = brokerRate[0] / 100;
    
    const amortizationMonths = 25 * 12; // 25 ans standard
    const termMonths = termYears * 12;
    
    // Calcul du paiement mensuel
    const calculateMonthlyPayment = (principal, annualRate, months) => {
      const monthlyRate = annualRate / 12;
      if (monthlyRate === 0) return principal / months;
      return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    };
    
    // Calcul du solde restant après un certain nombre de paiements
    const calculateRemainingBalance = (principal, annualRate, totalMonths, paymentsMade) => {
      const monthlyRate = annualRate / 12;
      const monthlyPayment = calculateMonthlyPayment(principal, annualRate, totalMonths);
      
      if (monthlyRate === 0) {
        return principal - (monthlyPayment * paymentsMade);
      }
      
      return principal * Math.pow(1 + monthlyRate, paymentsMade) - 
             monthlyPayment * ((Math.pow(1 + monthlyRate, paymentsMade) - 1) / monthlyRate);
    };
    
    // Paiements mensuels
    const bankMonthlyPayment = calculateMonthlyPayment(balance, bankRateValue, amortizationMonths);
    const brokerMonthlyPayment = calculateMonthlyPayment(balance, brokerRateValue, amortizationMonths);
    
    // Économie mensuelle
    const monthlyPaymentSavings = bankMonthlyPayment - brokerMonthlyPayment;
    
    // Économies de paiement durant le terme
    const termPaymentSavings = monthlyPaymentSavings * termMonths;
    
    // Soldes en capital à la fin du terme
    const bankBalanceAtTermEnd = calculateRemainingBalance(balance, bankRateValue, amortizationMonths, termMonths);
    const brokerBalanceAtTermEnd = calculateRemainingBalance(balance, brokerRateValue, amortizationMonths, termMonths);
    
    // Différence du solde en capital
    const principalBalanceDifference = bankBalanceAtTermEnd - brokerBalanceAtTermEnd;
    
    // Économies totales durant le terme
    const totalTermSavings = termPaymentSavings + principalBalanceDifference;
    
    return {
      termPaymentSavings: Math.round(termPaymentSavings),
      principalBalanceDifference: Math.round(principalBalanceDifference),
      totalTermSavings: Math.round(totalTermSavings)
    };
  };

  const savings = calculateMortgagePayments();

  return (
    <section className="section bg-primary/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-slate-900 mb-6">
              Économisez gros en trouvant le taux le plus bas
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Je magasine pour vous trouver le meilleur taux parmi ceux offerts dans une vingtaine d'institutions financières. Découvrez combien une baisse de taux, aussi minime soit-elle, peut vous faire économiser!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 relative pb-20 md:pb-12">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-8">
                <div>
                  <label className="block text-lg font-medium text-slate-900 mb-4">
                    Montant de financement
                  </label>
                  <div className="space-y-4">
                    <Slider
                      value={mortgageBalance}
                      onValueChange={setMortgageBalance}
                      max={1500000}
                      min={100000}
                      step={50000}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-2xl font-bold text-primary">
                        {mortgageBalance[0].toLocaleString('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 0 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-slate-900 mb-4">
                    Terme
                  </label>
                  <div className="space-y-4">
                    <Slider
                      value={term}
                      onValueChange={setTerm}
                      max={7}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-xl font-semibold text-slate-700">
                        {term[0]} {term[0] === 1 ? 'an' : 'ans'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-slate-900 mb-4">
                    Taux proposé par votre banque
                  </label>
                  <div className="space-y-4">
                    <Slider
                      value={bankRate}
                      onValueChange={setBankRate}
                      max={6}
                      min={3}
                      step={0.05}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-xl font-semibold text-slate-700">
                        {bankRate[0].toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-medium text-slate-900 mb-4">
                    Taux obtenu par un courtier hypothécaire
                  </label>
                  <div className="space-y-4">
                    <Slider
                      value={brokerRate}
                      onValueChange={setBrokerRate}
                      max={6}
                      min={3}
                      step={0.05}
                      className="w-full"
                    />
                    <div className="text-center">
                      <span className="text-xl font-semibold text-slate-700">
                        {brokerRate[0].toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <div className="text-center p-6 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary mb-2">Économies réalisées sur vos paiements mensuels durant votre terme de {term[0]} {term[0] === 1 ? 'an' : 'ans'}</p>
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
                  <p className="text-sm text-yellow-700 mb-2">Économies totales à la fin de votre terme de {term[0]} {term[0] === 1 ? 'an' : 'ans'}</p>
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
            </div>
            
            <div className="absolute bottom-2 left-4 right-4 text-xs text-slate-500">
              *Calculs basés sur un amortissement de 25 ans. Les économies varient selon votre profil de crédit et les conditions du marché.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;
