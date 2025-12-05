import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl py-4 shadow-lg shadow-primary/5"
          : "bg-background/80 backdrop-blur-md py-6"
      } border-b border-border/50`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          className="flex items-center gap-3 cursor-pointer group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-4xl text-primary drop-shadow-glow">
            <Wallet size={40} />
          </span>
          <span className="text-2xl font-black tracking-tight">
            <span className="text-foreground">Small</span>
            <span className="text-primary">Budget</span>
          </span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {["fonctionnalités", "tarifs", "faq"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-muted-foreground hover:text-primary transition-colors capitalize"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Link to="/login">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Connexion
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="btn-primary">Commencer gratuitement</Button>
          </Link>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 p-6"
        >
          <div className="flex flex-col gap-4">
            {["fonctionnalités", "tarifs", "faq"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-left text-muted-foreground hover:text-primary transition-colors capitalize py-2"
              >
                {item}
              </button>
            ))}
            <Link to="/login" className="w-full">
              <Button variant="ghost" className="w-full justify-start">
                Connexion
              </Button>
            </Link>
            <Link to="/signup" className="w-full">
              <Button className="btn-primary w-full">Commencer gratuitement</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};
