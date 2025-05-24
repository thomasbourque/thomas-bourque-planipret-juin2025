import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 -z-10"></div>
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col space-y-6 max-w-xl animate-fade-in">
          <h1 className="heading-xl text-slate-900">
            Votre courtier hypothécaire de confiance
          </h1>
          <p className="body-lg text-slate-700">
            Je vous accompagne dans l'obtention du meilleur financement hypothécaire adapté à votre situation, à Québec et ses environs.
          </p>
          
          {/* Service gratuit et magasinage highlight */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-primary/20">
            <div className="flex items-center mb-2">
              <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                Service 100% GRATUIT
              </span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              Je magasine pour vous les meilleurs produits hypothécaires auprès d'une <strong>vingtaine de banques et d'institutions financières</strong> pour vous garantir les meilleures conditions d'emprunt sur le marché.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild>
              <a href="https://calendly.com/tbourque-planipret" target="_blank" rel="noopener noreferrer">
                Prendre rendez-vous
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#services">Découvrir mes services</a>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-slate-200 rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/lovable-uploads/e890eb15-6fc3-48da-a825-ef289e0a40df.png" 
              alt="Thomas Bourque, courtier hypothécaire" 
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
