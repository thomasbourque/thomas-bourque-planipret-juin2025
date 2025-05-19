
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      title: "Premier achat",
      description: "Conseils spécialisés pour les premiers acheteurs, exploration des programmes d'aide gouvernementaux et accompagnement pas à pas.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      ),
    },
    {
      title: "Refinancement",
      description: "Optimisez votre hypothèque actuelle pour obtenir de meilleures conditions ou libérer des fonds pour d'autres projets.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M12 2v20"></path>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
        </svg>
      ),
    },
    {
      title: "Renouvellement",
      description: "Négociation des meilleurs taux et conditions lors du renouvellement de votre prêt hypothécaire.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
          <path d="M3 3v5h5"></path>
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path>
          <path d="M16 21h5v-5"></path>
        </svg>
      ),
    },
    {
      title: "Investissement immobilier",
      description: "Stratégies de financement pour les propriétés locatives et les investissements immobiliers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <path d="M12 2v10"></path>
          <path d="m13 7 2 2"></path>
          <path d="M9 7v1"></path>
          <path d="M19 7v1"></path>
          <path d="M12 18a2 2 0 0 0 2-2v-1h-4v1a2 2 0 0 0 2 2z"></path>
        </svg>
      ),
    },
    {
      title: "Prêt hypothécaire commerciale",
      description: "Solutions de financement pour l'achat ou le refinancement de propriétés commerciales.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M3 21h18"></path>
          <path d="M3 7v14"></path>
          <path d="M21 7v14"></path>
          <path d="M7 21v-4"></path>
          <path d="M17 21v-4"></path>
          <path d="M7 7v4"></path>
          <path d="M17 7v4"></path>
          <path d="M4 4h16a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"></path>
        </svg>
      ),
    },
    {
      title: "Conseil et planification",
      description: "Consultation complète pour planifier votre avenir financier et optimiser vos investissements immobiliers.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
        </svg>
      ),
    },
  ];

  return (
    <section id="services" className="section bg-slate-50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg text-slate-900 mb-6">Mes services</h2>
          <p className="body-md text-slate-700">
            Je vous offre une gamme complète de services hypothécaires pour répondre à tous vos besoins en matière de financement immobilier.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="mb-4">{service.icon}</div>
                <CardTitle className="text-xl font-serif">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-700">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
