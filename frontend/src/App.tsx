import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import Login from "./pages/Login.tsx";
import BoardDashboard from "./pages/BoardDashboard.tsx";
import DoctorLayout from "./pages/doctor/DoctorLayout.tsx";
import PatientQueue from "./pages/doctor/PatientQueue.tsx";
import PatientSummary from "./pages/doctor/PatientSummary.tsx";
import AISmartInsights from "./pages/doctor/AISmartInsights.tsx";
import ReceptionistDashboard from "./pages/ReceptionistDashboard.tsx";
import Outbreaks from "./pages/Outbreaks.tsx";
import Medicine from "./pages/Medicine.tsx";
import Reports from "./pages/Reports.tsx";
import NotFound from "./pages/NotFound.tsx";

import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./pages/Signup.tsx";
import Index from "./pages/Index.tsx";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
  <AuthProvider>
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/board" element={
            <ProtectedRoute allowedRoles={["board_of_directors"]}>
              <BoardDashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/doctor" element={
            <ProtectedRoute allowedRoles={["doctor"]}>
              <DoctorLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="queue" replace />} />
            <Route path="queue" element={<PatientQueue />} />
            <Route path="summary" element={<PatientSummary />} />
            <Route path="insights" element={<AISmartInsights />} />
          </Route>
          
          <Route path="/reception" element={
            <ProtectedRoute allowedRoles={["receptionist"]}>
              <ReceptionistDashboard />
            </ProtectedRoute>
          } />

          <Route path="/outbreaks" element={
            <ProtectedRoute allowedRoles={["board_of_directors", "doctor"]}>
              <Outbreaks />
            </ProtectedRoute>
          } />
          
          <Route path="/medicine" element={
            <ProtectedRoute allowedRoles={["board_of_directors", "doctor"]}>
              <Medicine />
            </ProtectedRoute>
          } />
          
          <Route path="/reports" element={
            <ProtectedRoute allowedRoles={["board_of_directors"]}>
              <Reports />
            </ProtectedRoute>
          } />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </AuthProvider>
  </ThemeProvider>
);

export default App;
