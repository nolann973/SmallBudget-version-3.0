import { motion } from "framer-motion";
import { 
  Bell, 
  Check, 
  Trash2, 
  Settings,
  Tag,
  TrendingDown,
  Clock,
  AlertCircle,
  Sparkles
} from "lucide-react";
import { useState } from "react";

interface Notification {
  id: number;
  type: "promo" | "price" | "goal" | "alert" | "tip";
  title: string;
  message: string;
  time: string;
  read: boolean;
  store?: string;
}

const initialNotifications: Notification[] = [];

const getIconByType = (type: string) => {
  switch (type) {
    case "promo": return Tag;
    case "price": return TrendingDown;
    case "goal": return Sparkles;
    case "alert": return AlertCircle;
    case "tip": return Sparkles;
    default: return Bell;
  }
};

const getColorByType = (type: string) => {
  switch (type) {
    case "promo": return "accent";
    case "price": return "primary";
    case "goal": return "success";
    case "alert": return "warning";
    case "tip": return "secondary";
    default: return "muted";
  }
};

export const NotificationsTab = () => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filter, setFilter] = useState<string>("all");

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread"
    ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

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
            <span className="text-primary">Alertes</span> & Notifications
          </h1>
          <p className="text-muted-foreground">
            {unreadCount > 0 
              ? `Vous avez ${unreadCount} notification${unreadCount > 1 ? 's' : ''} non lue${unreadCount > 1 ? 's' : ''}`
              : "Toutes vos notifications sont lues"
            }
          </p>
        </div>

        <div className="flex gap-3">
          <button className="btn-secondary flex items-center gap-2">
            <Settings size={18} />
            Paramètres
          </button>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="btn-primary">
              <Check size={18} />
              Tout marquer lu
            </button>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {[
          { id: "all", label: "Toutes" },
          { id: "unread", label: "Non lues" },
          { id: "promo", label: "Promos" },
          { id: "price", label: "Prix" },
          { id: "goal", label: "Objectifs" },
          { id: "alert", label: "Alertes" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              filter === f.id
                ? "bg-primary text-primary-foreground"
                : "bg-white/5 text-muted-foreground hover:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card overflow-hidden"
      >
        {filteredNotifications.length > 0 ? (
          <div className="divide-y divide-white/5">
            {filteredNotifications.map((notification, index) => {
              const Icon = getIconByType(notification.type);
              const color = getColorByType(notification.type);

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className={`flex items-start gap-4 p-4 hover:bg-white/5 transition-colors ${
                    !notification.read ? 'bg-white/[0.02]' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-${color}/20 flex-shrink-0`}>
                    <Icon className={`w-5 h-5 text-${color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`font-semibold ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {notification.title}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock size={10} />
                            {notification.time}
                          </span>
                          {notification.store && (
                            <span className={`badge-${color === 'primary' ? 'success' : color === 'accent' ? 'warning' : 'info'}`}>
                              {notification.store}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 rounded-lg hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-2 rounded-lg hover:bg-destructive/20 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                  )}
                </motion.div>
              );
            })}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0.5, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="empty-card text-center m-6"
          >
            <div className="empty-icon">
              <Bell className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold font-display mb-2">Aucune notification</h3>
            <p className="text-muted-foreground text-sm">
              Vous êtes à jour. Activez d&apos;autres alertes pour recevoir plus d&apos;astuces.
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Alert Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h3 className="font-bold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Préférences d'alertes
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Alertes promos", description: "Nouvelles promotions des enseignes", enabled: true },
            { label: "Variations de prix", description: "Quand un produit baisse de prix", enabled: true },
            { label: "Objectifs d'épargne", description: "Progression de vos objectifs", enabled: true },
            { label: "Alertes budget", description: "Dépassement de budget", enabled: false },
          ].map((pref, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5">
              <div>
                <p className="font-medium">{pref.label}</p>
                <p className="text-xs text-muted-foreground">{pref.description}</p>
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
      </motion.div>
    </div>
  );
};
