import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Download,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  Home,
  Car,
  Utensils,
  Zap,
  CreditCard,
  MoreVertical,
  type LucideIcon
} from "lucide-react";
import { useState } from "react";

type Transaction = {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
  icon: LucideIcon;
  color: string;
};

const categoryOptions = [
  "Alimentation",
  "Factures",
  "Transport",
  "Logement",
  "Loisirs",
  "Revenus",
];

const categoryIcons: Record<string, { icon: LucideIcon; color: string }> = {
  Alimentation: { icon: ShoppingBag, color: "primary" },
  Factures: { icon: Zap, color: "accent" },
  Transport: { icon: Car, color: "info" },
  Logement: { icon: Home, color: "secondary" },
  Loisirs: { icon: Utensils, color: "warning" },
  Revenus: { icon: ArrowUpRight, color: "primary" },
};

export const TransactionsTab = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    name: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "Alimentation",
    type: "expense",
  });

  const totalIncome = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = Math.abs(transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0));
  const filteredTransactions = selectedCategory === "Tous"
    ? transactions
    : transactions.filter(t => t.category === selectedCategory);

  const categoryCounts = categoryOptions.map(cat => ({
    name: cat,
    count: transactions.filter(t => t.category === cat).length,
  }));

  const handleAddTransaction = () => {
    const parsedAmount = Number(newTransaction.amount);
    if (!newTransaction.name || !parsedAmount) return;

    const signedAmount = newTransaction.type === "expense"
      ? -Math.abs(parsedAmount)
      : Math.abs(parsedAmount);

    const meta = categoryIcons[newTransaction.category] ?? { icon: ShoppingBag, color: "primary" };

    const entry: Transaction = {
      id: Date.now(),
      name: newTransaction.name,
      amount: signedAmount,
      date: newTransaction.date,
      category: newTransaction.category,
      icon: meta.icon,
      color: meta.color,
    };

    setTransactions(prev => [entry, ...prev]);
    setNewTransaction({
      name: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      category: "Alimentation",
      type: "expense",
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-black mb-2 font-display">
            <span className="text-primary">Transactions</span>
          </h1>
          <p className="text-muted-foreground">
            Gérez et suivez toutes vos dépenses et revenus
          </p>
        </div>

        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Download size={18} />
            Exporter
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
          >
            <Plus size={18} />
            Nouvelle transaction
          </button>
        </div>
      </motion.div>

      {showAddModal && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6 border border-primary/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold font-display">Nouvelle transaction</h3>
            <button className="text-sm text-muted-foreground hover:text-destructive" onClick={() => setShowAddModal(false)}>
              Fermer
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Libellé</p>
              <input
                className="input-glass"
                value={newTransaction.name}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Courses Hyper U"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Montant</p>
              <input
                className="input-glass"
                type="number"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="85.60"
              />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Type</p>
              <select
                className="input-glass"
                value={newTransaction.type}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="expense">Dépense</option>
                <option value="income">Revenu</option>
              </select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Catégorie</p>
              <select
                className="input-glass"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, category: e.target.value }))}
              >
                {categoryOptions.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date</p>
              <input
                type="date"
                className="input-glass"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
          </div>
          <button className="btn-primary mt-6" onClick={handleAddTransaction}>
            Ajouter la transaction
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
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Revenus (mois)</p>
              <p className="text-2xl font-black text-primary">+{totalIncome.toLocaleString()}€</p>
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
            <div className="w-12 h-12 rounded-2xl bg-destructive/20 flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Dépenses (mois)</p>
              <p className="text-2xl font-black">-{totalExpenses.toLocaleString()}€</p>
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
            <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Balance</p>
              <p className={`text-2xl font-black ${totalIncome - totalExpenses >= 0 ? 'text-primary' : 'text-destructive'}`}>
                {totalIncome - totalExpenses >= 0 ? '+' : ''}{(totalIncome - totalExpenses).toLocaleString()}€
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher une transaction..."
            className="input-glass pl-10 w-full"
          />
        </div>
        <button className="btn-secondary flex items-center gap-2">
          <Filter size={18} />
          Filtres
        </button>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {[{ name: "Tous", count: transactions.length }, ...categoryCounts].map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === cat.name
                ? "bg-primary text-primary-foreground"
                : "bg-white/5 text-muted-foreground hover:bg-white/10"
            }`}
          >
            {cat.name}
            <span className="px-2 py-0.5 rounded-full bg-white/10 text-xs">
              {cat.count}
            </span>
          </button>
        ))}
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-4 border-b border-white/10">
          <h3 className="font-semibold">Transactions récentes</h3>
        </div>

        {filteredTransactions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0.5, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="empty-card text-center m-4"
          >
            <div className="empty-icon">
              <CreditCard className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold font-display mb-2">
              Historique vierge
            </h3>
            <p className="text-sm text-muted-foreground">
              Importez vos relevés ou ajoutez manuellement vos dépenses et revenus.
            </p>
            <button className="btn-primary mt-4 mx-auto" onClick={() => setShowAddModal(true)}>
              Ajouter une transaction
            </button>
          </motion.div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredTransactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 * index }}
                className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${tx.color}/20`}>
                    <tx.icon className={`w-5 h-5 text-${tx.color}`} />
                  </div>
                  <div>
                    <p className="font-semibold">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.category} • {tx.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={`font-bold ${tx.amount > 0 ? 'text-primary' : 'text-foreground'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}€
                  </span>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <MoreVertical size={16} className="text-muted-foreground" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="p-4 border-t border-white/10 text-center">
          <button className="text-primary hover:underline text-sm font-medium">
            Voir toutes les transactions
          </button>
        </div>
      </motion.div>
    </div>
  );
};
