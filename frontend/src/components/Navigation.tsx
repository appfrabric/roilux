import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-b from-wood-light via-wood-dark to-leaf-green shadow-lg sticky top-0 z-50 wood-texture">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold text-forest-green"
            >
              Tropical Wood
              <span className="text-sm font-normal text-forest-green opacity-70 ml-2">
                a division of Roilux
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                isActive('/') 
                  ? 'bg-forest-green text-white' 
                  : 'text-forest-green hover:bg-light-green hover:text-forest-green'
              }`}
            >
              Home
            </Link>

            <Link
              to="/about"
              className={`px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                isActive('/about')
                  ? 'bg-forest-green text-white'
                  : 'text-forest-green hover:bg-light-green hover:text-forest-green'
              }`}
            >
              About Us
            </Link>

            <Link
              to="/products"
              className={`px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                location.pathname.startsWith('/products')
                  ? 'bg-forest-green text-white'
                  : 'text-forest-green hover:bg-light-green hover:text-forest-green'
              }`}
            >
              Our Products
            </Link>

            <Link
              to="/visit"
              className={`px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                location.pathname.startsWith('/visit')
                  ? 'bg-forest-green text-white'
                  : 'text-forest-green hover:bg-light-green hover:text-forest-green'
              }`}
            >
              Visit Our Company
            </Link>

            <Link
              to="/contact"
              className={`px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                isActive('/contact')
                  ? 'bg-forest-green text-white'
                  : 'text-forest-green hover:bg-light-green hover:text-forest-green'
              }`}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-forest-green"
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                <Link
                  to="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3 text-lg font-bold text-forest-green hover:bg-light-green hover:text-forest-green rounded-lg"
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3 text-lg font-bold text-forest-green hover:bg-light-green hover:text-forest-green rounded-lg"
                >
                  About Us
                </Link>
                <Link
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3 text-lg font-bold text-forest-green hover:bg-light-green hover:text-forest-green rounded-lg"
                >
                  Our Products
                </Link>
                <Link
                  to="/visit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3 text-lg font-bold text-forest-green hover:bg-light-green hover:text-forest-green rounded-lg"
                >
                  Visit Our Company
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3 text-lg font-bold text-forest-green hover:bg-light-green hover:text-forest-green rounded-lg"
                >
                  Contact Us
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;