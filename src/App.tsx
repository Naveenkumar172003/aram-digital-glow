import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import Branches from "./pages/Branches";
import BranchDetail from "./pages/BranchDetail";
import Services from "./pages/Services";
import MachineService from "./pages/MachineService";
import MachineSales from "./pages/MachineSales";
import LaptopService from "./pages/LaptopService";
import LaptopSales from "./pages/LaptopSales";
import Contact from "./pages/Contact";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import AdminLogin from "./pages/AdminLogin";
import AdminContact from "./pages/AdminContact";
import { Navigate } from "react-router-dom";
import MigrateData from "./pages/MigrateData";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/branches/:slug" element={<BranchDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/machine-service" element={<MachineService />} />
            <Route path="/machine-sales" element={<MachineSales />} />
            <Route path="/laptop-service" element={<LaptopService />} />
            <Route path="/laptop-sales" element={<LaptopSales />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/panel" 
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/contact" 
            element={
              <ProtectedRoute>
                <AdminContact />
              </ProtectedRoute>
            } 
          />
          <Route path="/admin/migrate" element={<MigrateData />} />
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
