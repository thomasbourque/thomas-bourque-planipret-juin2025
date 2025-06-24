import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Scenario {
  id: string;
  lender: string;
  term: number;
  product: 'fixe' | 'variable';
  purchaseValue: number;
  downPayment: number;
  interestRate: number;
  amortization: number;
}

const lenders = [
  { name: "Banque Nationale", logo: "/lovable-uploads/11a31022-5658-4a44-aab3-94a9d18df466.png" },
  { name: "BMO", logo: "/lovable-uploads/27d233b3-ceae-4c07-8f1e-485c02cb84da.png" },
  { name: "RBC", logo: "/lovable-uploads/2b457b7d-e5cc-4668-8680-23b0c43c6b88.png" },
  { name: "Scotia", logo: "/lovable-uploads/3626800e-914e-43ba-ad92-b6cb1bf0563b.png" },
  { name: "TD", logo: "/lovable-uploads/46afe0ab-f2da-4dce-9580-2abdedfb96b7.png" },
  { name: "Desjardins", logo: "/lovable-uploads/488d6693-42ac-4a3e-bc89-c0812b76c8f4.png" },
  { name: "CIBC", logo: "/lovable-uploads/7b69fe5c-4c21-485d-846a-6ef6aebac0b2.png" },
  { name: "Laurentienne", logo: "/lovable-uploads/8b4c71c0-7241-4093-982d-eaaed3ff1efb.png" },
  { name: "HSBC", logo: "/lovable-uploads/8c10bc85-f6c0-4c94-8700-3836fce494f2.png" },
  { name: "Tangerine", logo: "/lovable-uploads/9d2e371a-d9bb-4900-881d-7bd2e6cdea6f.png" },
  { name: "First National", logo: "/lovable-uploads/b31c4af3-2ca7-49ce-a958-05195848e807.png" },
  { name: "MCAP", logo: "/lovable-uploads/b4f91d0a-9255-40cc-bfec-c67b07ffaf9a.png" },
  { name: "Paymi", logo: "/lovable-uploads/c701e3e1-3c8f-48b4-8565-e8d3170e3717.png" },
  { name: "Nesto", logo: "/lovable-uploads/cd618dc2-7faf-48f0-a93d-3ea8d2a0a499.png" },
  { name: "CMLS", logo: "/lovable-uploads/d0b615ee-b5fe-461f-8eea-9864af16fdce.png" },
  { name: "Vault", logo: "/lovable-uploads/d334ed50-2338-4946-8525-666d74e2684b.png" },
  { name: "Super Brokers", logo: "/lovable-uploads/dace8e51-4edc-447d-900b-93723b99dc08.png" },
  { name: "DUCA", logo: "/lovable-uploads/ddb28e45-ff43-49de-84e7-3cb508838b06.png" },
  { name: "Intellimortgage", logo: "/lovable-uploads/de462715-69bd-4600-a7d5-11825c7972d2.png" },
  { name: "CMI", logo: "/lovable-uploads/e34dfe12-e520-4741-a729-2a46caca59a3.png" },
  { name: "Manulife", logo: "/lovable-uploads/e68b4b44-21cc-4489-b34e-27d8d6e467c8.png" },
  { name: "ICICI", logo: "/lovable-uploads/e890eb15-6fc3-48da-a825-ef289e0a40df.png" },
  { name: "Home Equity Bank", logo: "/lovable-uploads/ec0926b5-d919-4514-9d3a-c5405c4cd753.png" },
  { name: "Equitable Bank", logo: "/lovable-uploads/f7ec19db-f1ec-4cb4-aeb8-d39042961b91.png" }
];

