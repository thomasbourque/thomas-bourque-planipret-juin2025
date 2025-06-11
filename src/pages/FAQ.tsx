
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Pourquoi faire affaire avec un courtier hypothécaire plutôt qu'avec une banque?",
      answer: "Un courtier hypothécaire travaille pour vous, pas pour une institution financière. Il compare les offres de plusieurs prêteurs pour trouver le meilleur taux et les meilleures conditions adaptées à votre situation."
    },
    {
      question: "Combien coûte les services d'un courtier hypothécaire?",
      answer: "Mes services sont gratuits. Ma rémunération provient du prêteur une fois le prêt accordé. Vous bénéficiez donc de conseils objectifs complètement sans frais."
    },
    {
      question: "Est-ce qu'une préautorisation hypothécaire et est-ce nécessaire?",
      answer: "Oui, c'est fortement recommandé d'avoir une préautorisation si vous souhaitez acheter une propriété prochainement. Une préautorisation vous donne une idée claire de votre budget, rassure les vendeurs et les courtiers immobiliers en plus de vous permettre de figer votre taux pour une période donnée (souvent 90 à 120 jours)."
    },
    {
      question: "Quel est le meilleur moment pour comparer les offres en vue de mon renouvellement?",
      answer: "Vous pouvez débuter le processus jusqu'à 6 mois avant la date d'échéance. Cela vous donne le temps de magasiner les meilleures conditions sans pression. Le moment où le prêteur vous enverra votre offre de renouvellement varie d'une institution à l'autre."
    },
    {
      question: "Puis-je transférer mon hypothèque ailleurs au moment du renouvellement?",
      answer: "Oui. C'est l'occasion idéale pour renégocier vos conditions et changer de prêteur sans avoir de pénalité à payer."
    },
    {
      question: "Quelle est la différence entre un taux fixe et un taux variable?",
      answer: "• Taux fixe : reste stable pendant toute la durée de votre terme.\n• Taux variable : peut fluctuer selon le taux directeur de la banque du Canada\n\nLe choix dépend avant tout de votre seuil de tolérance au risque et de vos objectifs financiers. Nous pourrons prendre le temps de comparer ces deux options lors d'un appel."
    },
    {
      question: "Puis-je acheter une propriété avec une mise de fonds inférieure à 20 %?",
      answer: "Oui, mais votre prêt devra être assuré par la SCHL ou un autre assureur hypothécaire. Cela implique certains frais supplémentaires, mais peut vous permettre d'accéder à la propriété plus rapidement et d'avoir accès à des meilleurs taux."
    },
    {
      question: "Quels sont les programmes à ma disposition pour acheter une première maison?",
      answer: "Le RAP (Régime d'accession à la propriété) vous permet de retirer jusqu'à 60 000 $ de votre REER sans impôt, à condition de rembourser ce montant sur 15 ans.\n\nLe CELIAPP (compte d'épargne libre d'impôt pour l'achat d'une première propriété) permet d'épargner jusqu'à 8 000 $ par année, jusqu'à un maximum de 40 000 $, avec des avantages fiscaux doubles : vos cotisations sont déductibles d'impôt, et les retraits pour l'achat de votre première propriété sont non imposables. C'est un outil puissant pour bâtir votre mise de fonds plus rapidement.\n\nCes deux programmes peuvent être combinés."
    },
    {
      question: "Qu'est-ce qu'une hypothèque conventionnelle?",
      answer: "Une hypothèque est dite conventionnelle lorsque la mise de fonds est de 20 % ou plus. Elle ne nécessite pas d'assurance prêt hypothécaire."
    },
    {
      question: "Un courtier peut-il m'aider même si j'ai une situation financière complexe (travailleur autonome, crédit affecté, faillite, etc.)?",
      answer: "Tout à fait. Je travaille à la fois avec des prêteurs de type A, des prêteurs de type B et des prêteurs privés. Certains prêteurs se spécialisent dans les cas hors norme et peuvent par exemple considérer votre dossier même avec un historique de crédit difficile. Nous pourrons explorer ensemble toutes les options pour trouver la solution la mieux adaptée à votre profil."
    },
    {
      question: "Est-ce que je peux rembourser mon hypothèque plus rapidement?",
      answer: "Oui, la plupart des prêts permettent des remboursements anticipés (paiements supplémentaires ou augmentation du montant régulier) sans pénalité. Je pourrai vous expliquer vos options selon le produit choisi."
    },
    {
      question: "Puis-je refinancer mon hypothèque pour accéder à l'équité de ma maison?",
      answer: "Absolument. Le refinancement vous permet de débloquer une partie de la valeur nette de votre propriété pour des projets comme des rénovations ou le remboursement de dettes."
    },
    {
      question: "Quels documents dois-je fournir lors de la demande?",
      answer: "Les documents requis incluent généralement : preuve de revenus, relevés bancaires, avis de cotisation, preuve d'emploi, et preuves d'identité. Je vous fournirai une liste complète selon votre situation spécifique."
    },
    {
      question: "Puis-je obtenir un meilleur taux en passant par un courtier?",
      answer: "Absolument! Grâce à mon réseau de prêteurs et mon volume d'affaires, j'ai souvent accès à des taux préférentiels que vous ne pourriez pas obtenir en vous adressant directement à une seule institution."
    },
    {
      question: "Dans quelles régions offrez-vous vos services?",
      answer: "Bien que je sois basé à Québec, j'offre mes services à distance partout au Québec. Je peux traiter votre dossier efficacement peu importe où vous vous trouvez dans la province."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24">
        <section className="section bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="heading-xl text-slate-900 mb-6">
                  Foire aux questions
                </h1>
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
                    <AccordionContent className="text-slate-700 leading-relaxed whitespace-pre-line">
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
                    href="mailto:tbourque@planipret.com"
                    className="inline-flex items-center px-6 py-3 border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    Envoyer un courriel
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
