
import React from "react";

const Fonctionnement = () => {
  const steps = [
    {
      number: "1",
      title: "Appel de découverte",
      description: "Nous commençons par un appel personnalisé pour comprendre votre situation financière globale. Que vous envisagiez un refinancement, une restructuration de prêt ou l'optimisation de votre hypothèque actuelle, cet appel nous permet de définir votre situation, vos besoins et vos objectifs.",
    },
    {
      number: "2", 
      title: "Gestion de la documentation",
      description: "Une fois votre situation définie, nous vous assistons dans l'obtention de la documentation nécessaire. Qu'il s'agisse des documents financiers requis pour un refinancement ou un transfert, nous vous guidons pour réunir toutes les informations nécessaires et assurer la précision du dossier, le tout dans un maximum de simplicité.",
    },
    {
      number: "3",
      title: "Analyse stratégique", 
      description: "Après avoir réuni les informations requises, nous effectuons une analyse détaillée de votre situation financière : engagements, revenus, actifs et objectifs. Nous utilisons ces informations pour choisir la meilleure stratégie et aller négocier les meilleures conditions.",
    },
    {
      number: "4",
      title: "Appel de stratégie",
      description: "Une fois l'analyse effectuée, nous planifions un appel pour vous présenter votre stratégie personnalisée. Cela inclut l'analyse des options disponibles : refinancement, transfert ou optimisation de votre hypothèque, afin de choisir la solution qui vous permettra de gérer efficacement votre passif. Cet appel est souvent un moment ah ah! Mais nous nous assurons de vous expliquer le tout de manière simple et humaine, tout en respectant votre gestion du risque et vos perceptions.",
    },
    {
      number: "5",
      title: "Soumission du dossier",
      description: "Enfin, nous soumettons votre dossier complet à l'institution financière que nous choisissons ensemble. Chaque détail est pris en compte pour une approbation rapide et avantageuse. Vous pouvez compter sur notre suivi rigoureux pour vous accompagner jusqu'à l'approbation finale.",
    },
    {
      number: "6",
      title: "Suivi chez le Notaire",
      description: "Notre travaille ne s'arrête pas là, nous vous accompagnons jusque chez le notaire où vous signerez l'acte de vente et l'hypothèque, officialisant la transaction. Le notaire effectue les vérifications finales et enregistre votre propriété. Par la suite, nous restons à vos côtés pour assurer un suivi rigoureux et répondre à vos besoins futurs.",
    }
  ];

  return (
    <section className="py-12 bg-slate-50" id="fonctionnement">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="heading-lg text-slate-900 text-center mb-16">
            Notre approche simplifiée
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-slate-50 border border-slate-200 p-6 rounded-lg shadow-sm">
                {/* Numéro de l'étape */}
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-sm font-bold text-white">
                    {step.number}
                  </span>
                </div>
                
                {/* Step title */}
                <h3 className="text-primary font-semibold text-lg mb-3 text-center">
                  {step.title}
                </h3>
                
                {/* Step description */}
                <p className="text-slate-700 text-sm leading-relaxed text-center">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Fonctionnement;
