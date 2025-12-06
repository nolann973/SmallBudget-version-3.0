import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  Star, 
  ExternalLink,
  ChevronRight,
  Tag,
  Percent
} from "lucide-react";
import { useEffect, useState } from "react";
import { MapSection } from "./MapSection";

/* ---------------- STORES + ZONES IA ---------------- */

const stores = [
  {
    id: 1,
    name: "Hyper U",
    logo: "🛒",
    location: "Cayenne, Rémire-Montjoly",
    zones: ["cayenne", "remire"],
    catalogs: 3,
    bestDeal: "-40%",
    rating: 4.5,
    color: "bg-red-500/20",
    promos: [
      { name: "Fruits & Légumes", discount: "-30%", validUntil: "10 Déc" },
      { name: "Produits laitiers", discount: "-25%", validUntil: "08 Déc" },
      { name: "Viandes", discount: "-40%", validUntil: "07 Déc" },
    ]
  },
  {
    id: 2,
    name: "Carrefour",
    logo: "🏪",
    location: "Matoury, Kourou",
    zones: ["matoury", "kourou"],
    catalogs: 4,
    bestDeal: "-35%",
    rating: 4.3,
    color: "bg-blue-500/20",
    promos: [
      { name: "Électronique", discount: "-35%", validUntil: "15 Déc" },
      { name: "Jouets Noël", discount: "-30%", validUntil: "24 Déc" },
      { name: "Alimentation", discount: "-20%", validUntil: "12 Déc" },
    ]
  },
  {
    id: 3,
    name: "Agouti",
    logo: "🦫",
    location: "Centre Commercial",
    zones: ["cayenne"],
    catalogs: 2,
    bestDeal: "-50%",
    rating: 4.1,
    color: "bg-orange-500/20",
    promos: [
      { name: "Mode Femme", discount: "-50%", validUntil: "20 Déc" },
      { name: "Accessoires", discount: "-40%", validUntil: "18 Déc" },
    ]
  },
  {
    id: 4,
    name: "Match",
    logo: "🛍️",
    location: "Cayenne Centre",
    zones: ["cayenne"],
    catalogs: 2,
    bestDeal: "-25%",
    rating: 4.0,
    color: "bg-green-500/20",
    promos: [
      { name: "Épicerie", discount: "-25%", validUntil: "09 Déc" },
      { name: "Boissons", discount: "-20%", validUntil: "11 Déc" },
    ]
  },
  {
    id: 5,
    name: "Géant Casino",
    logo: "🎰",
    location: "Matoury",
    zones: ["matoury"],
    catalogs: 3,
    bestDeal: "-45%",
    rating: 4.2,
    color: "bg-purple-500/20",
    promos: [
      { name: "High-Tech", discount: "-45%", validUntil: "31 Déc" },
      { name: "Maison", discount: "-30%", validUntil: "25 Déc" },
      { name: "Jardin", discount: "-35%", validUntil: "22 Déc" },
    ]
  },
  {
    id: 6,
    name: "Leader Price",
    logo: "💰",
    location: "Plusieurs villes",
    zones: ["cayenne", "kourou", "saint-laurent"],
    catalogs: 2,
    bestDeal: "-30%",
    rating: 3.9,
    color: "bg-yellow-500/20",
    promos: [
      { name: "Prix Mini", discount: "-30%", validUntil: "14 Déc" },
      { name: "Discount", discount: "-25%", validUntil: "12 Déc" },
    ]
  },
];

const categories = ["Tous", "Alimentation", "Électronique", "Mode", "Maison", "High-Tech"];

/* ---------------------------------------------------- */

export const CatalogsTab = () => {

  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedStore, setSelectedStore] = useState<number | null>(null);

  // ------ IA GEO -------
  const [userZone, setUserZone] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {

      const { latitude, longitude } = pos.coords;

      // IA Simplifiée pour la Guyane
      if (latitude > 4.9 && longitude > -52.5) setUserZone("cayenne");
      else if (latitude > 5.2) setUserZone("kourou");
      else if (longitude < -54) setUserZone("saint-laurent");
      else setUserZone("interieur");

    }, () => setUserZone(null));
  }, []);

  const aiFilteredStores = userZone
    ? stores.filter(store => store.zones.includes(userZone))
    : stores;

  /* --------------------- UI ----------------------- */

  return (
    <div className="space-y-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-black mb-2 font-display">
          Catalogues <span className="text-primary">Guyane</span>
        </h1>
        <p className="text-muted-foreground">
          Retrouvez les meilleures offres des grandes enseignes guyanaises
        </p>

        {userZone && (
          <div className="mt-2 p-3 rounded-xl bg-primary/10 border border-primary/20 text-sm">
             📍 Catalogues optimisés pour votre zone : <b>{userZone}</b>
          </div>
        )}
      </motion.div>


      {/* Search & Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un produit ou une enseigne..."
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
        transition={{ delay: 0.2 }}
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
<MapSection />

      {/* Stores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {aiFilteredStores.map((store, index) => (
          <motion.div
            key={store.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={`catalog-card ${selectedStore === store.id ? 'border-primary glow-primary' : ''}`}
            onClick={() => setSelectedStore(
              selectedStore === store.id ? null : store.id
            )}
          >
            <div className="p-6 border-b border-white/10">

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`store-logo ${store.color}`}>
                    <span className="text-2xl">{store.logo}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{store.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin size={12} />
                      {store.location}
                    </p>
                  </div>
                </div>
                <span className="promo-tag">{store.bestDeal}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm">
                  <Star size={14} className="text-accent fill-accent" />
                  <span className="font-medium">{store.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {store.catalogs} catalogues actifs
                </span>
              </div>

            </div>

            <div className="p-4 space-y-2">
              {store.promos.map((promo, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                  <div className="flex items-center gap-2">
                    <Tag size={14} className="text-primary" />
                    <span className="text-sm">{promo.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="badge-success">{promo.discount}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock size={10} />
                      {promo.validUntil}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 pt-0">
              <button className="w-full btn-secondary flex items-center justify-center gap-2">
                <ExternalLink size={16} />
                Voir le catalogue complet
              </button>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
};
