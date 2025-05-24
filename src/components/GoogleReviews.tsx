
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const GoogleReviews = () => {
  const reviews = [
    {
      name: "Dominic Latour",
      rating: 5,
      comment: "Excellent service from A to Z!!!",
      date: "Il y a 4 jours",
      reviewCount: "5 avis"
    },
    {
      name: "Elyse Busque",
      rating: 5,
      comment: "",
      date: "Il y a 4 jours",
      reviewCount: "1 avis"
    },
    {
      name: "Mélanie Beauvais",
      rating: 5,
      comment: "",
      date: "Il y a 4 jours",
      reviewCount: ""
    },
    {
      name: "Odile Paquin",
      rating: 5,
      comment: "",
      date: "Il y a 4 jours",
      reviewCount: "1 avis"
    },
    {
      name: "Sophie Boucher-Morel",
      rating: 5,
      comment: "",
      date: "Il y a 4 jours",
      reviewCount: "2 avis"
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

  const averageRating = 5.0; // Tous les avis sont 5 étoiles
  const totalReviews = 5;

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
          <div className="mb-4">
            <p className="text-lg font-semibold text-slate-900">Thomas Bourque - Courtier hypothécaire - Planiprêt</p>
            <p className="text-sm text-slate-600">5055 Bd Wilfrid-Hamel #250, Québec, QC G2E 2G6, Canada</p>
          </div>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-6 h-6 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="ml-3 text-xl font-semibold text-slate-900">
              {averageRating}/5
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
                      {review.reviewCount && (
                        <p className="text-xs text-slate-400">{review.reviewCount}</p>
                      )}
                      <p className="text-sm text-slate-500">{review.date}</p>
                    </div>
                    {renderStars(review.rating)}
                  </div>
                  {review.comment && (
                    <p className="text-slate-700 leading-relaxed">{review.comment}</p>
                  )}
                  {!review.comment && (
                    <div className="text-slate-400 italic text-sm">Aucun commentaire écrit</div>
                  )}
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
