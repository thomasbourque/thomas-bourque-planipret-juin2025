
import React from "react";

const Partners = () => {
  const partners = [
    { name: "Banque Nationale", logo: "https://cdn.ca.yapla.com/company/CPYAmmuWRF6PVm7N6OwFYgwN/asset/files/Logo_BNCD_horizontal_CMYK.jpg" },
    { name: "TD Canada Trust", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Toronto-Dominion_Bank_logo.svg/1280px-Toronto-Dominion_Bank_logo.svg.png" },
    { name: "BMO", logo: "https://logos-world.net/wp-content/uploads/2021/02/BMO-Logo.png" },
    { name: "RBC", logo: "https://logos-world.net/wp-content/uploads/2021/02/RBC-Royal-Bank-Logo.png" },
    { name: "Scotiabank", logo: "https://logos-world.net/wp-content/uploads/2021/02/Scotiabank-Logo.png" },
    { name: "CIBC", logo: "https://logos-world.net/wp-content/uploads/2021/02/CIBC-Logo.png" },
    { name: "Desjardins", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Desjardins_logo.svg/1280px-Desjardins_logo.svg.png" },
    { name: "Laurentienne", logo: "https://upload.wikimedia.org/wikipedia/fr/thumb/9/9d/Logo_Banque_Laurentienne.svg/1200px-Logo_Banque_Laurentienne.svg.png" },
    { name: "HSBC", logo: "https://logos-world.net/wp-content/uploads/2020/12/HSBC-Logo.png" },
    { name: "Équitable", logo: "https://www.equitablebank.ca/images/logo-main.svg" },
    { name: "First National", logo: "https://fnf.ca/wp-content/uploads/2020/08/fnf-logo-blue.png" },
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
