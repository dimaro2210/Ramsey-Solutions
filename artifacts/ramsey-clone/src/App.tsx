import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/debt/debt-101" element={<Debt101 />} />
              <Route path="/real-estate/residential-real-estate" element={<RealEstate />} />
              <Route path="/money/everydollar" element={<EveryDollar />} />
              <Route path="/taxes" element={<Taxes />} />
              <Route path="/retirement/smartvestor" element={<SmartVestor />} />
              <Route path="/insurance" element={<Insurance />} />
              <Route path="/insurance/:type" element={<InsuranceType />} />
              <Route path="/shows" element={<Shows />} />
              <Route path="/shows/the-ramsey-show" element={<TheRamseyShow />} />
              <Route path="/dave-ramsey-7-baby-steps" element={<SevenBabySteps />} />
              <Route path="/trusted" element={<Trusted />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
