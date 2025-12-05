import { Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-primary" />
            <span className="text-xl font-black">
              <span className="text-foreground">Small</span>
              <span className="text-primary">Budget</span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <Link to="/login" className="hover:text-primary transition-colors">
              Connexion
            </Link>
            <Link to="/signup" className="hover:text-primary transition-colors">
              Inscription
            </Link>
            <a href="#fonctionnalités" className="hover:text-primary transition-colors">
              Fonctionnalités
            </a>
            <a href="#tarifs" className="hover:text-primary transition-colors">
              Tarifs
            </a>
          </div>

          <div className="text-muted-foreground text-sm">
            © 2024 SmallBudget. Tous droits réservés.
          </div>
        </div>
      </div>
    </footer>
  );
};
