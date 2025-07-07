
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, TrendingUp, PiggyBank, Calendar, Shield, BarChart3, Percent, Home, Clock, DollarSign, Target, GitCompare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Calculatrices = () => {
  const navigate = useNavigate();

  const calculators = [
    {
      id: "payment",
      title: "Paiement hypothécaire",
      description: "Calculez vos paiements mensuels d'hypothèque selon le montant emprunté, le taux d'intérêt et la période d'amortissement.",
      icon: Calculator,
      route: "/preview-paiement-hypothecaire"
    },
    {
      id: "capacity",
      title: "Capacité d'emprunt",
      description: "Déterminez le montant maximal que vous pouvez emprunter selon vos revenus et vos dépenses.",
      icon: TrendingUp,
      route: "/preview-capacite-emprunt"
    },
    {
      id: "savings",
      title: "Écart de taux",
      description: "Comparez les économies potentielles entre différents taux d'intérêt hypothécaires.",
      icon: PiggyBank,
      route: "/preview-ecart-taux"
    },
    {
      id: "rhythm",
      title: "Rythme de paiement",
      description: "Analysez l'impact de différents rythmes de paiement sur votre hypothèque (mensuel, bimensuel, hebdomadaire).",
      icon: Calendar,
      route: "/preview-rythme-paiement"
    },
    {
      id: "minimum-downpayment",
      title: "Mise de fonds minimale",
      description: "Calculez la mise de fonds minimale requise selon le prix de la propriété et les règles en vigueur.",
      icon: Home,
      route: "/preview-mise-fonds-minimale"
    },
    {
      id: "downpayment",
      title: "Investir sa mise de fonds",
      description: "Comparez les avantages d'investir votre mise de fonds versus l'utiliser pour réduire votre hypothèque.",
      icon: Target,
      route: "/preview-mise-de-fonds"
    },
    {
      id: "payoff-time",
      title: "Temps pour rembourser",
      description: "Calculez le temps nécessaire pour rembourser complètement votre hypothèque avec des paiements supplémentaires.",
      icon: Clock,
      route: "/preview-temps-remboursement"
    },
    {
      id: "mortgage-insurance",
      title: "Prime d'assurance",
      description: "Calculez le coût de l'assurance prêt hypothécaire (APH) selon votre mise de fonds.",
      icon: Shield,
      route: "/preview-assurance-hypothecaire"
    },
    {
      id: "ratios",
      title: "Ratios ABD/ATD",
      description: "Vérifiez vos ratios d'admissibilité brut de la dette (ABD) et total de la dette (ATD).",
      icon: BarChart3,
      route: "/preview-ratios"
    },
    {
      id: "fixedvariable",
      title: "Fixe ou variable",
      description: "Comparez les avantages et inconvénients entre un taux fixe et un taux variable.",
      icon: Percent,
      route: "/preview-fixe-variable"
    },
    {
      id: "ltv",
      title: "RPV évolutif",
      description: "Analysez l'évolution de votre ratio prêt-valeur (RPV) au fil du temps.",
      icon: DollarSign,
      route: "/preview-rpv-evolutif"
    },
    {
      id: "scenarios",
      title: "Scénarios",
      description: "Comparez différents scénarios hypothécaires côte à côte pour prendre la meilleure décision.",
      icon: GitCompare,
      route: "/comparateur-scenarios"
    }
  ];

  const handleCalculatorClick = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <div className="container py-8 md:py-12 px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
              Vos décisions éclairées commencent ici!
            </h1>
            <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto px-2 sm:px-4 mb-2">
              Mes calculateurs vous aident à y voir plus clair pour prendre la bonne décision avec les bons chiffres.
            </p>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto px-2 sm:px-4">
              Explorez différents scénarios et optimisez votre stratégie de financement immobilier.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {calculators.map((calculator) => {
              const IconComponent = calculator.icon;
              return (
                <Card 
                  key={calculator.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 border-2 hover:border-primary/20"
                  onClick={() => handleCalculatorClick(calculator.route)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-900">
                      {calculator.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm text-slate-600 leading-relaxed">
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
