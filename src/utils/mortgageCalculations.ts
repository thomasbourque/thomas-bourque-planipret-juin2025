
export interface MortgageSavings {
  termPaymentSavings: number;
  principalBalanceDifference: number;
  totalTermSavings: number;
}

export const calculateMortgagePayments = (
  mortgageBalance: number,
  termYears: number,
  bankRate: number,
  brokerRate: number
): MortgageSavings => {
  const bankRateValue = bankRate / 100;
  const brokerRateValue = brokerRate / 100;
  
  const amortizationMonths = 25 * 12; // 25 ans standard
  const termMonths = termYears * 12;
  
  // Calcul du paiement mensuel selon la formule canadienne standard
  const calculateMonthlyPayment = (principal: number, annualRate: number, amortizationMonths: number) => {
    if (annualRate === 0) return principal / amortizationMonths;
    
    const monthlyRate = annualRate / 12;
    const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, amortizationMonths);
    const denominator = Math.pow(1 + monthlyRate, amortizationMonths) - 1;
    
    return numerator / denominator;
  };
  
  // Calcul du solde restant après un certain nombre de paiements
  const calculateRemainingBalance = (principal: number, annualRate: number, totalMonths: number, paymentsMade: number) => {
    const monthlyRate = annualRate / 12;
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, totalMonths);
    
    if (annualRate === 0) {
      return principal - (monthlyPayment * paymentsMade);
    }
    
    const compoundFactor = Math.pow(1 + monthlyRate, paymentsMade);
    const balanceGrowth = principal * compoundFactor;
    const paymentSum = monthlyPayment * ((compoundFactor - 1) / monthlyRate);
    
    return balanceGrowth - paymentSum;
  };
  
  // Paiements mensuels
  const bankMonthlyPayment = calculateMonthlyPayment(mortgageBalance, bankRateValue, amortizationMonths);
  const brokerMonthlyPayment = calculateMonthlyPayment(mortgageBalance, brokerRateValue, amortizationMonths);
  
  // Économie mensuelle
  const monthlyPaymentSavings = bankMonthlyPayment - brokerMonthlyPayment;
  
  // Économies de paiement durant le terme
  const termPaymentSavings = monthlyPaymentSavings * termMonths;
  
  // Soldes en capital à la fin du terme
  const bankBalanceAtTermEnd = calculateRemainingBalance(mortgageBalance, bankRateValue, amortizationMonths, termMonths);
  const brokerBalanceAtTermEnd = calculateRemainingBalance(mortgageBalance, brokerRateValue, amortizationMonths, termMonths);
  
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
