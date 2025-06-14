import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePayment } from "@/contexts/PaymentContext";
import { useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  DollarSign,
  Shield,
  Lock,
  CheckCircle,
  ArrowLeft,
  AlertTriangle,
  QrCode,
  Zap,
  Clock,
  Star,
  Globe,
  Key,
  Phone,
  Mail,
  Copy,
  Download,
  Banknote,
  Coins,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  description: string;
  processingTime: string;
  fees: string;
  popular?: boolean;
}

interface PlanDetails {
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  features: string[];
}

const PaymentGateway = () => {
  const { processPayment } = usePayment();
  const location = useLocation();
  const [selectedMethod, setSelectedMethod] = useState<string>("card");

  // Read URL parameters to get plan details
  const urlParams = new URLSearchParams(location.search);
  const planName = urlParams.get("plan") || "Professional";
  const planPrice = parseFloat(urlParams.get("price") || "29");
  const planBilling = urlParams.get("billing") || "monthly";
  const planCategory = urlParams.get("category") || "predictions";
  const planSource = urlParams.get("source") || "general";

  // Get plan features based on plan name
  const getPlanFeatures = (plan: string) => {
    switch (plan.toLowerCase()) {
      case "basic":
        return [
          "50 stock predictions per day",
          "Basic technical analysis",
          "Email alerts",
          "Mobile app access",
          "Community support",
        ];
      case "pro":
      case "professional":
        return [
          "Unlimited AI predictions",
          "Advanced market analysis",
          "Real-time alerts",
          "Full course library access",
          "Priority support",
          "API access",
        ];
      case "elite":
      case "premium":
        return [
          "Custom AI model training",
          "Portfolio optimization",
          "1-on-1 expert consultations",
          "White-label access",
          "Advanced risk modeling",
          "Institutional-grade features",
        ];
      default:
        return [
          "Real-time market data",
          "Advanced AI predictions",
          "Portfolio analytics",
          "Priority support",
          "Mobile app access",
        ];
    }
  };

  const [selectedPlan] = useState<PlanDetails>({
    name: `${planName} Plan`,
    price: planPrice,
    originalPrice: planPrice > 0 ? Math.round(planPrice * 1.2) : undefined,
    period: planBilling === "yearly" ? "year" : "month",
    features: getPlanFeatures(planName),
  });

  const [cardForm, setCardForm] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const [upiForm, setUpiForm] = useState({
    id: "",
  });

  const [bankForm, setBankForm] = useState({
    accountNumber: "",
    ifsc: "",
    holderName: "",
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  // Generate QR Code data for UPI payment
  const generateUPIQRData = () => {
    const amount = selectedPlan.price;
    const merchantId = "stockvision@paytm";
    const transactionNote = `Payment for ${selectedPlan.name}`;
    return `upi://pay?pa=${merchantId}&pn=StockVision&am=${amount}&cu=USD&tn=${encodeURIComponent(transactionNote)}`;
  };

  const handlePayment = async () => {
    setIsProcessing(true);

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Process payment through context
    const success = processPayment(selectedPlan.name, selectedPlan.price);

    if (success) {
      setPaymentSuccess(true);
    }

    setIsProcessing(false);
  };

  const paymentMethods: PaymentMethod[] = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
      processingTime: "Instant",
      fees: "2.9% + $0.30",
      popular: true,
    },
    {
      id: "upi",
      name: "UPI Payment",
      icon: Smartphone,
      description: "Google Pay, PhonePe, Paytm, BHIM",
      processingTime: "Instant",
      fees: "Free",
      popular: true,
    },
    {
      id: "netbanking",
      name: "Net Banking",
      icon: Building2,
      description: "All major banks supported",
      processingTime: "1-2 minutes",
      fees: "$1.50",
    },
    {
      id: "digital_wallet",
      name: "Digital Wallets",
      icon: Wallet,
      description: "PayPal, Apple Pay, Google Pay",
      processingTime: "Instant",
      fees: "3.5%",
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: DollarSign,
      description: "Bitcoin, Ethereum, USDT, BNB",
      processingTime: "5-10 minutes",
      fees: "1%",
    },
  ];

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Could add a toast notification here
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-cyber-black cyber-grid">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <Card className="p-12 bg-white/10 backdrop-blur-md border border-cyber-green/20">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-20 h-20 bg-cyber-green/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="h-10 w-10 text-cyber-green" />
              </motion.div>

              <h1 className="text-3xl font-bold text-white mb-4">
                Payment Successful!
              </h1>
              <p className="text-cyber-green/80 text-lg mb-8">
                Welcome to StockVision Pro! Your subscription has been
                activated.
              </p>

              <div className="bg-white/5 rounded-lg p-6 mb-8">
                <h3 className="text-white font-semibold mb-4">
                  Subscription Details
                </h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-white/70">Plan:</span>
                    <span className="text-white">{selectedPlan.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Amount:</span>
                    <span className="text-white">
                      ${selectedPlan.price}/{selectedPlan.period}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Next billing:</span>
                    <span className="text-white">
                      {new Date(
                        Date.now() + 30 * 24 * 60 * 60 * 1000,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyber-blue to-cyber-purple hover:from-cyber-blue-dark hover:to-cyber-purple-dark text-white"
                  onClick={() => (window.location.href = "/dashboard")}
                >
                  Go to Dashboard
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyber-green text-cyber-green hover:bg-cyber-green/10"
                  onClick={() => (window.location.href = "/markets")}
                >
                  Explore Markets
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black cyber-grid">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyber-blue via-white to-cyber-purple bg-clip-text text-transparent mb-4">
            Complete Your Purchase
          </h1>
          <p className="text-xl text-cyber-blue/80 max-w-2xl mx-auto">
            Secure payment powered by industry-leading encryption
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-blue/20 mb-6">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Choose Payment Method
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {paymentMethods.map((method) => (
                    <motion.button
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedMethod(method.id)}
                      className={cn(
                        "p-4 rounded-xl border-2 transition-all duration-200 text-left relative",
                        selectedMethod === method.id
                          ? "border-cyber-blue bg-cyber-blue/10"
                          : "border-white/20 bg-white/5 hover:border-white/30",
                      )}
                    >
                      {method.popular && (
                        <Badge className="absolute -top-2 -right-2 bg-cyber-green text-white">
                          Popular
                        </Badge>
                      )}

                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            selectedMethod === method.id
                              ? "bg-cyber-blue/20"
                              : "bg-white/10",
                          )}
                        >
                          <method.icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {method.name}
                          </h3>
                          <p className="text-sm text-white/60">
                            {method.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-between text-xs text-white/50">
                        <span>{method.processingTime}</span>
                        <span>{method.fees}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Payment Forms */}
                <AnimatePresence mode="wait">
                  {selectedMethod === "card" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      key="card-form"
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Card Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <Label className="text-white text-sm mb-2 block">
                            Card Number
                          </Label>
                          <Input
                            placeholder="1234 5678 9012 3456"
                            value={cardForm.number}
                            onChange={(e) =>
                              setCardForm({
                                ...cardForm,
                                number: formatCardNumber(e.target.value),
                              })
                            }
                            maxLength={19}
                            className="bg-black/50 border-cyber-blue/30 text-white placeholder-white/50"
                          />
                        </div>

                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Expiry Date
                          </Label>
                          <Input
                            placeholder="MM/YY"
                            value={cardForm.expiry}
                            onChange={(e) =>
                              setCardForm({
                                ...cardForm,
                                expiry: formatExpiry(e.target.value),
                              })
                            }
                            maxLength={5}
                            className="bg-black/50 border-cyber-blue/30 text-white placeholder-white/50"
                          />
                        </div>

                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            CVV
                          </Label>
                          <Input
                            placeholder="123"
                            value={cardForm.cvv}
                            onChange={(e) =>
                              setCardForm({
                                ...cardForm,
                                cvv: e.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 4),
                              })
                            }
                            maxLength={4}
                            className="bg-black/50 border-cyber-blue/30 text-white placeholder-white/50"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <Label className="text-white text-sm mb-2 block">
                            Cardholder Name
                          </Label>
                          <Input
                            placeholder="John Doe"
                            value={cardForm.name}
                            onChange={(e) =>
                              setCardForm({
                                ...cardForm,
                                name: e.target.value,
                              })
                            }
                            className="bg-black/50 border-cyber-blue/30 text-white placeholder-white/50"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {selectedMethod === "upi" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      key="upi-form"
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">
                        UPI Payment
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* UPI ID Form */}
                        <div className="space-y-4">
                          <div>
                            <Label className="text-white text-sm mb-2 block">
                              UPI ID
                            </Label>
                            <Input
                              placeholder="yourname@paytm"
                              value={upiForm.id}
                              onChange={(e) =>
                                setUpiForm({ id: e.target.value })
                              }
                              className="bg-black/50 border-cyber-blue/30 text-white placeholder-white/50"
                            />
                          </div>

                          <div className="p-4 bg-cyber-blue/10 rounded-lg border border-cyber-blue/20">
                            <h4 className="text-white font-medium mb-2">
                              Popular UPI Apps
                            </h4>
                            <div className="grid grid-cols-2 gap-2">
                              {["Google Pay", "PhonePe", "Paytm", "BHIM"].map(
                                (app) => (
                                  <Button
                                    key={app}
                                    variant="outline"
                                    size="sm"
                                    className="border-cyber-blue/30 text-cyber-blue hover:bg-cyber-blue/10"
                                  >
                                    {app}
                                  </Button>
                                ),
                              )}
                            </div>
                          </div>
                        </div>

                        {/* QR Code Section */}
                        <div className="text-center">
                          <h4 className="text-white font-medium mb-4">
                            Scan QR Code to Pay
                          </h4>
                          <div className="bg-white p-4 rounded-lg inline-block mb-4">
                            {/* Real QR Code - Using QR Code API */}
                            <img
                              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(generateUPIQRData())}`}
                              alt="UPI Payment QR Code"
                              className="w-48 h-48"
                            />
                          </div>
                          <div className="text-center">
                            <p className="text-cyber-blue/80 text-sm mb-2">
                              Amount: ${selectedPlan.price}
                            </p>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() =>
                                copyToClipboard(generateUPIQRData())
                              }
                              className="border-cyber-green/30 text-cyber-green hover:bg-cyber-green/10"
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy UPI Link
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {selectedMethod === "netbanking" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      key="bank-form"
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Net Banking Details
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Select Bank
                          </Label>
                          <select className="w-full px-3 py-2 bg-black/50 border border-cyber-blue/30 rounded-md text-white">
                            <option>State Bank of India</option>
                            <option>HDFC Bank</option>
                            <option>ICICI Bank</option>
                            <option>Axis Bank</option>
                            <option>Punjab National Bank</option>
                            <option>Bank of Baroda</option>
                          </select>
                        </div>

                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Account Number
                          </Label>
                          <Input
                            placeholder="123456789012"
                            value={bankForm.accountNumber}
                            onChange={(e) =>
                              setBankForm({
                                ...bankForm,
                                accountNumber: e.target.value.replace(
                                  /\D/g,
                                  "",
                                ),
                              })
                            }
                            className="bg-black/50 border-cyber-blue/30 text-white placeholder-white/50"
                          />
                        </div>

                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            IFSC Code
                          </Label>
                          <Input
                            placeholder="SBIN0001234"
                            value={bankForm.ifsc}
                            onChange={(e) =>
                              setBankForm({
                                ...bankForm,
                                ifsc: e.target.value.toUpperCase(),
                              })
                            }
                            className="bg-black/50 border-cyber-blue/30 text-white placeholder-white/50"
                          />
                        </div>

                        <div>
                          <Label className="text-white text-sm mb-2 block">
                            Account Holder Name
                          </Label>
                          <Input
                            placeholder="John Doe"
                            value={bankForm.holderName}
                            onChange={(e) =>
                              setBankForm({
                                ...bankForm,
                                holderName: e.target.value,
                              })
                            }
                            className="bg-black/50 border-cyber-blue/30 text-white placeholder-white/50"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {selectedMethod === "digital_wallet" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      key="wallet-form"
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Digital Wallets
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Button
                          variant="outline"
                          className="bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30 h-20 flex flex-col items-center justify-center"
                        >
                          <Globe className="h-8 w-8 mb-2" />
                          PayPal
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-black border-white/30 text-white hover:bg-white/10 h-20 flex flex-col items-center justify-center"
                        >
                          <Phone className="h-8 w-8 mb-2" />
                          Apple Pay
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-green-600/20 border-green-500/30 text-green-400 hover:bg-green-500/30 h-20 flex flex-col items-center justify-center"
                        >
                          <Globe className="h-8 w-8 mb-2" />
                          Google Pay
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-purple-600/20 border-purple-500/30 text-purple-400 hover:bg-purple-500/30 h-20 flex flex-col items-center justify-center"
                        >
                          <Wallet className="h-8 w-8 mb-2" />
                          Stripe
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-indigo-600/20 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/30 h-20 flex flex-col items-center justify-center"
                        >
                          <Banknote className="h-8 w-8 mb-2" />
                          Razorpay
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-cyan-600/20 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/30 h-20 flex flex-col items-center justify-center"
                        >
                          <Coins className="h-8 w-8 mb-2" />
                          Amazon Pay
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {selectedMethod === "crypto" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      key="crypto-form"
                    >
                      <h3 className="text-lg font-semibold text-white mb-4">
                        Cryptocurrency Payment
                      </h3>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <Button
                          variant="outline"
                          className="bg-orange-600/20 border-orange-500/30 text-orange-400 hover:bg-orange-500/30 h-20 flex flex-col items-center justify-center"
                        >
                          <div className="text-2xl mb-1">₿</div>
                          <span className="text-sm">Bitcoin</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-blue-600/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30 h-20 flex flex-col items-center justify-center"
                        >
                          <div className="text-2xl mb-1">Ξ</div>
                          <span className="text-sm">Ethereum</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-green-600/20 border-green-500/30 text-green-400 hover:bg-green-500/30 h-20 flex flex-col items-center justify-center"
                        >
                          <div className="text-2xl mb-1">₮</div>
                          <span className="text-sm">USDT</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="bg-yellow-600/20 border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30 h-20 flex flex-col items-center justify-center"
                        >
                          <div className="text-2xl mb-1">⬣</div>
                          <span className="text-sm">BNB</span>
                        </Button>
                      </div>

                      <div className="mt-6 p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="h-5 w-5 text-amber-400" />
                          <div>
                            <h4 className="text-amber-400 font-medium">
                              Important Note
                            </h4>
                            <p className="text-amber-300/80 text-sm">
                              Cryptocurrency payments may take 5-10 minutes to
                              confirm
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Security Notice */}
                <div className="mt-6 p-4 bg-cyber-green/10 rounded-lg border border-cyber-green/20">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-cyber-green" />
                    <div>
                      <h4 className="text-white font-medium">Secure Payment</h4>
                      <p className="text-white/60 text-sm">
                        256-bit SSL encryption • PCI DSS compliant • SOC 2
                        certified
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 bg-white/10 backdrop-blur-md border border-cyber-purple/20 sticky top-8">
                <h2 className="text-xl font-bold text-white mb-4">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Plan</span>
                    <span className="text-white font-medium">
                      {selectedPlan.name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Billing</span>
                    <span className="text-white">Monthly</span>
                  </div>

                  {selectedPlan.originalPrice && (
                    <div className="flex justify-between items-center">
                      <span className="text-white/70">Original Price</span>
                      <span className="text-white/70 line-through">
                        ${selectedPlan.originalPrice}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Discount</span>
                    <span className="text-cyber-green">-$10 (17% off)</span>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center text-lg">
                    <span className="text-white font-semibold">Total</span>
                    <span className="text-white font-bold">
                      ${selectedPlan.price}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h3 className="text-white font-medium">What's included:</h3>
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-cyber-green" />
                      <span className="text-white/80 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-cyber-green to-cyber-blue hover:from-cyber-green-dark hover:to-cyber-blue-dark text-white py-3 text-lg font-semibold"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5" />
                      <span>Pay ${selectedPlan.price}</span>
                    </div>
                  )}
                </Button>

                <p className="text-xs text-white/50 text-center mt-4">
                  By proceeding, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
