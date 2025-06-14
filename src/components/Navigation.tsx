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
  Star,
  DollarSign,
  Code,
  MessageCircle,
  ChevronDown,
  Zap,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
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
    {
      href: "/api",
      label: "API",
      icon: Code,
      description: "Developer documentation",
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
            ? "bg-cyber-black/90 backdrop-blur-md border-b border-cyber-blue/20 shadow-dark"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 group"
              onClick={closeMobileMenu}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-cyber-blue to-cyber-purple p-2 rounded-xl shadow-cyber"
              >
                <TrendingUp className="h-6 w-6 text-white" />
              </motion.div>
              <span className="text-xl font-semibold bg-gradient-to-r from-cyber-blue to-cyber-purple bg-clip-text text-transparent group-hover:from-cyber-blue-light group-hover:to-cyber-purple-light transition-all">
                StockVision
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {/* Main Nav Items */}
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
                          ? "bg-cyber-blue text-white shadow-cyber"
                          : "text-white/80 hover:text-cyber-blue hover:bg-white/10",
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
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 text-white/80 hover:text-cyber-blue hover:bg-white/10"
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
                      className="absolute top-full left-0 mt-2 w-80 bg-cyber-black/95 backdrop-blur-md border border-cyber-blue/20 rounded-2xl shadow-cyber p-4"
                    >
                      {productItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.href} to={item.href}>
                            <motion.div
                              whileHover={{ scale: 1.02, x: 4 }}
                              className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                            >
                              <div className="p-2 bg-cyber-blue/20 rounded-lg">
                                <Icon className="h-4 w-4 text-cyber-blue" />
                              </div>
                              <div>
                                <h4 className="text-white font-medium">
                                  {item.label}
                                </h4>
                                <p className="text-white/60 text-sm">
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
                  className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-2 text-white/80 hover:text-cyber-blue hover:bg-white/10"
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
                      className="absolute top-full left-0 mt-2 w-80 bg-cyber-black/95 backdrop-blur-md border border-cyber-blue/20 rounded-2xl shadow-cyber p-4"
                    >
                      {resourceItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <Link key={item.href} to={item.href}>
                            <motion.div
                              whileHover={{ scale: 1.02, x: 4 }}
                              className="flex items-start space-x-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-200"
                            >
                              <div className="p-2 bg-cyber-purple/20 rounded-lg">
                                <Icon className="h-4 w-4 text-cyber-purple" />
                              </div>
                              <div>
                                <h4 className="text-white font-medium">
                                  {item.label}
                                </h4>
                                <p className="text-white/60 text-sm">
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

            {/* Auth Section */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-white/80">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyber-blue to-cyber-purple rounded-full flex items-center justify-center shadow-cyber">
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
                    className="text-white/70 hover:text-cyber-red hover:bg-cyber-red/10"
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
                      className="text-white/80 hover:text-cyber-blue hover:bg-cyber-blue/10"
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
              className="lg:hidden p-2 rounded-xl text-white/80 hover:text-cyber-blue hover:bg-white/10 transition-colors"
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
            className="lg:hidden fixed top-16 left-0 right-0 z-40 bg-cyber-black/95 backdrop-blur-md border-b border-cyber-blue/20"
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
                          : "text-white/80 hover:text-cyber-blue hover:bg-white/10",
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}

              {/* Products Section */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-cyber-blue font-semibold mb-3 px-3">
                  Products
                </p>
                {productItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={closeMobileMenu}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="flex items-center space-x-3 p-3 rounded-xl text-white/80 hover:text-cyber-blue hover:bg-white/10 transition-all duration-200"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Resources Section */}
              <div className="border-t border-white/10 pt-4">
                <p className="text-cyber-purple font-semibold mb-3 px-3">
                  Resources
                </p>
                {resourceItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={closeMobileMenu}
                    >
                      <motion.div
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="flex items-center space-x-3 p-3 rounded-xl text-white/80 hover:text-cyber-purple hover:bg-white/10 transition-all duration-200"
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* Auth Section */}
              <div className="border-t border-white/10 pt-4">
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
                        <p className="text-white font-medium">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-white/60 text-sm">{user?.email}</p>
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
                        className="flex items-center space-x-3 p-3 rounded-xl text-white/80 hover:text-cyber-blue hover:bg-white/10 transition-all duration-200"
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
