
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
            backgroundImage: `url('https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&h=1080&fit=crop&crop=center')`
          }}
        ></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container relative z-10 text-center text-white">
          <h1 className="heading-xl mb-6">
            Moins de stress, plus d'économies.
          </h1>
          <p className="body-lg mb-8 max-w-2xl mx-auto">
            Pour un accompagnement hypothécaire complet où que vous soyez au Québec.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="https://calendly.com/tbourque-planipret" target="_blank" rel="noopener noreferrer">
                Planifier un appel
              </a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white hover:text-slate-900" asChild>
              <a href="#about">Découvrir mes services</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Section avec votre photo et informations déplacée plus bas */}
      <section className="relative pt-24 pb-24 md:pt-32 md:pb-32 overflow-hidden" id="about">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 -z-10"></div>
        <div className="container grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 max-w-xl animate-fade-in">
            <h2 className="heading-lg text-slate-900">
              Votre courtier hypothécaire de confiance
            </h2>
            <p className="body-lg text-slate-700">
              Je vous accompagne dans l'obtention du meilleur financement hypothécaire adapté à votre situation, à Québec et ses environs.
            </p>
            
            {/* Service gratuit et magasinage highlight - sans encadré */}
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="bg-primary text-white text-sm font-semibold px-3 py-1 rounded-full">
                  Service 100% GRATUIT
                </span>
              </div>
              <p className="text-slate-700 body-md leading-relaxed">
                Je magasine pour vous les meilleurs produits hypothécaires auprès d'une <strong>vingtaine de banques et d'institutions financières</strong> pour vous garantir les meilleures conditions d'emprunt sur le marché.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <a href="https://calendly.com/tbourque-planipret" target="_blank" rel="noopener noreferrer">
                  Planifier un appel
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#services">Découvrir mes services</a>
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-slate-200 rounded-lg overflow-hidden shadow-xl w-4/5 mx-auto">
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
    </>
  );
};

export default Hero;
