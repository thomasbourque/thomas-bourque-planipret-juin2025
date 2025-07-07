
import { useState, useEffect } from 'react';

interface GoogleReview {
  name: string;
  rating: number;
  comment: string;
  date: string;
  reviewCount: string;
}

interface GoogleReviewsData {
  reviews: GoogleReview[];
  averageRating: number;
  totalReviews: number;
}

export const useGoogleReviews = () => {
  const [reviewsData, setReviewsData] = useState<GoogleReviewsData>({
    reviews: [
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
      },
      {
        name: "Marie-Claude Gagnon",
        rating: 5,
        comment: "",
        date: "Il y a 6 jours",
        reviewCount: "1 avis"
      },
      {
        name: "Jean-François Roberge",
        rating: 5,
        comment: "",
        date: "Il y a 1 semaine",
        reviewCount: "3 avis"
      },
      {
        name: "Catherine Lapointe",
        rating: 5,
        comment: "",
        date: "Il y a 1 semaine",
        reviewCount: "2 avis"
      }
    ],
    averageRating: 5.0,
    totalReviews: 8
  });

  const [lastUpdated, setLastUpdated] = useState<string | null>(
    localStorage.getItem('googleReviewsLastUpdated')
  );

  // Fonction pour simuler la récupération des nouveaux avis
  const fetchGoogleReviews = async () => {
    try {
      // Simulation d'une vraie API Google Reviews
      console.log('Actualisation des avis Google...');
      
      // Ici vous pourriez faire un appel à votre API backend qui récupère les avis Google
      // const response = await fetch('/api/google-reviews');
      // const data = await response.json();
      
      // Pour l'instant, on met à jour automatiquement le nombre total basé sur les avis existants
      const currentReviews = reviewsData.reviews;
      const updatedData = {
        ...reviewsData,
        totalReviews: currentReviews.length,
        averageRating: currentReviews.reduce((sum, review) => sum + review.rating, 0) / currentReviews.length
      };
      
      setReviewsData(updatedData);
      
      // Marquer comme mis à jour
      const now = new Date().toISOString();
      setLastUpdated(now);
      localStorage.setItem('googleReviewsLastUpdated', now);
      
    } catch (error) {
      console.error('Erreur lors de l\'actualisation des avis Google:', error);
    }
  };

  useEffect(() => {
    const checkForUpdates = () => {
      const now = new Date();
      const lastUpdate = lastUpdated ? new Date(lastUpdated) : null;
      
      // Vérifier si plus de 1 heure s'est écoulée pour une actualisation plus fréquente
      if (!lastUpdate || now.getTime() - lastUpdate.getTime() > 60 * 60 * 1000) {
        fetchGoogleReviews();
      }
    };

    // Vérifier immédiatement
    checkForUpdates();

    // Configurer un intervalle pour vérifier toutes les 30 minutes
    const interval = setInterval(checkForUpdates, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return { ...reviewsData, lastUpdated, refetch: fetchGoogleReviews };
};
