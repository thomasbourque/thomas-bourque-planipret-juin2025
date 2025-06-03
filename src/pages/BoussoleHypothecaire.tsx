
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Compass, ChevronLeft, ChevronRight, Check, Navigation } from "lucide-react";
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
      rightDesc: "Potentiel d'économies",
      leftIcon: "🛡️",
      rightIcon: "📈"
    },
    { 
      id: 2, 
      question: "Ouvert ou fermé", 
      leftOption: "Ouvert", 
      rightOption: "Fermé",
      leftDesc: "Flexibilité de remboursement",
      rightDesc: "Taux plus avantageux",
      leftIcon: "🔓",
      rightIcon: "🔒"
    },
    { 
      id: 3, 
      question: "Paiement régulier ou accéléré", 
      leftOption: "Régulier", 
      rightOption: "Accéléré",
      leftDesc: "Paiements standards",
      rightDesc: "Remboursement plus rapide",
      leftIcon: "⏰",
      rightIcon: "⚡"
    },
    { 
      id: 4, 
      question: "Banque ou prêteur virtuel", 
      leftOption: "Banque", 
      rightOption: "Prêteur virtuel",
      leftDesc: "Service en personne",
      rightDesc: "Taux compétitifs",
      leftIcon: "🏛️",
      rightIcon: "💻"
    },
    { 
      id: 5, 
      question: "Marge hypothécaire ou non", 
      leftOption: "Avec marge", 
      rightOption: "Sans marge",
      leftDesc: "Accès à du crédit",
      rightDesc: "Simplicité",
      leftIcon: "💳",
      rightIcon: "✋"
    },
    { 
      id: 6, 
      question: "Remboursement anticipé ou non", 
      leftOption: "Avec option", 
      rightOption: "Sans option",
      leftDesc: "Flexibilité",
      rightDesc: "Taux réduit",
      leftIcon: "🚀",
      rightIcon: "⛔"
    },
    { 
      id: 7, 
      question: "Les pénalités", 
      leftOption: "Pénalités faibles", 
      rightOption: "Pénalités standards",
      leftDesc: "Plus de flexibilité",
      rightDesc: "Taux possiblement meilleur",
      leftIcon: "😊",
      rightIcon: "⚖️"
    },
    { 
      id: 8, 
      question: "Les remises en argent", 
      leftOption: "Avec remise", 
      rightOption: "Sans remise",
      leftDesc: "Liquidités immédiates",
      rightDesc: "Meilleur taux",
      leftIcon: "💰",
      rightIcon: "💯"
    },
    { 
      id: 9, 
      question: "Assuré ou conventionnel", 
      leftOption: "Assuré", 
      rightOption: "Conventionnel",
      leftDesc: "Mise de fonds réduite",
      rightDesc: "Pas de prime d'assurance",
      leftIcon: "🏠",
      rightIcon: "🏡"
    },
    { 
      id: 10, 
      question: "La mise de fonds", 
      leftOption: "Minimale", 
      rightOption: "Élevée",
      leftDesc: "Préserver ses liquidités",
      rightDesc: "Réduire les paiements",
      leftIcon: "🤏",
      rightIcon: "💪"
    },
    { 
      id: 11, 
      question: "Amortissement 25 ans ou 30 ans", 
      leftOption: "25 ans", 
      rightOption: "30 ans",
      leftDesc: "Moins d'intérêts total",
      rightDesc: "Paiements plus bas",
      leftIcon: "⏳",
      rightIcon: "🐌"
    },
    { 
      id: 12, 
      question: "Synchroniser le marché ou non", 
      leftOption: "Synchroniser", 
      rightOption: "Ne pas synchroniser",
      leftDesc: "Optimiser selon les cycles",
      rightDesc: "Simplicité",
      leftIcon: "🎯",
      rightIcon: "🎲"
    },
    { 
      id: 13, 
      question: "L'équité", 
      leftOption: "Maximiser l'équité", 
      rightOption: "Préserver les liquidités",
      leftDesc: "Patrimoine immobilier",
      rightDesc: "Flexibilité financière",
      leftIcon: "🏗️",
      rightIcon: "🌊"
    },
    { 
      id: 14, 
      question: "Les droits de mutation", 
      leftOption: "Inclure dans le prêt", 
      rightOption: "Payer comptant",
      leftDesc: "Préserver les liquidités",
      rightDesc: "Réduire le montant emprunté",
      leftIcon: "📄",
      rightIcon: "💸"
    },
    { 
      id: 15, 
      question: "Les autres frais", 
      leftOption: "Inclure dans le prêt", 
      rightOption: "Payer séparément",
      leftDesc: "Facilité de financement",
      rightDesc: "Réduire les intérêts",
      leftIcon: "📦",
      rightIcon: "💳"
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      <main className="pt-20">
        <div className="container py-8 md:py-12 px-4 md:px-6 lg:px-8">
          {/* Header with compass animation */}
          <div className="text-center mb-12 relative">
            <div className="relative inline-block mb-8">
              <div className="w-32 h-32 mx-auto relative">
                {/* Compass background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 rounded-full shadow-2xl opacity-20 animate-pulse"></div>
                
                {/* Compass ring */}
                <div className="absolute inset-2 border-4 border-primary rounded-full">
                  <div className="absolute inset-2 border-2 border-primary/50 rounded-full">
                    {/* Cardinal points */}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-primary"></div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-primary"></div>
                    <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-primary"></div>
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-1 bg-primary"></div>
                  </div>
                </div>
                
                {/* Center compass needle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Compass className="w-12 h-12 text-primary animate-spin" style={{ animationDuration: '20s' }} />
                </div>
                
                {/* Progress indicators around compass */}
                <div className="absolute inset-0">
                  {Array.from({ length: 15 }, (_, i) => {
                    const angle = (i * 24) - 90; // 360/15 = 24 degrees per question
                    const isCompleted = currentChoices[i + 1];
                    return (
                      <div
                        key={i}
                        className="absolute w-3 h-3"
                        style={{
                          top: '50%',
                          left: '50%',
                          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-60px)`,
                        }}
                      >
                        <div
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            isCompleted 
                              ? 'bg-green-500 shadow-lg scale-125' 
                              : 'bg-slate-300'
                          }`}
                          style={{
                            transform: `rotate(-${angle}deg)`,
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              La boussole hypothécaire
            </h1>
            <p className="text-xl md:text-2xl font-medium text-slate-600 mb-6">
              15 points de repères avant de vous lancer
            </p>
            <p className="text-base md:text-lg text-slate-700 max-w-3xl mx-auto mb-8">
              Chaque décision hypothécaire implique un choix. Explorez vos options et découvrez vos préférences pour naviguer vers la solution parfaite.
            </p>
            
            {/* Progress bar */}
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-600">Progression</span>
                <span className="text-sm font-bold text-primary">{completedChoices}/15</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-primary to-blue-500 h-3 rounded-full transition-all duration-500 ease-out shadow-lg"
                  style={{ width: `${(completedChoices / 15) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Questions grid */}
          <div className="max-w-5xl mx-auto space-y-8">
            {questions.map((question, index) => (
              <div key={question.id} className="relative">
                {/* Question card */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-white/50 hover:shadow-2xl transition-all duration-300">
                  <div className="p-6 md:p-8">
                    {/* Question header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                          {question.id}
                        </div>
                        {currentChoices[question.id] && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg md:text-xl font-bold text-slate-900">
                          {question.question}
                        </h3>
                      </div>
                      <Navigation className="w-6 h-6 text-primary/50" />
                    </div>
                    
                    {/* Choice buttons */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <button
                        onClick={() => handleChoice(question.id, 'left')}
                        className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left overflow-hidden ${
                          currentChoices[question.id] === 'left'
                            ? 'border-primary bg-gradient-to-br from-primary/10 to-blue-50 shadow-lg scale-105'
                            : 'border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50 hover:scale-102'
                        }`}
                      >
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-2xl">{question.leftIcon}</span>
                            <ChevronLeft className={`w-5 h-5 transition-colors ${
                              currentChoices[question.id] === 'left' ? 'text-primary' : 'text-slate-400'
                            }`} />
                            <span className="font-bold text-slate-900">{question.leftOption}</span>
                          </div>
                          <p className="text-sm text-slate-600">{question.leftDesc}</p>
                        </div>
                        {currentChoices[question.id] === 'left' && (
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent"></div>
                        )}
                      </button>
                      
                      <button
                        onClick={() => handleChoice(question.id, 'right')}
                        className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left overflow-hidden ${
                          currentChoices[question.id] === 'right'
                            ? 'border-primary bg-gradient-to-bl from-primary/10 to-blue-50 shadow-lg scale-105'
                            : 'border-slate-200 bg-white hover:border-primary/50 hover:bg-slate-50 hover:scale-102'
                        }`}
                      >
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-bold text-slate-900">{question.rightOption}</span>
                            <ChevronRight className={`w-5 h-5 transition-colors ${
                              currentChoices[question.id] === 'right' ? 'text-primary' : 'text-slate-400'
                            }`} />
                            <span className="text-2xl">{question.rightIcon}</span>
                          </div>
                          <p className="text-sm text-slate-600">{question.rightDesc}</p>
                        </div>
                        {currentChoices[question.id] === 'right' && (
                          <div className="absolute inset-0 bg-gradient-to-l from-primary/5 to-transparent"></div>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Completion message */}
          {completedChoices === 15 && (
            <div className="text-center mt-16 animate-fade-in">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 max-w-2xl mx-auto border border-white/50">
                <div className="relative mb-6">
                  <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
                    <Compass className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-green-400/20 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  🎉 Félicitations! Votre boussole est complète!
                </h3>
                <p className="text-slate-700 mb-8 leading-relaxed">
                  Vous avez exploré tous les aspects cruciaux de votre financement hypothécaire. 
                  Ces choix vous semblent-ils complexes? En tant que courtier hypothécaire, 
                  je vous accompagne pour naviguer à travers chacun de ces points et trouver 
                  la solution parfaite pour votre situation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                    <a 
                      href="https://calendly.com/tbourque-planipret" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      <Compass className="w-5 h-5 mr-2" />
                      Planifier un appel
                    </a>
                  </Button>
                  <Button variant="outline" size="lg" asChild className="border-primary text-primary hover:bg-primary hover:text-white">
                    <a href="mailto:tbourque@planipret.com">
                      📧 Envoyer un courriel
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
