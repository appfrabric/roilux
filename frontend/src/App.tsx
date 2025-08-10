import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import ProductCategory from './pages/ProductCategory';
import VisitCompany from './pages/VisitCompany';
import VirtualTour from './pages/VirtualTour';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import ProcessorDashboard from './pages/ProcessorDashboard';
import ForgotPassword from './pages/ForgotPassword';
import PasswordReset from './pages/PasswordReset';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Route - Full Screen */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <DashboardWrapper />
              </ProtectedRoute>
            } 
          />
          
          {/* Password Reset Routes - Full Screen */}
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          
          {/* Regular Routes with Navigation */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const DashboardWrapper: React.FC = () => {
  const { user, logout } = useAuth();
  
  // Handle legacy data or missing role
  if (!user?.role) {
    // If user exists but has no role, treat as admin if they were previously admin
    if (user && (user as any).isAdmin === true) {
      return <Admin onLogout={logout} />;
    }
    // Default to processor dashboard for non-admin legacy users
    if (user) {
      return <ProcessorDashboard onLogout={logout} />;
    }
  }
  
  if (user?.role === 'admin') {
    return <Admin onLogout={logout} />;
  } else if (user?.role === 'processor') {
    return <ProcessorDashboard onLogout={logout} />;
  }
  
  return <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-800">Loading...</h2>
    </div>
  </div>;
};

const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-sand to-cream">
      <Navigation />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/visit" element={<VisitCompany />} />
          <Route path="/visit/virtual-tour" element={<VirtualTour />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.main>
    </div>
  );
};

export default App;