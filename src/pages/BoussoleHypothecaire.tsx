
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Compass, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const BoussoleHypothecaire = () => {
  const [currentChoices, setCurrentChoices] = useState<{[key: number]: 'left' | 'right' | null}>({});

  const questions = [
    { 
      id: 1, 
      question: "Taux fixe ou variable", 
      leftOption: "Taux fixe", 
      rightOption: "Taux variable",
      leftDesc: "Stabilité et prévisibilité",
      rightDesc: "Potentiel d'économies"
    },
    { 
      id: 2, 
      question: "Ouvert ou fermé", 
      leftOption: "Ouvert", 
      rightOption: "Fermé",
      leftDesc: "Flexibilité de remboursement",
      rightDesc: "Taux plus avantageux"
    },
    { 
      id: 3, 
      question: "Paiement régulier ou accéléré", 
      leftOption: "Régulier", 
      rightOption: "Accéléré",
      leftDesc: "Paiements standards",
      rightDesc: "Remboursement plus rapide"
    },
    { 
      id: 4, 
      question: "Banque ou prêteur virtuel", 
      leftOption: "Banque", 
      rightOption: "Prêteur virtuel",
      leftDesc: "Service en personne",
      rightDesc: "Taux compétitifs"
    },
    { 
      id: 5, 
      question: "Marge hypothécaire ou non", 
      leftOption: "Avec marge", 
      rightOption: "Sans marge",
      leftDesc: "Accès à du crédit",
      rightDesc: "Simplicité"
    },
    { 
      id: 6, 
      question: "Remboursement anticipé ou non", 
      leftOption: "Avec option", 
      rightOption: "Sans option",
      leftDesc: "Flexibilité",
      rightDesc: "Taux réduit"
    },
    { 
      id: 7, 
      question: "Les pénalités", 
      leftOption: "Pénalités faibles", 
      rightOption: "Pénalités standards",
      leftDesc: "Plus de flexibilité",
      rightDesc: "Taux possiblement meilleur"
    },
    { 
      id: 8, 
      question: "Les remises en argent", 
      leftOption: "Avec remise", 
      rightOption: "Sans remise",
      leftDesc: "Liquidités immédiates",
      rightDesc: "Meilleur taux"
    },
    { 
      id: 9, 
      question: "Assuré ou conventionnel", 
      leftOption: "Assuré", 
      rightOption: "Conventionnel",
      leftDesc: "Mise de fonds réduite",
      rightDesc: "Pas de prime d'assurance"
    },
    { 
      id: 10, 
      question: "La mise de fonds", 
      leftOption: "Minimale", 
      rightOption: "Élevée",
      leftDesc: "Préserver ses liquidités",
      rightDesc: "Réduire les paiements"
    },
    { 
      id: 11, 
      question: "Amortissement 25 ans ou 30 ans", 
      leftOption: "25 ans", 
      rightOption: "30 ans",
      leftDesc: "Moins d'intérêts total",
      rightDesc: "Paiements plus bas"
    },
    { 
      id: 12, 
      question: "Synchroniser le marché ou non", 
      leftOption: "Synchroniser", 
      rightOption: "Ne pas synchroniser",
      leftDesc: "Optimiser selon les cycles",
      rightDesc: "Simplicité"
    },
    { 
      id: 13, 
      question: "L'équité", 
      leftOption: "Maximiser l'équité", 
      rightOption: "Préserver les liquidités",
      leftDesc: "Patrimoine immobilier",
      rightDesc: "Flexibilité financière"
    },
    { 
      id: 14, 
      question: "Les droits de mutation", 
      leftOption: "Inclure dans le prêt", 
      rightOption: "Payer comptant",
      leftDesc: "Préserver les liquidités",
      rightDesc: "Réduire le montant emprunté"
    },
    { 
      id: 15, 
      question: "Les autres frais", 
      leftOption: "Inclure dans le prêt", 
      rightOption: "Payer séparément",
      leftDesc: "Facilité de financement",
      rightDesc: "Réduire les intérêts"
    }
  ];

  const handleChoice = (questionId: number, choice: 'left' | 'right') => {
    setCurrentChoices(prev => ({
      ...prev,
      [questionId]: choice
    }));
  };

  const completedChoices = Object.keys(currentChoices).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20">
        <div className="container py-8 md:py-12 px-4 md:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <Compass className="w-16 h-16 text-primary animate-pulse" />
                <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
              La boussole hypothécaire
            </h1>
            <p className="text-xl font-medium text-slate-600 mb-8">
              15 points de repères avant de vous lancer
            </p>
            <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto">
              Chaque décision hypothécaire implique un choix. Glissez vers la gauche ou la droite pour faire vos sélections et découvrir vos préférences.
            </p>
            
            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="text-sm text-slate-600">
                Progression: {completedChoices}/15
              </div>
              <div className="w-32 bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedChoices / 15) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-100">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {question.id}
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {question.question}
                    </h3>
                    {currentChoices[question.id] && (
                      <Check className="w-5 h-5 text-green-500 ml-auto" />
                    )}
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <button
                      onClick={() => handleChoice(question.id, 'left')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        currentChoices[question.id] === 'left'
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <ChevronLeft className="w-4 h-4 text-primary" />
                        <span className="font-medium text-slate-900">{question.leftOption}</span>
                      </div>
                      <p className="text-sm text-slate-600">{question.leftDesc}</p>
                    </button>
                    
                    <button
                      onClick={() => handleChoice(question.id, 'right')}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        currentChoices[question.id] === 'right'
                          ? 'border-primary bg-primary/5 shadow-md'
                          : 'border-slate-200 hover:border-primary/50 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-slate-900">{question.rightOption}</span>
                        <ChevronRight className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-sm text-slate-600">{question.rightDesc}</p>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {completedChoices === 15 && (
            <div className="text-center mt-12">
              <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-primary/10">
                <Compass className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-4">
                  Félicitations! Vous avez complété votre boussole hypothécaire.
                </h3>
                <p className="text-slate-700 mb-6">
                  Vos choix vous semblent-ils complexes? En tant que courtier hypothécaire, je vous accompagne pour naviguer à travers chacun de ces points et trouver la solution parfaite pour votre situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <a 
                      href="https://calendly.com/tbourque-planipret" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Compass className="w-4 h-4 mr-2" />
                      Planifier un appel
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a href="mailto:tbourque@planipret.com">
                      Envoyer un courriel
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BoussoleHypothecaire;
