
import React, { useState } from "react";
import { calculateBorrowingCapacity } from "@/utils/borrowingCapacityCalculations";
import BorrowingCapacityForm from "./BorrowingCapacityForm";
import BorrowingCapacityResults from "./BorrowingCapacityResults";

const BorrowingCapacityCalculator = () => {
  const [annualIncome, setAnnualIncome] = useState(80000);
  const [downPayment, setDownPayment] = useState(50000);
  const [amortization, setAmortization] = useState(25);
  const [interestRate, setInterestRate] = useState([4.5]);
  const [monthlyDebts, setMonthlyDebts] = useState(0);
  const [heatingCosts, setHeatingCosts] = useState(0);
  const [propertyTaxes, setPropertyTaxes] = useState(0);
  const [condoFees, setCondoFees] = useState(0);

  const results = calculateBorrowingCapacity({
    annualIncome,
    coborrowersIncome: 0,
    downPayment,
    amortization,
    interestRate: interestRate[0],
    monthlyDebts,
    heatingCosts,
    propertyTaxes,
    condoFees
  });

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="heading-lg text-slate-900 mb-4">
              Calculateur de capacité d'emprunt
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto">
              Découvrez le montant maximal que vous pouvez emprunter pour l'achat de votre propriété en respectant les ratios d'endettement recommandés.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-8">
            <div className="grid lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
              <BorrowingCapacityForm
                annualIncome={annualIncome}
                setAnnualIncome={setAnnualIncome}
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
