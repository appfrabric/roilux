import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { EnvelopeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();
  const { sendPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    const success = sendPasswordReset(email);
    
    if (success) {
      setMessage({ 
        type: 'success', 
        text: t('password_reset_sent') || 'A password reset link has been sent to your email address. Please check your email and follow the instructions. The link will expire in 30 minutes.' 
      });
      setIsSubmitted(true);
    } else {
      setMessage({ 
        type: 'error', 
        text: t('email_not_found') || 'Email address not found in our system.' 
      });
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
          <h1 className="text-2xl font-bold text-gray-800">
            {t('forgot_password') || 'Forgot Password'}
          </h1>
          <p className="text-gray-700 mt-2">{t('company_name')} - {t('company_subtitle')}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Back to Login */}
          <Link
            to="/admin"
            className="flex items-center text-sage-green hover:text-wood-light transition-colors mb-6"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            {t('back_to_login') || 'Back to Login'}
          </Link>

          {/* Message Display */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg mb-6 ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </motion.div>
          )}

          {/* Password Reset Request Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <p className="text-gray-600 mb-4">
                {t('password_reset_instructions') || 'Enter your email address below and we\'ll send you a link to reset your password.'}
              </p>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                {t('email_address') || 'Email Address'}
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitted}
                  className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green transition-colors ${
                    isSubmitted ? 'bg-gray-100 cursor-not-allowed' : ''
                  }`}
                  placeholder={t('enter_your_email') || 'Enter your email address'}
                />
                <EnvelopeIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: isSubmitted ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitted ? 1 : 0.98 }}
              type="submit"
              disabled={isLoading || isSubmitted}
              className={`w-full bg-gradient-to-r from-sage-green to-wood-light text-gray-800 font-bold py-3 px-4 rounded-lg hover:from-wood-light hover:to-sage-green transition-all duration-300 ${
                (isLoading || isSubmitted) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <EnvelopeIcon className="w-5 h-5 inline mr-2" />
              {isLoading ? (t('sending') || 'Sending...') : (t('send_reset_link') || 'Send Reset Link')}
            </motion.button>
          </form>

          {/* Show sign-in link after successful submission */}
          {isSubmitted ? (
            <div className="mt-6 text-center">
              <Link
                to="/admin"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-sage-green to-wood-light text-gray-800 font-semibold rounded-lg hover:from-wood-light hover:to-sage-green transition-all duration-300"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                {t('back_to_sign_in') || 'Back to Sign In'}
              </Link>
            </div>
          ) : (
            <div className="mt-6 text-center">
              <Link
                to="/admin"
                className="text-sage-green hover:text-wood-light transition-colors text-sm"
              >
                {t('remember_password') || 'Remember your password? Sign in'}
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;