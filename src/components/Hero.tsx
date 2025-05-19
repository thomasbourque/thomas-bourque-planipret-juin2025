
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 -z-10"></div>
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col space-y-6 max-w-xl animate-fade-in">
          <h1 className="heading-xl text-slate-900">
            Votre conseiller hypothécaire de confiance
          </h1>
          <p className="body-lg text-slate-700">
            Je vous accompagne dans l'obtention du meilleur financement hypothécaire adapté à votre situation, à Québec et ses environs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild>
              <a href="#contact">Prendre rendez-vous</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#services">Découvrir mes services</a>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-[4/5] bg-slate-200 rounded-lg overflow-hidden shadow-xl">
            {/* Placeholder for Thomas' photo */}
            <div className="h-full w-full bg-gradient-to-br from-blue-400/40 to-blue-600/40 flex items-center justify-center">
              <span className="text-white/80 font-medium">Photo de Thomas Bourque</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
