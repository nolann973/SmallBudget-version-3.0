import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  Target, 
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight,
  Flame,
  Zap
} from "lucide-react";

const statsCards = [
  {
    title: "Solde total",
    value: "0€",
    change: "0%",
    positive: true,
    icon: TrendingUp,
    color: "primary",
  },
  {
    title: "Dépenses ce mois",
    value: "0€",
    change: "0%",
    positive: true,
    icon: TrendingDown,
    color: "accent",
  },
  {
    title: "Économies réalisées",
    value: "0€",
    change: "0%",
    positive: true,
    icon: PiggyBank,
    color: "secondary",
  },
  {
    title: "Objectifs atteints",
    value: "0/0",
    change: "0%",
    positive: true,
    icon: Target,
    color: "primary",
  },
];

const recentTransactions: Array<{
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
}> = [];

const promos: Array<{ store: string; discount: string; item: string; expires: string }> = [];

const savingsGoals: Array<{ name: string; target: number; current: number; color: string }> = [];

export const OverviewTab = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-black mb-2 font-display">
          Bonjour, <span className="text-primary">Marie</span> 👋
        </h1>
        <p className="text-muted-foreground">
          Voici un aperçu de vos finances • Ajoutez vos premières données pour suivre vos économies
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-2xl bg-${stat.color}/20 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              {stat.change !== "0%" ? (
                <span className={`flex items-center gap-1 text-xs font-medium ${stat.positive ? 'text-primary' : 'text-destructive'}`}>
                  {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {stat.change}
                </span>
              ) : (
                <span className="text-xs text-muted-foreground">--</span>
              )}
            </div>
            <p className="text-muted-foreground text-sm mb-1">{stat.title}</p>
            <p className="text-2xl font-black">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 glass-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Transactions récentes</h2>
            <button className="text-sm text-primary hover:underline">Voir tout</button>
          </div>

          {recentTransactions.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0.5, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="empty-card text-center"
            >
              <div className="empty-icon">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">
                Pas encore de mouvement
              </h3>
              <p className="text-sm text-muted-foreground">
                Ajoutez votre première dépense ou un revenu pour suivre vos transactions en temps réel.
              </p>
              <button className="btn-primary mt-4 mx-auto">
                Ajouter une transaction
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((tx) => (
                <div 
                  key={tx.id}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.amount > 0 ? 'bg-primary/20' : 'bg-accent/20'}`}>
                      <ShoppingBag className={`w-5 h-5 ${tx.amount > 0 ? 'text-primary' : 'text-accent'}`} />
                    </div>
                    <div>
                      <p className="font-semibold">{tx.name}</p>
                      <p className="text-xs text-muted-foreground">{tx.category} • {tx.date}</p>
                    </div>
                  </div>
                  <span className={`font-bold ${tx.amount > 0 ? 'text-primary' : 'text-foreground'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}€
                  </span>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Hot Promos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-card p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Flame className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-bold">Promos en cours</h2>
          </div>

          {promos.length === 0 ? (
            <motion.div
              initial={{ opacity: 0.5, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="empty-card text-center"
            >
              <div className="empty-icon">
                <Flame className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">Aucune promo suivie</h3>
              <p className="text-sm text-muted-foreground">
                Choisissez vos enseignes préférées pour recevoir automatiquement les meilleures offres.
              </p>
              <button className="btn-secondary mt-4 mx-auto">
                Activer les alertes
              </button>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {promos.map((promo, index) => (
                <div 
                  key={index}
                  className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/50 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{promo.store}</span>
                    <span className="badge-warning">{promo.discount}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{promo.item}</p>
                  <p className="text-xs text-primary mt-2 flex items-center gap-1">
                    <Zap size={12} />
                    Expire dans {promo.expires}
                  </p>
                </div>
              ))}
            </div>
          )}

          <button className="btn-primary w-full mt-4">
            Voir tous les catalogues
          </button>
        </motion.div>
      </div>

      {/* Savings Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Objectifs d'épargne</h2>
          <button className="text-sm text-primary hover:underline">Gérer</button>
        </div>

        {savingsGoals.length === 0 ? (
          <motion.div
            initial={{ opacity: 0.4, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="empty-card text-center"
          >
            <div className="empty-icon">
              <PiggyBank className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold font-display mb-2">
              Lancez votre premier objectif
            </h3>
            <p className="text-sm text-muted-foreground">
              Définissez une épargne pour voir votre progression et recevoir des conseils personnalisés.
            </p>
            <button className="btn-primary mt-4 mx-auto">
              Créer un objectif
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {savingsGoals.map((goal, index) => {
              const progress = goal.target > 0 ? Math.round((goal.current / goal.target) * 100) : 0;
              const width = goal.target > 0 ? (goal.current / goal.target) * 100 : 0;

              return (
                <div key={index} className="p-4 rounded-2xl bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">{goal.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {progress}%
                    </span>
                  </div>
                  <div className="progress-bar mb-2">
                    <div 
                      className={`progress-fill${goal.color !== 'primary' ? `-${goal.color}` : ''}`}
                      style={{ width: `${width}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {goal.current}€ / {goal.target}€
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>
    </div>
  );
};
