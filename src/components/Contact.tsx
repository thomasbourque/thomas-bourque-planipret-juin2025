
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Formulaire envoyé",
      description: "Merci pour votre message. Je vous contacterai prochainement.",
    });
  };

  return (
    <section id="contact" className="section bg-slate-50">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="heading-lg text-slate-900 mb-6">Contactez-moi</h2>
          <p className="body-md text-slate-700">
            Prenez contact avec moi pour discuter de vos besoins en financement hypothécaire ou pour planifier une consultation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h3 className="heading-md text-slate-900 mb-6">Envoyez-moi un message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                    Nom complet
                  </label>
                  <Input
                    id="name"
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                    Courriel
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nom@exemple.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(123) 456-7890"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Comment puis-je vous aider?"
                    rows={5}
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Envoyer
              </Button>
            </form>
          </div>

          <div className="flex flex-col justify-center">
            <div className="space-y-8">
              <div>
                <h3 className="heading-md text-slate-900 mb-6">Information de contact</h3>
                <p className="body-md text-slate-700 mb-8">
                  N'hésitez pas à me contacter directement par téléphone ou par courriel.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Téléphone</h4>
                    <p className="text-slate-700">(418) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Courriel</h4>
                    <p className="text-slate-700">thomas@bourquehypothèque.ca</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-slate-900">Bureau</h4>
                    <p className="text-slate-700">1234 Rue St-Jean, Québec, QC G1R 1P9</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
