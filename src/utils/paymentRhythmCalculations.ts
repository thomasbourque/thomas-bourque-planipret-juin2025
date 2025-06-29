
export interface PaymentRhythmComparison {
  monthlyPayment: number;
  biweeklyPayment: number;
  acceleratedBiweeklyPayment: number;
  weeklyPayment: number;
  acceleratedWeeklyPayment: number;
  monthlyDetails: PaymentDetails;
  biweeklyDetails: PaymentDetails;
  acceleratedBiweeklyDetails: PaymentDetails;
  weeklyDetails: PaymentDetails;
  acceleratedWeeklyDetails: PaymentDetails;
}

export interface PaymentDetails {
  payment: number;
  totalInterest: number;
  totalPayments: number;
  payoffTime: number; // en mois
  interestSavings: number; // par rapport au mensuel
  timeSavings: number; // en mois par rapport au mensuel
}

export const calculatePaymentRhythms = (
  mortgageAmount: number,
  annualRate: number,
  amortizationYears: number
): PaymentRhythmComparison => {
  const amortizationMonths = amortizationYears * 12;
  
  // Conversion du taux annuel composé semi-annuellement en taux mensuel équivalent
  const semiAnnualRate = annualRate / 2;
  const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate / 100, 2/12) - 1;
  
  // Calcul du paiement mensuel
  const monthlyPayment = calculateMonthlyPayment(mortgageAmount, monthlyEquivalentRate, amortizationMonths);
  
  // Calculs pour chaque rythme de paiement
  const monthlyDetails = calculatePaymentDetails(mortgageAmount, monthlyEquivalentRate, monthlyPayment, 12);
  
  // Aux deux semaines (26 paiements par année)
  const biweeklyPayment = (monthlyPayment * 12) / 26;
  const biweeklyDetails = calculatePaymentDetails(mortgageAmount, monthlyEquivalentRate, biweeklyPayment, 26);
  
  // Accéléré aux deux semaines (paiement mensuel / 2)
  const acceleratedBiweeklyPayment = monthlyPayment / 2;
  const acceleratedBiweeklyDetails = calculatePaymentDetails(mortgageAmount, monthlyEquivalentRate, acceleratedBiweeklyPayment, 26);
  
  // Hebdomadaire (52 paiements par année)
  const weeklyPayment = (monthlyPayment * 12) / 52;
  const weeklyDetails = calculatePaymentDetails(mortgageAmount, monthlyEquivalentRate, weeklyPayment, 52);
  
  // Hebdomadaire accéléré (paiement mensuel / 4)
  const acceleratedWeeklyPayment = monthlyPayment / 4;
  const acceleratedWeeklyDetails = calculatePaymentDetails(mortgageAmount, monthlyEquivalentRate, acceleratedWeeklyPayment, 52);
  
  return {
    monthlyPayment,
    biweeklyPayment,
    acceleratedBiweeklyPayment,
    weeklyPayment,
    acceleratedWeeklyPayment,
    monthlyDetails,
    biweeklyDetails,
    acceleratedBiweeklyDetails,
    weeklyDetails,
    acceleratedWeeklyDetails
  };
};

const calculateMonthlyPayment = (principal: number, monthlyRate: number, totalMonths: number): number => {
  if (monthlyRate === 0) return principal / totalMonths;
  
  const numerator = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths);
  const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
  
  return numerator / denominator;
};

const calculatePaymentDetails = (
  principal: number,
  monthlyRate: number,
  payment: number,
  paymentsPerYear: number
): PaymentDetails => {
  let balance = principal;
  let totalInterest = 0;
  let totalPayments = 0;
  
  // Calcul du taux par période de paiement
  const periodRate = monthlyRate * (12 / paymentsPerYear);
  
  while (balance > 0.01 && totalPayments < 50 * paymentsPerYear) {
    const interestPayment = balance * periodRate;
    const principalPayment = Math.min(payment - interestPayment, balance);
    
    if (principalPayment <= 0) break;
    
    totalInterest += interestPayment;
    balance -= principalPayment;
    totalPayments++;
  }
  
  const payoffTimeMonths = totalPayments * (12 / paymentsPerYear);
  
  return {
    payment,
    totalInterest,
    totalPayments,
    payoffTime: payoffTimeMonths,
    interestSavings: 0, // Sera calculé par rapport au mensuel
    timeSavings: 0 // Sera calculé par rapport au mensuel
  };
};
