
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Lenders from "./pages/Lenders";
import FAQ from "./pages/FAQ";
import Calculatrices from "./pages/Calculatrices";
import ScenarioComparator from "./pages/ScenarioComparator";
import PaymentRhythmPreview from "./pages/PaymentRhythmPreview";
import DownPaymentPreview from "./pages/DownPaymentPreview";
import MortgagePaymentPreview from "./pages/MortgagePaymentPreview";
import BorrowingCapacityPreview from "./pages/BorrowingCapacityPreview";
import SavingsPreview from "./pages/SavingsPreview";
import MinimumDownPaymentPreview from "./pages/MinimumDownPaymentPreview";
import MortgageInsurancePreview from "./pages/MortgageInsurancePreview";
import RatioPreview from "./pages/RatioPreview";
import FixedVariablePreview from "./pages/FixedVariablePreview";
import LtvPreview from "./pages/LtvPreview";
import PayoffTimePreview from "./pages/PayoffTimePreview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/preteurs" element={<Lenders />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/calculatrices" element={<Calculatrices />} />
          <Route path="/calculatrice-paiement" element={<MortgagePaymentPreview />} />
          <Route path="/calculatrice-capacite" element={<BorrowingCapacityPreview />} />
          <Route path="/calculatrice-ecart-taux" element={<SavingsPreview />} />
          <Route path="/calculatrice-rythme-paiement" element={<PaymentRhythmPreview />} />
          <Route path="/calculatrice-mise-fonds-minimale" element={<MinimumDownPaymentPreview />} />
          <Route path="/calculatrice-investir-mise-fonds" element={<DownPaymentPreview />} />
          <Route path="/calculatrice-temps-remboursement" element={<PayoffTimePreview />} />
          <Route path="/calculatrice-assurance" element={<MortgageInsurancePreview />} />
          <Route path="/calculatrice-ratios" element={<RatioPreview />} />
          <Route path="/calculatrice-fixe-variable" element={<FixedVariablePreview />} />
          <Route path="/calculatrice-rpv" element={<LtvPreview />} />
          <Route path="/comparateur-scenarios" element={<ScenarioComparator />} />
          <Route path="/preview-rythme-paiement" element={<PaymentRhythmPreview />} />
          <Route path="/preview-mise-de-fonds" element={<DownPaymentPreview />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
