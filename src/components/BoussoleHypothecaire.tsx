
import React from "react";
import { Compass } from "lucide-react";

const BoussoleHypothecaire = () => {
  const questions = [
    "Taux fixe ou variable",
    "Ouvert ou fermé",
    "Paiement régulier ou accéléré",
    "Banque ou prêteur virtuel",
    "Marge hypothécaire ou non",
    "Remboursement anticipé ou non",
    "Les pénalités",
    "Les remises en argent",
    "Assuré ou conventionnel",
    "La mise de fonds",
    "Amortissement 25 ans ou 30 ans",
    "Synchroniser le marché ou non",
    "L'équité",
    "Les droits de mutation",
    "Les autres frais"
  ];

  return (
    <section className="section bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden" id="boussole-hypothecaire">
      {/* Background compass decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Compass className="w-96 h-96 text-primary" />
        </div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <Compass className="w-16 h-16 text-primary animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
            </div>
          </div>
          
          <h2 className="heading-lg text-slate-900 mb-6">
            La boussole hypothécaire
          </h2>
          <p className="text-xl font-medium text-slate-600 mb-8">
            15 points de repères avant de vous lancer
          </p>
          <p className="body-md text-slate-700 max-w-3xl mx-auto">
            Naviguer dans le monde des hypothèques peut sembler complexe. Voici les 15 questions essentielles à considérer pour vous orienter vers la meilleure solution de financement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {questions.map((question, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 relative group"
            >
              {/* Number badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                {index + 1}
              </div>
              
              {/* Compass icon for decoration */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              
              <div className="pt-2">
                <h3 className="font-semibold text-slate-900 text-lg leading-snug">
                  {question}
                </h3>
              </div>
              
              {/* Hover effect border */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto border border-primary/10">
            <Compass className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Besoin d'un guide expert?
            </h3>
            <p className="body-md text-slate-700 mb-6">
              Ces questions vous semblent complexes? En tant que courtier hypothécaire, je vous accompagne pour naviguer à travers chacun de ces points et trouver la solution parfaite pour votre situation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://calendly.com/tbourque-planipret" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
              >
                <Compass className="w-4 h-4 mr-2" />
                Planifier un appel
              </a>
              <a 
                href="mailto:tbourque@planipret.com"
                className="inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Envoyer un courriel
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BoussoleHypothecaire;
