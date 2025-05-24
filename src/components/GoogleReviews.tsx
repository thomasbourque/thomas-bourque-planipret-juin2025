
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const GoogleReviews = () => {
  const reviews = [
    {
      name: "Marie-Claude Dubois",
      rating: 5,
      comment: "Service exceptionnel ! Thomas a su nous guider à travers tout le processus d'achat de notre première maison. Très professionnel et à l'écoute de nos besoins.",
      date: "Il y a 2 semaines"
    },
    {
      name: "Patrick Lemieux",
      rating: 5,
      comment: "Je recommande fortement Thomas Bourque. Il a négocié un excellent taux pour mon refinancement et m'a fait économiser beaucoup d'argent. Merci !",
      date: "Il y a 1 mois"
    },
    {
      name: "Julie Tremblay",
      rating: 5,
      comment: "Courtier très compétent et disponible. Thomas a répondu à toutes mes questions rapidement et m'a aidée à obtenir un financement pour mon investissement immobilier.",
      date: "Il y a 2 mois"
    },
    {
      name: "François Bélanger",
      rating: 5,
      comment: "Excellent service client ! Thomas est très professionnel et connaît bien le marché hypothécaire de Québec. Je le recommande sans hésitation.",
      date: "Il y a 3 mois"
    },
    {
      name: "Sylvie Gagnon",
      rating: 5,
      comment: "Thomas nous a accompagnés dans notre projet d'achat-rénovation. Son expertise nous a permis d'obtenir le meilleur financement possible. Très satisfaits !",
      date: "Il y a 4 mois"
    },
    {
      name: "David Lapointe",
      rating: 4,
      comment: "Bon service, Thomas est à l'écoute et trouve des solutions adaptées. Le processus s'est bien déroulé pour notre renouvellement hypothécaire.",
      date: "Il y a 5 mois"
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <img 
              src="https://developers.google.com/static/maps/images/google_on_white_hdpi.png" 
              alt="Google" 
              className="h-8 mr-3"
            />
            <span className="text-lg font-medium text-slate-700">Avis Google</span>
          </div>
          <h2 className="heading-lg text-slate-900 mb-4">Avis de nos clients sur Google</h2>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-3 text-xl font-semibold text-slate-900">
              {averageRating.toFixed(1)}/5
            </span>
            <span className="ml-2 text-slate-600">({totalReviews} avis)</span>
          </div>
          <p className="body-md text-slate-700">
            Découvrez ce que nos clients disent de nos services sur Google.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="border-none shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-slate-900">{review.name}</h4>
                      <p className="text-sm text-slate-500">{review.date}</p>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://www.google.com/search?q=thomas+bourque+courtier+hypothecaire+quebec"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors font-medium"
          >
            Voir tous les avis sur Google
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M7 17L17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
