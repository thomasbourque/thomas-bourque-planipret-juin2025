import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Copy, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import jsPDF from 'jspdf';

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
  { name: "Desjardins", logo: "/lovable-uploads/488d6693-42ac-4a3e-bc89-c0812b76c8f4.png" },
  { name: "Banque Nationale", logo: "/lovable-uploads/11a31022-5658-4a44-aab3-94a9d18df466.png" },
  { name: "TD", logo: "/lovable-uploads/46afe0ab-f2da-4dce-9580-2abdedfb96b7.png" },
  { name: "Scotia", logo: "/lovable-uploads/3626800e-914e-43ba-ad92-b6cb1bf0563b.png" },
  { name: "Laurentienne", logo: "/lovable-uploads/8b4c71c0-7241-4093-982d-eaaed3ff1efb.png" },
  { name: "MCAP", logo: "/lovable-uploads/b4f91d0a-9255-40cc-bfec-c67b07ffaf9a.png" },
  { name: "Merix", logo: "/lovable-uploads/0341a932-9b2b-4ac8-9507-51acbe1dc9ea.png" },
  { name: "Lendwise", logo: "/lovable-uploads/488d6693-42ac-4a3e-bc89-c0812b76c8f4.png" },
  { name: "Manulife", logo: "/lovable-uploads/e68b4b44-21cc-4489-b34e-27d8d6e467c8.png" },
  { name: "CMLS", logo: "/lovable-uploads/d0b615ee-b5fe-461f-8eea-9864af16fdce.png" },
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
    },
    {
      id: "3",
      lender: "",
      term: 5,
      product: 'fixe',
      purchaseValue: 0,
      downPayment: 0,
      interestRate: 4.00,
      amortization: 25
    },
    {
      id: "4",
      lender: "",
      term: 5,
      product: 'fixe',
      purchaseValue: 0,
      downPayment: 0,
      interestRate: 4.00,
      amortization: 25
    },
    {
      id: "5",
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
        id: (Date.now()).toString(), // Use timestamp to ensure unique IDs
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
    if (scenarios.length > 1) {
      const updatedScenarios = scenarios.filter(s => s.id !== id);
      // Ensure we never have more than 5 scenarios
      setScenarios(updatedScenarios.slice(0, 5));
    }
  };

  const duplicateFirstScenario = () => {
    if (scenarios.length > 0) {
      const firstScenario = scenarios[0];
      const updatedScenarios = scenarios.map((scenario, index) => {
        if (index === 0) return scenario; // Keep the first scenario unchanged
        return {
          ...scenario,
          lender: firstScenario.lender,
          term: firstScenario.term,
          product: firstScenario.product,
          purchaseValue: firstScenario.purchaseValue,
          downPayment: firstScenario.downPayment,
          interestRate: firstScenario.interestRate,
          amortization: firstScenario.amortization
        };
      });
      // Ensure we never have more than 5 scenarios
      setScenarios(updatedScenarios.slice(0, 5));
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

  const generatePDF = () => {
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    
    // Add logos
    try {
      // Add Planiprêt logo (top left)
      pdf.addImage('/logos/planipret-logo.png', 'PNG', 20, 10, 30, 15);
      
      // Add TB logo (top right)  
      pdf.addImage('/lovable-uploads/d334ed50-2338-4946-8525-666d74e2684b.png', 'PNG', 240, 10, 20, 20);
    } catch (error) {
      console.log('Logos could not be loaded');
    }
    
    // Title - centered
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Comparateur de Scénarios Hypothécaires', 148, 40, { align: 'center' });
    
    // Subtitle
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text('Thomas Bourque - Courtier Hypothécaire', 148, 50, { align: 'center' });
    
    // Draw a line under the header
    pdf.setLineWidth(0.5);
    pdf.line(20, 55, 277, 55);
    
    let yPosition = 70;
    
    // Set font size for table
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    
    // Column widths - adjusted to prevent overlap
    const firstColWidth = 55; // Increased width for criteria column
    const colWidth = (277 - 20 - firstColWidth) / scenarios.length; // Dynamic width based on number of scenarios
    
    // Headers with background color
    pdf.setFillColor(230, 230, 230);
    pdf.rect(20, yPosition - 5, firstColWidth, 10, 'F');
    pdf.setFont('helvetica', 'bold');
    pdf.text('Critères', 22, yPosition);
    
    scenarios.forEach((_, index) => {
      const xPos = 20 + firstColWidth + (index * colWidth);
      pdf.setFillColor(230, 230, 230);
      pdf.rect(xPos, yPosition - 5, colWidth, 10, 'F');
      pdf.text(`Scénario #${index + 1}`, xPos + 2, yPosition);
    });
    
    yPosition += 15;
    
    // Table rows data with better formatting
    const rows = [
      ['Prêteur', ...scenarios.map(s => s.lender || 'Non sélectionné')],
      ['Terme', ...scenarios.map(s => `${s.term} an${s.term > 1 ? 's' : ''}`)],
      ['Produit', ...scenarios.map(s => s.product === 'fixe' ? 'Fixe' : 'Variable')],
      ['Taux d\'intérêt', ...scenarios.map(s => `${s.interestRate.toFixed(2)}%`)],
      ['Amortissement', ...scenarios.map(s => `${s.amortization} ans`)],
      ['Valeur de l\'achat', ...scenarios.map(s => `${s.purchaseValue.toLocaleString('fr-CA')} $`)],
      ['Mise de fonds', ...scenarios.map(s => `${s.downPayment.toLocaleString('fr-CA')} $`)],
      ['Emprunt de base', ...scenarios.map(s => `${calculateBaseLoan(s).toLocaleString('fr-CA')} $`)],
      ['Ratio prêt-valeur', ...scenarios.map(s => `${calculateLTV(s).toFixed(1)}%`)],
      ['Prime SCHL (%)', ...scenarios.map(s => `${getCMHCPremiumRate(calculateLTV(s), s.amortization).toFixed(2)}%`)],
      ['Prime SCHL ($)', ...scenarios.map(s => `${calculateCMHCPremium(s).toLocaleString('fr-CA')} $`)],
      ['Montant financé', ...scenarios.map(s => `${calculateTotalFinanced(s).toLocaleString('fr-CA')} $`)],
      ['Versement mensuel', ...scenarios.map(s => `${calculateMonthlyPayment(s).toLocaleString('fr-CA', { maximumFractionDigits: 0 })} $`)],
      ['Versement aux 2 semaines', ...scenarios.map(s => `${calculateBiweeklyPayment(s).toLocaleString('fr-CA', { maximumFractionDigits: 0 })} $`)],
      ['Versement par semaine', ...scenarios.map(s => `${calculateWeeklyPayment(s).toLocaleString('fr-CA', { maximumFractionDigits: 0 })} $`)],
      ['Intérêts payés durant le terme', ...scenarios.map(s => `${calculateTermInterest(s).toLocaleString('fr-CA')} $`)],
      ['Capital remboursé durant le terme', ...scenarios.map(s => `${calculateTermPrincipal(s).toLocaleString('fr-CA')} $`)],
      ['Solde restant à la fin du terme', ...scenarios.map(s => `${calculateTermRemainingBalance(s).toLocaleString('fr-CA')} $`)],
    ];
    
    // Draw table rows with alternating colors
    rows.forEach((row, rowIndex) => {
      // Alternate row colors
      if (rowIndex % 2 === 1) {
        pdf.setFillColor(248, 248, 248);
        pdf.rect(20, yPosition - 3, 257, 8, 'F');
      }
      
      // Draw borders
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.1);
      pdf.rect(20, yPosition - 3, firstColWidth, 8);
      
      // First column (criteria)
      pdf.setFont('helvetica', 'bold');
      pdf.text(row[0] || '', 22, yPosition);
      
      // Data columns
      pdf.setFont('helvetica', 'normal');
      row.slice(1).forEach((cell, index) => {
        const xPos = 20 + firstColWidth + (index * colWidth);
        pdf.rect(xPos, yPosition - 3, colWidth, 8);
        
        // Truncate text if too long for cell
        let displayText = cell || '';
        if (displayText.length > 15) {
          displayText = displayText.substring(0, 12) + '...';
        }
        
        pdf.text(displayText, xPos + 2, yPosition);
      });
      yPosition += 8;
    });
    
    // Footer
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.text(`Généré le ${new Date().toLocaleDateString('fr-CA')}`, 20, 190);
    pdf.text('Thomas Bourque - Courtier Hypothécaire', 200, 190);
    
    // Save the PDF
    pdf.save('comparateur-scenarios.pdf');
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
      <div className="container mx-auto py-4 pt-32">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Comparateur de Scénarios</h1>
            <Button 
              onClick={generatePDF} 
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white"
            >
              <Download className="h-4 w-4" />
              Télécharger PDF
            </Button>
          </div>
          <div className="flex gap-2">
            <Button onClick={duplicateFirstScenario} className="flex items-center gap-2" variant="outline">
              <Copy className="h-4 w-4" />
              Dupliquer scénario #1
            </Button>
            <Button onClick={addScenario} className="flex items-center gap-2" disabled={scenarios.length >= 5}>
              <Plus className="h-4 w-4" />
              Ajouter un scénario
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table className="min-w-full text-xs">
            <TableHeader>
              <TableRow className="h-8">
                <TableHead className="w-32 font-semibold p-1"></TableHead>
                {scenarios.slice(0, 5).map((scenario, index) => (
                  <TableHead key={scenario.id} className="text-center min-w-32 p-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">Scénario #{index + 1}</span>
                      {scenarios.length > 1 && (
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
                <TableCell className="font-medium p-1">Prêteur</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
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
                              {lender.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Terme</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
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
                <TableCell className="font-medium p-1">Produit</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
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
                <TableCell className="font-medium p-1">Taux d'intérêt</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1">
                    <div className="relative">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        max="20"
                        value={scenario.interestRate}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value) && value >= 0 && value <= 20) {
                            updateScenario(scenario.id, 'interestRate', value);
                          } else if (e.target.value === '') {
                            updateScenario(scenario.id, 'interestRate', 0);
                          }
                        }}
                        className="h-6 pr-4 text-xs"
                      />
                      <span className="absolute right-1 top-1/2 transform -translate-y-1/2 text-xs">%</span>
                    </div>
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Amortissement</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
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
                <TableCell className="font-medium p-1">Valeur de l'achat</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
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
                <TableCell className="font-medium p-1">Mise de fonds</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
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

              {/* Keep all the calculated rows the same with slice(0, 5) applied */}
              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Emprunt de base</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateBaseLoan(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Ratio prêt-valeur</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    {calculateLTV(scenario).toFixed(2)}%
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Prime SCHL (%)</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    {getCMHCPremiumRate(calculateLTV(scenario), scenario.amortization).toFixed(2)}%
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Prime SCHL ($)</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateCMHCPremium(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Montant financé</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateTotalFinanced(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Versement mensuel</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateMonthlyPayment(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Versement aux 2 semaines</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateBiweeklyPayment(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Versement par semaine</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateWeeklyPayment(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 2 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Intérêts payés durant le terme</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateTermInterest(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Capital remboursé durant le terme</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
                  <TableCell key={scenario.id} className="p-1 text-xs">
                    ${calculateTermPrincipal(scenario).toLocaleString('fr-CA', { maximumFractionDigits: 0 })}
                  </TableCell>
                ))}
              </TableRow>

              <TableRow className="h-8">
                <TableCell className="font-medium p-1">Solde restant à la fin du terme</TableCell>
                {scenarios.slice(0, 5).map((scenario) => (
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
