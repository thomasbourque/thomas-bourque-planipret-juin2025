
export interface MortgageSavings {
  termPaymentSavings: number;
  principalBalanceDifference: number;
  totalTermSavings: number;
}

export const calculateMortgagePayments = (
  mortgageBalance: number,
  termYears: number,
  bankRate: number,
  brokerRate: number,
  amortizationYears: number = 25
): MortgageSavings => {
  const amortizationMonths = amortizationYears * 12;
  const termMonths = termYears * 12;
  
  // Calcul du paiement mensuel selon la formule canadienne (composition semi-annuelle)
  const calculateMonthlyPayment = (principal: number, annualRate: number, amortizationMonths: number) => {
    if (annualRate === 0) return principal / amortizationMonths;
    
    // Conversion du taux annuel composé semi-annuellement en taux mensuel équivalent
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    const numerator = principal * monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, amortizationMonths);
    const denominator = Math.pow(1 + monthlyEquivalentRate, amortizationMonths) - 1;
    
    return numerator / denominator;
  };
  
  // Calcul du solde restant après un certain nombre de paiements
  const calculateRemainingBalance = (principal: number, annualRate: number, totalMonths: number, paymentsMade: number) => {
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, totalMonths);
    
    if (annualRate === 0) {
      return principal - (monthlyPayment * paymentsMade);
    }
    
    const compoundFactor = Math.pow(1 + monthlyEquivalentRate, paymentsMade);
    const balanceGrowth = principal * compoundFactor;
    const paymentSum = monthlyPayment * ((compoundFactor - 1) / monthlyEquivalentRate);
    
    return balanceGrowth - paymentSum;
  };
  
  // Paiements mensuels
  const bankMonthlyPayment = calculateMonthlyPayment(mortgageBalance, bankRate, amortizationMonths);
  const brokerMonthlyPayment = calculateMonthlyPayment(mortgageBalance, brokerRate, amortizationMonths);
  
  // Économie mensuelle
  const monthlyPaymentSavings = bankMonthlyPayment - brokerMonthlyPayment;
  
  // Économies de paiement durant le terme
  const termPaymentSavings = monthlyPaymentSavings * termMonths;
  
  // Soldes en capital à la fin du terme
  const bankBalanceAtTermEnd = calculateRemainingBalance(mortgageBalance, bankRate, amortizationMonths, termMonths);
  const brokerBalanceAtTermEnd = calculateRemainingBalance(mortgageBalance, brokerRate, amortizationMonths, termMonths);
  
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
