
import React from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <h1 className="heading-xl text-slate-900 mb-4">404</h1>
        <p className="text-xl text-slate-700 mb-8">
          Oups! La page que vous recherchez semble introuvable.
        </p>
        <Button asChild size="lg">
          <a href="/">Retour à l'accueil</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
