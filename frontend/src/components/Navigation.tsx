import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navigation: React.FC = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isVisitOpen, setIsVisitOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const productCategories = [
    { name: 'Plywood', path: '/products/plywood' },
    { name: 'Prefinished Melamine', path: '/products/melamine' },
    { name: 'Prefinished Melamine Plywood', path: '/products/melamine-plywood' },
    { name: 'Wood Veneer', path: '/products/veneer' },
    { name: 'Raw Wood Logs', path: '/products/logs' },
  ];

  const visitOptions = [
    { name: 'Factory Pictures & Videos', path: '/visit' },
    { name: 'Schedule Virtual Tour', path: '/visit/virtual-tour' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-b from-sage-green to-white shadow-lg sticky top-0 z-50 wood-texture">
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

            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button
                className={`flex items-center px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                  location.pathname.startsWith('/products')
                    ? 'bg-forest-green text-white'
                    : 'text-forest-green hover:bg-light-green hover:text-forest-green'
                }`}
              >
                Our Products
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </button>

              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden"
                  >
                    {productCategories.map((category) => (
                      <Link
                        key={category.path}
                        to={category.path}
                        className="block px-4 py-3 text-forest-green hover:bg-light-green hover:text-forest-green transition-colors duration-200"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div
              className="relative"
              onMouseEnter={() => setIsVisitOpen(true)}
              onMouseLeave={() => setIsVisitOpen(false)}
            >
              <button
                className={`flex items-center px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                  location.pathname.startsWith('/visit')
                    ? 'bg-forest-green text-white'
                    : 'text-forest-green hover:bg-light-green hover:text-forest-green'
                }`}
              >
                Visit Our Company
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </button>

              <AnimatePresence>
                {isVisitOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden"
                  >
                    {visitOptions.map((option) => (
                      <Link
                        key={option.path}
                        to={option.path}
                        className="block px-4 py-3 text-forest-green hover:bg-light-green hover:text-forest-green transition-colors duration-200"
                      >
                        {option.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
                <div className="px-4 py-2">
                  <div className="text-lg font-bold text-forest-green mb-2">Our Products</div>
                  {productCategories.map((category) => (
                    <Link
                      key={category.path}
                      to={category.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block pl-4 py-1 text-forest-green hover:text-sage-green"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
                <div className="px-4 py-2">
                  <div className="text-lg font-bold text-forest-green mb-2">Visit Our Company</div>
                  {visitOptions.map((option) => (
                    <Link
                      key={option.path}
                      to={option.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block pl-4 py-1 text-forest-green hover:text-sage-green"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;