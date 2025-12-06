import { motion } from "framer-motion";
import { 
  Search, 
  TrendingDown, 
  MapPin,
  Star,
  ArrowRight,
  Sparkles,
  Check
} from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Riz Basmati 1kg",
    category: "Alimentation",
    image: "🍚",
    prices: [
      { store: "Hyper U", price: 2.49, location: "Cayenne" },
      { store: "Carrefour", price: 2.89, location: "Matoury" },
      { store: "Match", price: 2.79, location: "Cayenne" },
      { store: "Leader Price", price: 2.29, location: "Rémire" },
    ]
  },
  {
    id: 2,
    name: "Poulet entier",
    category: "Boucherie",
    image: "🍗",
    prices: [
      { store: "Hyper U", price: 8.90, location: "Cayenne" },
      { store: "Carrefour", price: 9.50, location: "Matoury" },
      { store: "Géant Casino", price: 8.75, location: "Matoury" },
      { store: "Match", price: 9.20, location: "Cayenne" },
    ]
  },
  {
    id: 3,
    name: "Lait UHT 1L",
    category: "Crémerie",
    image: "🥛",
    prices: [
      { store: "Hyper U", price: 1.45, location: "Cayenne" },
      { store: "Carrefour", price: 1.55, location: "Matoury" },
      { store: "Leader Price", price: 1.29, location: "Rémire" },
      { store: "Match", price: 1.49, location: "Cayenne" },
    ]
  },
  {
    id: 4,
    name: "Essence SP95 (1L)",
    category: "Carburant",
    image: "⛽",
    prices: [
      { store: "Total Cayenne", price: 1.78, location: "Cayenne" },
      { store: "Shell Matoury", price: 1.82, location: "Matoury" },
      { store: "Total Kourou", price: 1.80, location: "Kourou" },
      { store: "Station Vito", price: 1.75, location: "Rémire" },
    ]
  },
  {
    id: 5,
    name: "Bananes (1kg)",
    category: "Fruits",
    image: "🍌",
    prices: [
      { store: "Marché Cayenne", price: 1.50, location: "Centre" },
      { store: "Hyper U", price: 2.20, location: "Cayenne" },
      { store: "Carrefour", price: 2.10, location: "Matoury" },
      { store: "Match", price: 2.30, location: "Cayenne" },
    ]
  },
];

const popularSearches = ["Riz", "Poulet", "Lait", "Huile", "Sucre", "Eau", "Pain"];

export const ComparatorTab = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black mb-2 font-display">
          Comparateur de <span className="text-primary">Prix</span>
        </h1>
        <p className="text-muted-foreground">
          Trouvez les meilleurs prix dans toute la Guyane
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-6"
      >
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher un produit (ex: riz, poulet, lait...)"
            className="input-glass pl-12 text-lg w-full"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Populaires:</span>
          {popularSearches.map((term) => (
            <button
              key={term}
              onClick={() => setSearchTerm(term)}
              className="px-3 py-1 rounded-full bg-white/5 text-sm hover:bg-primary/20 hover:text-primary transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Savings Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-3xl p-6"
        style={{
          background: "linear-gradient(135deg, hsl(142 76% 45% / 0.15), hsl(45 93% 58% / 0.1))"
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Économisez jusqu'à 30% sur vos courses</h3>
            <p className="text-muted-foreground">
              En comparant les prix entre les enseignes guyanaises
            </p>
          </div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="space-y-4">
        {filteredProducts.map((product, index) => {
          const lowestPrice = Math.min(...product.prices.map(p => p.price));
          const highestPrice = Math.max(...product.prices.map(p => p.price));
          const savings = ((highestPrice - lowestPrice) / highestPrice * 100).toFixed(0);
          const bestDeal = product.prices.find(p => p.price === lowestPrice);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`glass-card overflow-hidden cursor-pointer transition-all ${
                selectedProduct === product.id ? 'border-primary glow-primary' : ''
              }`}
              onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
            >
              {/* Product Header */}
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{product.image}</span>
                  <div>
                    <h3 className="font-bold text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="badge-success">-{savings}%</span>
                    <TrendingDown className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Meilleur prix: <span className="text-primary font-bold">{lowestPrice.toFixed(2)}€</span>
                  </p>
                </div>
              </div>

              {/* Price Comparison - Expanded */}
              {selectedProduct === product.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-white/10"
                >
                  <div className="p-4 space-y-2">
                    {product.prices
                      .sort((a, b) => a.price - b.price)
                      .map((price, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                            price.price === lowestPrice 
                              ? 'bg-primary/20 border border-primary/30' 
                              : 'bg-white/5'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {price.price === lowestPrice && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                            <div>
                              <p className="font-semibold">{price.store}</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <MapPin size={10} />
                                {price.location}
                              </p>
                            </div>
                          </div>
                          <span className={`font-bold ${price.price === lowestPrice ? 'text-primary text-lg' : ''}`}>
                            {price.price.toFixed(2)}€
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="p-4 pt-0">
                    <button className="w-full btn-primary">
                      Ajouter à ma liste
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass-card p-12 text-center"
        >
          <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Aucun produit trouvé</h3>
          <p className="text-muted-foreground">
            Essayez avec un autre terme de recherche
          </p>
        </motion.div>
      )}
    </div>
  );
};
