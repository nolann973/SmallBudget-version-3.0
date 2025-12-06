import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  PiggyBank, 
  CreditCard, 
  TrendingUp,
  Bell,
  Settings,
  Calculator,
  ShoppingCart,
  Wallet,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: "overview", label: "Vue d'ensemble", icon: LayoutDashboard },
  { id: "catalogs", label: "Catalogues", icon: BookOpen },
  { id: "savings", label: "Plans d'épargne", icon: PiggyBank },
  { id: "transactions", label: "Transactions", icon: CreditCard },
  { id: "budget", label: "Simulateur", icon: Calculator },
  { id: "comparator", label: "Comparateur", icon: TrendingUp },
  { id: "shopping", label: "Liste courses", icon: ShoppingCart },
];

const bottomItems = [
  { id: "notifications", label: "Alertes", icon: Bell },
  { id: "settings", label: "Paramètres", icon: Settings },
];

export const DashboardSidebar = ({ 
  activeTab, 
  setActiveTab, 
  collapsed, 
  setCollapsed 
}: DashboardSidebarProps) => {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Wallet className="w-6 h-6 text-primary" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="text-xl font-black">
              <span className="text-foreground">Small</span>
              <span className="text-primary">Budget</span>
            </span>
          </motion.div>
        )}
      </div>

      {/* Main Navigation */}
      <nav className="p-4 flex flex-col h-[calc(100%-180px)]">
        <div className="space-y-2 flex-1">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full nav-item",
                activeTab === item.id && "nav-active"
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </motion.button>
          ))}
        </div>

        {/* Promo Banner */}
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-4 my-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="pulse-dot" />
              <span className="text-xs font-semibold text-primary">PROMO</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              3 nouvelles offres disponibles chez Hyper U
            </p>
            <button 
              onClick={() => setActiveTab("catalogs")}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Voir les offres →
            </button>
          </motion.div>
        )}

        {/* Bottom Navigation */}
        <div className="space-y-2 pt-4 border-t border-sidebar-border">
          {bottomItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full nav-item",
                activeTab === item.id && "nav-active"
              )}
            >
              <item.icon size={20} />
              {!collapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-muted border border-border flex items-center justify-center hover:bg-primary/20 transition-colors"
      >
        {collapsed ? (
          <ChevronRight size={14} className="text-muted-foreground" />
        ) : (
          <ChevronLeft size={14} className="text-muted-foreground" />
        )}
      </button>
    </motion.aside>
  );
};
