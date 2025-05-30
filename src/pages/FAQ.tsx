
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
      question: "Qu'est-ce qu'un courtier hypothécaire?",
      answer: "Un courtier hypothécaire est un professionnel qui agit comme intermédiaire entre vous et les prêteurs. Il compare les offres de plusieurs institutions financières pour vous trouver le meilleur taux et les conditions les plus avantageuses selon votre situation."
    },
    {
      question: "Quels sont les avantages de faire affaire avec un courtier hypothécaire?",
      answer: "Faire affaire avec un courtier hypothécaire vous permet d'économiser temps et argent. Nous avons accès à de nombreux prêteurs et pouvons négocier de meilleurs taux. De plus, nos services sont gratuits pour vous - nous sommes rémunérés par les institutions financières."
    },
    {
      question: "Combien coûtent vos services?",
      answer: "Mes services sont entièrement gratuits pour vous. Je suis rémunéré directement par l'institution financière qui vous octroie le prêt, sans aucun frais supplémentaire de votre part."
    },
    {
      question: "Puis-je obtenir un meilleur taux en passant par un courtier?",
      answer: "Absolument! Grâce à mon réseau de prêteurs et mon volume d'affaires, j'ai souvent accès à des taux préférentiels que vous ne pourriez pas obtenir en vous adressant directement à une seule institution."
    },
    {
      question: "Combien de temps prend le processus d'approbation?",
      answer: "Le délai varie selon la complexité de votre dossier, mais généralement, une pré-approbation peut être obtenue en 24-48 heures. Pour une approbation finale, comptez entre 5 à 15 jours ouvrables."
    },
    {
      question: "Quels documents dois-je fournir?",
      answer: "Les documents requis incluent généralement : preuve de revenus, relevés bancaires, avis de cotisation, preuve d'emploi, et identification. Je vous fournirai une liste complète selon votre situation spécifique."
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
      question: "Offrez-vous un service de refinancement?",
      answer: "Oui, je peux vous aider avec le refinancement de votre hypothèque actuelle. Cela peut vous permettre d'obtenir un meilleur taux, de consolider des dettes ou d'accéder à l'équité de votre propriété."
    },
    {
      question: "Dans quelles régions offrez-vous vos services?",
      answer: "Bien que je sois basé à Québec, j'offre mes services à distance partout au Québec. Grâce à la technologie, nous pouvons traiter votre dossier efficacement peu importe où vous vous trouvez dans la province."
    },
    {
      question: "Comment puis-je vous contacter?",
      answer: "Vous pouvez me joindre par téléphone au 418-569-6482, par courriel à thomas.bourque@planipret.com, ou planifier un appel gratuit via mon calendrier en ligne."
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
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
