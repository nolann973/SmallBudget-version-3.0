import { motion } from "framer-motion";
import { 
  User, 
  CreditCard, 
  Bell, 
  Shield, 
  Globe, 
  Moon,
  ChevronRight,
  Check,
  Crown,
  Zap
} from "lucide-react";

const plans = [
  {
    name: "Gratuit",
    price: "0€",
    current: false,
    features: ["Suivi basique", "3 objectifs", "Alertes hebdo"]
  },
  {
    name: "Premium",
    price: "9.99€",
    current: true,
    features: ["Tout illimité", "Comparateur", "Alertes temps réel", "Support prioritaire"]
  },
  {
    name: "Famille",
    price: "14.99€",
    current: false,
    features: ["5 membres", "Budget partagé", "Contrôle parental"]
  },
];

export const SettingsTab = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-black mb-2 font-display">
          <span className="text-primary">Paramètres</span>
        </h1>
        <p className="text-muted-foreground">
          Gérez votre compte et vos préférences
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Profile Card */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profil
            </h3>

            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h4 className="text-xl font-bold">Marie Dupont</h4>
                <p className="text-muted-foreground">marie.dupont@email.com</p>
                <span className="badge-warning mt-2 inline-flex items-center gap-1">
                  <Crown size={12} />
                  Premium
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Nom complet</label>
                <input 
                  type="text" 
                  defaultValue="Marie Dupont"
                  className="input-glass mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <input 
                  type="email" 
                  defaultValue="marie.dupont@email.com"
                  className="input-glass mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Téléphone</label>
                <input 
                  type="tel" 
                  defaultValue="+594 694 12 34 56"
                  className="input-glass mt-1"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Localisation</label>
                <select className="input-glass mt-1">
                  <option>Cayenne</option>
                  <option>Matoury</option>
                  <option>Rémire-Montjoly</option>
                  <option>Kourou</option>
                  <option>Saint-Laurent</option>
                </select>
              </div>
            </div>

            <button className="btn-primary mt-6">
              Sauvegarder les modifications
            </button>
          </div>

          {/* Preferences */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Bell className="w-5 h-5 text-accent" />
              Préférences
            </h3>

            <div className="space-y-4">
              {[
                { icon: Bell, label: "Notifications push", description: "Recevoir les alertes sur votre téléphone", enabled: true },
                { icon: Globe, label: "Emails marketing", description: "Recevoir nos offres exclusives", enabled: false },
                { icon: Moon, label: "Mode sombre", description: "Interface en thème sombre", enabled: true },
                { icon: Shield, label: "Double authentification", description: "Sécurité renforcée", enabled: true },
              ].map((pref, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
                  <div className="flex items-center gap-4">
                    <pref.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">{pref.description}</p>
                    </div>
                  </div>
                  <button
                    className={`w-12 h-6 rounded-full transition-colors ${
                      pref.enabled ? 'bg-primary' : 'bg-white/10'
                    }`}
                  >
                    <div 
                      className={`w-5 h-5 rounded-full bg-white transition-transform ${
                        pref.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="glass-card p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-secondary" />
              Moyens de paiement
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-primary/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 rounded bg-gradient-to-r from-blue-600 to-blue-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">VISA</span>
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-xs text-muted-foreground">Expire 12/26</p>
                  </div>
                </div>
                <span className="badge-success flex items-center gap-1">
                  <Check size={12} />
                  Par défaut
                </span>
              </div>

              <button className="w-full p-4 rounded-2xl border-2 border-dashed border-white/20 text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                <CreditCard size={18} />
                Ajouter un moyen de paiement
              </button>
            </div>
          </div>
        </motion.div>

        {/* Subscription */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="glass-card p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-accent" />
              Votre abonnement
            </h3>

            <div className="space-y-4">
              {plans.map((plan, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl transition-all cursor-pointer ${
                    plan.current 
                      ? 'bg-primary/20 border border-primary/50 glow-primary' 
                      : 'bg-white/5 hover:bg-white/10 border border-transparent'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold">{plan.name}</span>
                    <span className="font-bold">{plan.price}/mois</span>
                  </div>
                  <ul className="space-y-1">
                    {plan.features.map((f, j) => (
                      <li key={j} className="text-xs text-muted-foreground flex items-center gap-1">
                        <Check size={10} className={plan.current ? 'text-primary' : ''} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  {plan.current && (
                    <span className="badge-success mt-3 inline-block">Plan actuel</span>
                  )}
                </div>
              ))}
            </div>

            <button className="btn-accent w-full mt-4">
              Changer de plan
            </button>
          </div>

          {/* Danger Zone */}
          <div className="glass-card p-6 border border-destructive/30">
            <h3 className="font-bold mb-4 text-destructive">Zone de danger</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Ces actions sont irréversibles. Procédez avec précaution.
            </p>
            <div className="space-y-2">
              <button className="w-full p-3 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors text-sm">
                Exporter mes données
              </button>
              <button className="w-full p-3 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors text-sm">
                Supprimer mon compte
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
