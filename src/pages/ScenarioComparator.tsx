import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
  { name: "Desjardins", logo: "/lovable-uploads/27d233b3-ceae-4c07-8f1e-485c02cb84da.png" },
  { name: "Banque Nationale", logo: "/lovable-uploads/46afe0ab-f2da-4dce-9580-2abdedfb96b7.png" },
  { name: "TD", logo: "/lovable-uploads/d0b615ee-b5fe-461f-8eea-9864af16fdce.png" },
  { name: "Scotia", logo: "/lovable-uploads/1d6ba3f1-0247-4367-99cf-8b1f02452cd5.png" },
  { name: "Banque Laurentienne", logo: "/lovable-uploads/8b4c71c0-7241-4093-982d-eaaed3ff1efb.png" },
  { name: "MCAP", logo: "/lovable-uploads/0a1c32c8-2284-471f-8d35-0a4340aa4aaf.png" },
  { name: "Merix", logo: "/lovable-uploads/merix-logo.png" },
  { name: "Lendwise", logo: "/lovable-uploads/lendwise-logo.png" },
  { name: "Manulife", logo: "/lovable-uploads/manulife-logo.png" },
  { name: "CMLS", logo: "/lovable-uploads/cmls-logo.png" },
  { name: "First National", logo: "/lovable-uploads/b31c4af3-2ca7-49ce-a958-05195848e807.png" }
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

  const downloadPDF = async () => {
    const element = document.getElementById('scenario-table');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('l', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('comparaison-scenarios.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
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
      <div className="container mx-auto py-4 px-2">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Comparateur de Scénarios</h1>
          <div className="flex gap-2">
            <Button onClick={addScenario} className="flex items-center gap-2" size="sm">
              <Plus className="h-4 w-4" />
              Ajouter un scénario
            </Button>
            <Button onClick={downloadPDF} className="flex items-center gap-2" size="sm" variant="outline">
              <Download className="h-4 w-4" />
              Télécharger PDF
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto" id="scenario-table">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="w-24 font-semibold text-xs p-2">Critères</TableHead>
                {scenarios.map((scenario, index) => (
                  <TableHead key={scenario.id} className="text-center w-32 text-xs p-2">
                    <div className="flex items-center justify-between">
                      <span>Scénario {index + 1}</span>
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
            </TableHeader>
            <TableBody>
              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Prêteur</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <Select 
                      value={scenario.lender} 
                      onValueChange={(value) => updateScenario(scenario.id, 'lender', value)}
                    >
                      <SelectTrigger className="h-6 text-xs">
                        <SelectValue placeholder="Choisir" />
                      </SelectTrigger>
                      <SelectContent>
                        {lenders.map((lender) => (
                          <SelectItem key={lender.name} value={lender.name}>
                            <div className="flex items-center gap-2">
                              <img src={lender.logo} alt={lender.name} className="h-3 w-3 object-contain" />
                              <span className="text-xs">{lender.name}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Terme</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <Select 
                      value={scenario.term.toString()} 
                      onValueChange={(value) => updateScenario(scenario.id, 'term', parseInt(value))}
                    >
                      <SelectTrigger className="h-6 text-xs">
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

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Produit</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <Select 
                      value={scenario.product} 
                      onValueChange={(value) => updateScenario(scenario.id, 'product', value)}
                    >
                      <SelectTrigger className="h-6 text-xs">
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

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Valeur de l'achat</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <div className="relative">
                      <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs">$</span>
                      <Input
                        type="number"
                        value={scenario.purchaseValue || ''}
                        onChange={(e) => updateScenario(scenario.id, 'purchaseValue', parseFloat(e.target.value) || 0)}
                        className="h-6 pl-4 text-xs"
                      />
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Mise de fonds</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <div className="relative">
                      <span className="absolute left-1 top-1/2 transform -translate-y-1/2 text-xs">$</span>
                      <Input
                        type="number"
                        value={scenario.downPayment || ''}
                        onChange={(e) => updateScenario(scenario.id, 'downPayment', parseFloat(e.target.value) || 0)}
                        className="h-6 pl-4 text-xs"
                      />
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Emprunt de base</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
                    ${calculateBaseLoan(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Ratio prêt-valeur</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
                    {calculateLTV(scenario).toFixed(2)}%
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Prime SCHL (%)</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
                    {getCMHCPremiumRate(calculateLTV(scenario), scenario.amortization).toFixed(2)}%
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Prime SCHL ($)</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
                    ${calculateCMHCPremium(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Montant financé</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
                    ${calculateTotalFinanced(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Taux d'intérêt</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        value={scenario.interestRate.toFixed(2)}
                        onChange={(e) => updateScenario(scenario.id, 'interestRate', parseFloat(e.target.value) || 0)}
                        className="h-6 pr-4 text-xs"
                      />
                      <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs">%</span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Amortissement</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <Select 
                      value={scenario.amortization.toString()} 
                      onValueChange={(value) => updateScenario(scenario.id, 'amortization', parseInt(value))}
                    >
                      <SelectTrigger className="h-6 text-xs">
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

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Versement mensuel</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
                    ${calculateMonthlyPayment(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Versement aux 2 semaines</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
                    ${calculateBiweeklyPayment(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Versement par semaine</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
                    ${calculateWeeklyPayment(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Intérêts payés durant le terme</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
                    ${calculateTermInterest(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Capital remboursé durant le terme</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
                    ${calculateTermPrincipal(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium text-xs p-2">Solde restant à la fin du terme</TableCell>
                {scenarios.map((scenario) => (
                  <TableCell key={scenario.id} className="text-xs p-2">
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
