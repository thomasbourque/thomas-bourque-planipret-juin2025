
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Alexis Drouin",
      position: "Propriétaire",
      content: "Grâce à l'expertise exceptionnelle de M. Bourque, j'ai pu financer ma maison de rêve à Breakeyville dans des conditions très avantageuses. Son dévouement et ses connaissances du marché hypothécaire m'ont permis de concrétiser mon projet. Je le recommande vivement !",
    },
    {
      name: "Jean Gagnon",
      position: "Investisseur immobilier",
      content: "Grâce à l'expertise de Thomas, j'ai pu refinancer ma propriété locative dans des conditions très avantageuses. Son professionnalisme et sa connaissance du marché sont impressionnants.",
    },
    {
      name: "Sophie Lavoie",
      position: "Propriétaire",
      content: "Le renouvellement de mon prêt hypothécaire s'approchait et je voulais obtenir les meilleures conditions. Thomas a négocié un taux bien inférieur à ce que ma banque m'offrait. Je suis très satisfaite !",
    },
    {
      name: "Olivier Nadeau",
      position: "Nouveau propriétaire",
      content: "Thomas m'a aidé à financer ma nouvelle maison sur la rive sud, à proximité des ponts. Cela me permet d'accéder plus facilement aux restaurants 'Apportez Votre Vin' situés sur la rive nord de Québec. Son expertise a été déterminante dans la réalisation de mon projet.",
    },
  ];

  return (
    <section id="testimonials" className="section bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg text-slate-900 mb-6">Ce que disent mes clients</h2>
          <p className="body-md text-slate-700">
            La satisfaction de mes clients est ma priorité. Voici quelques témoignages de personnes que j'ai eu le plaisir d'accompagner.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-md bg-slate-50">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col space-y-6">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary/30">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                  </svg>
                </div>
                
                <p className="text-lg md:text-xl text-slate-800 font-medium italic">
                  {testimonials[activeTestimonial].content}
                </p>
                
                <div className="pt-4">
                  <h4 className="font-serif text-lg font-medium text-slate-900">
                    {testimonials[activeTestimonial].name}
                  </h4>
                  <p className="text-slate-600">{testimonials[activeTestimonial].position}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeTestimonial === index ? "bg-primary" : "bg-slate-300"
                }`}
                aria-label={`Voir le témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
