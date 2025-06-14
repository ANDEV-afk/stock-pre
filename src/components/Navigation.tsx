import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
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
  Star,
  DollarSign,
  Code,
  MessageCircle,
  Newspaper,
  ChevronDown,
  Zap,
  Shield,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/markets", label: "Markets", icon: Activity },
    { href: "/news", label: "News", icon: Newspaper },
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

  const productItems = [
    {
      href: "/features",
      label: "Features",
      icon: Star,
      description: "Comprehensive feature overview",
    },
    {
      href: "/pricing",
      label: "Pricing",
      icon: DollarSign,
      description: "Simple, transparent pricing",
    },
  ];

  const companyItems = [
    {
      href: "/about",
      label: "About",
      icon: Shield,
      description: "Learn about our mission and team",
    },
    {
      href: "/careers",
      label: "Careers",
      icon: User,
      description: "Join our growing team",
    },
    {
      href: "/privacy",
      label: "Privacy",
      icon: Shield,
      description: "Privacy policy and data protection",
    },
    {
      href: "/terms",
      label: "Terms",
      icon: BarChart3,
      description: "Terms of service and conditions",
    },
  ];

  const resourceItems = [
    {
      href: "/support",
      label: "Support",
      icon: MessageCircle,
      description: "Get help and answers",
    },
    {
      href: "/features",
      label: "Documentation",
      icon: BarChart3,
      description: "Learn how to use StockVision",
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? theme === "dark"
              ? "bg-cyber-black/95 backdrop-blur-md border-b border-cyber-blue/20 shadow-cyber"
              : "bg-white backdrop-blur-md border-b border-gray-200 shadow-lg"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-2 bg-cyber-blue/20 rounded-xl"
              >
                <TrendingUp className="h-8 w-8 text-cyber-blue" />
              </motion.div>
              <span
                className={cn(
                  "text-xl font-bold transition-colors duration-300",
                  theme === "dark" ? "text-white" : "text-gray-900",
                )}
              >
                Stock<span className="text-cyber-blue">Vision</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                if (item.authRequired && !isAuthenticated) return null;

                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link key={item.href} to={item.href}>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={cn(
                        "px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2",
                        isActive
                          ? "bg-cyber-blue text-white shadow-cyber"
                          : theme === "dark"
                            ? "text-white/80 hover:text-cyber-blue hover:bg-white/10"
                            : "text-gray-800 hover:text-cyber-blue hover:bg-gray-100/70",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Products Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => setIsProductsOpen(true)}
                  onMouseLeave={() => setIsProductsOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2",
                    theme === "dark"
                      ? "text-white/80 hover:text-cyber-blue hover:bg-white/10"
                      : "text-gray-800 hover:text-cyber-blue hover:bg-gray-100/70",
                  )}
                >
                  <Star className="h-4 w-4" />
                  <span>Products</span>
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      isProductsOpen && "rotate-180",
                    )}
                  />
                </motion.button>

                <AnimatePresence>
                  {isProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                      className={cn(
                        "absolute top-full left-0 mt-2 w-80 backdrop-blur-md border rounded-2xl p-4",
                        theme === "dark"
                          ? "bg-cyber-black/95 border-cyber-blue/20 shadow-cyber"
                          : "bg-white/95 border-gray-200/50 shadow-xl",
                      )}
                    >
                      {productItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.href} to={item.href}>
                            <motion.div
                              whileHover={{ scale: 1.02, x: 4 }}
                              className={cn(
                                "flex items-start space-x-3 p-3 rounded-xl transition-all duration-200",
                                theme === "dark"
                                  ? "hover:bg-white/10"
                                  : "hover:bg-gray-100",
                              )}
                            >
                              <div className="p-2 bg-cyber-blue/20 rounded-lg">
                                <Icon className="h-4 w-4 text-cyber-blue" />
                              </div>
                              <div>
                                <h4
                                  className={cn(
                                    "font-medium transition-colors duration-300",
                                    theme === "dark"
                                      ? "text-white"
                                      : "text-gray-900",
                                  )}
                                >
                                  {item.label}
                                </h4>
                                <p
                                  className={cn(
                                    "text-sm transition-colors duration-300",
                                    theme === "dark"
                                      ? "text-white/60"
                                      : "text-gray-600",
                                  )}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </motion.div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Company Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => setIsCompanyOpen(true)}
                  onMouseLeave={() => setIsCompanyOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2",
                    theme === "dark"
                      ? "text-white/80 hover:text-cyber-purple hover:bg-white/10"
                      : "text-gray-800 hover:text-cyber-purple hover:bg-gray-100/70",
                  )}
                >
                  <Zap className="h-4 w-4" />
                  <span>Company</span>
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      isCompanyOpen && "rotate-180",
                    )}
                  />
                </motion.button>

                <AnimatePresence>
                  {isCompanyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseEnter={() => setIsCompanyOpen(true)}
                      onMouseLeave={() => setIsCompanyOpen(false)}
                      className={cn(
                        "absolute top-full left-0 mt-2 w-80 backdrop-blur-md border rounded-2xl p-4",
                        theme === "dark"
                          ? "bg-cyber-black/95 border-cyber-purple/20 shadow-cyber"
                          : "bg-white/95 border-gray-200/50 shadow-xl",
                      )}
                    >
                      {companyItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.href} to={item.href}>
                            <motion.div
                              whileHover={{ scale: 1.02, x: 4 }}
                              className={cn(
                                "flex items-start space-x-3 p-3 rounded-xl transition-all duration-200",
                                theme === "dark"
                                  ? "hover:bg-white/10"
                                  : "hover:bg-gray-100",
                              )}
                            >
                              <div className="p-2 bg-cyber-purple/20 rounded-lg">
                                <Icon className="h-4 w-4 text-cyber-purple" />
                              </div>
                              <div>
                                <h4
                                  className={cn(
                                    "font-medium transition-colors duration-300",
                                    theme === "dark"
                                      ? "text-white"
                                      : "text-gray-900",
                                  )}
                                >
                                  {item.label}
                                </h4>
                                <p
                                  className={cn(
                                    "text-sm transition-colors duration-300",
                                    theme === "dark"
                                      ? "text-white/60"
                                      : "text-gray-600",
                                  )}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </motion.div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Resources Dropdown */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  onMouseEnter={() => setIsResourcesOpen(true)}
                  onMouseLeave={() => setIsResourcesOpen(false)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2",
                    theme === "dark"
                      ? "text-white/80 hover:text-cyber-blue hover:bg-white/10"
                      : "text-gray-800 hover:text-cyber-blue hover:bg-gray-100/70",
                  )}
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Resources</span>
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 transition-transform",
                      isResourcesOpen && "rotate-180",
                    )}
                  />
                </motion.button>

                <AnimatePresence>
                  {isResourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onMouseEnter={() => setIsResourcesOpen(true)}
                      onMouseLeave={() => setIsResourcesOpen(false)}
                      className={cn(
                        "absolute top-full left-0 mt-2 w-80 backdrop-blur-md border rounded-2xl shadow-lg p-4",
                        theme === "dark"
                          ? "bg-cyber-black/95 border-cyber-blue/20 shadow-cyber"
                          : "bg-white/95 border-gray-200/50 shadow-xl",
                      )}
                    >
                      {resourceItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.href} to={item.href}>
                            <motion.div
                              whileHover={{ scale: 1.02, x: 4 }}
                              className={cn(
                                "flex items-start space-x-3 p-3 rounded-xl transition-all duration-200",
                                theme === "dark"
                                  ? "hover:bg-white/10"
                                  : "hover:bg-gray-100",
                              )}
                            >
                              <div className="p-2 bg-cyber-purple/20 rounded-lg">
                                <Icon className="h-4 w-4 text-cyber-purple" />
                              </div>
                              <div>
                                <h4
                                  className={cn(
                                    "font-medium transition-colors duration-300",
                                    theme === "dark"
                                      ? "text-white"
                                      : "text-gray-900",
                                  )}
                                >
                                  {item.label}
                                </h4>
                                <p
                                  className={cn(
                                    "text-sm transition-colors duration-300",
                                    theme === "dark"
                                      ? "text-white/60"
                                      : "text-gray-600",
                                  )}
                                >
                                  {item.description}
                                </p>
                              </div>
                            </motion.div>
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-xl backdrop-blur-md border transition-all duration-300 hidden lg:flex items-center justify-center",
                theme === "dark"
                  ? "bg-white/10 border-cyber-blue/20 hover:border-cyber-blue/40"
                  : "bg-gray-100 border-gray-200 hover:border-gray-300",
              )}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-cyber-yellow" />
              ) : (
                <Moon className="h-5 w-5 text-cyber-blue" />
              )}
            </motion.button>

            {/* Auth Section */}
            <div className="hidden lg:flex items-center space-x-2 ml-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className={cn(
                      "flex items-center space-x-2 transition-colors",
                      theme === "dark"
                        ? "text-white/80 hover:text-cyber-blue"
                        : "text-gray-900 hover:text-cyber-blue",
                    )}
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center shadow-cyber">
                      <span className="text-white text-sm font-semibold">
                        {user?.firstName?.charAt(0)}
                        {user?.lastName?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm">
                      {user?.firstName} {user?.lastName}
                    </span>
                  </Link>

                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "transition-colors",
                      theme === "dark"
                        ? "text-white/70 hover:text-cyber-red hover:bg-cyber-red/10"
                        : "text-gray-700 hover:text-cyber-red hover:bg-cyber-red/10",
                    )}
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
                      className={cn(
                        "transition-colors",
                        theme === "dark"
                          ? "text-white/80 hover:text-cyber-blue hover:bg-cyber-blue/10"
                          : "text-gray-800 hover:text-cyber-blue hover:bg-cyber-blue/10",
                      )}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>

                  <Link to="/register">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white shadow-cyber"
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleMobileMenu}
              className={cn(
                "lg:hidden p-2 rounded-xl transition-colors",
                theme === "dark"
                  ? "text-white/80 hover:text-cyber-blue hover:bg-white/10"
                  : "text-gray-900 hover:text-cyber-blue hover:bg-gray-100",
              )}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "lg:hidden fixed top-16 left-0 right-0 z-40 backdrop-blur-md border-b",
              theme === "dark"
                ? "bg-cyber-black/95 border-cyber-blue/20"
                : "bg-white/95 border-gray-200/50",
            )}
          >
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
              {/* Main Navigation */}
              {navItems.map((item) => {
                if (item.authRequired && !isAuthenticated) return null;

                const Icon = item.icon;
                const isActive = location.pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={closeMobileMenu}
                  >
                    <motion.div
                      whileHover={{ scale: 1.02, x: 4 }}
                      className={cn(
                        "flex items-center space-x-3 p-3 rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-cyber-blue text-white"
                          : theme === "dark"
                            ? "text-white/80 hover:text-cyber-blue hover:bg-white/10"
                            : "text-gray-700 hover:text-cyber-blue hover:bg-gray-100",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Theme Toggle for Mobile */}
              <div className="border-t border-white/10 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02, x: 4 }}
                  onClick={toggleTheme}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 w-full",
                    theme === "dark"
                      ? "text-white/80 hover:text-cyber-blue hover:bg-white/10"
                      : "text-gray-700 hover:text-cyber-blue hover:bg-gray-100",
                  )}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <Moon className="h-5 w-5" />
                  )}
                  <span className="font-medium">
                    Switch to {theme === "dark" ? "Light" : "Dark"} Mode
                  </span>
                </motion.button>
              </div>

              {/* Auth Section */}
              <div
                className={cn(
                  "border-t pt-4",
                  theme === "dark" ? "border-white/10" : "border-gray-200",
                )}
              >
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {user?.firstName?.charAt(0)}
                          {user?.lastName?.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p
                          className={cn(
                            "font-medium transition-colors duration-300",
                            theme === "dark" ? "text-white" : "text-gray-900",
                          )}
                        >
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p
                          className={cn(
                            "text-sm transition-colors duration-300",
                            theme === "dark"
                              ? "text-white/60"
                              : "text-gray-600",
                          )}
                        >
                          {user?.email}
                        </p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02, x: 4 }}
                      onClick={handleLogout}
                      className="flex items-center space-x-3 p-3 rounded-xl text-cyber-red hover:bg-cyber-red/10 transition-all duration-200 w-full"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="font-medium">Logout</span>
                    </motion.button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link to="/login" onClick={closeMobileMenu}>
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        className={cn(
                          "flex items-center space-x-3 p-3 rounded-xl transition-all duration-200",
                          theme === "dark"
                            ? "text-white/80 hover:text-cyber-blue hover:bg-white/10"
                            : "text-gray-700 hover:text-cyber-blue hover:bg-gray-100",
                        )}
                      >
                        <LogIn className="h-5 w-5" />
                        <span className="font-medium">Sign In</span>
                      </motion.div>
                    </Link>

                    <Link to="/register" onClick={closeMobileMenu}>
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-cyber-blue to-cyber-purple text-white transition-all duration-200"
                      >
                        <UserPlus className="h-5 w-5" />
                        <span className="font-medium">Get Started</span>
                      </motion.div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
