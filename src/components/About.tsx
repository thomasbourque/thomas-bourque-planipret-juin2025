
import React from "react";

const About = () => {
  return (
    <section id="about" className="section bg-white">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg text-slate-900 mb-6">À propos de moi</h2>
          <p className="body-md text-slate-700">
            Spécialiste des prêts hypothécaires à Québec avec plus de 10 ans d'expérience dans le secteur financier.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-50 p-8 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
                <path d="M13 5v2"></path>
                <path d="M13 17v2"></path>
                <path d="M13 11v2"></path>
              </svg>
            </div>
            <h3 className="heading-sm text-slate-900 mb-4">Expertise</h3>
            <p className="text-slate-700">
              Fort d'une décennie d'expérience dans le secteur financier, j'ai aidé des centaines de clients à réaliser leur rêve de propriété.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
              </svg>
            </div>
            <h3 className="heading-sm text-slate-900 mb-4">Confiance</h3>
            <p className="text-slate-700">
              La satisfaction de mes clients est ma priorité absolue. Je travaille avec intégrité et transparence pour obtenir les meilleures conditions.
            </p>
          </div>

          <div className="bg-slate-50 p-8 rounded-lg hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="heading-sm text-slate-900 mb-4">Personnalisé</h3>
            <p className="text-slate-700">
              Chaque situation est unique. J'offre des conseils personnalisés et des solutions sur mesure pour répondre à vos besoins spécifiques.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
