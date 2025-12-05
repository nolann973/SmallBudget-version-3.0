import { motion } from "framer-motion";
import { Users, TrendingUp, Target, Star } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Utilisateurs actifs", color: "text-primary" },
  { icon: TrendingUp, value: "€2.5M", label: "Économies générées", color: "text-accent" },
  { icon: Target, value: "15,000+", label: "Objectifs atteints", color: "text-secondary" },
  { icon: Star, value: "4.9/5", label: "Note moyenne", color: "text-primary" },
];

export const StatsSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="stat-card text-center"
            >
              <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-4`} />
              <div className={`text-3xl md:text-4xl font-black ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
