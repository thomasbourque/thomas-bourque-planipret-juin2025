
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Qu'est-ce qu'un courtier hypothécaire?",
      answer: "Un courtier hypothécaire est un professionnel qui agit comme intermédiaire entre vous et les prêteurs. Il compare les offres de plusieurs institutions financières pour vous trouver le meilleur taux et les conditions les plus avantageuses selon votre situation."
    },
    {
      question: "Combien coûtent les services d'un courtier hypothécaire?",
      answer: "Mes services sont entièrement gratuits pour vous. Je suis rémunéré directement par l'institution financière qui vous octroie le prêt, sans aucun frais supplémentaire de votre part."
    },
    {
      question: "Combien puis-je économiser en passant par un courtier?",
      answer: "Les économies varient selon votre situation, mais une différence de seulement 0,25% sur votre taux peut vous faire économiser des milliers de dollars sur la durée de votre prêt. Utilisez notre calculateur pour estimer vos économies potentielles."
    },
    {
      question: "Quels types de prêts hypothécaires offrez-vous?",
      answer: "J'offre une gamme complète de produits hypothécaires : achat résidentiel, refinancement, transfert d'hypothèque, prêts pour propriétés locatives, lignes de crédit hypothécaire et plus encore."
    },
    {
      question: "Combien de temps prend le processus d'approbation?",
      answer: "Le délai varie selon la complexité de votre dossier, mais généralement, une pré-approbation peut être obtenue en 24-48 heures. Pour une approbation finale, comptez entre 5 à 15 jours ouvrables."
    },
    {
      question: "Puis-je obtenir un prêt hypothécaire si je suis travailleur autonome?",
      answer: "Absolument! Être travailleur autonome ne vous disqualifie pas. Nous avons accès à des prêteurs spécialisés qui comprennent les revenus variables et peuvent évaluer votre capacité de remboursement de façon adaptée."
    },
    {
      question: "Que se passe-t-il si j'ai un mauvais crédit?",
      answer: "Un crédit imparfait ne signifie pas que vous ne pouvez pas obtenir de financement. Nous travaillons avec des prêteurs alternatifs qui peuvent considérer votre dossier même avec un historique de crédit difficile."
    },
    {
      question: "Offrez-vous vos services partout au Québec?",
      answer: "Oui, bien que je sois basé à Québec, j'offre mes services à distance partout au Québec. Grâce à la technologie, nous pouvons traiter votre dossier efficacement peu importe où vous vous trouvez dans la province."
    }
  ];

  return (
    <section className="section bg-white" id="faq">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-slate-900 mb-6">
              Foire aux questions
            </h2>
            <p className="body-md text-slate-700 max-w-2xl mx-auto">
              Trouvez les réponses aux questions les plus fréquemment posées sur mes services de courtage hypothécaire.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-slate-200 rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-medium text-slate-900 hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-700 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-12">
            <p className="body-md text-slate-700 mb-6">
              Vous avez d'autres questions? N'hésitez pas à me contacter directement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://calendly.com/tbourque-planipret" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
              >
                Planifier un appel
              </a>
              <a 
                href="mailto:thomas.bourque@planipret.com"
                className="inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Envoyer un courriel
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
