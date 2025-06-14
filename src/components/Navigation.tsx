import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  TrendingUp,
  BarChart3,
  User,
  Menu,
  X,
  Home,
  LogIn,
  UserPlus,
  LogOut,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: BarChart3,
      authRequired: true,
    },
    {
      href: "/predict",
      label: "Predict",
      icon: TrendingUp,
      authRequired: true,
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "dark-blur border-b border-white/10 shadow-dark"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-cyber-blue to-cyber-purple p-2 rounded-xl glow-blue"
              >
                <TrendingUp className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-semibold neon-text group-hover:animate-pulse-neon transition-all">
                StockVision
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                if (item.authRequired && !isAuthenticated) return null;

                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link key={item.href} to={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2",
                        isActive
                          ? "bg-cyber-blue text-white glow-blue neon-border"
                          : "text-cyber-gray-300 hover:text-cyber-blue hover:bg-cyber-gray-800/50",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Auth Section */}
            <div className="hidden md:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-cyber-gray-300">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-semibold">
                        {user?.firstName?.charAt(0)}
                        {user?.lastName?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </div>

                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-cyber-gray-300 hover:text-cyber-red hover:bg-cyber-red/10"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <>
                  <Link to="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-cyber-gray-300 hover:text-cyber-blue hover:bg-cyber-blue/10"
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>

                  <Link to="/register">
                    <Button
                      size="sm"
                      className="bg-cyber-blue hover:bg-cyber-blue-dark text-white glow-blue"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden apple-blur border-t border-apple-gray-200"
            >
              <div className="px-4 py-4 space-y-3">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.div
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-3",
                          isActive
                            ? "bg-apple-blue text-white"
                            : "text-apple-gray-600 hover:text-apple-blue hover:bg-apple-gray-100",
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}

                <div className="border-t border-apple-gray-200 pt-3 space-y-2">
                  {authItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <motion.div
                          whileTap={{ scale: 0.98 }}
                          className="px-4 py-3 rounded-xl text-sm font-medium text-apple-gray-600 hover:text-apple-blue hover:bg-apple-gray-100 transition-all duration-200 flex items-center space-x-3"
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content from hiding behind fixed nav */}
      <div className="h-16" />
    </>
  );
};

export default Navigation;
