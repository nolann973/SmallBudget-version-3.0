import { motion } from "framer-motion";
import { 
  Calculator, 
  TrendingUp, 
  PiggyBank,
  Wallet,
  Home,
  Car,
  ShoppingBag,
  Utensils,
  Zap,
  Wifi,
  GraduationCap,
  Heart
} from "lucide-react";
import { useState } from "react";

const expenseCategories = [
  { id: "housing", name: "Logement", icon: Home, defaultPercent: 35, color: "secondary" },
  { id: "food", name: "Alimentation", icon: ShoppingBag, defaultPercent: 20, color: "primary" },
  { id: "transport", name: "Transport", icon: Car, defaultPercent: 15, color: "accent" },
  { id: "utilities", name: "Factures", icon: Zap, defaultPercent: 10, color: "info" },
  { id: "leisure", name: "Loisirs", icon: Utensils, defaultPercent: 10, color: "warning" },
  { id: "savings", name: "Épargne", icon: PiggyBank, defaultPercent: 10, color: "success" },
];

export const BudgetSimulatorTab = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState<Record<string, number>>({
    housing: 0,
    food: 0,
    transport: 0,
    utilities: 0,
    leisure: 0,
    savings: 0,
  });

  const totalExpenses = Object.values(expenses).reduce((a, b) => a + b, 0);
  const remaining = income - totalExpenses;

  const handleExpenseChange = (id: string, value: number) => {
    setExpenses(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black mb-2 font-display">
          Simulateur de <span className="text-primary">Budget</span>
        </h1>
        <p className="text-muted-foreground">
          Planifiez vos dépenses et optimisez votre budget mensuel
        </p>
      </motion.div>

      {/* Income Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Wallet className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="font-bold">Revenus mensuels</h3>
            <p className="text-sm text-muted-foreground">Entrez vos revenus nets</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="flex-1 h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
          />
          <div className="w-32">
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="input-glass text-center font-bold text-xl"
            />
          </div>
          <span className="text-muted-foreground">€/mois</span>
        </div>

        {income === 0 && (
          <p className="text-xs text-muted-foreground mt-3">
            Définissez vos revenus mensuels pour lancer la répartition de votre budget.
          </p>
        )}
      </motion.div>

      {/* Budget Allocation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6"
        >
          <h3 className="font-bold mb-6 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-accent" />
            Répartition du budget
          </h3>

          <div className="space-y-6">
            {expenseCategories.map((cat) => {
              const value = expenses[cat.id] || 0;
              const percent = income > 0 ? ((value / income) * 100).toFixed(1) : 0;
              
              return (
                <div key={cat.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <cat.icon size={18} className={`text-${cat.color}`} />
                      <span className="font-medium">{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{percent}%</span>
                      <span className="font-bold">{value}€</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={income}
                    step="10"
                    value={value}
                    onChange={(e) => handleExpenseChange(cat.id, Number(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Visual Budget */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4">Aperçu visuel</h3>
            <div className="h-8 rounded-full overflow-hidden flex bg-white/10">
              {expenseCategories.map((cat) => {
                const value = expenses[cat.id] || 0;
                const percent = income > 0 ? (value / income) * 100 : 0;
                return (
                  <div
                    key={cat.id}
                    className={`bg-${cat.color} transition-all duration-300`}
                    style={{ width: `${percent}%` }}
                    title={`${cat.name}: ${value}€`}
                  />
                );
              })}
            </div>
            <div className="flex flex-wrap gap-4 mt-4">
              {expenseCategories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${cat.color}`} />
                  <span className="text-xs text-muted-foreground">{cat.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Balance Card */}
          <div className={`glass-card p-6 ${remaining >= 0 ? 'border-primary/50' : 'border-destructive/50'}`}>
            <h3 className="font-bold mb-4">Résumé mensuel</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Revenus</span>
                <span className="font-bold text-primary">+{income.toLocaleString()}€</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Dépenses prévues</span>
                <span className="font-bold">-{totalExpenses.toLocaleString()}€</span>
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Reste disponible</span>
                  <span className={`text-2xl font-black ${remaining >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {remaining >= 0 ? '+' : ''}{remaining.toLocaleString()}€
                  </span>
                </div>
              </div>
            </div>

            {remaining < 0 && (
              <div className="mt-4 p-3 rounded-xl bg-destructive/20 border border-destructive/30">
                <p className="text-sm text-destructive">
                  ⚠️ Attention : vos dépenses dépassent vos revenus de {Math.abs(remaining)}€
                </p>
              </div>
            )}

            {remaining >= 0 && remaining > 0 && (
              <div className="mt-4 p-3 rounded-xl bg-primary/20 border border-primary/30">
                <p className="text-sm text-primary">
                  💡 Conseil : Vous pouvez épargner {remaining}€ de plus ce mois !
                </p>
              </div>
            )}
          </div>

          {/* Recommendations */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recommandations Guyane
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>En Guyane, le logement représente en moyenne 35-40% du budget</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Prévoyez 15-20% pour l'alimentation (plus cher qu'en métropole)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                <span>Utilisez les promos locales pour réduire vos dépenses de 20%</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
