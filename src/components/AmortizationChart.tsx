
import React, { useMemo } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface AmortizationChartProps {
  mortgageAmount: number;
  regularPayment: number;
  amortization: number;
  paymentFrequency: string;
}

const AmortizationChart = ({ mortgageAmount, regularPayment, amortization, paymentFrequency }: AmortizationChartProps) => {
  const chartData = useMemo(() => {
    const getPaymentsPerYear = (frequency: string) => {
      switch (frequency) {
        case 'monthly': return 12;
        case 'biweekly': return 26;
        case 'biweekly-accelerated': return 26;
        case 'weekly': return 52;
        default: return 12;
      }
    };

    const paymentsPerYear = getPaymentsPerYear(paymentFrequency);
    const totalPayments = Math.round(amortization * paymentsPerYear);
    
    // Calcul du taux périodique selon la capitalisation semi-annuelle canadienne
    const annualRate = 4.5; // Taux d'exemple, devrait venir des props
    const semiAnnualRate = annualRate / 2;
    const periodicRate = Math.pow(1 + semiAnnualRate / 100, 2 / paymentsPerYear) - 1;

    let remainingBalance = mortgageAmount;
    const data = [];
    
    // Générer les données pour chaque année
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

      data.push({
        year,
        interest: Math.round(yearlyInterest),
        principal: Math.round(yearlyPrincipal),
        balance: Math.round(Math.max(0, remainingBalance))
      });
    }

    return data;
  }, [mortgageAmount, regularPayment, amortization, paymentFrequency]);

  const chartConfig = {
    interest: {
      label: "Intérêts",
      color: "#fbbf24", // yellow-400
    },
    principal: {
      label: "Capital",
      color: "#3b82f6", // blue-500
    },
    balance: {
      label: "Solde restant",
      color: "#64748b", // slate-500
    },
  };

  return (
    <div className="w-full h-96">
      <ChartContainer config={chartConfig}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="year" 
            type="number"
            domain={[0, 'dataMax']}
            tickFormatter={(value) => `${value} ans`}
          />
          <YAxis 
            tickFormatter={(value) => 
              value >= 1000 ? `${(value / 1000).toFixed(0)}k$` : `${value}$`
            }
          />
          <ChartTooltip 
            content={
              <ChartTooltipContent 
                formatter={(value, name) => [
                  `${Number(value).toLocaleString('fr-CA', { 
                    style: 'currency', 
                    currency: 'CAD',
                    minimumFractionDigits: 0 
                  })}`,
                  name
                ]}
                labelFormatter={(value) => `Année ${value}`}
              />
            }
          />
          <Area
            type="monotone"
            dataKey="interest"
            stackId="1"
            stroke={chartConfig.interest.color}
            fill={chartConfig.interest.color}
            fillOpacity={0.6}
          />
          <Area
            type="monotone"
            dataKey="principal"
            stackId="1"
            stroke={chartConfig.principal.color}
            fill={chartConfig.principal.color}
            fillOpacity={0.6}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke={chartConfig.balance.color}
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ChartContainer>
    </div>
  );
};

export default AmortizationChart;
