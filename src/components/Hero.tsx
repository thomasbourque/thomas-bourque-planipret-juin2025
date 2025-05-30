import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <>
      {/* Nouvelle section héros avec image de maison en arrière-plan */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/lovable-uploads/dace8e51-4edc-447d-900b-93723b99dc08.png')`
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container relative z-10 text-center text-white">
          <h1 className="heading-xl mb-6">
            L'hypothèque, sans les maux de tête
          </h1>
          <p className="body-lg mb-8 max-w-2xl mx-auto">
            Pour un accompagnement hypothécaire complet où que vous soyez au Québec.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full" asChild>
              <a href="https://calendly.com/tbourque-planipret" target="_blank" rel="noopener noreferrer">
                Planifier un appel
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-slate-900 rounded-full" asChild>
              <a href="#thomas-bourque">Découvrir mes services</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Section avec votre photo et informations déplacée plus bas */}
      <section className="relative pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden" id="thomas-bourque">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 -z-10"></div>
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 max-w-xl animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900">
              Thomas Bourque
            </h2>
            <p className="text-xl font-medium text-slate-600 mb-4">
              Courtier hypothécaire, B.A.A.
            </p>
            
            <div className="space-y-4">
              <p className="body-md text-slate-700 mb-4">
                En tant que courtier hypothécaire Planiprêt, je travaille avec une vingtaine d'institutions financières pour vous proposer la solution de financement répondant le mieux à vos besoins. Mes services sont sans frais et vous assurent d'obtenir les meilleures conditions d'emprunt et le taux d'intérêt le plus avantageux sur le marché.
              </p>
              <p className="body-md text-slate-700">
                Basé à Québec, je peux vous servir à distance où que vous soyez au Québec. Prenons quelques minutes pour discuter ensemble de votre projet. Un simple appel de quelques minutes peut parfois mener à des économies de plusieurs milliers de dollars.
              </p>
            </div>
            
            {/* Service gratuit highlight */}
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Service 100% GRATUIT
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="rounded-full" asChild>
                <a href="https://calendly.com/tbourque-planipret" target="_blank" rel="noopener noreferrer">
                  Planifier un appel
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href="#services">Découvrir mes services</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-slate-200 rounded-full overflow-hidden shadow-xl w-4/5 mx-auto">
              <img 
                src="/lovable-uploads/e890eb15-6fc3-48da-a825-ef289e0a40df.png" 
                alt="Thomas Bourque, courtier hypothécaire" 
                className="h-full w-full object-cover brightness-75 contrast-110 saturate-75"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full -z-10"></div>
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
