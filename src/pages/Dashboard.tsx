import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { Wallet, LogOut, TrendingUp, Target, PiggyBank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/AnimatedBackground";

const Dashboard = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-xl">Chargement...</div>
      </div>
    );
  }

  if (!user) return null;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-primary" />
            <span className="text-xl font-black">
              <span className="text-foreground">Small</span>
              <span className="text-primary">Budget</span>
            </span>
          </div>
          <Button variant="ghost" onClick={handleSignOut} className="text-muted-foreground">
            <LogOut size={20} className="mr-2" />
            Déconnexion
          </Button>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-12 px-6">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-black mb-2">
              Bienvenue, <span className="text-primary">{user.user_metadata?.full_name || "Utilisateur"}</span>
            </h1>
            <p className="text-muted-foreground">Voici un aperçu de vos finances</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Solde total</p>
                  <p className="text-3xl font-black">€0.00</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Objectifs</p>
                  <p className="text-3xl font-black">0</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center">
                  <PiggyBank className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">Épargne</p>
                  <p className="text-3xl font-black">€0.00</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 text-center"
          >
            <PiggyBank className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Commencez à suivre vos finances</h2>
            <p className="text-muted-foreground mb-6">
              Ajoutez votre première transaction pour commencer à visualiser vos dépenses.
            </p>
            <Button className="btn-primary">
              Ajouter une transaction
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
