import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Pages
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
import Shows from "@/pages/Shows";
import TheRamseyShow from "@/pages/TheRamseyShow";
import SevenBabySteps from "@/pages/SevenBabySteps";
import Trusted from "@/pages/Trusted";

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/debt/debt-101" component={Debt101} />
        <Route path="/real-estate/residential-real-estate" component={RealEstate} />
        <Route path="/money/everydollar" component={EveryDollar} />
        <Route path="/taxes" component={Taxes} />
        <Route path="/retirement/smartvestor" component={SmartVestor} />
        <Route path="/insurance" component={Insurance} />
        <Route path="/shows" component={Shows} />
        <Route path="/shows/the-ramsey-show" component={TheRamseyShow} />
        <Route path="/dave-ramsey-7-baby-steps" component={SevenBabySteps} />
        <Route path="/trusted" component={Trusted} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
