
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
  monthlyInvestment: number;
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
    'scenario1'
  );
  
  const scenario2 = calculateScenario(
    purchasePrice,
    downPaymentPercent2,
    interestRate,
    amortizationYears,
    investmentReturn,
    'scenario2'
  );

  // Maintenant calculer les investissements en fonction des différences
  const downPaymentDifference = scenario1.downPayment - scenario2.downPayment;
  const monthlyPaymentDifference = scenario2.monthlyPayment - scenario1.monthlyPayment;

  // Scénario 1: investir l'économie de paiement mensuel
  const scenario1FinalInvestment = monthlyPaymentDifference > 0 
    ? calculateInvestmentValue(0, monthlyPaymentDifference, investmentReturn, amortizationYears)
    : 0;

  // Scénario 2: investir la différence de mise de fonds dès le jour 1
  const scenario2FinalInvestment = downPaymentDifference > 0
    ? calculateInvestmentValue(downPaymentDifference, 0, investmentReturn, amortizationYears)
    : 0;

  const updatedScenario1 = {
    ...scenario1,
    finalInvestmentValue: scenario1FinalInvestment,
    monthlyInvestment: monthlyPaymentDifference > 0 ? monthlyPaymentDifference : 0
  };

  const updatedScenario2 = {
    ...scenario2,
    finalInvestmentValue: scenario2FinalInvestment,
    monthlyInvestment: 0
  };

  const advantageousScenario = updatedScenario1.finalInvestmentValue > updatedScenario2.finalInvestmentValue ? 'scenario1' : 'scenario2';
  const difference = Math.abs(updatedScenario1.finalInvestmentValue - updatedScenario2.finalInvestmentValue);

  return {
    scenario1: updatedScenario1,
    scenario2: updatedScenario2,
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
  scenarioType: 'scenario1' | 'scenario2'
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
  
  return {
    downPayment,
    mortgageAmount: totalMortgageAmount,
    monthlyPayment,
    monthlyPaymentWithInsurance: monthlyPayment,
    insurancePremium,
    totalInvestment: 0,
    finalInvestmentValue: 0, // Sera calculé dans la fonction principale
    monthlyInvestment: 0 // Sera calculé dans la fonction principale
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
  if (monthlyRate > 0 && monthlyContribution > 0) {
    futureValueContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  } else if (monthlyContribution > 0) {
    futureValueContributions = monthlyContribution * months;
  }
  
  return futureValueInitial + futureValueContributions;
};
