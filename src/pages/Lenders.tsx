
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Lenders = () => {
  const lenders = [
    {
      name: "Banque Nationale",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=100&fit=crop"
    },
    {
      name: "RBC Banque Royale",
      logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=100&fit=crop"
    },
    {
      name: "TD Canada Trust",
      logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=100&fit=crop"
    },
    {
      name: "Banque Scotia",
      logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=100&fit=crop"
    },
    {
      name: "BMO Banque de Montréal",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=100&fit=crop"
    },
    {
      name: "CIBC",
      logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=100&fit=crop"
    },
    {
      name: "Desjardins",
      logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=100&fit=crop"
    },
    {
      name: "Laurentienne Banque",
      logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=100&fit=crop"
    },
    {
      name: "MCAP",
      logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=200&h=100&fit=crop"
    },
    {
      name: "First National",
      logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=100&fit=crop"
    },
    {
      name: "Paradigm Quest",
      logo: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=200&h=100&fit=crop"
    },
    {
      name: "CMLS Financial",
      logo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=200&h=100&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 -z-10"></div>
          <div className="container">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="heading-xl text-slate-900 mb-6">
                Mes partenaires prêteurs
              </h1>
              <p className="body-lg text-slate-700 mb-8">
                Je travaille avec plus de 20 institutions financières pour vous offrir les meilleures conditions d'emprunt sur le marché. Mon réseau de partenaires me permet de magasiner votre prêt hypothécaire et de négocier les meilleurs taux pour votre situation.
              </p>
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
                <p className="text-slate-900 font-medium text-lg mb-2">
                  Pourquoi travailler avec plusieurs prêteurs?
                </p>
                <p className="text-slate-700">
                  Chaque prêteur a ses propres critères et spécialités. En ayant accès à un large réseau, je peux trouver le prêteur qui correspond parfaitement à votre profil et vous obtenir les meilleures conditions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Lenders Grid */}
        <section className="section">
          <div className="container">
            <h2 className="heading-md text-slate-900 mb-12 text-center">
              Nos partenaires financiers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {lenders.map((lender, index) => (
                <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 flex items-center justify-center h-32">
                    <div className="w-full h-full flex items-center justify-center">
                      <img
                        src={lender.logo}
                        alt={`Logo ${lender.name}`}
                        className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src = "https://via.placeholder.com/200x100?text=" + encodeURIComponent(lender.name);
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary text-white py-16">
          <div className="container text-center">
            <h2 className="heading-lg mb-6">
              Prêt à découvrir vos options?
            </h2>
            <p className="body-lg mb-8 max-w-2xl mx-auto">
              Contactez-moi dès aujourd'hui pour une consultation gratuite et découvrez comment mon réseau de partenaires peut vous aider à obtenir le meilleur financement hypothécaire.
            </p>
            <a
              href="https://calendly.com/tbourque-planipret"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 bg-white text-primary font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Planifier un appel gratuit
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Lenders;
