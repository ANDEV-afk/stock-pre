import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface PaymentContextType {
  isPaid: boolean;
  currentPlan: "free" | "professional" | "enterprise";
  paymentDate: Date | null;
  processPayment: (plan: string, amount: number) => boolean;
  cancelSubscription: () => void;
  checkPaymentStatus: () => boolean;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

interface PaymentProviderProps {
  children: ReactNode;
}

export const PaymentProvider: React.FC<PaymentProviderProps> = ({
  children,
}) => {
  const [isPaid, setIsPaid] = useState<boolean>(false);
  const [currentPlan, setCurrentPlan] = useState<
    "free" | "professional" | "enterprise"
  >("free");
  const [paymentDate, setPaymentDate] = useState<Date | null>(null);

  // Load payment status from localStorage on mount
  useEffect(() => {
    const savedPaymentStatus = localStorage.getItem(
      "stockvision_payment_status",
    );
    const savedPlan = localStorage.getItem("stockvision_current_plan");
    const savedPaymentDate = localStorage.getItem("stockvision_payment_date");

    if (savedPaymentStatus === "paid") {
      setIsPaid(true);
      setCurrentPlan((savedPlan as any) || "professional");
      if (savedPaymentDate) {
        setPaymentDate(new Date(savedPaymentDate));
      }
    }
  }, []);

  const processPayment = (plan: string, amount: number) => {
    // Simulate payment processing
    const planType = plan.toLowerCase() as "professional" | "enterprise";

    setIsPaid(true);
    setCurrentPlan(planType);
    const currentDate = new Date();
    setPaymentDate(currentDate);

    // Save to localStorage
    localStorage.setItem("stockvision_payment_status", "paid");
    localStorage.setItem("stockvision_current_plan", planType);
    localStorage.setItem("stockvision_payment_date", currentDate.toISOString());

    // Instead of immediate reload, return success status
    return true;
  };

  const cancelSubscription = () => {
    setIsPaid(false);
    setCurrentPlan("free");
    setPaymentDate(null);

    // Remove from localStorage
    localStorage.removeItem("stockvision_payment_status");
    localStorage.removeItem("stockvision_current_plan");
    localStorage.removeItem("stockvision_payment_date");

    alert("Subscription cancelled. You have been downgraded to the free plan.");
    window.location.reload();
  };

  const checkPaymentStatus = () => {
    return isPaid;
  };

  const value: PaymentContextType = {
    isPaid,
    currentPlan,
    paymentDate,
    processPayment,
    cancelSubscription,
    checkPaymentStatus,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};

export default PaymentContext;
