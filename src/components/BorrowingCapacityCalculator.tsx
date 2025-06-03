
import React, { useState, useEffect } from "react";
import { calculateBorrowingCapacity } from "@/utils/borrowingCapacityCalculations";
import BorrowingCapacityForm from "./BorrowingCapacityForm";
import BorrowingCapacityResults from "./BorrowingCapacityResults";

const BorrowingCapacityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [coborrowersIncome, setCoborrowersIncome] = useState(0);
  const [downPayment, setDownPayment] = useState(50000);
  const [amortization, setAmortization] = useState(25);
  const [interestRate, setInterestRate] = useState([4.5]);
  const [monthlyDebts, setMonthlyDebts] = useState(0);
  const [heatingCosts, setHeatingCosts] = useState(150);
  const [propertyTaxes, setPropertyTaxes] = useState(333); // Default based on ~$400k property (1% annually / 12)
  const [condoFees, setCondoFees] = useState(0);

  const results = calculateBorrowingCapacity({
    annualIncome,
    coborrowersIncome,
    downPayment,
    amortization,
    interestRate: interestRate[0],
    monthlyDebts,
    heatingCosts,
    propertyTaxes,
    condoFees
  });

  // Update property taxes default when the max purchase price changes significantly
  useEffect(() => {
    if (results.maxPurchasePrice > 0) {
      const suggestedTaxes = Math.round((results.maxPurchasePrice * 0.01) / 12);
      if (Math.abs(propertyTaxes - suggestedTaxes) > 50) {
        setPropertyTaxes(suggestedTaxes);
      }
    }
  }, [results.maxPurchasePrice]);

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-slate-900 mb-6">
              Calculateur de capacité d'emprunt
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Découvrez le montant maximal que vous pouvez emprunter pour l'achat de votre propriété en respectant les ratios d'endettement recommandés.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
              <BorrowingCapacityForm
                annualIncome={annualIncome}
                setAnnualIncome={setAnnualIncome}
                coborrowersIncome={coborrowersIncome}
                setCoborrowersIncome={setCoborrowersIncome}
                downPayment={downPayment}
                setDownPayment={setDownPayment}
                amortization={amortization}
                setAmortization={setAmortization}
                interestRate={interestRate}
                setInterestRate={setInterestRate}
                monthlyDebts={monthlyDebts}
                setMonthlyDebts={setMonthlyDebts}
                heatingCosts={heatingCosts}
                setHeatingCosts={setHeatingCosts}
                propertyTaxes={propertyTaxes}
                setPropertyTaxes={setPropertyTaxes}
                condoFees={condoFees}
                setCondoFees={setCondoFees}
              />
              
              <BorrowingCapacityResults results={results} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BorrowingCapacityCalculator;
