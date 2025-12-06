import { motion } from "framer-motion";
import { 
  PiggyBank, 
  Plus, 
  TrendingUp, 
  Target, 
  Calendar,
  Sparkles,
  ChevronRight,
  Lightbulb,
  Check,
  Clock,
  Zap
} from "lucide-react";
import { useState } from "react";

const savingsPlans = [
  {
    id: 1,
    name: "Plan Économe",
    description: "Idéal pour commencer",
    monthlyTarget: 100,
    features: [
      "Suivi des dépenses basique",
      "3 objectifs d'épargne",
      "Alertes promos hebdomadaires",
      "Conseils personnalisés"
    ],
    color: "primary",
    popular: false,
  },
  {
    id: 2,
    name: "Plan Malin",
    description: "Le plus populaire en Guyane",
    monthlyTarget: 250,
    features: [
      "Tout du Plan Économe",
      "Objectifs illimités",
      "Comparateur de prix en temps réel",
      "Alertes promos instantanées",
      "Liste de courses intelligente",
      "Prédiction des économies"
    ],
    color: "accent",
    popular: true,
  },
  {
    id: 3,
    name: "Plan Expert",
    description: "Maximisez vos économies",
    monthlyTarget: 500,
    features: [
      "Tout du Plan Malin",
      "Analyse détaillée des dépenses",
      "Conseils IA personnalisés",
      "Budget familial partagé",
      "Export comptable",
      "Support prioritaire"
    ],
    color: "secondary",
    popular: false,
  },
];

type SavingsGoal = {
  id: number;
  name: string;
  target: number;
  current: number;
  deadline: string;
  icon: string;
  monthlyContribution: number;
};

const savingsTips = [
  {
    title: "Comparez avant d'acheter",
    description: "Utilisez notre comparateur pour trouver le meilleur prix entre Hyper U, Carrefour et les autres enseignes.",
    savings: "~50€/mois"
  },
  {
    title: "Achetez les produits locaux",
    description: "Les produits guyanais sont souvent moins chers et de meilleure qualité.",
    savings: "~30€/mois"
  },
  {
    title: "Profitez des promos flash",
    description: "Activez les alertes pour ne jamais manquer une bonne affaire.",
    savings: "~80€/mois"
  },
];

