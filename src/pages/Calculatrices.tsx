
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, DollarSign, TrendingUp, Calendar, Shield, PieChart, BarChart3, Target, Clock, Home, Percent, GitCompare } from "lucide-react";

const Calculatrices = () => {
  const calculators = [
    {
      id: "payment",
      title: "Paiement hypothécaire",
      description: "Calculez votre paiement mensuel en fonction du prix d'achat, de la mise de fonds et du taux d'intérêt.",
      icon: Calculator,
      color: "bg-blue-50 hover:bg-blue-100"
    },
    {
      id: "capacity",
      title: "Capacité d'emprunt",
      description: "Déterminez le montant maximum que vous pouvez emprunter selon vos revenus et vos dépenses.",
      icon: DollarSign,
      color: "bg-green-50 hover:bg-green-100"
    },
    {
      id: "savings",
      title: "Écart de taux",
      description: "Comparez les économies réalisées en choisissant un taux d'intérêt plus avantageux.",
      icon: TrendingUp,
      color: "bg-orange-50 hover:bg-orange-100"
    },
    {
      id: "rhythm",
      title: "Rythme de paiement",
      description: "Analysez l'impact de différentes fréquences de paiement sur votre hypothèque.",
      icon: Calendar,
      color: "bg-purple-50 hover:bg-purple-100"
    },
    {
      id: "minimum-downpayment",
      title: "Mise de fonds minimale",
      description: "Calculez la mise de fonds minimale requise selon le prix de votre propriété.",
      icon: Home,
      color: "bg-cyan-50 hover:bg-cyan-100"
    },
    {
      id: "downpayment",
      title: "Investir sa mise de fonds",
      description: "Comparez les avantages d'investir votre mise de fonds versus l'augmenter.",
      icon: Target,
      color: "bg-indigo-50 hover:bg-indigo-100"
    },
    {
      id: "payoff-time",
      title: "Temps pour rembourser",
      description: "Découvrez combien de temps il faudra pour rembourser complètement votre hypothèque.",
      icon: Clock,
      color: "bg-pink-50 hover:bg-pink-100"
    },
    {
      id: "mortgage-insurance",
      title: "Prime d'assurance",
      description: "Calculez le coût de l'assurance hypothécaire selon votre mise de fonds.",
      icon: Shield,
      color: "bg-red-50 hover:bg-red-100"
    },
    {
      id: "ratios",
      title: "Ratios ABD/ATD",
      description: "Vérifiez vos ratios de service de la dette brute et totale pour l'approbation.",
      icon: PieChart,
      color: "bg-yellow-50 hover:bg-yellow-100"
    },
    {
      id: "fixedvariable",
      title: "Fixe ou variable",
      description: "Comparez les coûts entre un taux fixe et un taux variable sur différentes périodes.",
      icon: BarChart3,
      color: "bg-teal-50 hover:bg-teal-100"
    },
    {
      id: "ltv",
      title: "RPV évolutif",
      description: "Suivez l'évolution du ratio prêt-valeur de votre propriété dans le temps.",
      icon: Percent,
      color: "bg-lime-50 hover:bg-lime-100"
    },
    {
      id: "scenarios",
      title: "Comparateur de scénarios",
      description: "Comparez côte à côte différents scénarios hypothécaires pour prendre la meilleure décision.",
      icon: GitCompare,
      color: "bg-violet-50 hover:bg-violet-100"
    }
  ];

  const handleCalculatorClick = (calculatorId: string) => {
    if (calculatorId === 'scenarios') {
      window.location.href = '/comparateur-scenarios';
    } else {
      // For now, we'll just scroll to top and show an alert
      // In the future, you could implement individual calculator pages
      window.scrollTo({ top: 0, behavior: 'smooth' });
      console.log(`Selected calculator: ${calculatorId}`);
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
                  className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${calculator.color} border-2 hover:border-slate-300`}
                  onClick={() => handleCalculatorClick(calculator.id)}
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
