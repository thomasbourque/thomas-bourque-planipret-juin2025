
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
import PayoffTimePreview from "./pages/PayoffTimePreview";
import MortgageInsurancePreview from "./pages/MortgageInsurancePreview";
import RatiosPreview from "./pages/RatiosPreview";
import FixedVariablePreview from "./pages/FixedVariablePreview";
import LtvPreview from "./pages/LtvPreview";
import NotFound from "./pages/NotFound";
import RefinancingSecret from "./pages/RefinancingSecret";

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
          <Route path="/comparateur-scenarios" element={<ScenarioComparator />} />
          <Route path="/preview-rythme-paiement" element={<PaymentRhythmPreview />} />
          <Route path="/preview-mise-de-fonds" element={<DownPaymentPreview />} />
          <Route path="/preview-paiement-hypothecaire" element={<MortgagePaymentPreview />} />
          <Route path="/preview-capacite-emprunt" element={<BorrowingCapacityPreview />} />
          <Route path="/preview-ecart-taux" element={<SavingsPreview />} />
          <Route path="/preview-mise-fonds-minimale" element={<MinimumDownPaymentPreview />} />
          <Route path="/preview-temps-remboursement" element={<PayoffTimePreview />} />
          <Route path="/preview-assurance-hypothecaire" element={<MortgageInsurancePreview />} />
          <Route path="/preview-ratios" element={<RatiosPreview />} />
          <Route path="/preview-fixe-variable" element={<FixedVariablePreview />} />
          <Route path="/preview-rpv-evolutif" element={<LtvPreview />} />
          <Route path="/refinancement-secret" element={<RefinancingSecret />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
