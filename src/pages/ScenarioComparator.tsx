import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Copy, Download } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import html2canvas from 'html2canvas';
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
  { name: "Lendwise", logo: "/lovable-uploads/ddb28e45-ff43-49de-84e7-3cb508838b06.png" },
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
    if (ltv <= 80) return 0; // 0% premium when LTV is 80% or less
    if (ltv <= 85) return amortization === 30 ? 3.0 : 2.8;
    if (ltv <= 90) return amortization === 30 ? 3.3 : 3.1;
    if (ltv <= 95) return amortization === 30 ? 4.2 : 4.0;
    return 0; // Should not happen as LTV > 95% is not allowed
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

  const generatePDF = async () => {
    try {
      const tableElement = document.querySelector('.overflow-x-auto');
      if (!tableElement) return;

      // Create a temporary container with better styling for PDF
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.padding = '20px';
      tempContainer.style.width = '1200px';
      document.body.appendChild(tempContainer);

      // Clone the table with improved styling
      const clonedTable = tableElement.cloneNode(true) as HTMLElement;
      
      // Apply specific styles to fix alignment issues
      const table = clonedTable.querySelector('table');
      if (table) {
        table.style.borderCollapse = 'collapse';
        table.style.width = '100%';
        table.style.fontSize = '12px';
        table.style.lineHeight = '1.2';
      }

      // Fix cell alignment and padding
      const cells = clonedTable.querySelectorAll('td, th');
      cells.forEach(cell => {
        const htmlCell = cell as HTMLElement;
        htmlCell.style.padding = '8px 4px';
        htmlCell.style.verticalAlign = 'middle';
        htmlCell.style.textAlign = 'center';
        htmlCell.style.border = '1px solid #e5e7eb';
        htmlCell.style.backgroundColor = '#ffffff';
        htmlCell.style.height = 'auto';
        htmlCell.style.minHeight = '32px';
        htmlCell.style.display = 'table-cell';
      });

      // Fix header cells specifically
      const headerCells = clonedTable.querySelectorAll('th');
      headerCells.forEach(cell => {
        const htmlCell = cell as HTMLElement;
        htmlCell.style.backgroundColor = '#f9fafb';
        htmlCell.style.fontWeight = 'bold';
        htmlCell.style.padding = '10px 4px';
      });

      // Fix input fields in the table
      const inputs = clonedTable.querySelectorAll('input');
      inputs.forEach(input => {
        const htmlInput = input as HTMLInputElement;
        const span = document.createElement('span');
        span.textContent = htmlInput.value || htmlInput.placeholder || '';
        span.style.fontSize = '12px';
        span.style.padding = '4px';
        htmlInput.parentNode?.replaceChild(span, htmlInput);
      });

      // Fix select elements
      const selects = clonedTable.querySelectorAll('[role="combobox"]');
      selects.forEach(select => {
        const htmlSelect = select as HTMLElement;
        const span = document.createElement('span');
        const valueElement = htmlSelect.querySelector('[data-state="checked"]') || 
                            htmlSelect.querySelector('span');
        span.textContent = valueElement?.textContent || '';
        span.style.fontSize = '12px';
        span.style.padding = '4px';
        htmlSelect.parentNode?.replaceChild(span, htmlSelect);
      });

      tempContainer.appendChild(clonedTable);

      const canvas = await html2canvas(tempContainer, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false,
        useCORS: true,
        allowTaint: true,
        height: tempContainer.scrollHeight,
        width: tempContainer.scrollWidth
      });

      // Clean up temporary container
      document.body.removeChild(tempContainer);

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('landscape', 'mm', 'a4');
      
      // Add title with correct capitalization
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Comparateur de scénarios hypothécaires', 148, 20, { align: 'center' });
      
      // Add date
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Généré le ${new Date().toLocaleDateString('fr-CA')}`, 148, 30, { align: 'center' });

      // Calculate image dimensions to fit the page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min((pdfWidth - 20) / imgWidth, (pdfHeight - 50) / imgHeight);
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;
      
      const x = (pdfWidth - imgScaledWidth) / 2;
      const y = 40;

      pdf.addImage(imgData, 'PNG', x, y, imgScaledWidth, imgScaledHeight);
      
      pdf.save('comparateur-scenarios.pdf');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      alert('Erreur lors de la génération du PDF');
    }
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
      <div className="container mx-auto py-4 pt-40">
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