const ScenarioComparator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [scenarios, setScenarios] = useState<Scenario[]>([
    {
      id: "1",
      lender: "",
      term: 5,
      product: 'fixe',
      purchaseValue: 0,
      downPayment: 0,
      interestRate: 4.00,
      amortization: 25
    },
    {
      id: "2",
      lender: "",
      term: 5,
      product: 'fixe',
      purchaseValue: 0,
      downPayment: 0,
      interestRate: 4.00,
      amortization: 25
    }
  ]);

  const handleLogin = () => {
    if (password === "2025") {
      setIsAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  const addScenario = () => {
    if (scenarios.length < 5) {
      const newScenario: Scenario = {
        id: (scenarios.length + 1).toString(),
        lender: "",
        term: 5,
        product: 'fixe',
        purchaseValue: 0,
        downPayment: 0,
        interestRate: 4.00,
        amortization: 25
      };
      setScenarios([...scenarios, newScenario]);
    }
  };

  const removeScenario = (id: string) => {
    if (scenarios.length > 2) {
      setScenarios(scenarios.filter(s => s.id !== id));
    }
  };

  const updateScenario = (id: string, field: keyof Scenario, value: any) => {
    setScenarios(scenarios.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const calculateBaseLoan = (scenario: Scenario) => {
    return scenario.purchaseValue - scenario.downPayment;
  };

  const calculateLTV = (scenario: Scenario) => {
    if (scenario.purchaseValue === 0) return 0;
    return (calculateBaseLoan(scenario) / scenario.purchaseValue) * 100;
  };

  const getCMHCPremiumRate = (ltv: number, amortization: number) => {
    if (ltv <= 80) return 0;
    if (ltv <= 85) return amortization === 30 ? 3.0 : 2.8;
    if (ltv <= 90) return amortization === 30 ? 3.3 : 3.1;
    if (ltv <= 95) return amortization === 30 ? 4.2 : 4.0;
    return 0;
  };

  const calculateCMHCPremium = (scenario: Scenario) => {
    const baseLoan = calculateBaseLoan(scenario);
    const ltv = calculateLTV(scenario);
    const premiumRate = getCMHCPremiumRate(ltv, scenario.amortization);
    return baseLoan * (premiumRate / 100);
  };

  const calculateTotalFinanced = (scenario: Scenario) => {
    return calculateBaseLoan(scenario) + calculateCMHCPremium(scenario);
  };

  const calculateMonthlyPayment = (scenario: Scenario) => {
    const principal = calculateTotalFinanced(scenario);
    const annualRate = scenario.interestRate / 100;
    const amortizationMonths = scenario.amortization * 12;
    
    if (annualRate === 0) return principal / amortizationMonths;
    
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate, 2/12) - 1;
    
    const numerator = principal * monthlyEquivalentRate * Math.pow(1 + monthlyEquivalentRate, amortizationMonths);
    const denominator = Math.pow(1 + monthlyEquivalentRate, amortizationMonths) - 1;
    
    return numerator / denominator;
  };

  const calculateBiweeklyPayment = (scenario: Scenario) => {
    const monthlyPayment = calculateMonthlyPayment(scenario);
    return (monthlyPayment * 12) / 26;
  };

  const calculateWeeklyPayment = (scenario: Scenario) => {
    return calculateBiweeklyPayment(scenario) / 2;
  };

  const calculateTermInterest = (scenario: Scenario) => {
    const monthlyPayment = calculateMonthlyPayment(scenario);
    const principal = calculateTotalFinanced(scenario);
    const termMonths = scenario.term * 12;
    const annualRate = scenario.interestRate / 100;
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate, 2/12) - 1;
    
    const remainingBalance = calculateRemainingBalance(principal, monthlyEquivalentRate, monthlyPayment, termMonths);
    const principalPaid = principal - remainingBalance;
    const totalPayments = monthlyPayment * termMonths;
    
    return totalPayments - principalPaid;
  };

  const calculateTermPrincipal = (scenario: Scenario) => {
    const principal = calculateTotalFinanced(scenario);
    const monthlyPayment = calculateMonthlyPayment(scenario);
    const termMonths = scenario.term * 12;
    const annualRate = scenario.interestRate / 100;
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate, 2/12) - 1;
    
    const remainingBalance = calculateRemainingBalance(principal, monthlyEquivalentRate, monthlyPayment, termMonths);
    return principal - remainingBalance;
  };

  const calculateRemainingBalance = (principal: number, rate: number, payment: number, paymentsMade: number) => {
    if (rate === 0) {
      return Math.max(0, principal - (payment * paymentsMade));
    }
    
    const compoundFactor = Math.pow(1 + rate, paymentsMade);
    const balanceGrowth = principal * compoundFactor;
    const paymentSum = payment * ((compoundFactor - 1) / rate);
    
    return Math.max(0, balanceGrowth - paymentSum);
  };

  const calculateTermRemainingBalance = (scenario: Scenario) => {
    const principal = calculateTotalFinanced(scenario);
    const monthlyPayment = calculateMonthlyPayment(scenario);
    const termMonths = scenario.term * 12;
    const annualRate = scenario.interestRate / 100;
    const semiAnnualRate = annualRate / 2;
    const monthlyEquivalentRate = Math.pow(1 + semiAnnualRate, 2/12) - 1;
    
    return calculateRemainingBalance(principal, monthlyEquivalentRate, monthlyPayment, termMonths);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center">Accès Courtiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <Button onClick={handleLogin} className="w-full">
                Se connecter
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Comparateur de Scénarios</h1>
          {scenarios.length < 5 && (
            <Button onClick={addScenario} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un scénario
            </Button>
          )}
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-full text-xs">
            <TableHeader>
              <TableRow className="h-6">
                <TableHead className="w-24 font-semibold p-1"></TableHead>
                {scenarios.map((scenario, index) => (
                  <TableHead key={scenario.id} className="text-center min-w-24 p-1">
                    <div className="flex flex-col items-center">
                      <div className="font-bold text-sm mb-1">Scénario #{index + 1}</div>
                      {scenarios.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeScenario(scenario.id)}
                          className="h-4 w-4 p-0"
                        >
                          <X className="h-2 w-2" />
                        </Button>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
              <TableRow className="h-6">
                <TableHead className="w-24 font-semibold p-1">Critères</TableHead>
                {scenarios.map((scenario) => (
                  <TableHead key={scenario.id} className="text-center min-w-24 p-1">
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Prêteur</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <Select 
                      value={scenario.lender} 
                      onValueChange={(value) => updateScenario(scenario.id, 'lender', value)}
                    >
                      <SelectTrigger className="h-5 text-xs">
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        {lenders.map((lender) => (
                          <SelectItem key={lender.name} value={lender.name}>
                            <div className="flex items-center gap-2">
                              <img src={lender.logo} alt={lender.name} className="h-3 w-3 object-contain" />
                              {lender.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Terme</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <Select 
                      value={scenario.term.toString()} 
                      onValueChange={(value) => updateScenario(scenario.id, 'term', parseInt(value))}
                    >
                      <SelectTrigger className="h-5 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year} an{year > 1 ? 's' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Produit</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <Select 
                      value={scenario.product} 
                      onValueChange={(value) => updateScenario(scenario.id, 'product', value)}
                    >
                      <SelectTrigger className="h-5 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixe">Fixe</SelectItem>
                        <SelectItem value="variable">Variable</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Valeur de l'achat</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <div className="relative">
                      <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs">$</span>
                      <Input
                        type="number"
                        value={scenario.purchaseValue || ''}
                        onChange={(e) => updateScenario(scenario.id, 'purchaseValue', parseFloat(e.target.value) || 0)}
                        className="h-5 pl-4 text-xs"
                      />
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Mise de fonds</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <div className="relative">
                      <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs">$</span>
                      <Input
                        type="number"
                        value={scenario.downPayment || ''}
                        onChange={(e) => updateScenario(scenario.id, 'downPayment', parseFloat(e.target.value) || 0)}
                        className="h-5 pl-4 text-xs"
                      />
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Emprunt de base</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateBaseLoan(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Ratio prêt-valeur</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    {calculateLTV(scenario).toFixed(2)}%
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Prime SCHL (%)</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    {getCMHCPremiumRate(calculateLTV(scenario), scenario.amortization).toFixed(2)}%
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Prime SCHL ($)</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateCMHCPremium(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Montant financé</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateTotalFinanced(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Taux d'intérêt</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={scenario.interestRate.toFixed(2)}
                        onChange={(e) => updateScenario(scenario.id, 'interestRate', parseFloat(e.target.value) || 0)}
                        className="h-5 pr-4 text-xs"
                      />
                      <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs">%</span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Amortissement</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <Select 
                      value={scenario.amortization.toString()} 
                      onValueChange={(value) => updateScenario(scenario.id, 'amortization', parseInt(value))}
                    >
                      <SelectTrigger className="h-5 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="25">25 ans</SelectItem>
                        <SelectItem value="30">30 ans</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Versement mensuel</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateMonthlyPayment(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Versement aux 2 semaines</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateBiweeklyPayment(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Versement par semaine</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateWeeklyPayment(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Intérêts payés durant le terme</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateTermInterest(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Capital remboursé durant le terme</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateTermPrincipal(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-6">
                <TableCell className="font-medium p-1">Solde restant à la fin du terme</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateTermRemainingBalance(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ScenarioComparator;
