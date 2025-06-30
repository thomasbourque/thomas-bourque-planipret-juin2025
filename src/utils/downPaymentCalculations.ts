
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
    'scenario2',
    scenario1
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
  scenarioType: 'scenario1' | 'scenario2',
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
  let monthlyInvestment = 0;
  
  if (scenarioType === 'scenario1') {
    // Scénario 1: Maximiser la mise de fonds, pas d'investissement initial
    // Mais investir l'économie de paiement mensuellement s'il y en a une
    if (referenceScenario) {
      monthlyInvestment = referenceScenario.monthlyPayment - monthlyPayment;
      if (monthlyInvestment > 0) {
        finalInvestmentValue = calculateInvestmentValue(0, monthlyInvestment, investmentReturn, amortizationYears);
      }
    }
  } else {
    // Scénario 2: Réduire la mise de fonds et investir la différence dès le jour 1
    if (referenceScenario) {
      const downPaymentDifference = referenceScenario.downPayment - downPayment;
      finalInvestmentValue = calculateInvestmentValue(downPaymentDifference, 0, investmentReturn, amortizationYears);
    }
  }
  
  return {
    downPayment,
    mortgageAmount: totalMortgageAmount,
    monthlyPayment,
    monthlyPaymentWithInsurance: monthlyPayment,
    insurancePremium,
    totalInvestment: 0,
    finalInvestmentValue,
    monthlyInvestment
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
