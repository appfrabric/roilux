import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

interface LoginProps {
  onLogin: (credentials: { username: string; password: string }) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const success = onLogin({ username, password });
    if (!success) {
      alert(t('invalid_credentials') || 'Invalid username or password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-green via-white to-wood-light flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-sage-green to-wood-light p-8 text-center">
          <img
            src="/assets/logo.jpg"
            alt="Tropical Wood Logo"
            className="h-16 w-16 rounded-full object-cover mx-auto mb-4 border-4 border-white"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
          <h1 className="text-2xl font-bold text-gray-800">{t('admin_login') || 'Admin Login'}</h1>
          <p className="text-gray-700 mt-2">{t('company_name')} - {t('company_subtitle')}</p>
        </div>

        {/* Login Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('username') || 'Username'}
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green transition-colors"
                placeholder={t('enter_username') || 'Enter username'}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('password') || 'Password'}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green transition-colors pr-12"
                  placeholder={t('enter_password') || 'Enter password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-sage-green to-wood-light text-gray-800 font-bold py-3 px-4 rounded-lg hover:from-wood-light hover:to-sage-green transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (t('logging_in') || 'Logging in...') : (t('login') || 'Login')}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <Link
              to="/reset-password"
              className="text-sage-green hover:text-wood-light transition-colors text-sm font-medium"
            >
              {t('forgot_password') || 'Forgot Password?'}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;