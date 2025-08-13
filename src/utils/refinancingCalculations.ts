export interface RefinancingResults {
  termSavings: number;
  refinancingAmount: number;
  newMonthlyPayment: number;
  currentMonthlyPayment: number;
  monthlySavings: number;
}

export interface InvestmentStrategy {
  investmentGrowth: number;
  mortgageInterestCost: number;
  netBenefit: number;
  yearsMonthsSaved: { years: number; months: number };
}

export const calculateRefinancingSavings = (
  currentBalance: number,
  currentRate: number,
  newRate: number,
  amortizationYears: number,
  amortizationMonths: number,
  termEndDate: string
): RefinancingResults => {
  const totalAmortizationMonths = amortizationYears * 12 + amortizationMonths;
  const today = new Date();
  const termEnd = new Date(termEndDate);
  const monthsToTermEnd = Math.ceil((termEnd.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30));

  // Calcul du paiement mensuel selon la formule canadienne (composition semi-annuelle)
  const calculateMonthlyPayment = (principal: number, annualRate: number, totalMonths: number) => {
    if (annualRate === 0) return principal / totalMonths;
    
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    const numerator = principal * monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, totalMonths);
    const denominator = Math.pow(1 + monthlyEquivalentRate, totalMonths) - 1;
    
    return numerator / denominator;
  };

  // Calcul du solde restant après les mois jusqu'à échéance
  const calculateRemainingBalance = (principal: number, annualRate: number, totalMonths: number, monthsPaid: number) => {
    if (annualRate === 0) return principal * (1 - monthsPaid / totalMonths);
    
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, totalMonths);
    
    const numerator = principal * Math.pow(1 + monthlyEquivalentRate, monthsPaid) - monthlyPayment * (Math.pow(1 + monthlyEquivalentRate, monthsPaid) - 1) / monthlyEquivalentRate;
    
    return numerator;
  };

  const currentMonthlyPayment = calculateMonthlyPayment(currentBalance, currentRate, totalAmortizationMonths);
  const newMonthlyPayment = calculateMonthlyPayment(currentBalance, newRate, totalAmortizationMonths);
  
  // Économies de paiement mensuel
  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  const paymentSavings = monthlySavings * monthsToTermEnd;
  
  // Calcul de l'écart de solde en capital à l'échéance
  const currentBalanceAtTerm = calculateRemainingBalance(currentBalance, currentRate, totalAmortizationMonths, monthsToTermEnd);
  const newBalanceAtTerm = calculateRemainingBalance(currentBalance, newRate, totalAmortizationMonths, monthsToTermEnd);
  const capitalSavings = currentBalanceAtTerm - newBalanceAtTerm;
  
  // Économies totales = économies de paiement + écart de capital
  const termSavings = paymentSavings + capitalSavings;

  return {
    termSavings: Math.round(termSavings),
    refinancingAmount: 0, // Will be calculated separately
    newMonthlyPayment: Math.round(newMonthlyPayment),
    currentMonthlyPayment: Math.round(currentMonthlyPayment),
    monthlySavings: Math.round(monthlySavings)
  };
};

export const calculateRefinancingCapacity = (
  homeValue: number,
  currentBalance: number
): number => {
  return Math.max(0, homeValue * 0.8 - currentBalance);
};

export const calculateInvestmentStrategy = (
  refinancingAmount: number,
  newRate: number,
  remainingAmortizationYears: number,
  investmentReturn: number = 6.5
): InvestmentStrategy => {
  const years = remainingAmortizationYears;
  
  // Croissance de l'investissement en bourse (capitalisation semi-annuelle)
  const semiAnnualInvestmentRate = investmentReturn / 100 / 2;
  const investmentGrowth = refinancingAmount * Math.pow(1 + semiAnnualInvestmentRate, years * 2);
  
  // Coût de la nouvelle tranche hypothécaire (capitalisation semi-annuelle)
  const semiAnnualMortgageRate = newRate / 100 / 2;
  const mortgageValue = refinancingAmount * Math.pow(1 + semiAnnualMortgageRate, years * 2);
  const mortgageInterestCost = mortgageValue - refinancingAmount;
  
  // Bénéfice net = valeur de l'investissement - capital initial - coût hypothécaire
  const netBenefit = investmentGrowth - refinancingAmount - mortgageInterestCost;
  
  // Pour les années économisées, on garde le calcul précédent comme estimation
  const monthlyBenefit = netBenefit / (years * 12);
  const paymentIncrease = monthlyBenefit / years;
  const percentIncrease = paymentIncrease / (refinancingAmount / (years * 12));
  const yearsSaved = Math.min(years * 0.3, percentIncrease * years * 10);
  
  const totalMonthsSaved = Math.round(yearsSaved * 12);
  const yearsMonthsSaved = {
    years: Math.floor(totalMonthsSaved / 12),
    months: totalMonthsSaved % 12
  };

  return {
    investmentGrowth: Math.round(investmentGrowth),
    mortgageInterestCost: Math.round(mortgageInterestCost),
    netBenefit: Math.round(netBenefit),
    yearsMonthsSaved
  };
};