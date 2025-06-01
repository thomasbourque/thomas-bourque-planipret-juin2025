
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import GoogleReviews from "./GoogleReviews";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Marie Dubois",
      role: "Première acheteuse",
      content: "Thomas a rendu l'achat de ma première maison si simple ! Il a trouvé un taux 0,5% plus bas que ma banque et m'a accompagnée à chaque étape.",
      rating: 5
    },
    {
      name: "Jean-Pierre Tremblay",
      role: "Refinancement",
      content: "Grâce à Thomas, j'ai économisé plus de 15 000$ sur mon refinancement. Son expertise et sa disponibilité font toute la différence.",
      rating: 5
    },
    {
      name: "Sarah Chen",
      role: "Investissement immobilier",
      content: "Pour mon duplex, Thomas a négocié des conditions exceptionnelles. Son réseau de professionnels m'a fait gagner un temps précieux.",
      rating: 5
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="heading-lg text-slate-900 mb-6">
            La satisfaction de mes clients est ma priorité absolue
          </h2>
          <p className="body-md text-slate-700">
            Découvrez les expériences de mes clients qui ont fait confiance à mon expertise pour leurs projets hypothécaires.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-lg relative">
              <CardContent className="p-8 text-center">
                <Quote className="w-8 h-8 text-primary mx-auto mb-4 opacity-60" />
                {renderStars(testimonial.rating)}
                <p className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <h4 className="font-semibold text-slate-900">{testimonial.name}</h4>
                  <p className="text-sm text-slate-600">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Image stylisée TB */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div 
              className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg"
              style={{
                clipPath: "polygon(0% 0%, 60% 0%, 60% 35%, 100% 35%, 100% 65%, 60% 65%, 60% 100%, 0% 100%)",
                backgroundImage: "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><rect width=\"100\" height=\"100\" fill=\"%23e3f2fd\"/><path d=\"M20 20h60v15H35v15h45v15H35v15h45v-60z\" fill=\"%231976d2\"/></svg>')"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">TB</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GoogleReviews />
    </section>
  );
};

export default Testimonials;
