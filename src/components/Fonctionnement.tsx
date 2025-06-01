
import React from "react";
import { Phone, FileText, Search, MessageSquare, Send, Home } from "lucide-react";

const Fonctionnement = () => {
  const steps = [
    {
      number: 1,
      icon: Phone,
      title: "Appel de découverte",
      description: "Nous commençons par un appel personnalisé pour comprendre votre situation financière globale. Que vous envisagiez un refinancement, une restructuration de prêt ou l'optimisation de votre hypothèque actuelle, cet appel nous permet de définir votre situation, vos besoins et vos objectifs.",
    },
    {
      number: 2,
      icon: FileText,
      title: "Gestion de la documentation", 
      description: "Une fois votre situation définie, nous vous assistons dans l'obtention de la documentation nécessaire. Qu'il s'agisse des documents financiers requis pour un refinancement ou un transfert, nous vous guidons pour réunir toutes les informations nécessaires et assurer la précision du dossier, le tout dans un maximum de simplicité.",
    },
    {
      number: 3,
      icon: Search,
      title: "Analyse stratégique",
      description: "Après avoir réuni les informations requises, nous effectuons une analyse détaillée de votre situation financière : engagements, revenus, actifs et objectifs. Nous utilisons ces informations pour choisir la meilleure stratégie et aller négocier les meilleures conditions.",
    },
    {
      number: 4,
      icon: MessageSquare,
      title: "Appel de stratégie",
      description: "Une fois l'analyse effectuée, nous planifions un appel pour vous présenter votre stratégie personnalisée. Cela inclut l'analyse des options disponibles : refinancement, transfert ou optimisation de votre hypothèque, afin de choisir la solution qui vous permettra de gérer efficacement votre passif. Cet appel est souvent un moment ah ah! Mais nous nous assurons de vous expliquer le tout de manière simple et humaine, tout en respectant votre gestion du risque et vos perceptions.",
    },
    {
      number: 5,
      icon: Send,
      title: "Soumission du dossier",
      description: "Enfin, nous soumettons votre dossier complet à l'institution financière que nous choisissons ensemble. Chaque détail est pris en compte pour une approbation rapide et avantageuse. Vous pouvez compter sur notre suivi rigoureux pour vous accompagner jusqu'à l'approbation finale.",
    },
    {
      number: 6,
      icon: Home,
      title: "Suivi chez le Notaire",
      description: "Notre travaille ne s'arrête pas là, nous vous accompagnons jusque chez le notaire où vous signerez l'acte de vente et l'hypothèque, officialisant la transaction. Le notaire effectue les vérifications finales et enregistre votre propriété. Par la suite, nous restons à vos côtés pour assurer un suivi rigoureux et répondre à vos besoins futurs.",
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-white" id="fonctionnement">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-slate-900 text-center mb-16">
            Mon approche
          </h2>
          
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20 hidden md:block"></div>
            
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="relative mb-12 last:mb-0">
                  {/* Cercle avec numéro et icône */}
                  <div className="flex items-start">
                    <div className="relative z-10 flex-shrink-0">
                      <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-slate-800">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    
                    {/* Contenu */}
                    <div className="ml-6 flex-1">
                      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100">
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          {step.title}
                        </h3>
                        <p className="text-slate-700 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center mt-12">
            <a 
              href="https://calendly.com/tbourque-planipret" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
            >
              Commençons votre projet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fonctionnement;
