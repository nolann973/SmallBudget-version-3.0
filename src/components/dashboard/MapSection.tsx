import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  LocateFixed,
  MapPin,
  Navigation,
  Radar,
  ShoppingBag,
  Sparkles,
  TrendingDown,
} from "lucide-react";

const zoneClusters = [
  {
    id: "cayenne",
    name: "Cayenne & Rémire",
    coords: { top: "48%", left: "46%" },
    avgDiscount: "-32%",
    travelTime: "5 min",
    intensity: "Forte activité",
    catalogs: 12,
    bestStore: "Hyper U",
    heat: "Très chaud",
    stores: [
      { name: "Hyper U", promo: "-40%", focus: "Frais & maison", until: "10 Déc" },
      { name: "Match", promo: "-25%", focus: "Épicerie locale", until: "09 Déc" },
    ],
  },
  {
    id: "matoury",
    name: "Matoury & Kourou",
    coords: { top: "38%", left: "30%" },
    avgDiscount: "-28%",
    travelTime: "18 min",
    intensity: "Activité stable",
    catalogs: 9,
    bestStore: "Carrefour",
    heat: "Chaud",
    stores: [
      { name: "Carrefour", promo: "-35%", focus: "High-Tech & jouets", until: "15 Déc" },
      { name: "Géant Casino", promo: "-30%", focus: "Maison & jardin", until: "22 Déc" },
    ],
  },
  {
    id: "kourou",
    name: "Kourou Centre",
    coords: { top: "28%", left: "54%" },
    avgDiscount: "-24%",
    travelTime: "35 min",
    intensity: "Nouvelles offres",
    catalogs: 6,
    bestStore: "Leader Price",
    heat: "Modéré",
    stores: [
      { name: "Leader Price", promo: "-30%", focus: "Prix mini", until: "14 Déc" },
      { name: "Agouti", promo: "-22%", focus: "Mode & accessoires", until: "18 Déc" },
    ],
  },
  {
    id: "saint-laurent",
    name: "Saint-Laurent",
    coords: { top: "60%", left: "18%" },
    avgDiscount: "-20%",
    travelTime: "55 min",
    intensity: "Potentiel à surveiller",
    catalogs: 4,
    bestStore: "Leader Price",
    heat: "Froid",
    stores: [
      { name: "Leader Price", promo: "-25%", focus: "Discount", until: "12 Déc" },
      { name: "Marché local", promo: "-18%", focus: "Produits frais", until: "11 Déc" },
    ],
  },
];

const quickStats = [
  {
    label: "Zones actives",
    value: "4",
    helper: "MAJ il y a 2 min",
    icon: Radar,
  },
  {
    label: "Gain moyen",
    value: "-31%",
    helper: "+4 pts depuis hier",
    icon: TrendingDown,
  },
  {
    label: "Trajet conseillé",
    value: "12 min",
    helper: "en moyenne",
    icon: Navigation,
  },
];

export const MapSection = () => {
  const [selectedZone, setSelectedZone] = useState(zoneClusters[0].id);

  const activeZone = useMemo(() => {
    return zoneClusters.find((zone) => zone.id === selectedZone) ?? zoneClusters[0];
  }, [selectedZone]);

  return (
    <section className="glass-card p-6 space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-semibold flex items-center gap-2 font-display">
            <MapPin size={18} className="text-primary" />
            Cartographie IA des économies
          </h3>
          <p className="text-sm text-muted-foreground">
            Visualisez les zones où les catalogues génèrent le plus d&apos;économies en temps réel.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {quickStats.map(({ icon: Icon, label, value, helper }) => (
            <div
              key={label}
              className="px-4 py-2 rounded-2xl border border-white/10 bg-white/5 text-sm flex items-center gap-3"
            >
              <Icon size={16} className="text-primary" />
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  {label}
                </p>
                <p className="font-semibold">{value}</p>
                <p className="text-[11px] text-muted-foreground">{helper}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="relative h-64 rounded-2xl border border-white/10 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <div className="absolute -top-20 -left-10 w-72 h-72 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute top-10 right-0 w-64 h-64 rounded-full bg-secondary/20 blur-3xl" />
          </div>

          <div className="absolute inset-0 border border-dashed border-white/10 rounded-2xl" />

          {zoneClusters.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setSelectedZone(zone.id)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl px-4 py-3 backdrop-blur-lg border transition-all ${
                zone.id === selectedZone
                  ? "bg-primary text-primary-foreground border-primary/50 shadow-lg shadow-primary/40"
                  : "bg-background/70 text-foreground border-white/10 hover:border-primary/40"
              }`}
              style={{ top: zone.coords.top, left: zone.coords.left }}
            >
              <p className="text-xs uppercase tracking-[0.2em] opacity-70">{zone.name}</p>
              <p className="text-lg font-bold flex items-center gap-2">
                {zone.avgDiscount}
                <Sparkles size={14} className="text-accent" />
              </p>
              <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Navigation size={12} /> {zone.travelTime}
              </p>
            </button>
          ))}

          <motion.div
            key={selectedZone}
            className="absolute w-32 h-32 border border-primary/40 rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            style={{
              top: zoneClusters.find((zone) => zone.id === selectedZone)?.coords.top,
              left: zoneClusters.find((zone) => zone.id === selectedZone)?.coords.left,
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Zone sélectionnée
                </p>
                <p className="text-xl font-semibold">{activeZone.name}</p>
                <p className="text-sm text-muted-foreground">{activeZone.intensity}</p>
              </div>
              <div className="text-right">
                <div className="badge-success inline-flex items-center gap-1">
                  <TrendingDown size={14} />
                  {activeZone.avgDiscount}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeZone.catalogs} catalogues suivis
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 rounded-xl border border-white/10 bg-background/60">
                <p className="text-xs text-muted-foreground">Meilleure enseigne</p>
                <p className="font-semibold flex items-center gap-2">
                  <ShoppingBag size={14} className="text-primary" />
                  {activeZone.bestStore}
                </p>
              </div>
              <div className="p-3 rounded-xl border border-white/10 bg-background/60">
                <p className="text-xs text-muted-foreground">Temps de trajet</p>
                <p className="font-semibold flex items-center gap-2">
                  <LocateFixed size={14} className="text-secondary" />
                  {activeZone.travelTime}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            {activeZone.stores.map((store) => (
              <div
                key={store.name}
                className="p-3 rounded-xl border border-white/10 bg-white/5 flex justify-between gap-4"
              >
                <div>
                  <p className="font-medium">{store.name}</p>
                  <p className="text-xs text-muted-foreground">{store.focus}</p>
                </div>
                <div className="text-right">
                  <span className="badge-success">{store.promo}</span>
                  <p className="text-[11px] text-muted-foreground">jusqu&apos;au {store.until}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
