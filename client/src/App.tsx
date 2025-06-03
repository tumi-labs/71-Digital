import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import About from "@/pages/about";
import Services from "@/pages/services";
import MiningStore from "@/pages/mining-store";
import Contact from "@/pages/contact";
import BookAppointment from "@/pages/book-appointment";
import TermsOfConditions from "@/pages/terms-of-conditions";
import TermsOfUse from "@/pages/terms-of-use";
import PrivacyPolicy from "@/pages/privacy-policy";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/mining-store" component={MiningStore} />
      <Route path="/contact" component={Contact} />
      <Route path="/book-appointment" component={BookAppointment} />
      <Route path="/terms-of-conditions" component={TermsOfConditions} />
      <Route path="/terms-of-use" component={TermsOfUse} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
