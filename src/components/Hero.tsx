import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Facebook, Instagram, Phone } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

const Hero = () => {
  const [imgLoadedMobile, setImgLoadedMobile] = useState(false);
  const [imgLoadedDesktop, setImgLoadedDesktop] = useState(false);

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
          <p className="body-lg mb-8 max-w-3xl mx-auto">
            Un accompagnement hypothécaire complet <span className="font-semibold" style={{ color: '#D4AF37' }}>100 % gratuit</span> pour vos projets immobiliers partout au Québec.
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
          <div className="flex flex-col space-y-6 max-w-xl animate-fade-in order-2 md:order-1">
            {/* Ligne dorée au-dessus du nom */}
            <div className="w-16 h-0.5 bg-yellow-500 mb-2"></div>
            
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-slate-900">
              Thomas Bourque
            </h2>
            <p className="text-xl font-medium text-slate-600 mb-4">
              Courtier hypothécaire, B.A.A.
            </p>
            
            {/* Photo pour mobile - s'affiche ici sur mobile */}
            <div className="relative md:hidden mb-6 w-64 mx-auto">
              {!imgLoadedMobile && (
                <Skeleton className="aspect-[4/5] rounded-full w-64 h-auto" />
              )}
              <div className="aspect-[4/5] bg-slate-200 rounded-full overflow-hidden shadow-xl w-64 mx-auto">
                <img 
                  src="/lovable-uploads/e890eb15-6fc3-48da-a825-ef289e0a40df.png" 
                  alt="Thomas Bourque, courtier hypothécaire" 
                  className={`h-full w-full object-cover brightness-100 contrast-110 saturate-75 transition-opacity duration-500 ${imgLoadedMobile ? "opacity-100" : "opacity-0"}`}
                  loading="lazy"
                  onLoad={() => setImgLoadedMobile(true)}
                />
              </div>
            </div>
            
            {/* Liens vers les réseaux sociaux */}
            <div className="flex items-center gap-4 mb-6">
              <a 
                href="mailto:tbourque@planipret.com" 
                className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full hover:bg-primary/80 transition-colors"
                title="Courriel"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/thomas-bourque" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.facebook.com/thomasbourque.planipret/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/thomasbourque.courtier/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Numéro de cellulaire */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 bg-slate-600 text-white rounded-full">
                <Phone className="w-5 h-5" />
              </div>
              <a href="tel:418-569-6482" className="text-lg font-medium text-slate-700 hover:text-primary transition-colors">
                418-569-6482
              </a>
            </div>
            
            <div className="space-y-4">
              <p className="body-md text-slate-700 mb-4">
                <strong>Je travaille pour vos intérêts, pas ceux de la banque!</strong>
              </p>
              <p className="body-md text-slate-700 mb-4">
                J'aide mes clients à y voir plus clair dans la jungle du financement résidentiel, un domaine trop souvent mal compris. L'obtention d'un prêt hypothécaire devrait à mes yeux toujours demeurer un processus facile et simple et non une charge mentale accablante.
              </p>
              <p className="body-md text-slate-700 mb-4">
                Détenteur d'un baccalauréat en administration des affaires de l'Université Laval et ayant travaillé durant 7 ans en analyse quantitative, je carbure à faire parler les chiffres. Mon approche à la fois humaine et analytique a un objectif clair : vous permettre de prendre une décision éclairée pour votre projet de financement hypothécaire.
              </p>
              <p className="body-md text-slate-700 mb-4">
                Mes services sont complètement sans frais et vous assurent d'obtenir les meilleures conditions d'emprunt et le taux d'intérêt le plus avantageux sur le marché parmi une vingtaine d'institutions financières.
              </p>
              <p className="body-md text-slate-700">
                Basé à Québec, je peux vous servir à distance où que vous soyez au Québec. Prenons quelques minutes pour discuter ensemble de votre projet. Vous serez surpris, un simple appel de quelques minutes peut souvent mener à des économies substantielles ou conduire à une solution à laquelle vous n'aviez pas pensé.
              </p>
            </div>
            
            {/* Service gratuit highlight avec couleur dorée */}
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="bg-yellow-500 text-slate-900 text-sm font-semibold px-3 py-1 rounded-full">
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
          <div className="relative order-1 md:order-2 hidden md:block w-4/5 mx-auto">
            {!imgLoadedDesktop && (
              <Skeleton className="absolute aspect-[4/5] rounded-full w-full h-auto top-0 left-0" />
            )}
            <div className="aspect-[4/5] bg-slate-200 rounded-full overflow-hidden shadow-xl w-full mx-auto">
              <img 
                src="/lovable-uploads/e890eb15-6fc3-48da-a825-ef289e0a40df.png" 
                alt="Thomas Bourque, courtier hypothécaire" 
                className={`h-full w-full object-cover brightness-100 contrast-110 saturate-75 transition-opacity duration-500 ${imgLoadedDesktop ? "opacity-100" : "opacity-0"}`}
                loading="lazy"
                onLoad={() => setImgLoadedDesktop(true)}
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
