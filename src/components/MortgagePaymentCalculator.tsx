
import React, { useState } from "react";
import { calculateMortgagePayment } from "@/utils/mortgagePaymentCalculations";
import MortgagePaymentForm from "./MortgagePaymentForm";
import MortgagePaymentResults from "./MortgagePaymentResults";

const MortgagePaymentCalculator = () => {
  const [purchasePrice, setPurchasePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [amortization, setAmortization] = useState(25);
  const [term, setTerm] = useState(5);
  const [interestRate, setInterestRate] = useState([4.5]);
  const [paymentFrequency, setPaymentFrequency] = useState('monthly');

  const results = calculateMortgagePayment({
    purchasePrice,
    downPayment,
    amortization,
    term,
    interestRate: interestRate[0],
    paymentFrequency: paymentFrequency as 'monthly' | 'biweekly' | 'weekly'
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

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              <MortgagePaymentForm
                purchasePrice={purchasePrice}
                setPurchasePrice={setPurchasePrice}
                downPayment={downPayment}
                setDownPayment={setDownPayment}
                amortization={amortization}
                setAmortization={setAmortization}
                term={term}
                setTerm={setTerm}
                interestRate={interestRate}
                setInterestRate={setInterestRate}
                paymentFrequency={paymentFrequency}
                setPaymentFrequency={setPaymentFrequency}
              />
              
              <MortgagePaymentResults results={results} term={term} amortization={amortization} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MortgagePaymentCalculator;
