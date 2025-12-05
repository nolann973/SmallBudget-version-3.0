import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 text-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-8"
        >
          <div className="bg-primary/10 border border-primary/30 px-6 py-3 rounded-full">
            <span className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Rocket size={16} className="text-primary" />
              Plus de 5000 utilisateurs en Guyane
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
            Prenez le contrôle
          </span>
          <br />
          <span className="text-foreground">de vos finances</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12"
        >
          L'application de gestion de budget conçue pour les Guyanais.
          Suivez vos dépenses, atteignez vos objectifs d'épargne et découvrez
          les meilleures offres locales.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/signup">
            <Button className="btn-primary text-lg px-8 py-6">
              Commencer gratuitement
              <ArrowRight size={20} />
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-foreground text-lg"
            onClick={() => scrollToSection("fonctionnalités")}
          >
            Découvrir les fonctionnalités
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-20 relative"
        >
          <div className="glass-card p-4 md:p-8 mx-auto max-w-5xl">
            <div className="bg-gradient-to-br from-primary/20 to-accent/10 rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-primary mb-2">€2,450</div>
                  <div className="text-muted-foreground">Budget mensuel</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-accent mb-2">€890</div>
                  <div className="text-muted-foreground">Épargne ce mois</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-secondary mb-2">12</div>
                  <div className="text-muted-foreground">Objectifs atteints</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};
