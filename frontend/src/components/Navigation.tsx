import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-b from-wood-light via-wood-dark to-leaf-green shadow-lg sticky top-0 z-50 wood-texture">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <img
                src="/assets/logo.jpg"
                alt="Tropical Wood Logo"
                className="h-12 w-12 rounded-full object-cover border-2 border-forest-green"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="text-2xl font-bold text-forest-green">
                {t('company_name')}
                <span className="text-sm font-normal text-forest-green opacity-70 ml-2">
                  {t('company_subtitle')}
                </span>
              </div>
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
              {t('nav_home')}
            </Link>

            <Link
              to="/about"
              className={`px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                isActive('/about')
                  ? 'bg-forest-green text-white'
                  : 'text-forest-green hover:bg-light-green hover:text-forest-green'
              }`}
            >
              {t('nav_about')}
            </Link>

            <Link
              to="/products"
              className={`px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                location.pathname.startsWith('/products')
                  ? 'bg-forest-green text-white'
                  : 'text-forest-green hover:bg-light-green hover:text-forest-green'
              }`}
            >
              {t('nav_products')}
            </Link>

            <Link
              to="/visit"
              className={`px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                location.pathname.startsWith('/visit')
                  ? 'bg-forest-green text-white'
                  : 'text-forest-green hover:bg-light-green hover:text-forest-green'
              }`}
            >
              {t('nav_visit')}
            </Link>

            <Link
              to="/contact"
              className={`px-5 py-3 rounded-lg transition-all duration-300 text-lg font-bold ${
                isActive('/contact')
                  ? 'bg-forest-green text-white'
                  : 'text-forest-green hover:bg-light-green hover:text-forest-green'
              }`}
            >
              {t('nav_contact')}
            </Link>
            
            <LanguageSwitcher />
            
            <Link
              to="/admin"
              className="flex items-center space-x-2 px-3 py-2 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4" />
              <span>{t('login') || 'Login'}</span>
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
                  {t('nav_home')}
                </Link>
                <Link
                  to="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3 text-lg font-bold text-forest-green hover:bg-light-green hover:text-forest-green rounded-lg"
                >
                  {t('nav_about')}
                </Link>
                <Link
                  to="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3 text-lg font-bold text-forest-green hover:bg-light-green hover:text-forest-green rounded-lg"
                >
                  {t('nav_products')}
                </Link>
                <Link
                  to="/visit"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3 text-lg font-bold text-forest-green hover:bg-light-green hover:text-forest-green rounded-lg"
                >
                  {t('nav_visit')}
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-5 py-3 text-lg font-bold text-forest-green hover:bg-light-green hover:text-forest-green rounded-lg"
                >
                  {t('nav_contact')}
                </Link>
                <div className="px-5 py-3">
                  <LanguageSwitcher />
                </div>
                <Link
                  to="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 mx-5 px-3 py-2 text-xs bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span>{t('login') || 'Login'}</span>
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