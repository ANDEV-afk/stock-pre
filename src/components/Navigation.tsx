import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  BarChart3,
  User,
  Menu,
  X,
  Home,
  LogIn,
  UserPlus,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/predict", label: "Predict", icon: TrendingUp },
  ];

  const authItems = [
    { href: "/login", label: "Sign In", icon: LogIn },
    { href: "/register", label: "Sign Up", icon: UserPlus },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "apple-blur border-b border-apple-gray-200 shadow-apple"
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
                className="bg-gradient-to-br from-apple-blue to-apple-purple p-2 rounded-xl shadow-apple"
              >
                <TrendingUp className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-semibold text-apple-gray-700 group-hover:text-apple-blue transition-colors">
                StockVision
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
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
                          ? "bg-apple-blue text-white shadow-apple"
                          : "text-apple-gray-600 hover:text-apple-blue hover:bg-apple-gray-100",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              {authItems.map((item, index) => {
                const Icon = item.icon;

                return (
                  <Link key={item.href} to={item.href}>
                    <Button
                      variant={index === 1 ? "default" : "ghost"}
                      size="sm"
                      className={cn(
                        "transition-all duration-200",
                        index === 1
                          ? "bg-apple-blue hover:bg-apple-blue-dark text-white shadow-apple"
                          : "text-apple-gray-600 hover:text-apple-blue hover:bg-apple-gray-100",
                      )}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </Button>
                  </Link>
                );
              })}
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
