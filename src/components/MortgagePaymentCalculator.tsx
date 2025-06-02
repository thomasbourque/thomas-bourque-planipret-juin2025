
import React, { useState, useEffect } from "react";
import { calculateMortgagePayment } from "@/utils/mortgagePaymentCalculations";
import MortgagePaymentForm from "./MortgagePaymentForm";
import MortgagePaymentResults from "./MortgagePaymentResults";

const MortgagePaymentCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [downPaymentType, setDownPaymentType] = useState<'amount' | 'percentage'>('amount');
  const [downPaymentPercentage, setDownPaymentPercentage] = useState(20);
  const [amortizationYears, setAmortizationYears] = useState(25);
  const [amortizationMonths, setAmortizationMonths] = useState(0);
  const [term, setTerm] = useState(5);
  const [interestRate, setInterestRate] = useState([4.5]);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');

  // Update percentage when amount changes
  useEffect(() => {
    if (downPaymentType === 'amount' && purchasePrice > 0) {
      setDownPaymentPercentage((downPayment / purchasePrice) * 100);
    }
  }, [downPayment, purchasePrice, downPaymentType]);

  // Update amount when purchase price changes and type is percentage
  useEffect(() => {
    if (downPaymentType === 'percentage') {
      setDownPayment(purchasePrice * (downPaymentPercentage / 100));
    }
  }, [purchasePrice, downPaymentPercentage, downPaymentType]);

  const totalAmortizationYears = amortizationYears + (amortizationMonths / 12);

  const results = calculateMortgagePayment({
    purchasePrice,
    downPayment,
    amortization: totalAmortizationYears,
    term,
    interestRate: interestRate[0],
    paymentFrequency: paymentFrequency as 'monthly' | 'biweekly' | 'biweekly-accelerated' | 'weekly'
  });

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-slate-900 mb-6">
              Calculateur de paiement hypothécaire
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Calculez vos paiements hypothécaires mensuels et découvrez le coût total de votre hypothèque sur le terme et l'amortissement complet.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              <MortgagePaymentForm
                purchasePrice={purchasePrice}
                setPurchasePrice={setPurchasePrice}
                downPayment={downPayment}
                setDownPayment={setDownPayment}
                downPaymentType={downPaymentType}
                setDownPaymentType={setDownPaymentType}
                downPaymentPercentage={downPaymentPercentage}
                setDownPaymentPercentage={setDownPaymentPercentage}
                amortizationYears={amortizationYears}
                setAmortizationYears={setAmortizationYears}
                amortizationMonths={amortizationMonths}
                setAmortizationMonths={setAmortizationMonths}
                term={term}
                setTerm={setTerm}
                interestRate={interestRate}
                setInterestRate={setInterestRate}
                paymentFrequency={paymentFrequency}
                setPaymentFrequency={setPaymentFrequency}
              />
              
              <MortgagePaymentResults 
                results={results} 
                term={term} 
                amortization={totalAmortizationYears}
                paymentFrequency={paymentFrequency}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgagePaymentCalculator;
