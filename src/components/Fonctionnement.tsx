
import React from "react";

const Fonctionnement = () => {
  const steps = [
    {
      number: "1",
      title: "Appel de découverte",
      description: "Nous commençons par un appel personnalisé pour comprendre votre situation financière globale. Que vous envisagiez un refinancement, une restructuration de prêt ou l'optimisation de votre hypothèque actuelle, cet appel nous permet de définir votre situation, vos besoins et vos objectifs."
    },
    {
      number: "2", 
      title: "Gestion de la documentation",
      description: "Une fois votre situation définie, nous vous assistons dans l'obtention de la documentation nécessaire. Qu'il s'agisse des documents financiers requis pour un refinancement ou un transfert, nous vous guidons pour réunir toutes les informations nécessaires et assurer la précision du dossier, le tout dans un maximum de simplicité."
    },
    {
      number: "3",
      title: "Analyse stratégique", 
      description: "Après avoir réuni les informations requises, nous effectuons une analyse détaillée de votre situation financière : engagements, revenus, actifs et objectifs. Nous utilisons ces informations pour choisir la meilleure stratégie et aller négocier les meilleures conditions."
    },
    {
      number: "4",
      title: "Appel de stratégie",
      description: "Une fois l'analyse effectuée, nous planifions un appel pour vous présenter votre stratégie personnalisée. Cela inclut l'analyse des options disponibles : refinancement, transfert ou optimisation de votre hypothèque, afin de choisir la solution qui vous permettra de gérer efficacement votre passif. Cet appel est souvent un moment ah ah! Mais nous nous assurons de vous expliquer le tout de manière simple et humaine, tout en respectant votre gestion du risque et vos perceptions."
    },
    {
      number: "5",
      title: "Soumission du dossier",
      description: "Enfin, nous soumettons votre dossier complet à l'institution financière que nous choisissons ensemble. Chaque détail est pris en compte pour une approbation rapide et avantageuse. Vous pouvez compter sur notre suivi rigoureux pour vous accompagner jusqu'à l'approbation finale."
    },
    {
      number: "6",
      title: "Suivi chez le Notaire",
      description: "Notre travaille ne s'arrête pas là, nous vous accompagnons jusque chez le notaire où vous signerez l'acte de vente et l'hypothèque, officialisant la transaction. Le notaire effectue les vérifications finales et enregistre votre propriété. Par la suite, nous restons à vos côtés pour assurer un suivi rigoureux et répondre à vos besoins futurs."
    }
  ];

  return (
    <section className="py-12 bg-slate-900" id="fonctionnement">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-lg text-white text-center mb-16">
            Notre approche simplifiée
          </h2>
          
          <div className="relative">
            {/* Timeline line - hidden on mobile, visible on desktop */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary/30 h-full"></div>
            
            {/* Steps */}
            <div className="space-y-12 lg:space-y-16">
              {steps.map((step, index) => (
                <div key={index} className={`relative flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'} text-center lg:text-inherit`}>
                    <div className="bg-slate-800 p-6 rounded-lg max-w-md mx-auto lg:mx-0">
                      <h3 className="text-white font-semibold text-lg mb-3">
                        {step.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Circle with number - positioned on the timeline */}
                  <div className="relative z-10 w-16 h-16 bg-primary rounded-full flex items-center justify-center my-6 lg:my-0 flex-shrink-0">
                    <span className="text-xl font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Spacer for opposite side */}
                  <div className="flex-1 hidden lg:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fonctionnement;
