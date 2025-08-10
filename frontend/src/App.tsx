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
                <AdminWrapper />
              </ProtectedRoute>
            } 
          />
          
          {/* Regular Routes with Navigation */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const AdminWrapper: React.FC = () => {
  const { logout } = useAuth();
  return <Admin onLogout={logout} />;
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