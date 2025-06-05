import React from "react";
import { Phone, FileText, Search, MessageSquare, Send, Home } from "lucide-react";

const Fonctionnement = () => {
  const steps = [
    {
      number: 1,
      icon: Phone,
      title: "Appel initial",
      description: "Je débute par un appel pour comprendre votre situation financière et votre réalité. Peu importe votre projet, cette première étape nous permet de définir ensemble vos besoins et vos objectifs.",
    },
    {
      number: 2,
      icon: FileText,
      title: "Collecte de vos documents", 
      description: "Je vous assiste pour obtenir toute la documentation requise à la préparation de votre dossier. Je vous dirige pour que vous puissiez facilement réunir toutes ces informations et me les faire parvenir de façon sécurisée.",
    },
    {
      number: 3,
      icon: Search,
      title: "Analyse de votre situation",
      description: "J'effectue une analyse détaillée de votre situation financière : engagements, revenus, actifs et projet hypothécaire. Cette analyse me permet d'identifier la meilleure stratégie pour vous et de négocier les meilleures conditions pour votre projet.",
    },
    {
      number: 4,
      icon: MessageSquare,
      title: "Choix de la solution",
      description: "Je vous présente une stratégie adaptée à votre réalité et à votre niveau de tolérance au risque. Je vous explique pourquoi il s'agit selon moi de la solution répondant le mieux à vos besoins et je réponds à toute vos interrogations. Nous identifions ensemble le prêteur à qui nous allons soumettre votre dossier.",
    },
    {
      number: 5,
      icon: Send,
      title: "Soumission du dossier",
      description: "Je soumets votre dossier complet à l'institution financière que nous avons retenue. Tout est mis en place pour favoriser une approbation rapide de votre dossier. J'assure un suivi rigoureux avec vous jusqu'à l'obtention de la lettre d'approbation finale.",
    },
    {
      number: 6,
      icon: Home,
      title: "Passage chez le notaire",
      description: "Je vous informe et vous guide pour les étapes finales y compris votre passage chez le notaire où vous signerez l'acte de vente et l'hypothèque afin d'officialiser la transaction. Le notaire effectue les vérifications et enregistre votre propriété. Je reste à votre disposition tout au long du processus et pour vos besoins hypothécaires futurs.",
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
                <div key={index} className="relative mb-12 last:mb-0 group">
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
                      <div className="bg-white rounded-xl shadow-md p-6 border border-slate-100 transition-all duration-300 hover:shadow-lg">
                        <h3 className="text-xl font-semibold text-primary mb-3">
                          {step.title}
                        </h3>
                        {/* Description visible au survol */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-h-0 group-hover:max-h-96 overflow-hidden">
                          <p className="text-slate-700 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
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
