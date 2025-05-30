
import React from "react";
import ProcessSteps from "./ProcessSteps";

const About = () => {
  return (
    <>
      <section id="about" className="section bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="heading-lg text-slate-900 mb-6">À propos de moi</h2>
            <p className="body-md text-slate-700 mb-4">
              En tant que courtier hypothécaire Planiprêt, je travaille avec une vingtaine d'institutions financières pour vous proposer la solution de financement répondant le mieux à vos besoins. Mes services sont sans frais et vous assurent d'obtenir les meilleures conditions d'emprunt et le taux d'intérêt le plus avantageux sur le marché.
            </p>
            <p className="body-md text-slate-700">
              Basé à Québec, je peux vous servir à distance où que vous soyez au Québec. Prenons quelques minutes pour discuter ensemble de votre projet. Un simple appel de quelques minutes peut parfois mener à des économies de plusieurs milliers de dollars.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-lg hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M3 3v5h5"></path>
                  <path d="M3 8l4-4 4 4 8-8"></path>
                  <path d="M21 21v-5h-5"></path>
                  <path d="M21 16l-4 4-4-4-8 8"></path>
                </svg>
              </div>
              <h3 className="heading-sm text-slate-900 mb-4">Rapidité</h3>
              <p className="text-slate-700">
                Des réponses rapides et un traitement efficace de votre dossier pour concrétiser votre projet dans les meilleurs délais.
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
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
              </div>
              <h3 className="heading-sm text-slate-900 mb-4">Simplicité</h3>
              <p className="text-slate-700">
                Un processus clair et simplifié pour rendre votre expérience hypothécaire aussi fluide et compréhensible que possible.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <ProcessSteps />
    </>
  );
};

export default About;
