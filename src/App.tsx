import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import TooltipProvider from "@/components/TooltipProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { PaymentProvider } from "@/contexts/PaymentContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import StockPrediction from "@/pages/StockPrediction";
import Features from "@/pages/Features";
import Pricing from "@/pages/Pricing";
import API from "@/pages/API";
import Support from "@/pages/Support";
import GlobalMarkets from "@/pages/GlobalMarkets";
import News from "@/pages/News";
import About from "@/pages/About";
import Careers from "@/pages/Careers";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import PaymentGateway from "@/pages/PaymentGateway";
import CompanyPrediction from "@/pages/CompanyPrediction";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaymentProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/api" element={<API />} />
                <Route path="/support" element={<Support />} />
                <Route path="/markets" element={<GlobalMarkets />} />
                <Route path="/news" element={<News />} />
                <Route path="/about" element={<About />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/payment" element={<PaymentGateway />} />
                <Route
                  path="/prediction/:symbol"
                  element={<CompanyPrediction />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/predict"
                  element={
                    <ProtectedRoute>
                      <StockPrediction />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PaymentProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
