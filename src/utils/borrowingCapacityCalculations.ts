
export interface BorrowingCapacityInput {
  annualIncome: number;
  coborrowersIncome: number;
  downPayment: number;
  amortization: number;
  interestRate: number;
  monthlyDebts: number;
  heatingCosts: number;
  propertyTaxes: number;
  condoFees: number;
}

export interface BorrowingCapacityResult {
  maxBorrowingAmount: number;
  maxPurchasePrice: number;
  abdRatio: number;
  atdRatio: number;
  monthlyPayment: number;
  housingCosts: number;
  monthlyIncome: number;
}

export const calculateBorrowingCapacity = (input: BorrowingCapacityInput): BorrowingCapacityResult => {
  const {
    annualIncome,
    coborrowersIncome,
    downPayment,
    amortization,
    interestRate,
    monthlyDebts,
    heatingCosts,
    propertyTaxes,
    condoFees
  } = input;

  const totalAnnualIncome = annualIncome + coborrowersIncome;
  const monthlyIncome = totalAnnualIncome / 12;

  // Calcul du paiement hypothécaire mensuel selon la formule canadienne
  const calculateMonthlyPayment = (principal: number, annualRate: number, amortizationYears: number) => {
    if (annualRate === 0) return principal / (amortizationYears * 12);
    
    const amortizationMonths = amortizationYears * 12;
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    const numerator = principal * monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, amortizationMonths);
    const denominator = Math.pow(1 + monthlyEquivalentRate, amortizationMonths) - 1;
    
    return numerator / denominator;
  };

  // Calcul inverse : quel montant peut-on emprunter avec un paiement donné
  const calculateMaxPrincipal = (monthlyPayment: number, annualRate: number, amortizationYears: number) => {
    if (annualRate === 0) return monthlyPayment * amortizationYears * 12;
    
    const amortizationMonths = amortizationYears * 12;
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    const denominator = monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, amortizationMonths);
    const numerator = Math.pow(1 + monthlyEquivalentRate, amortizationMonths) - 1;
    
    return monthlyPayment * (numerator / denominator);
  };

  // Charges de logement fixes (sans le paiement hypothécaire)
  // Les frais de condo comptent pour 50% dans le calcul des ratios
  const fixedHousingCosts = heatingCosts + propertyTaxes + (condoFees * 0.5);

  // Calcul basé sur le ratio ABD (39% max)
  // ABD = (Paiement hypothécaire + chauffage + taxes + 50% condo) / revenu mensuel brut
  const maxABDPayment = (monthlyIncome * 0.39) - fixedHousingCosts;
  const maxBorrowingABD = maxABDPayment > 0 ? calculateMaxPrincipal(maxABDPayment, interestRate, amortization) : 0;

  // Calcul basé sur le ratio ATD (44% max)
  // ATD = (Paiement hypothécaire + chauffage + taxes + 50% condo + dettes) / revenu mensuel brut
  const maxATDPayment = (monthlyIncome * 0.44) - fixedHousingCosts - monthlyDebts;
  const maxBorrowingATD = maxATDPayment > 0 ? calculateMaxPrincipal(maxATDPayment, interestRate, amortization) : 0;

  // Le montant maximum est le plus restrictif des deux
  const maxBorrowingAmount = Math.min(maxBorrowingABD, maxBorrowingATD);
  const maxPurchasePrice = maxBorrowingAmount + downPayment;

  // Calcul des ratios actuels avec le montant maximal
  const actualMonthlyPayment = calculateMonthlyPayment(maxBorrowingAmount, interestRate, amortization);
  const totalHousingCosts = actualMonthlyPayment + fixedHousingCosts;
  const totalDebtService = totalHousingCosts + monthlyDebts;

  // Calcul des ratios selon vos formules
  // ABD = (Paiement hypothécaire + chauffage + taxes + 50% condo) / revenu brut total
  const abdRatio = ((actualMonthlyPayment + heatingCosts + propertyTaxes + (condoFees * 0.5)) / monthlyIncome) * 100;
  // ATD = (Paiement hypothécaire + chauffage + taxes + 50% condo + dettes) / revenu brut total
  const atdRatio = ((actualMonthlyPayment + heatingCosts + propertyTaxes + (condoFees * 0.5) + monthlyDebts) / monthlyIncome) * 100;

  return {
    maxBorrowingAmount: Math.max(0, Math.round(maxBorrowingAmount)),
    maxPurchasePrice: Math.max(0, Math.round(maxPurchasePrice)),
    abdRatio: Math.min(abdRatio, 39),
    atdRatio: Math.min(atdRatio, 44),
    monthlyPayment: Math.round(actualMonthlyPayment),
    housingCosts: Math.round(totalHousingCosts),
    monthlyIncome: Math.round(monthlyIncome)
  };
};
