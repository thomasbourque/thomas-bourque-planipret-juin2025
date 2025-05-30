
import React from "react";

const Partners = () => {
  const partners = [
    { name: "Banque Nationale", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/bn.png" },
    { name: "TD Canada Trust", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/td.png" },
    { name: "BMO", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/bmo.png" },
    { name: "RBC", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/rbc.png" },
    { name: "Scotiabank", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/scotia.png" },
    { name: "CIBC", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/cibc.png" },
    { name: "Desjardins", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/desjardins.png" },
    { name: "Laurentienne", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/laurentienne.png" },
    { name: "HSBC", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/hsbc.png" },
    { name: "Équitable", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/equitable.png" },
    { name: "First National", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/first-national.png" },
    { name: "MCAP", logo: "https://www.patricenoelcourtierhypothecaire.com/wp-content/uploads/2023/05/mcap.png" },
  ];

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-slate-900 mb-6">Nos partenaires</h2>
          <p className="body-md text-slate-700 max-w-2xl mx-auto">
            Je travaille avec une vingtaine d'institutions financières reconnues pour vous offrir les meilleures conditions d'emprunt.
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-12 items-center">
            {[...partners, ...partners].map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="flex-shrink-0 h-16 w-32 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Partners;
