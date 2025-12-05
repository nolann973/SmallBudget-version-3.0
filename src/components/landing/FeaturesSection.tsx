import { motion } from "framer-motion";
import { Wallet, Target, PiggyBank, Bell, Shield, Smartphone } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Suivi des dépenses",
    description: "Catégorisez automatiquement vos transactions et visualisez où va votre argent.",
    color: "bg-primary/20 text-primary",
  },
  {
    icon: Target,
    title: "Objectifs d'épargne",
    description: "Définissez des objectifs personnalisés et suivez votre progression en temps réel.",
    color: "bg-accent/20 text-accent",
  },
  {
    icon: PiggyBank,
    title: "Plans d'épargne",
    description: "Des stratégies adaptées à votre situation pour maximiser vos économies.",
    color: "bg-secondary/20 text-secondary",
  },
  {
    icon: Bell,
    title: "Alertes intelligentes",
    description: "Recevez des notifications quand vous approchez de vos limites budgétaires.",
    color: "bg-primary/20 text-primary",
  },
  {
    icon: Shield,
    title: "Données sécurisées",
    description: "Vos données financières sont chiffrées et protégées selon les normes bancaires.",
    color: "bg-accent/20 text-accent",
  },
  {
    icon: Smartphone,
    title: "Accès partout",
    description: "Gérez votre budget depuis n'importe quel appareil, n'importe où.",
    color: "bg-secondary/20 text-secondary",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="fonctionnalités" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Tout ce dont vous avez <span className="gradient-text">besoin</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des outils puissants pour une gestion financière simplifiée
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
