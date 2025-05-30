
import React from "react";

const Partners = () => {
  const partners = [
    { name: "Desjardins", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Desjardins_logo.svg/320px-Desjardins_logo.svg.png" },
    { name: "TD Canada Trust", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Toronto-Dominion_Bank_logo.svg/320px-Toronto-Dominion_Bank_logo.svg.png" },
    { name: "Banque Nationale", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/National_Bank_of_Canada_logo.svg/320px-National_Bank_of_Canada_logo.svg.png" },
    { name: "RBC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/RBC_Logo.svg/320px-RBC_Logo.svg.png" },
    { name: "BMO", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/BMO_Logo.svg/320px-BMO_Logo.svg.png" },
    { name: "Scotiabank", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Scotiabank_Logo.svg/320px-Scotiabank_Logo.svg.png" },
    { name: "CIBC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/CIBC_logo.svg/320px-CIBC_logo.svg.png" },
    { name: "Banque Laurentienne", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Laurentian_Bank_logo.svg/320px-Laurentian_Bank_logo.svg.png" },
    { name: "HSBC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/HSBC_logo_%282018%29.svg/320px-HSBC_logo_%282018%29.svg.png" },
    { name: "Équitable", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Equitable_Bank_logo.svg/320px-Equitable_Bank_logo.svg.png" },
    { name: "First National", logo: "https://logos-world.net/wp-content/uploads/2020/11/First-National-Bank-Logo.png" },
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
