import { motion } from "framer-motion";
import { 
  Plus, 
  Check, 
  Trash2, 
  ShoppingCart,
  MapPin,
  DollarSign,
  Sparkles,
  Share2,
  Download
} from "lucide-react";
import { useState } from "react";

interface ShoppingItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  category: string;
  estimatedPrice?: number;
  bestStore?: string;
}

const initialItems: ShoppingItem[] = [];

const categories = ["Tous", "Épicerie", "Boucherie", "Crémerie", "Fruits", "Légumes", "Boissons"];

export const ShoppingListTab = () => {
  const [items, setItems] = useState<ShoppingItem[]>(initialItems);
  const [newItem, setNewItem] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("1");
  const [newItemUnit, setNewItemUnit] = useState("pièce");
  const [newItemCategory, setNewItemCategory] = useState("Épicerie");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemStore, setNewItemStore] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (newItem.trim() === "") return;

    const estimatedPrice = Number(newItemPrice) || undefined;
    setItems([
      ...items,
      {
        id: Date.now(),
        name: newItem,
        quantity: Number(newItemQuantity) || 1,
        unit: newItemUnit,
        checked: false,
        category: newItemCategory,
        estimatedPrice,
        bestStore: newItemStore || undefined,
      },
    ]);
    setNewItem("");
    setNewItemQuantity("1");
    setNewItemUnit("pièce");
    setNewItemCategory("Épicerie");
    setNewItemPrice("");
    setNewItemStore("");
  };

  const filteredItems = selectedCategory === "Tous" 
    ? items 
    : items.filter(item => item.category === selectedCategory);

  const checkedCount = items.filter(item => item.checked).length;
  const totalEstimate = items.reduce((acc, item) => acc + (item.estimatedPrice || 0), 0);
  const potentialSavings = totalEstimate * 0.15; // 15% estimated savings

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
            Liste de <span className="text-primary">Courses</span>
          </h1>
          <p className="text-muted-foreground">
            Organisez vos achats et trouvez les meilleurs prix
          </p>
        </div>

        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Share2 size={18} />
            Partager
          </button>
          <button className="btn-secondary flex items-center gap-2">
            <Download size={18} />
            Exporter
          </button>
        </div>
      </motion.div>

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
              <ShoppingCart className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Articles</p>
              <p className="text-2xl font-black">{checkedCount}/{items.length}</p>
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
            <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Estimation</p>
              <p className="text-2xl font-black">{totalEstimate.toFixed(2)}€</p>
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
            <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Économies potentielles</p>
              <p className="text-2xl font-black text-primary">-{potentialSavings.toFixed(2)}€</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Item */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-4"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Article"
            className="input-glass"
          />
          <input
            type="number"
            min="1"
            value={newItemQuantity}
            onChange={(e) => setNewItemQuantity(e.target.value)}
            className="input-glass"
            placeholder="Quantité"
          />
          <select
            className="input-glass"
            value={newItemUnit}
            onChange={(e) => setNewItemUnit(e.target.value)}
          >
            <option value="pièce">Pièce</option>
            <option value="kg">Kg</option>
            <option value="L">Litre</option>
            <option value="paquet">Paquet</option>
          </select>
          <select
            className="input-glass"
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value)}
          >
            {categories.filter(cat => cat !== "Tous").map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            step="0.01"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
            className="input-glass"
            placeholder="Prix estimé (€)"
          />
          <input
            type="text"
            value={newItemStore}
            onChange={(e) => setNewItemStore(e.target.value)}
            className="input-glass"
            placeholder="Meilleur magasin (optionnel)"
          />
          <button onClick={addItem} className="btn-primary flex items-center justify-center gap-2">
            <Plus size={20} />
            Ajouter
          </button>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-white/5 text-muted-foreground hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Shopping List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass-card overflow-hidden"
      >
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h3 className="font-semibold">Articles ({filteredItems.length})</h3>
          <button 
            onClick={() => setItems(items.filter(item => !item.checked))}
            className="text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            Supprimer les cochés
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              className={`flex items-center justify-between p-4 hover:bg-white/5 transition-colors ${
                item.checked ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    item.checked 
                      ? 'bg-primary border-primary' 
                      : 'border-white/20 hover:border-primary'
                  }`}
                >
                  {item.checked && <Check size={14} className="text-primary-foreground" />}
                </button>
                <div>
                  <p className={`font-semibold ${item.checked ? 'line-through' : ''}`}>
                    {item.name}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.quantity} {item.unit}</span>
                    {item.bestStore && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={10} />
                          {item.bestStore}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {item.estimatedPrice && (
                  <span className="text-sm font-medium">
                    {item.estimatedPrice.toFixed(2)}€
                  </span>
                )}
                <button
                  onClick={() => deleteItem(item.id)}
                  className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="p-4">
            <motion.div
              initial={{ opacity: 0.6, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="empty-card"
            >
              <div className="empty-icon">
                <ShoppingCart className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold font-display mb-2">Votre liste est vide</h3>
              <p className="text-sm text-muted-foreground">
                Ajoutez un article pour commencer à suivre vos courses intelligemment.
              </p>
              <button className="btn-primary mt-4 mx-auto" onClick={addItem}>
                Ajouter un article
              </button>
            </motion.div>
          </div>
        )}
      </motion.div>

      {/* Smart Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="glass-card p-6"
      >
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-accent" />
          Suggestions intelligentes
        </h3>
        {items.length === 0 ? (
          <div className="empty-card text-center">
            <div className="empty-icon">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold font-display mb-2">
              Suggestions en attente
            </h3>
            <p className="text-sm text-muted-foreground">
              Ajoutez quelques produits pour débloquer des parcours optimisés et les promos du jour.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
              <p className="font-semibold mb-1">Meilleur parcours</p>
              <p className="text-sm text-muted-foreground">
                Pour cette liste, commencez par le marché (bananes), puis Leader Price (riz, lait), et terminez par Géant Casino (poulet).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
              <p className="font-semibold mb-1">Promo du jour</p>
              <p className="text-sm text-muted-foreground">
                Le poulet est en promo à -20% chez Hyper U jusqu&apos;à demain !
              </p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
