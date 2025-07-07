
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
      }
    ],
    averageRating: 5.0,
    totalReviews: 5
  });

  const [lastUpdated, setLastUpdated] = useState<string | null>(
    localStorage.getItem('googleReviewsLastUpdated')
  );

  // Fonction pour simuler la récupération des nouveaux avis
  const fetchGoogleReviews = async () => {
    try {
      // Ici vous pourriez intégrer une vraie API Google Reviews
      // Pour l'instant, on simule avec les données existantes
      console.log('Actualisation des avis Google...');
      
      // Marquer comme mis à jour
      const now = new Date().toISOString();
      setLastUpdated(now);
      localStorage.setItem('googleReviewsLastUpdated', now);
      
      // Vous pouvez ici ajouter la logique pour récupérer de vrais avis
      // et mettre à jour reviewsData si nécessaire
      
    } catch (error) {
      console.error('Erreur lors de l\'actualisation des avis Google:', error);
    }
  };

  useEffect(() => {
    const checkForUpdates = () => {
      const now = new Date();
      const lastUpdate = lastUpdated ? new Date(lastUpdated) : null;
      
      // Vérifier si plus de 24 heures se sont écoulées
      if (!lastUpdate || now.getTime() - lastUpdate.getTime() > 24 * 60 * 60 * 1000) {
        fetchGoogleReviews();
      }
    };

    // Vérifier immédiatement
    checkForUpdates();

    // Configurer un intervalle pour vérifier toutes les heures
    const interval = setInterval(checkForUpdates, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  return { ...reviewsData, lastUpdated, refetch: fetchGoogleReviews };
};
