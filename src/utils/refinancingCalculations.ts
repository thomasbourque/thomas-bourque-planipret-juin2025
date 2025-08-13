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

  const currentMonthlyPayment = calculateMonthlyPayment(currentBalance, currentRate, totalAmortizationMonths);
  const newMonthlyPayment = calculateMonthlyPayment(currentBalance, newRate, totalAmortizationMonths);
  
  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  const termSavings = monthlySavings * monthsToTermEnd;

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
  const monthlyInvestmentReturn = investmentReturn / 100 / 12;
  const monthlyMortgageRate = Math.pow(1 + newRate / 100 / 2, 2/12) - 1;
  
  // Croissance de l'investissement en bourse
  const investmentGrowth = refinancingAmount * Math.pow(1 + investmentReturn / 100, years);
  
  // Coût d'intérêt hypothécaire sur le refinancement
  const mortgageInterestCost = refinancingAmount * Math.pow(1 + monthlyMortgageRate, years * 12) - refinancingAmount;
  
  // Bénéfice net
  const netBenefit = investmentGrowth - refinancingAmount - mortgageInterestCost;
  
  // Calcul approximatif du nombre d'années économisées
  // Si on utilise le bénéfice net pour rembourser plus rapidement
  const monthlyBenefit = netBenefit / (years * 12);
  const paymentIncrease = monthlyBenefit / years; // Répartition du bénéfice sur les paiements
  
  // Estimation simplifiée: chaque 1% d'augmentation de paiement = ~1 an d'économie
  const percentIncrease = paymentIncrease / (refinancingAmount / (years * 12));
  const yearsSaved = Math.min(years * 0.3, percentIncrease * years * 10); // Cap à 30% du terme
  
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