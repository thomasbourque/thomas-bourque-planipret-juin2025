export interface MortgagePaymentInput {
  purchasePrice: number;
  downPayment: number;
  amortization: number;
  term: number;
  interestRate: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'biweekly-accelerated' | 'weekly';
  extraPayment?: number;
  extraPaymentFrequency?: 'monthly' | 'yearly' | 'one-time';
}

export interface MortgagePaymentResult {
  mortgageAmount: number;
  regularPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalPrincipal: number;
  totalCost: number;
  termResults: {
    totalPayments: number;
    totalInterest: number;
    totalPrincipal: number;
    remainingBalance: number;
  };
  amortizationResults: {
    totalPayments: number;
    totalInterest: number;
    totalPrincipal: number;
  };
  amortizationSchedule?: Array<{
    year: number;
    interest: number;
    principal: number;
    balance: number;
  }>;
}

export const calculateMortgagePayment = (input: MortgagePaymentInput): MortgagePaymentResult => {
  const {
    purchasePrice,
    downPayment,
    amortization,
    term,
    interestRate,
    paymentFrequency,
    extraPayment = 0,
    extraPaymentFrequency = 'monthly'
  } = input;

  const mortgageAmount = purchasePrice - downPayment;
  
  // Fréquence des paiements par année
  let paymentsPerYear: number;
  let isAccelerated = false;
  
  switch (paymentFrequency) {
    case 'monthly':
      paymentsPerYear = 12;
      break;
    case 'biweekly':
      paymentsPerYear = 26;
      break;
    case 'biweekly-accelerated':
      paymentsPerYear = 26;
      isAccelerated = true;
      break;
    case 'weekly':
      paymentsPerYear = 52;
      break;
    default:
      paymentsPerYear = 12;
  }
  
  // Calcul du taux périodique selon la capitalisation semi-annuelle canadienne
  const semiAnnualRate = interestRate / 2;
  const periodicRate = Math.pow(1 + semiAnnualRate / 100, 2 / paymentsPerYear) - 1;
  
  // Nombre total de paiements pour l'amortissement complet
  const totalAmortizationPayments = amortization * paymentsPerYear;
  const totalTermPayments = term * paymentsPerYear;
  
  // Calcul du paiement régulier
  const calculateRegularPayment = (principal: number, rate: number, totalPayments: number) => {
    if (rate === 0) return principal / totalPayments;
    
    const numerator = principal * rate * Math.pow(1 + rate, totalPayments);
    const denominator = Math.pow(1 + rate, totalPayments) - 1;
    
    return numerator / denominator;
  };
  
  let regularPayment: number;
  
  if (isAccelerated) {
    // Pour les paiements accélérés, on calcule d'abord le paiement mensuel
    const monthlyPeriodicRate = Math.pow(1 + semiAnnualRate / 100, 2 / 12) - 1;
    const monthlyPayment = calculateRegularPayment(mortgageAmount, monthlyPeriodicRate, amortization * 12);
    regularPayment = monthlyPayment / 2; // Diviser par 2 pour avoir le paiement aux 2 semaines
  } else {
    regularPayment = calculateRegularPayment(mortgageAmount, periodicRate, totalAmortizationPayments);
  }
  
  // Calcul du solde restant après un certain nombre de paiements
  const calculateRemainingBalance = (principal: number, rate: number, totalPayments: number, paymentsMade: number, payment: number) => {
    if (rate === 0) {
      return principal - (payment * paymentsMade);
    }
    
    const compoundFactor = Math.pow(1 + rate, paymentsMade);
    const balanceGrowth = principal * compoundFactor;
    const paymentSum = payment * ((compoundFactor - 1) / rate);
    
    return Math.max(0, balanceGrowth - paymentSum);
  };
  
  // Calculs pour le terme
  const remainingBalanceAfterTerm = calculateRemainingBalance(
    mortgageAmount, 
    periodicRate, 
    totalAmortizationPayments, 
    totalTermPayments, 
    regularPayment
  );
  
  const principalPaidDuringTerm = mortgageAmount - remainingBalanceAfterTerm;
  const totalPaymentsDuringTerm = regularPayment * totalTermPayments;
  const interestPaidDuringTerm = totalPaymentsDuringTerm - principalPaidDuringTerm;
  
  // Calculs pour l'amortissement complet
  const totalAmortizationCost = regularPayment * totalAmortizationPayments;
  const totalInterestAmortization = totalAmortizationCost - mortgageAmount;
  
  // Générer le calendrier d'amortissement pour le graphique
  const generateAmortizationSchedule = () => {
    let remainingBalance = mortgageAmount;
    const schedule = [];
    
    for (let year = 0; year <= amortization; year++) {
      const paymentsThisYear = year === 0 ? 0 : paymentsPerYear;
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      
      if (year > 0 && remainingBalance > 0) {
        for (let payment = 0; payment < paymentsThisYear && remainingBalance > 0; payment++) {
          const interestPayment = remainingBalance * periodicRate;
          const principalPayment = Math.min(regularPayment - interestPayment, remainingBalance);
          
          yearlyInterest += interestPayment;
          yearlyPrincipal += principalPayment;
          remainingBalance -= principalPayment;
          
          if (remainingBalance <= 0) break;
        }
      }

      schedule.push({
        year,
        interest: Math.round(yearlyInterest),
        principal: Math.round(yearlyPrincipal),
        balance: Math.round(Math.max(0, remainingBalance))
      });
    }

    return schedule;
  };

  return {
    mortgageAmount: Math.round(mortgageAmount),
    regularPayment: Math.round(regularPayment),
    totalPayments: Math.round(totalPaymentsDuringTerm),
    totalInterest: Math.round(interestPaidDuringTerm),
    totalPrincipal: Math.round(principalPaidDuringTerm),
    totalCost: Math.round(totalPaymentsDuringTerm),
    termResults: {
      totalPayments: Math.round(totalPaymentsDuringTerm),
      totalInterest: Math.round(interestPaidDuringTerm),
      totalPrincipal: Math.round(principalPaidDuringTerm),
      remainingBalance: Math.round(remainingBalanceAfterTerm)
    },
    amortizationResults: {
      totalPayments: Math.round(totalAmortizationCost),
      totalInterest: Math.round(totalInterestAmortization),
      totalPrincipal: Math.round(mortgageAmount)
    },
    amortizationSchedule: generateAmortizationSchedule()
  };
};
