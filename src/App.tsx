import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Agenda from "./pages/Agenda";
import Clientes from "./pages/Clientes";
import Pets from "./pages/Pets";
import Servicos from "./pages/Servicos";
import Produtos from "./pages/Produtos";
import Financeiro from "./pages/Financeiro";
import Relatorios from "./pages/Relatorios";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/pets" element={<Pets />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/financeiro" element={<Financeiro />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
