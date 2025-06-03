
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
  cmhcPremium: number;
  totalMortgageAmount: number;
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

  // Calcul de la prime d'assurance hypothécaire SCHL
  const calculateCMHCPremium = (purchasePrice: number, downPayment: number) => {
    const loanToValueRatio = ((purchasePrice - downPayment) / purchasePrice) * 100;
    
    if (loanToValueRatio <= 80) return 0;
    if (loanToValueRatio <= 85) return (purchasePrice - downPayment) * 0.028;
    if (loanToValueRatio <= 90) return (purchasePrice - downPayment) * 0.031;
    if (loanToValueRatio <= 95) return (purchasePrice - downPayment) * 0.04;
    
    return 0; // Au-dessus de 95% n'est pas permis
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
  const fixedHousingCosts = heatingCosts + (propertyTaxes / 12) + (condoFees * 0.5);

  // Fonction pour calculer le montant maximal en tenant compte de la prime SCHL
  const calculateMaxBorrowingWithCMHC = (maxPayment: number) => {
    if (maxPayment <= 0) return { maxBorrowing: 0, maxPurchase: 0, cmhcPremium: 0 };

    // Estimation initiale sans prime SCHL
    let estimatedBorrowing = calculateMaxPrincipal(maxPayment, interestRate, amortization);
    let estimatedPurchase = estimatedBorrowing + downPayment;
    let cmhcPremium = calculateCMHCPremium(estimatedPurchase, downPayment);
    
    // Ajustement itératif pour tenir compte de la prime SCHL
    for (let i = 0; i < 10; i++) {
      const totalMortgageWithPremium = estimatedBorrowing + cmhcPremium;
      const calculatedPayment = calculateMonthlyPayment(totalMortgageWithPremium, interestRate, amortization);
      
      if (calculatedPayment <= maxPayment) {
        break;
      }
      
      // Réduire le montant d'emprunt
      estimatedBorrowing *= 0.95;
      estimatedPurchase = estimatedBorrowing + downPayment;
      cmhcPremium = calculateCMHCPremium(estimatedPurchase, downPayment);
    }

    return {
      maxBorrowing: estimatedBorrowing,
      maxPurchase: estimatedPurchase,
      cmhcPremium: cmhcPremium
    };
  };

  // Calcul basé sur le ratio ABD (39% max)
  const maxABDPayment = (monthlyIncome * 0.39) - fixedHousingCosts;
  const abdResult = calculateMaxBorrowingWithCMHC(maxABDPayment);

  // Calcul basé sur le ratio ATD (44% max)
  const maxATDPayment = (monthlyIncome * 0.44) - fixedHousingCosts - monthlyDebts;
  const atdResult = calculateMaxBorrowingWithCMHC(maxATDPayment);

  // Le montant maximum est le plus restrictif des deux
  const finalResult = abdResult.maxBorrowing < atdResult.maxBorrowing ? abdResult : atdResult;
  const maxBorrowingAmount = finalResult.maxBorrowing;
  const maxPurchasePrice = finalResult.maxPurchase;
  const cmhcPremium = finalResult.cmhcPremium;
  const totalMortgageAmount = maxBorrowingAmount + cmhcPremium;

  // Calcul du paiement mensuel réel avec la prime SCHL incluse
  const actualMonthlyPayment = calculateMonthlyPayment(totalMortgageAmount, interestRate, amortization);
  const totalHousingCosts = actualMonthlyPayment + fixedHousingCosts;

  // Calcul des ratios finaux
  const abdRatio = ((actualMonthlyPayment + heatingCosts + (propertyTaxes / 12) + (condoFees * 0.5)) / monthlyIncome) * 100;
  const atdRatio = ((actualMonthlyPayment + heatingCosts + (propertyTaxes / 12) + (condoFees * 0.5) + monthlyDebts) / monthlyIncome) * 100;

  return {
    maxBorrowingAmount: Math.max(0, Math.round(maxBorrowingAmount)),
    maxPurchasePrice: Math.max(0, Math.round(maxPurchasePrice)),
    abdRatio: Math.min(abdRatio, 39),
    atdRatio: Math.min(atdRatio, 44),
    monthlyPayment: Math.round(actualMonthlyPayment),
    housingCosts: Math.round(totalHousingCosts),
    monthlyIncome: Math.round(monthlyIncome),
    cmhcPremium: Math.round(cmhcPremium),
    totalMortgageAmount: Math.round(totalMortgageAmount)
  };
};
