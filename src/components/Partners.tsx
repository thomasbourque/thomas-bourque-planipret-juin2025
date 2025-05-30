
import React from "react";

const Partners = () => {
  const partners = [
    { name: "Banque Nationale", logo: "https://logos-world.net/wp-content/uploads/2021/02/National-Bank-of-Canada-Logo.png" },
    { name: "TD Canada Trust", logo: "https://logos-world.net/wp-content/uploads/2021/02/TD-Bank-Logo.png" },
    { name: "BMO", logo: "https://logos-world.net/wp-content/uploads/2021/02/BMO-Logo.png" },
    { name: "RBC", logo: "https://logos-world.net/wp-content/uploads/2021/02/RBC-Royal-Bank-Logo.png" },
    { name: "Scotiabank", logo: "https://logos-world.net/wp-content/uploads/2021/02/Scotiabank-Logo.png" },
    { name: "CIBC", logo: "https://logos-world.net/wp-content/uploads/2021/02/CIBC-Logo.png" },
    { name: "Desjardins", logo: "https://logos-world.net/wp-content/uploads/2021/02/Desjardins-Logo.png" },
    { name: "Banque Laurentienne", logo: "https://www.laurentianbank.ca/content/dam/lbc/images/logos/logo-lbc-header-fr.svg" },
    { name: "HSBC", logo: "https://logos-world.net/wp-content/uploads/2020/12/HSBC-Logo.png" },
    { name: "Équitable", logo: "https://www.equitablebank.ca/images/logo-main.svg" },
    { name: "First National", logo: "https://www.fnf.ca/application/files/8116/2845/5324/fnf-logo-blue.png" },
    { name: "MCAP", logo: "https://www.mcap.com/application/files/cache/thumbnails/9715/4337/8919/mcap_logo_blue_rgb.png" },
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
                  onError={(e) => {
                    console.log(`Error loading logo for ${partner.name}:`, e);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
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
        `
      }} />
    </section>
  );
};

export default Partners;
