import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  TrendingUp,
  ArrowRight,
  Apple,
  Github,
  Chrome,
  CheckCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      // Redirect would happen here
    }, 2000);
  };

  const socialProviders = [
    { name: "Apple", icon: Apple, color: "bg-black hover:bg-gray-800" },
    {
      name: "Google",
      icon: Chrome,
      color: "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200",
    },
    { name: "GitHub", icon: Github, color: "bg-gray-900 hover:bg-gray-800" },
  ];

  const features = [
    "AI-powered stock predictions",
    "Real-time market analytics",
    "Portfolio tracking & alerts",
    "Advanced charting tools",
  ];

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    {
      label: "Contains uppercase letter",
      met: /[A-Z]/.test(formData.password),
    },
    {
      label: "Contains lowercase letter",
      met: /[a-z]/.test(formData.password),
    },
    { label: "Contains number", met: /\d/.test(formData.password) },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-apple-gray-50 via-white to-apple-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-apple-purple/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 mb-8"
              >
                <div className="bg-gradient-to-br from-apple-blue to-apple-purple p-3 rounded-2xl shadow-apple">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-apple-gray-700">
                  StockVision
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h1 className="text-4xl lg:text-5xl font-bold text-apple-gray-700 mb-6">
                  Start your trading journey with AI
                </h1>
                <p className="text-xl text-apple-gray-500 leading-relaxed">
                  Join thousands of successful traders who trust StockVision for
                  accurate market predictions and insights.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-apple-green" />
                    </div>
                    <span className="text-apple-gray-600 text-lg">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Registration Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md w-full mx-auto"
          >
            <div className="text-center mb-8 lg:hidden">
              <div className="inline-flex items-center space-x-2 mb-6">
                <div className="bg-gradient-to-br from-apple-blue to-apple-purple p-3 rounded-2xl shadow-apple">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-apple-gray-700">
                  StockVision
                </span>
              </div>

              <h2 className="text-3xl font-bold text-apple-gray-700 mb-2">
                Create your account
              </h2>
              <p className="text-apple-gray-500">
                Start making smarter trading decisions today
              </p>
            </div>

            <Card className="bg-white/90 apple-blur border border-apple-gray-200/50 shadow-apple-lg p-8">
              {/* Social Registration */}
              <div className="mb-8">
                <div className="grid grid-cols-3 gap-3">
                  {socialProviders.map((provider, index) => {
                    const Icon = provider.icon;

                    return (
                      <motion.button
                        key={provider.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(
                          "flex items-center justify-center p-3 rounded-xl font-medium transition-all duration-200 shadow-sm",
                          provider.color,
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </motion.button>
                    );
                  })}
                </div>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-apple-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-apple-gray-500">
                      or sign up with email
                    </span>
                  </div>
                </div>
              </div>

              {/* Registration Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Label
                      htmlFor="firstName"
                      className="text-apple-gray-700 font-medium"
                    >
                      First name
                    </Label>
                    <div className="mt-2 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-apple-gray-400" />
                      </div>
                      <Input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="pl-10 h-12 bg-white border-apple-gray-200 rounded-xl focus:ring-apple-blue focus:border-apple-blue"
                        placeholder="John"
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Label
                      htmlFor="lastName"
                      className="text-apple-gray-700 font-medium"
                    >
                      Last name
                    </Label>
                    <div className="mt-2">
                      <Input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="h-12 bg-white border-apple-gray-200 rounded-xl focus:ring-apple-blue focus:border-apple-blue"
                        placeholder="Doe"
                      />
                    </div>
                  </motion.div>
                </div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Label
                    htmlFor="email"
                    className="text-apple-gray-700 font-medium"
                  >
                    Email address
                  </Label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-apple-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="pl-10 h-12 bg-white border-apple-gray-200 rounded-xl focus:ring-apple-blue focus:border-apple-blue"
                      placeholder="john@example.com"
                    />
                  </div>
                </motion.div>

                {/* Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Label
                    htmlFor="password"
                    className="text-apple-gray-700 font-medium"
                  >
                    Password
                  </Label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-apple-gray-400" />
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className="pl-10 pr-10 h-12 bg-white border-apple-gray-200 rounded-xl focus:ring-apple-blue focus:border-apple-blue"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-apple-gray-400 hover:text-apple-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-apple-gray-400 hover:text-apple-gray-600" />
                      )}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-3 space-y-1">
                      {passwordRequirements.map((req, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle
                            className={cn(
                              "h-3 w-3",
                              req.met
                                ? "text-apple-green"
                                : "text-apple-gray-300",
                            )}
                          />
                          <span
                            className={cn(
                              "text-xs",
                              req.met
                                ? "text-apple-green"
                                : "text-apple-gray-400",
                            )}
                          >
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>

                {/* Confirm Password */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <Label
                    htmlFor="confirmPassword"
                    className="text-apple-gray-700 font-medium"
                  >
                    Confirm password
                  </Label>
                  <div className="mt-2 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-apple-gray-400" />
                    </div>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        handleInputChange("confirmPassword", e.target.value)
                      }
                      className="pl-10 pr-10 h-12 bg-white border-apple-gray-200 rounded-xl focus:ring-apple-blue focus:border-apple-blue"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-apple-gray-400 hover:text-apple-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-apple-gray-400 hover:text-apple-gray-600" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Terms Agreement */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 }}
                  className="flex items-start space-x-3"
                >
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-apple-blue focus:ring-apple-blue border-apple-gray-300 rounded mt-0.5"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm text-apple-gray-600"
                  >
                    I agree to the{" "}
                    <Link
                      to="/terms"
                      className="font-medium text-apple-blue hover:text-apple-blue-dark"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      to="/privacy"
                      className="font-medium text-apple-blue hover:text-apple-blue-dark"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-apple-blue hover:bg-apple-blue-dark text-white font-semibold rounded-xl shadow-apple hover:shadow-apple-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                        <span>Creating account...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Create account</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>

            {/* Sign In Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center mt-6"
            >
              <p className="text-apple-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-apple-blue hover:text-apple-blue-dark transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Register;
