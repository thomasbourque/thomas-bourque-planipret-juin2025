export interface MortgagePaymentInput {
  purchasePrice: number;
  downPayment: number;
  amortization: number;
  term: number;
  interestRate: number;
  paymentFrequency: 'monthly' | 'biweekly' | 'biweekly-accelerated' | 'weekly';
  extraPayment?: number;
  extraPaymentFrequency?: 'monthly' | 'yearly' | 'one-time';
  extraPaymentStartYear?: number;
}

export interface MortgagePaymentResult {
  mortgageAmount: number;
  regularPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalPrincipal: number;
  totalCost: number;
  numberOfPayments: number;
  finalPayment?: number;
  interestSavings?: number;
  termResults: {
    totalPayments: number;
    totalInterest: number;
    totalPrincipal: number;
    remainingBalance: number;
    interestSavings?: number;
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
    extraPaymentFrequency = 'monthly',
    extraPaymentStartYear = 1
  } = input;

  let mortgageAmount = purchasePrice - downPayment;
  const downPaymentRatio = downPayment / purchasePrice;
  
  // Calcul de la prime d'assurance hypothécaire si mise de fonds < 20%
  let mortgageInsurancePremium = 0;
  if (downPaymentRatio < 0.20) {
    const loanToValueRatio = (mortgageAmount / purchasePrice) * 100;
    let mortgageInsuranceRate = 0;
    
    if (loanToValueRatio >= 90.01 && loanToValueRatio <= 95) {
      mortgageInsuranceRate = 4.0;
    } else if (loanToValueRatio >= 85.01 && loanToValueRatio <= 90) {
      mortgageInsuranceRate = 3.1;
    } else if (loanToValueRatio >= 80.01 && loanToValueRatio <= 85) {
      mortgageInsuranceRate = 2.8;
    }
    
    // Majoration de 0,2% si amortissement sur 30 ans
    if (amortization >= 30) {
      mortgageInsuranceRate += 0.2;
    }
    
    mortgageInsurancePremium = mortgageAmount * (mortgageInsuranceRate / 100);
    mortgageAmount += mortgageInsurancePremium;
  }
  
  // Payment frequencies per year
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
  
  // Calculate periodic rate based on Canadian semi-annual compounding
  const semiAnnualRate = interestRate / 2 / 100;
  const periodicRate = Math.pow(1 + semiAnnualRate, 2 / paymentsPerYear) - 1;
  
  // Total payments for full amortization and term
  const totalAmortizationPayments = amortization * paymentsPerYear;
  const totalTermPayments = term * paymentsPerYear;
  
  // Calculate regular payment
  const calculateRegularPayment = (principal: number, rate: number, totalPayments: number) => {
    if (rate === 0) return principal / totalPayments;
    
    const numerator = principal * rate * Math.pow(1 + rate, totalPayments);
    const denominator = Math.pow(1 + rate, totalPayments) - 1;
    
    return numerator / denominator;
  };
  
  let regularPayment: number;
  let monthlyPayment: number;
  
  // Calculate monthly payment equivalent for reference
  const monthlyPeriodicRate = Math.pow(1 + semiAnnualRate, 2 / 12) - 1;
  monthlyPayment = calculateRegularPayment(mortgageAmount, monthlyPeriodicRate, amortization * 12);
  
  if (isAccelerated) {
    // For accelerated payments, divide monthly payment by 2
    regularPayment = monthlyPayment / 2;
  } else {
    regularPayment = calculateRegularPayment(mortgageAmount, periodicRate, totalAmortizationPayments);
  }
  
  // Enhanced simulation with extra payments
  let balance = mortgageAmount;
  let totalInterestPaid = 0;
  let paymentCount = 0;
  let finalPayment = 0;
  
  const epsilon = 0.01; // Tolerance for balance close to zero
  
  // Calculate extra payment per period
  let extraPerPeriod = 0;
  if (extraPayment > 0) {
    switch (extraPaymentFrequency) {
      case 'monthly':
        extraPerPeriod = extraPayment * (12 / paymentsPerYear);
        break;
      case 'yearly':
        extraPerPeriod = extraPayment / paymentsPerYear;
        break;
      case 'one-time':
        // Will be handled separately
        break;
    }
  }
  
  const extraPaymentStartPayment = (extraPaymentStartYear - 1) * paymentsPerYear;
  
  while (balance > epsilon && paymentCount < totalAmortizationPayments * 2) {
    const interestPayment = balance * periodicRate;
    let principalPayment = regularPayment - interestPayment;
    
    // Add extra payment if applicable
    let extraThisPeriod = 0;
    if (paymentCount >= extraPaymentStartPayment) {
      if (extraPaymentFrequency === 'monthly' || extraPaymentFrequency === 'yearly') {
        extraThisPeriod = extraPerPeriod;
      } else if (extraPaymentFrequency === 'one-time' && paymentCount === extraPaymentStartPayment) {
        extraThisPeriod = extraPayment;
      }
    }
    
    const totalPrincipalPayment = Math.min(principalPayment + extraThisPeriod, balance);
    
    if (totalPrincipalPayment >= balance) {
      // Final payment
      finalPayment = balance + interestPayment;
      totalInterestPaid += interestPayment;
      balance = 0;
      paymentCount++;
      break;
    } else {
      totalInterestPaid += interestPayment;
      balance -= totalPrincipalPayment;
      paymentCount++;
    }
  }
  
