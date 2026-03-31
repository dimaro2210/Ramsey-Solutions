import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/context/AuthContext";

import NotFound from "@/pages/not-found";
import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Debt101 from "@/pages/Debt101";
import RealEstate from "@/pages/RealEstate";
import EveryDollar from "@/pages/EveryDollar";
import Taxes from "@/pages/Taxes";
import SmartVestor from "@/pages/SmartVestor";
import Insurance from "@/pages/Insurance";
import InsuranceType from "@/pages/InsuranceType";
import Shows from "@/pages/Shows";
import TheRamseyShow from "@/pages/TheRamseyShow";
import SevenBabySteps from "@/pages/SevenBabySteps";
import Trusted from "@/pages/Trusted";
import AskRamsey from "@/pages/AskRamsey";

import DashboardLayout from "@/components/DashboardLayout";
import Overview from "@/pages/dashboard/Overview";
import Deposit from "@/pages/dashboard/Deposit";
import Withdraw from "@/pages/dashboard/Withdraw";
import TradingHistory from "@/pages/dashboard/TradingHistory";
import Support from "@/pages/dashboard/Support";
import { ReactNode } from "react";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/sign-in" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/askramsey" element={<AskRamsey />} />

      <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout><Overview /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/deposit" element={<ProtectedRoute><DashboardLayout><Deposit /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/withdraw" element={<ProtectedRoute><DashboardLayout><Withdraw /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/history" element={<ProtectedRoute><DashboardLayout><TradingHistory /></DashboardLayout></ProtectedRoute>} />
      <Route path="/dashboard/support" element={<ProtectedRoute><DashboardLayout><Support /></DashboardLayout></ProtectedRoute>} />

      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/sign-in" element={<Layout><SignIn /></Layout>} />
      <Route path="/sign-up" element={<Layout><SignUp /></Layout>} />
      <Route path="/debt/debt-101" element={<Layout><Debt101 /></Layout>} />
      <Route path="/real-estate/residential-real-estate" element={<Layout><RealEstate /></Layout>} />
      <Route path="/money/everydollar" element={<Layout><EveryDollar /></Layout>} />
      <Route path="/taxes" element={<Layout><Taxes /></Layout>} />
      <Route path="/retirement/smartvestor" element={<Layout><SmartVestor /></Layout>} />
      <Route path="/insurance" element={<Layout><Insurance /></Layout>} />
      <Route path="/insurance/:type" element={<Layout><InsuranceType /></Layout>} />
      <Route path="/shows" element={<Layout><Shows /></Layout>} />
      <Route path="/shows/the-ramsey-show" element={<Layout><TheRamseyShow /></Layout>} />
      <Route path="/dave-ramsey-7-baby-steps" element={<Layout><SevenBabySteps /></Layout>} />
      <Route path="/trusted" element={<Layout><Trusted /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
