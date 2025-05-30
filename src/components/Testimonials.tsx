
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  const testimonials = [
    {
      name: "Alexis Drouin",
      position: "Breakeyville",
      content: "L'accompagnement et les conseils de Thomas tout au long de notre processus d'achat a été exceptionnel. Il nous a évité des mauvaises surprises et nous a permis d'économiser des milliers de dollars par rapport à l'offre reçue de notre banque.",
    },
    {
      name: "Simon Cassista",
      position: "Lebourgneuf",
      content: "Thomas nous a accompagnés avec professionnalisme du début à la fin. Ses explications claires nous ont aidés à comprendre toutes les étapes et à prendre les bonnes décisions pour notre projet immobilier.",
    },
    {
      name: "Léo Gendron",
      position: "Cap-Rouge",
      content: "Les conseils personnalisés de Thomas ont fait toute la différence. Il a pris le temps de bien analyser notre situation et nous a guidés vers la solution la plus adaptée à nos besoins.",
    },
  ];

  const averageRating = 5.0;
  const totalReviews = 5;

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

        {/* Section Avis Google simplifiée */}
        <div className="mt-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-4">
              <svg className="h-8 mr-3" viewBox="0 0 272 92" xmlns="http://www.w3.org/2000/svg">
                <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
                <path fill="#EA4335" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
                <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
                <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
                <path fill="#FBBC05" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z"/>
              </svg>
              <span className="text-lg font-medium text-slate-700">Avis Google</span>
            </div>
            <h3 className="heading-md text-slate-900 mb-6">Avis de nos clients sur Google</h3>
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="ml-3 text-2xl font-semibold text-slate-900">
                {averageRating}/5
              </span>
              <span className="ml-2 text-lg text-slate-600">({totalReviews} avis)</span>
            </div>
            <a
              href="https://www.google.com/search?q=thomas+bourque+courtier+hypothecaire+quebec"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium text-lg"
            >
              Voir tous les avis sur Google
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                <path d="M7 17L17 7"></path>
                <path d="M7 7h10v10"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
