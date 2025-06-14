import React from "react";

const Partners = () => {
  const partners = [
    { name: "Desjardins", logo: "/lovable-uploads/27d233b3-ceae-4c07-8f1e-485c02cb84da.png" },
    { name: "TD Canada Trust", logo: "/lovable-uploads/d0b615ee-b5fe-461f-8eea-9864af16fdce.png" },
    { name: "Banque Nationale", logo: "/lovable-uploads/46afe0ab-f2da-4dce-9580-2abdedfb96b7.png" },
    { name: "RBC", logo: "/lovable-uploads/3626800e-914e-43ba-ad92-b6cb1bf0563b.png" },
    { name: "Scotiabank", logo: "/lovable-uploads/1d6ba3f1-0247-4367-99cf-8b1f02452cd5.png" },
    { name: "Caisse Alterna", logo: "/lovable-uploads/9d2e371a-d9bb-4900-881d-7bd2e6cdea6f.png" },
    { name: "Canada Guaranty", logo: "/lovable-uploads/11a31022-5658-4a44-aab3-94a9d18df466.png" },
    { name: "Capital Express", logo: "/lovable-uploads/0b6b86f9-5ec8-4083-90e2-98092b29efa4.png" },
    { name: "Banque Équitable", logo: "/lovable-uploads/cd618dc2-7faf-48f0-a93d-3ea8d2a0a499.png" },
    { name: "FCT", logo: "/lovable-uploads/b31c4af3-2ca7-49ce-a958-05195848e807.png" },
    { name: "First National", logo: "/lovable-uploads/8b4c71c0-7241-4093-982d-eaaed3ff1efb.png" },
    { name: "Home Trust", logo: "/lovable-uploads/8c10bc85-f6c0-4c94-8700-3836fce494f2.png" },
    { name: "Lendwise", logo: "/lovable-uploads/488d6693-42ac-4a3e-bc89-c0812b76c8f4.png" },
    { name: "Manulife", logo: "/lovable-uploads/de462715-69bd-4600-a7d5-11825c7972d2.png" },
    { name: "MCAP", logo: "/lovable-uploads/0a1c32c8-2284-471f-8d35-0a4340aa4aaf.png" },
    { name: "Merix", logo: "/lovable-uploads/0341a932-9b2b-4ac8-9507-51acbe1dc9ea.png" },
    { name: "Sagen", logo: "/lovable-uploads/e34dfe12-e520-4741-a729-2a46caca59a3.png" },
    { name: "CMHC", logo: "/lovable-uploads/ddb28e45-ff43-49de-84e7-3cb508838b06.png" },
    { name: "Sélection Hypothèques", logo: "/lovable-uploads/2b457b7d-e5cc-4668-8680-23b0c43c6b88.png" },
  ];

  return (
    <section className="section bg-primary/5">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-slate-900 mb-6">Mes partenaires</h2>
          <p className="body-md text-slate-700 max-w-2xl mx-auto mb-6">
            Je travaille avec une vingtaine d'institutions financières reconnues pour vous offrir les meilleures conditions d'emprunt sur le marché.
          </p>
          <p className="body-md text-slate-700 max-w-3xl mx-auto">
            Imaginez un instant devoir contacter chacune de ses institutions pour comparer leurs offres entre elles, un véritable travail de moine! En passant par un courtier hypothécaire, vous n'avez qu'un seul point de contact unique qui vous donne accès à tous ces prêteurs. Vous m'envoyez vos documents, je m'occupe du reste!
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-12 items-center">
            {[...partners, ...partners].map((partner, index) => (
              <div key={`${partner.name}-${index}`} className="flex-shrink-0 h-16 w-32 flex items-center justify-center hover:scale-105 transition-transform duration-300">
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
            animation: scroll 8s linear infinite;
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
