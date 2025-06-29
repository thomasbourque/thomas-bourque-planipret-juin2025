
export interface DownPaymentComparison {
  scenario1: ScenarioResults;
  scenario2: ScenarioResults;
  advantageousScenario: 'scenario1' | 'scenario2';
  difference: number;
}

export interface ScenarioResults {
  downPayment: number;
  mortgageAmount: number;
  monthlyPayment: number;
  monthlyPaymentWithInsurance: number;
  insurancePremium: number;
  totalInvestment: number;
  finalInvestmentValue: number;
}

export const calculateDownPaymentComparison = (
  purchasePrice: number,
  downPaymentPercent1: number,
  downPaymentPercent2: number,
  interestRate: number,
  amortizationYears: number,
  investmentReturn: number
): DownPaymentComparison => {
  const scenario1 = calculateScenario(
    purchasePrice,
    downPaymentPercent1,
    interestRate,
    amortizationYears,
    investmentReturn,
    true // est le scénario de référence
  );
  
  const scenario2 = calculateScenario(
    purchasePrice,
    downPaymentPercent2,
    interestRate,
    amortizationYears,
    investmentReturn,
    false,
    scenario1 // pour calculer la différence de paiement
  );

  const advantageousScenario = scenario1.finalInvestmentValue > scenario2.finalInvestmentValue ? 'scenario1' : 'scenario2';
  const difference = Math.abs(scenario1.finalInvestmentValue - scenario2.finalInvestmentValue);

  return {
    scenario1,
    scenario2,
    advantageousScenario,
    difference
  };
};

const calculateScenario = (
  purchasePrice: number,
  downPaymentPercent: number,
  interestRate: number,
  amortizationYears: number,
  investmentReturn: number,
  isReference: boolean,
  referenceScenario?: ScenarioResults
): ScenarioResults => {
  const downPayment = purchasePrice * (downPaymentPercent / 100);
  const mortgageAmount = purchasePrice - downPayment;
  
  // Calcul de la prime d'assurance SCHL si mise de fonds < 20%
  let insurancePremium = 0;
  if (downPaymentPercent < 20) {
    if (downPaymentPercent >= 15) insurancePremium = mortgageAmount * 0.028;
    else if (downPaymentPercent >= 10) insurancePremium = mortgageAmount * 0.031;
    else insurancePremium = mortgageAmount * 0.04;
  }
  
  const totalMortgageAmount = mortgageAmount + insurancePremium;
  
  // Calcul du paiement mensuel (capitalisation semi-annuelle)
  const monthlyPayment = calculateMonthlyPayment(totalMortgageAmount, interestRate, amortizationYears);
  
  let finalInvestmentValue = 0;
  
  if (isReference) {
    // Scénario 1: Investir l'économie de paiement mensuel
    finalInvestmentValue = 0; // Pas d'investissement dans ce scénario
  } else {
    // Scénario 2: Investir la différence de mise de fonds + économie de paiement
    const downPaymentDifference = referenceScenario!.downPayment - downPayment;
    const monthlyPaymentDifference = referenceScenario!.monthlyPaymentWithInsurance - monthlyPayment;
    
    // Investissement initial (différence de mise de fonds)
    const initialInvestment = downPaymentDifference;
    
    // Investissement mensuel (économie de paiement)
    const monthlyInvestment = monthlyPaymentDifference;
    
    finalInvestmentValue = calculateInvestmentValue(
      initialInvestment,
      monthlyInvestment,
      investmentReturn,
      amortizationYears
    );
  }
  
  return {
    downPayment,
    mortgageAmount: totalMortgageAmount,
    monthlyPayment,
    monthlyPaymentWithInsurance: monthlyPayment,
    insurancePremium,
    totalInvestment: 0,
    finalInvestmentValue
  };
};

const calculateMonthlyPayment = (principal: number, annualRate: number, amortizationYears: number): number => {
  const amortizationMonths = amortizationYears * 12;
  const semiAnnualRate = annualRate / 2;
  const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
  
  if (monthlyEquivalentRate === 0) return principal / amortizationMonths;
  
  const numerator = principal * monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, amortizationMonths);
  const denominator = Math.pow(1 + monthlyEquivalentRate, amortizationMonths) - 1;
  
  return numerator / denominator;
};

const calculateInvestmentValue = (
  initialAmount: number,
  monthlyContribution: number,
  annualReturn: number,
  years: number
): number => {
  const monthlyRate = annualReturn / 100 / 12;
  const months = years * 12;
  
  // Valeur future du montant initial
  const futureValueInitial = initialAmount * Math.pow(1 + monthlyRate, months);
  
  // Valeur future des contributions mensuelles (annuité)
  let futureValueContributions = 0;
  if (monthlyRate > 0) {
    futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  } else {
    futureValueContributions = monthlyContribution * months;
  }
  
  return futureValueInitial + futureValueContributions;
};
