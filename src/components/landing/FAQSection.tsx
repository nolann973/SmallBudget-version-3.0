import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "SmallBudget est-il vraiment gratuit ?",
    answer:
      "Oui ! Notre plan gratuit vous donne accès au suivi des dépenses illimité, 3 objectifs d'épargne et des rapports mensuels. Aucune carte bancaire requise.",
  },
  {
    question: "Mes données financières sont-elles sécurisées ?",
    answer:
      "Absolument. Nous utilisons un chiffrement de niveau bancaire (AES-256) pour protéger vos données. Nous ne stockons jamais vos identifiants bancaires et ne partageons jamais vos informations avec des tiers.",
  },
  {
    question: "Puis-je annuler mon abonnement à tout moment ?",
    answer:
      "Oui, vous pouvez annuler votre abonnement Premium ou Famille à tout moment. Vous continuerez à avoir accès aux fonctionnalités premium jusqu'à la fin de votre période de facturation.",
  },
  {
    question: "L'application est-elle disponible sur mobile ?",
    answer:
      "SmallBudget est une application web responsive qui fonctionne parfaitement sur tous vos appareils : ordinateur, tablette et smartphone. Pas besoin de télécharger quoi que ce soit !",
  },
  {
    question: "Comment puis-je contacter le support ?",
    answer:
      "Vous pouvez nous contacter par email à support@smallbudget.gf. Les utilisateurs Premium et Famille bénéficient d'un support prioritaire avec des temps de réponse garantis.",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="py-20 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Tout ce que vous devez savoir sur SmallBudget
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card px-6 border-none"
              >
                <AccordionTrigger className="text-left font-semibold hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
