import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    period: "/mois",
    description: "Parfait pour commencer",
    features: [
      "Suivi des dépenses illimité",
      "3 objectifs d'épargne",
      "Rapports mensuels",
      "Support par email",
    ],
    buttonText: "Commencer",
    popular: false,
  },
  {
    name: "Premium",
    price: "9.99€",
    period: "/mois",
    description: "Pour les utilisateurs avancés",
    features: [
      "Tout du plan Gratuit",
      "Objectifs illimités",
      "Alertes intelligentes",
      "Rapports avancés",
      "Promo locales exclusives",
      "Support prioritaire",
    ],
    buttonText: "Essai gratuit 14 jours",
    popular: true,
  },
  {
    name: "Famille",
    price: "14.99€",
    period: "/mois",
    description: "Gérez le budget familial",
    features: [
      "Tout du plan Premium",
      "Jusqu'à 5 membres",
      "Budget partagé",
      "Objectifs familiaux",
      "Contrôle parental",
    ],
    buttonText: "Essai gratuit 14 jours",
    popular: false,
  },
];

export const PricingSection = () => {
  return (
    <section id="tarifs" className="py-20 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Des tarifs <span className="gradient-text-accent">transparents</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choisissez le plan qui correspond à vos besoins
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-8 relative ${
                plan.popular ? "border-primary glow-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} />
                    Populaire
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-5xl font-black">{plan.price}</span>
                  <span className="text-muted-foreground mb-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/signup" className="block">
                <Button
                  className={`w-full ${
                    plan.popular ? "btn-primary" : "btn-secondary"
                  }`}
                >
                  {plan.buttonText}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
