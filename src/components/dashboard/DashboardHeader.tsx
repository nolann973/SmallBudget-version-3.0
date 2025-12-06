import { motion } from "framer-motion";
import { Bell, Search, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string;
  onSignOut: () => void;
}

export const DashboardHeader = ({ userName, onSignOut }: DashboardHeaderProps) => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 px-6 py-4"
    >
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un magasin, produit, offre..."
            className="input-glass pl-10 w-full"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-xl hover:bg-white/5 transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </button>

          {/* User Menu */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-semibold">{userName}</p>
              <p className="text-xs text-muted-foreground">Plan Premium</p>
            </div>
          </div>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSignOut}
            className="btn-ghost"
          >
            <LogOut size={18} />
          </Button>
        </div>
      </div>
    </motion.header>
  );
};
