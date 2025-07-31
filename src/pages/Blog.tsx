import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";

interface BlogPost {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
  slug: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Cette fonction chargera les articles depuis les fichiers markdown
    // Pour l'instant, on utilise des données d'exemple
    const loadPosts = async () => {
      // Articles d'exemple - seront remplacés par les vrais articles NetlifyCMS
      const examplePosts: BlogPost[] = [
        {
          title: "Guide complet pour obtenir votre première hypothèque",
          date: "2024-01-15",
          author: "Thomas Bourque",
          excerpt: "Découvrez les étapes essentielles pour obtenir votre première hypothèque et réaliser votre rêve d'accession à la propriété.",
          content: "Contenu complet de l'article...",
          tags: ["Première hypothèque", "Conseils", "Immobilier"],
          slug: "guide-premiere-hypotheque"
        },
        {
          title: "Taux fixe vs taux variable : comment choisir ?",
          date: "2024-01-10",
          author: "Thomas Bourque",
          excerpt: "Une analyse détaillée des avantages et inconvénients de chaque type de taux pour vous aider à faire le bon choix.",
          content: "Contenu complet de l'article...",
          tags: ["Taux hypothécaire", "Conseils financiers"],
          slug: "taux-fixe-vs-variable"
        },
        {
          title: "Les erreurs courantes à éviter lors d'une demande d'hypothèque",
          date: "2024-01-05",
          author: "Thomas Bourque",
          excerpt: "Évitez ces pièges courants qui pourraient compromettre votre demande d'hypothèque et retarder votre projet immobilier.",
          content: "Contenu complet de l'article...",
          tags: ["Erreurs", "Demande hypothèque", "Conseils"],
          slug: "erreurs-demande-hypotheque"
        }
      ];
      
      setPosts(examplePosts);
    };

    loadPosts();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Blog Hypothécaire
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Conseils d'expert, guides pratiques et actualités du marché hypothécaire 
              pour vous accompagner dans vos projets immobiliers.
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Card key={index} className="group hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <Calendar size={16} />
                    <span>{formatDate(post.date)}</span>
                    <span>•</span>
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="group-hover:bg-primary group-hover:text-white transition-colors">
                    Lire l'article
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Besoin de conseils personnalisés ?
            </h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Chaque situation est unique. Planifiez une consultation gratuite pour discuter 
              de votre projet hypothécaire avec un expert.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <a href="https://calendly.com/tbourque-planipret" target="_blank" rel="noopener noreferrer">
                Planifier une consultation
              </a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;