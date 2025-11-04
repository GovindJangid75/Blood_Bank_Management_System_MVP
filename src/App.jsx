import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import { DarkModeProvider } from './context/DarkModeContext';
import { useContext } from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import DonorDashboard from './components/Dashboard/DonorDashboard';
import HospitalDashboard from './components/Dashboard/HospitalDashboard';
import DonorRegistration from './components/Donor/DonorRegistration';
import DonorDirectory from './components/Donor/DonorDirectory';
import BloodRequestForm from './components/Requests/BloodRequestForm';
import RequestsTable from './components/Requests/RequestsTable';
import About from './components/Pages/About';
import WhoCanDonate from './components/Pages/WhoCanDonate';
import FAQs from './components/Pages/FAQs';
import Testimonials from './components/Pages/Testimonials';
import Events from './components/Pages/Events';
import Contact from './components/Pages/Contact';
import ForgotPassword from './components/Auth/ForgotPassword';
import NotFound from './components/NotFound';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

// Dashboard Router
const DashboardRouter = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  switch (user.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'donor':
      return <DonorDashboard />;
    case 'hospital':
      return <HospitalDashboard />;
    default:
      return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <DarkModeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              }
            />

            <Route
              path="/donor-registration"
              element={
                <ProtectedRoute allowedRoles={["donor"]}>
                  <DonorRegistration />
                </ProtectedRoute>
              }
            />

            {/* Public pages */}
            <Route path="/donors" element={<DonorDirectory />} />
            <Route path="/blood-request" element={<BloodRequestForm />} />
            <Route path="/requests/approved" element={<RequestsTable />} />
            <Route path="/about" element={<About />} />
            <Route path="/who-can-donate" element={<WhoCanDonate />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/events" element={<Events />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </DarkModeProvider>
  );
}

export default App;
