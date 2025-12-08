import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Admin from "./pages/admin/Admin";
import Doctor from "./pages/doctor/Doctor";
import Receptionist from "./pages/receptionist/Receptionist";
import DoctorAppointments from "./pages/doctor/appointment/Appointments";
import ReceptionistAppointments from "./pages/receptionist/appointment/Appointments";
import Signup from "./pages/auth/Signup";
import ForgotPasswordForm from "./pages/auth/ForgotPasswordForm";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ProtectedRoute from "./components/ProtectedRoute";

// Doctor Prescription Pages
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import BillingDashboard from "./pages/receptionist/billing/BillingDashboard";
import PaymentResult from "./pages/receptionist/billing/PaymentResult";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/:role" element={<Signup />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Admin />
            </ProtectedRoute>
          }
        />

        {/* Doctor Routes */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute requiredRole="DOCTOR">
              <Doctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute requiredRole="DOCTOR">
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />

        {/* Receptionist Routes */}
        <Route
          path="/receptionist"
          element={
            <ProtectedRoute requiredRole="RECEPTIONIST">
              <Receptionist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionist/appointments"
          element={
            <ProtectedRoute requiredRole="RECEPTIONIST">
              <ReceptionistAppointments />
            </ProtectedRoute>
          }
        />

        {/* Receptionist Prescription Routes */}

        {/* Receptionist Billing Routes */}
        <Route
          path="/receptionist/billing"
          element={
            <ProtectedRoute requiredRole="RECEPTIONIST">
              <BillingDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/receptionist/billing/payment-result"
          element={
            <ProtectedRoute requiredRole="RECEPTIONIST">
              <PaymentResult />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