  const numberOfPayments = paymentCount;
  const totalAmortizationCost = (regularPayment * (numberOfPayments - 1)) + (finalPayment > 0 ? finalPayment : 0);
  
  // Calculate interest savings compared to monthly payments
  let interestSavings = 0;
  if (paymentFrequency !== 'monthly' || extraPayment > 0) {
    // Calculate monthly scenario
    let monthlyBalance = mortgageAmount;
    let monthlyTotalInterest = 0;
    let monthlyPaymentCount = 0;
    
    while (monthlyBalance > epsilon && monthlyPaymentCount < amortization * 12 * 2) {
      const monthlyInterestPayment = monthlyBalance * monthlyPeriodicRate;
      let monthlyPrincipalPayment = monthlyPayment - monthlyInterestPayment;
      
      if (monthlyPrincipalPayment >= monthlyBalance) {
        monthlyTotalInterest += monthlyInterestPayment;
        monthlyBalance = 0;
        monthlyPaymentCount++;
        break;
      } else {
        monthlyTotalInterest += monthlyInterestPayment;
        monthlyBalance -= monthlyPrincipalPayment;
        monthlyPaymentCount++;
      }
    }
    
    interestSavings = monthlyTotalInterest - totalInterestPaid;
  }
  
  // Calculate remaining balance after term
  const calculateRemainingBalance = (principal: number, rate: number, payment: number, paymentsMade: number) => {
    if (rate === 0) {
      return Math.max(0, principal - (payment * paymentsMade));
    }
    
    const compoundFactor = Math.pow(1 + rate, paymentsMade);
    const balanceGrowth = principal * compoundFactor;
    const paymentSum = payment * ((compoundFactor - 1) / rate);
    
    return Math.max(0, balanceGrowth - paymentSum);
  };
  
  // Calculations for term period
  const remainingBalanceAfterTerm = calculateRemainingBalance(
    mortgageAmount, 
    periodicRate, 
    regularPayment,
    totalTermPayments
  );
  
  const principalPaidDuringTerm = mortgageAmount - remainingBalanceAfterTerm;
  const totalPaymentsDuringTerm = regularPayment * totalTermPayments;
  const interestPaidDuringTerm = totalPaymentsDuringTerm - principalPaidDuringTerm;
  
  // Calculate term interest savings
  let termInterestSavings = 0;
  if (paymentFrequency !== 'monthly') {
    const monthlyTermPayments = term * 12;
    const monthlyRemainingBalanceAfterTerm = calculateRemainingBalance(
      mortgageAmount, 
      monthlyPeriodicRate, 
      monthlyPayment,
      monthlyTermPayments
    );
    const monthlyPrincipalPaidDuringTerm = mortgageAmount - monthlyRemainingBalanceAfterTerm;
    const monthlyTotalPaymentsDuringTerm = monthlyPayment * monthlyTermPayments;
    const monthlyInterestPaidDuringTerm = monthlyTotalPaymentsDuringTerm - monthlyPrincipalPaidDuringTerm;
    
    termInterestSavings = monthlyInterestPaidDuringTerm - interestPaidDuringTerm;
  }
  
  // Generate amortization schedule
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
    mortgageAmount: Math.round(mortgageAmount - mortgageInsurancePremium),
    regularPayment: Math.round(regularPayment * 100) / 100,
    totalPayments: Math.round(totalPaymentsDuringTerm),
    totalInterest: Math.round(interestPaidDuringTerm),
    totalPrincipal: Math.round(principalPaidDuringTerm),
    totalCost: Math.round(totalPaymentsDuringTerm),
    numberOfPayments,
    finalPayment: finalPayment > 0 ? Math.round(finalPayment * 100) / 100 : undefined,
    interestSavings: interestSavings > 0 ? Math.round(interestSavings) : undefined,
    termResults: {
      totalPayments: Math.round(totalPaymentsDuringTerm),
      totalInterest: Math.round(interestPaidDuringTerm),
      totalPrincipal: Math.round(principalPaidDuringTerm),
      remainingBalance: Math.round(remainingBalanceAfterTerm),
      interestSavings: termInterestSavings > 0 ? Math.round(termInterestSavings) : undefined
    },
    amortizationResults: {
      totalPayments: Math.round(totalAmortizationCost),
      totalInterest: Math.round(totalInterestPaid),
      totalPrincipal: Math.round(mortgageAmount)
    },
    amortizationSchedule: generateAmortizationSchedule()
  };
};
