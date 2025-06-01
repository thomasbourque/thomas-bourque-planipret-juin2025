
import React from "react";
import { Shield, DollarSign, Users, Network, Phone, Award } from "lucide-react";

const WhyBroker = () => {
  const advantages = [
    {
      icon: Shield,
      title: "Indépendance face aux banques",
      description: "Je travaille pour vos intérêts, pas ceux d'une institution financière spécifique."
    },
    {
      icon: DollarSign,
      title: "Économies potentielles",
      description: "Accès instantané aux meilleurs taux du marché parmi plus de 20 institutions financières."
    },
    {
      icon: Users,
      title: "Conseils et accompagnement",
      description: "Support personnalisé tout au long du processus. Disponibilités le soir et la fin de semaine pour une réactivité rapide."
    },
    {
      icon: Network,
      title: "Réseau de professionnels",
      description: "Références vers des courtiers immobiliers, conseillers financiers, comptables, notaires, inspecteurs, évaluateurs et autres experts de confiance."
    },
    {
      icon: Phone,
      title: "Un seul point de contact",
      description: "Fini les démarches multiples - je m'occupe de tout pour vous simplifier la vie."
    },
    {
      icon: Award,
      title: "Service 100% gratuit",
      description: "Aucuns frais pour vous - ma rémunération provient des institutions financières."
    }
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-slate-900 mb-6">
              Pourquoi faire appel à un courtier hypothécaire?
            </h2>
            <p className="body-md text-slate-700 max-w-3xl mx-auto mb-6">
              Encore souvent méconnu au Québec, le rôle du courtier hypothécaire est pourtant crucial. Découvrez les avantages de travailler avec un courtier hypothécaire indépendant pour votre financement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {advantage.title}
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {advantage.description}
                  </p>
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
              Discutons de votre projet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBroker;