export const SavingsTab = () => {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [goalForm, setGoalForm] = useState({
    name: "",
    target: "",
    deadline: "",
    icon: "🏝️",
    monthlyContribution: "",
  });

  const totalSaved = goals.reduce((acc, goal) => acc + goal.current, 0);
  const totalTarget = goals.reduce((acc, goal) => acc + goal.target, 0);
  const totalProgress = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  const handleAddGoal = () => {
    const target = Number(goalForm.target);
    const contribution = Number(goalForm.monthlyContribution) || 0;
    if (!goalForm.name || !target) return;

    const newGoal: SavingsGoal = {
      id: Date.now(),
      name: goalForm.name,
      target,
      current: 0,
      deadline: goalForm.deadline || "Prochainement",
      icon: goalForm.icon || "🏝️",
      monthlyContribution: contribution,
    };

    setGoals(prev => [...prev, newGoal]);
    setGoalForm({
      name: "",
      target: "",
      deadline: "",
      icon: "🏝️",
      monthlyContribution: "",
    });
    setShowAddGoal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black mb-2 font-display">
          Gestion <span className="text-primary">d'épargne</span>
        </h1>
        <p className="text-muted-foreground">
          Choisissez votre stratégie et atteignez vos objectifs financiers
        </p>
      </motion.div>

      {showAddGoal && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 border border-primary/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold font-display">Nouvel objectif</h3>
            <button className="text-sm text-muted-foreground hover:text-destructive" onClick={() => setShowAddGoal(false)}>
              Fermer
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Nom</p>
              <input
                className="input-glass"
                placeholder="Vacances, Voiture..."
                value={goalForm.name}
                onChange={(e) => setGoalForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Montant cible (€)</p>
              <input
                className="input-glass"
                type="number"
                value={goalForm.target}
                onChange={(e) => setGoalForm(prev => ({ ...prev, target: e.target.value }))}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Contribution mensuelle (€)</p>
              <input
                className="input-glass"
                type="number"
                value={goalForm.monthlyContribution}
                onChange={(e) => setGoalForm(prev => ({ ...prev, monthlyContribution: e.target.value }))}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Échéance</p>
              <input
                type="month"
                className="input-glass"
                value={goalForm.deadline}
                onChange={(e) => setGoalForm(prev => ({ ...prev, deadline: e.target.value }))}
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Emoji</p>
              <input
                className="input-glass"
                value={goalForm.icon}
                onChange={(e) => setGoalForm(prev => ({ ...prev, icon: e.target.value }))}
                maxLength={2}
              />
            </div>
          </div>
          <button className="btn-primary mt-6" onClick={handleAddGoal}>
            Enregistrer l&apos;objectif
          </button>
        </motion.div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="stat-card"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
              <PiggyBank className="w-7 h-7 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Total épargné</p>
              <p className="text-3xl font-black">{totalSaved.toLocaleString()}€</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="stat-card"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center">
              <Target className="w-7 h-7 text-accent" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Objectif total</p>
              <p className="text-3xl font-black">{totalTarget.toLocaleString()}€</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="stat-card"
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <TrendingUp className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Progression</p>
              <p className="text-3xl font-black">{totalProgress}%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Savings Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Choisissez votre plan d'économie
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {savingsPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => setSelectedPlan(plan.id)}
              className={`savings-card cursor-pointer transition-all ${
                selectedPlan === plan.id 
                  ? `border-${plan.color} glow-${plan.color === 'primary' ? 'primary' : plan.color === 'accent' ? 'accent' : 'secondary'}` 
                  : 'hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <span className="promo-tag">⭐ Populaire</span>
                </div>
              )}

              <div className="relative z-10">
                <h3 className={`text-xl font-bold mb-1 text-${plan.color}`}>{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-4xl font-black">{plan.monthlyTarget}€</span>
                  <span className="text-muted-foreground">/mois d'économies</span>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check size={16} className={`text-${plan.color}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  className={selectedPlan === plan.id ? 'btn-primary w-full' : 'btn-secondary w-full'}
                >
                  {selectedPlan === plan.id ? 'Plan actif' : 'Choisir ce plan'}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Savings Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Vos objectifs d'épargne</h2>
          <button 
            onClick={() => setShowAddGoal(true)}
            className="btn-primary"
          >
            <Plus size={18} />
            Nouvel objectif
          </button>
        </div>

        {goals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0.5, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="empty-card text-center"
          >
            <div className="empty-icon">
              <PiggyBank className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold font-display mb-2">
              Aucun objectif configuré
            </h3>
            <p className="text-sm text-muted-foreground">
              Ajoutez un objectif pour débloquer les prévisions et recommandations personnalisées.
            </p>
            <button className="btn-primary mt-4 mx-auto" onClick={() => setShowAddGoal(true)}>
              Configurer un objectif
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {goals.map((goal, index) => {
              const progress = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{goal.icon}</span>
                      <div>
                        <h4 className="font-bold">{goal.name}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar size={12} />
                          Objectif: {goal.deadline}
                        </p>
                      </div>
                    </div>
                    <span className="badge-info">{Math.round(progress)}%</span>
                  </div>

                  <div className="progress-bar mb-2">
                    <div 
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {goal.current.toLocaleString()}€ / {goal.target.toLocaleString()}€
                    </span>
                    <span className="text-primary font-medium">
                      +{goal.monthlyContribution}€/mois
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Savings Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-accent" />
          Conseils pour économiser en Guyane
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savingsTips.map((tip, index) => (
            <div 
              key={index}
              className="p-4 rounded-2xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{tip.title}</h4>
                <span className="badge-success">{tip.savings}</span>
              </div>
              <p className="text-sm text-muted-foreground">{tip.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
