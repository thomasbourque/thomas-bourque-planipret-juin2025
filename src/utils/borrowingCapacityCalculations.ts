
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
  mortgageInsurancePremium: number;
  mortgageInsuranceRate: number;
  loanToValueRatio: number;
  abdAvailablePayment: number;
  atdAvailablePayment: number;
  isConstrainedByDownPayment: boolean;
  isConstrainedByMinimumDownPayment: boolean;
  minimumDownPaymentRequired: number;
}

const calculateMinimumDownPayment = (purchasePrice: number): number => {
  if (purchasePrice <= 500000) {
    return purchasePrice * 0.05;
  } else {
    return 500000 * 0.05 + (purchasePrice - 500000) * 0.10;
  }
};

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
  const monthlyPropertyTaxes = propertyTaxes / 12;
  const halfCondoFees = condoFees * 0.5;

  // Étape 1: Calcul ABD - 39% du revenu moins les charges fixes
  const abdAvailablePayment = Math.max(0, (monthlyIncome * 0.39) - monthlyPropertyTaxes - heatingCosts - halfCondoFees);

  // Étape 2: Calcul ATD - 44% du revenu moins les charges fixes et autres dettes
  const atdAvailablePayment = Math.max(0, (monthlyIncome * 0.44) - monthlyPropertyTaxes - heatingCosts - monthlyDebts - halfCondoFees);

  // Étape 3: Prendre le plus petit des deux paiements disponibles
  const selectedPayment = Math.min(abdAvailablePayment, atdAvailablePayment);

  // Calcul du prêt hypothécaire maximal avec le paiement sélectionné
  const calculateMaxPrincipal = (monthlyPayment: number, annualRate: number, amortizationYears: number) => {
    if (annualRate === 0) return monthlyPayment * amortizationYears * 12;
    
    const amortizationMonths = amortizationYears * 12;
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    const denominator = monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, amortizationMonths);
    const numerator = Math.pow(1 + monthlyEquivalentRate, amortizationMonths) - 1;
    
    return monthlyPayment * (numerator / denominator);
  };

  let maxLoanAmount = calculateMaxPrincipal(selectedPayment, interestRate, amortization);

  // Contrainte principale: Le ratio prêt-valeur ne peut jamais dépasser 95%
  // Cela signifie que la mise de fonds doit être au moins 5% du prix d'achat
  const maxPurchasePriceBasedOnDownPayment = downPayment / 0.05;
  
  // Prix d'achat maximal initial basé sur la capacité de paiement
  let initialMaxPurchasePrice = maxLoanAmount + downPayment;
  
  // Appliquer la contrainte de mise de fonds minimale de 5%
  let maxPurchasePrice = Math.min(initialMaxPurchasePrice, maxPurchasePriceBasedOnDownPayment);
  let isConstrainedByDownPayment = maxPurchasePriceBasedOnDownPayment < initialMaxPurchasePrice;

  // Contrainte supplémentaire: Vérification de la mise de fonds minimale progressive
  const minimumDownPaymentRequired = calculateMinimumDownPayment(maxPurchasePrice);
  let isConstrainedByMinimumDownPayment = false;

  if (downPayment < minimumDownPaymentRequired) {
    // Calculer le prix d'achat maximal basé sur la mise de fonds disponible
    let adjustedMaxPrice = maxPurchasePrice;
    
    // Résolution itérative pour trouver le prix maximal respectant la règle de mise de fonds progressive
    for (let testPrice = maxPurchasePrice; testPrice >= 0; testPrice -= 1000) {
      const requiredDownPayment = calculateMinimumDownPayment(testPrice);
      if (downPayment >= requiredDownPayment) {
        adjustedMaxPrice = testPrice;
        break;
      }
    }
    
    if (adjustedMaxPrice < maxPurchasePrice) {
      maxPurchasePrice = adjustedMaxPrice;
      isConstrainedByMinimumDownPayment = true;
    }
  }

  // Recalculer le montant de prêt final
  maxLoanAmount = maxPurchasePrice - downPayment;

  // Calcul du ratio prêt-valeur final (ne devrait jamais dépasser 95%)
  const loanToValueRatio = Math.min((maxLoanAmount / maxPurchasePrice) * 100, 95);

  // Calcul de la prime d'assurance hypothécaire
  let mortgageInsuranceRate = 0;
  let mortgageInsurancePremium = 0;

  if (loanToValueRatio > 80) {
    // Assurance hypothécaire requise
    if (loanToValueRatio >= 90.01 && loanToValueRatio <= 95) {
      mortgageInsuranceRate = 4.0;
    } else if (loanToValueRatio >= 85.01 && loanToValueRatio <= 90) {
      mortgageInsuranceRate = 3.1;
    } else if (loanToValueRatio >= 80.01 && loanToValueRatio <= 85) {
      mortgageInsuranceRate = 2.8;
    }
    
    // Majoration de 0,2% si amortissement sur 30 ans (seulement si déjà assurable)
    if (amortization === 30 && mortgageInsuranceRate > 0) {
      mortgageInsuranceRate += 0.2;
    }
    
    mortgageInsurancePremium = maxLoanAmount * (mortgageInsuranceRate / 100);
  }

  // Ajuster le montant de prêt si nécessaire pour tenir compte de la prime
  if (mortgageInsurancePremium > 0) {
    const totalLoanWithInsurance = maxLoanAmount + mortgageInsurancePremium;
    // Si le total dépasse ce qui était calculé initialement, ajuster
    if (totalLoanWithInsurance + downPayment > maxPurchasePrice) {
      maxLoanAmount = maxPurchasePrice - downPayment - mortgageInsurancePremium;
      maxLoanAmount = Math.max(0, maxLoanAmount);
    }
  }

  // Calcul du paiement mensuel réel avec le montant final
  const calculateMonthlyPayment = (principal: number, annualRate: number, amortizationYears: number) => {
    if (annualRate === 0) return principal / (amortizationYears * 12);
    
    const amortizationMonths = amortizationYears * 12;
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
    
    const numerator = principal * monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, amortizationMonths);
    const denominator = Math.pow(1 + monthlyEquivalentRate, amortizationMonths) - 1;
    
    return numerator / denominator;
  };

  const actualMonthlyPayment = calculateMonthlyPayment(maxLoanAmount + mortgageInsurancePremium, interestRate, amortization);
  const totalHousingCosts = actualMonthlyPayment + heatingCosts + monthlyPropertyTaxes + halfCondoFees;

  // Calcul des ratios finaux
  const abdRatio = ((actualMonthlyPayment + heatingCosts + monthlyPropertyTaxes + halfCondoFees) / monthlyIncome) * 100;
  const atdRatio = ((actualMonthlyPayment + heatingCosts + monthlyPropertyTaxes + halfCondoFees + monthlyDebts) / monthlyIncome) * 100;

  return {
    maxBorrowingAmount: Math.max(0, Math.round(maxLoanAmount)),
    maxPurchasePrice: Math.max(0, Math.round(maxPurchasePrice)),
    abdRatio: Math.min(abdRatio, 39),
    atdRatio: Math.min(atdRatio, 44),
    monthlyPayment: Math.round(actualMonthlyPayment),
    housingCosts: Math.round(totalHousingCosts),
    monthlyIncome: Math.round(monthlyIncome),
    mortgageInsurancePremium: Math.round(mortgageInsurancePremium),
    mortgageInsuranceRate,
    loanToValueRatio: Math.round(loanToValueRatio * 100) / 100,
    abdAvailablePayment: Math.round(abdAvailablePayment),
    atdAvailablePayment: Math.round(atdAvailablePayment),
    isConstrainedByDownPayment,
    isConstrainedByMinimumDownPayment,
    minimumDownPaymentRequired: Math.round(minimumDownPaymentRequired)
  };
};
