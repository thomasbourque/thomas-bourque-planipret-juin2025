
import React from "react";

const ProcessSteps = () => {
  const steps = [
    {
      number: "1",
      title: "Rencontre initiale et collecte de vos documents",
    },
    {
      number: "2", 
      title: "Évaluation de votre situation et de vos besoins",
    },
    {
      number: "3",
      title: "Recherche du meilleur produit hypothécaire sur le marché", 
    },
    {
      number: "4",
      title: "Obtention du financement au meilleur taux",
    },
  ];

  return (
    <section className="py-12 bg-slate-900">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h2 className="heading-lg text-white text-center mb-12">
            Mon approche en 4 étapes
          </h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-slate-600"></div>
            
            {/* Steps */}
            <div className="grid md:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative text-center">
                  {/* Circle with number */}
                  <div className="relative z-10 mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                    <span className="text-2xl font-bold text-primary-foreground">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Step title */}
                  <h3 className="text-white font-semibold text-lg leading-tight px-2">
                    {step.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
