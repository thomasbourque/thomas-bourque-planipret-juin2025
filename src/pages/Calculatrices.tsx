
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, DollarSign, TrendingUp, Calendar, Shield, PieChart, BarChart3, Target, Clock, Home, Percent, GitCompare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Calculatrices = () => {
  const navigate = useNavigate();
  
  const calculators = [
    {
      id: "payment",
      title: "Paiement hypothécaire",
      description: "Calculez votre paiement mensuel en fonction du prix d'achat, de la mise de fonds et du taux d'intérêt.",
      icon: Calculator,
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200",
      route: "/"
    },
    {
      id: "capacity",
      title: "Capacité d'emprunt",
      description: "Déterminez le montant maximum que vous pouvez emprunter selon vos revenus et vos dépenses.",
      icon: DollarSign,
      color: "bg-amber-50 hover:bg-amber-100 border-amber-200",
      route: "/"
    },
    {
      id: "savings",
      title: "Écart de taux",
      description: "Comparez les économies réalisées en choisissant un taux d'intérêt plus avantageux.",
      icon: TrendingUp,
      color: "bg-blue-100 hover:bg-blue-200 border-blue-300",
      route: "/"
    },
    {
      id: "rhythm",
      title: "Rythme de paiement",
      description: "Analysez l'impact de différentes fréquences de paiement sur votre hypothèque.",
      icon: Calendar,
      color: "bg-yellow-50 hover:bg-yellow-100 border-yellow-200",
      route: "/preview-rythme-paiement"
    },
    {
      id: "minimum-downpayment",
      title: "Mise de fonds minimale",
      description: "Calculez la mise de fonds minimale requise selon le prix de votre propriété.",
      icon: Home,
      color: "bg-blue-200 hover:bg-blue-300 border-blue-400",
      route: "/"
    },
    {
      id: "downpayment",
      title: "Investir sa mise de fonds",
      description: "Comparez les avantages d'investir votre mise de fonds versus l'augmenter.",
      icon: Target,
      color: "bg-amber-100 hover:bg-amber-200 border-amber-300",
      route: "/preview-mise-de-fonds"
    },
    {
      id: "payoff-time",
      title: "Temps pour rembourser",
      description: "Découvrez combien de temps il faudra pour rembourser complètement votre hypothèque.",
      icon: Clock,
      color: "bg-blue-300 hover:bg-blue-400 border-blue-500",
      route: "/"
    },
    {
      id: "mortgage-insurance",
      title: "Prime d'assurance",
      description: "Calculez le coût de l'assurance hypothécaire selon votre mise de fonds.",
      icon: Shield,
      color: "bg-yellow-100 hover:bg-yellow-200 border-yellow-300",
      route: "/"
    },
    {
      id: "ratios",
      title: "Ratios ABD/ATD",
      description: "Vérifiez vos ratios de service de la dette brute et totale pour l'approbation.",
      icon: PieChart,
      color: "bg-amber-200 hover:bg-amber-300 border-amber-400",
      route: "/"
    },
    {
      id: "fixedvariable",
      title: "Fixe ou variable",
      description: "Comparez les coûts entre un taux fixe et un taux variable sur différentes périodes.",
      icon: BarChart3,
      color: "bg-blue-400 hover:bg-blue-500 border-blue-600",
      route: "/"
    },
    {
      id: "ltv",
      title: "RPV évolutif",
      description: "Suivez l'évolution du ratio prêt-valeur de votre propriété dans le temps.",
      icon: Percent,
      color: "bg-yellow-200 hover:bg-yellow-300 border-yellow-400",
      route: "/"
    },
    {
      id: "scenarios",
      title: "Comparateur de scénarios",
      description: "Comparez côte à côte différents scénarios hypothécaires pour prendre la meilleure décision.",
      icon: GitCompare,
      color: "bg-amber-300 hover:bg-amber-400 border-amber-500",
      route: "/comparateur-scenarios"
    }
  ];

  const handleCalculatorClick = (calculator: typeof calculators[0]) => {
    console.log(`Clicking calculator: ${calculator.id}`);
    
    // Navigate to the specific route for each calculator
    if (calculator.route === "/") {
      // For calculators that are on the homepage, navigate there and scroll to the calculator section
      navigate("/");
      // Add a small delay to ensure navigation is complete before scrolling
      setTimeout(() => {
        const calculatorSection = document.querySelector('[data-calculator-section]');
        if (calculatorSection) {
          calculatorSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 800, behavior: 'smooth' });
        }
      }, 200);
    } else {
      // For calculators with dedicated pages, navigate directly
      navigate(calculator.route);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <div className="container py-8 md:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
              Calculatrices hypothécaires
            </h1>
            <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto px-2 sm:px-4 mb-2">
              Utilisez nos calculatrices pour planifier votre financement hypothécaire et prendre des décisions éclairées.
            </p>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto px-2 sm:px-4">
              Explorez différents scénarios et optimisez votre stratégie de financement immobilier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
            {calculators.map((calculator) => {
              const IconComponent = calculator.icon;
              return (
                <Card 
                  key={calculator.id}
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${calculator.color} border-2`}
                  onClick={() => handleCalculatorClick(calculator)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white shadow-sm mb-3 mx-auto">
                      <IconComponent className="w-6 h-6 text-slate-700" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-center text-slate-900">
                      {calculator.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm text-slate-600 text-center leading-relaxed">
                      {calculator.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Calculatrices;
