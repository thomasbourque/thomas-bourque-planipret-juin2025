
import React from "react";
import "./ScrollingTextStyles.css";

const ScrollingText = () => {
  const textBlocks = [
    "Obtenir un prêt hypothécaire peut sembler complexe, mais avec le bon accompagnement, le processus devient simple et transparent. En tant que courtier hypothécaire, je vous guide à chaque étape, de l'analyse de votre situation financière jusqu'à la signature chez le notaire.",
    "Mon rôle est de magasiner pour vous parmi une vingtaine d'institutions financières afin de dénicher les meilleures conditions d'emprunt. Cette approche vous fait économiser du temps, de l'argent et vous évite bien des maux de tête.",
    "Que ce soit pour un achat, un refinancement ou un renouvellement, je m'engage à vous offrir un service personnalisé et à trouver la solution de financement qui correspond parfaitement à vos besoins et à votre budget."
  ];

  return (
    <section className="section bg-primary/5">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden h-32 md:h-24">
            <div className="absolute inset-0 flex items-center">
              <div className="animate-scroll whitespace-nowrap">
                {textBlocks.map((text, index) => (
                  <span key={index} className="inline-block text-lg text-slate-700 px-8 md:px-16">
                    {text}
                  </span>
                ))}
                {/* Duplicate for seamless loop */}
                {textBlocks.map((text, index) => (
                  <span key={`duplicate-${index}`} className="inline-block text-lg text-slate-700 px-8 md:px-16">
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollingText;
