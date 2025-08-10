import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { KeyIcon, EyeIcon, EyeSlashIcon, ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

const PasswordReset: React.FC = () => {
  const { t } = useTranslation();
  const { resetPassword, validateResetToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if there's a reset token in the URL
    const params = new URLSearchParams(location.search);
    const resetToken = params.get('token');
    if (resetToken) {
      setToken(resetToken);
      // Validate the token
      const isValid = validateResetToken(resetToken);
      setTokenValid(isValid);
      if (!isValid) {
        setMessage({
          type: 'error',
          text: t('reset_token_expired') || 'This password reset link has expired or is invalid. Please request a new password reset.'
        });
      }
    } else {
      // No token in URL, redirect to forgot password page
      navigate('/forgot-password');
    }
  }, [location, navigate, validateResetToken, t]);


  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    if (newPassword !== confirmPassword) {
      setMessage({ type: 'error', text: t('passwords_dont_match') || 'Passwords do not match' });
      setIsLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setMessage({ type: 'error', text: t('password_too_short') || 'Password must be at least 6 characters' });
      setIsLoading(false);
      return;
    }

    if (!token) {
      setMessage({ type: 'error', text: t('invalid_reset_token') || 'Invalid reset token' });
      setIsLoading(false);
      return;
    }

    const success = resetPassword(token, newPassword);
    
    if (success) {
      setMessage({ 
        type: 'success', 
        text: t('password_reset_successful') || 'Password has been reset successfully. You can now login with your new password.' 
      });
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/admin');
      }, 3000);
    } else {
      setMessage({ 
        type: 'error', 
        text: t('reset_token_expired') || 'Reset token has expired or is invalid. Please request a new password reset.' 
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
            {t('reset_password') || 'Reset Password'}
          </h1>
          <p className="text-gray-700 mt-2">{t('company_name')} - {t('company_subtitle')}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Back to Login */}
          <button
            onClick={() => navigate('/admin')}
            className="flex items-center text-sage-green hover:text-wood-light transition-colors mb-6"
          >
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            {t('back_to_login') || 'Back to Login'}
          </button>

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

          {/* Token Validation Check */}
          {tokenValid === false ? (
            <div className="text-center py-8">
              <ExclamationTriangleIcon className="h-16 w-16 mx-auto text-red-500 mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {t('invalid_reset_link') || 'Invalid Reset Link'}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('reset_link_expired_message') || 'This password reset link has expired or is invalid. Reset links are only valid for 30 minutes.'}
              </p>
              <button
                onClick={() => navigate('/forgot-password')}
                className="bg-gradient-to-r from-sage-green to-wood-light text-gray-800 font-bold py-2 px-4 rounded-lg hover:from-wood-light hover:to-sage-green transition-all duration-300"
              >
                {t('request_new_reset') || 'Request New Reset Link'}
              </button>
            </div>
          ) : tokenValid === true ? (
            /* Reset Password Form */
            <form onSubmit={handlePasswordReset} className="space-y-6">
              <div>
                <p className="text-gray-600 mb-4">
                  {t('enter_new_password') || 'Enter your new password below.'}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('new_password') || 'New Password'}
                    </label>
                    <div className="relative">
                      <input
                        id="newPassword"
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green transition-colors pr-12"
                        placeholder={t('enter_new_password') || 'Enter new password'}
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

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('confirm_new_password') || 'Confirm New Password'}
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green transition-colors pr-12"
                        placeholder={t('confirm_new_password') || 'Confirm new password'}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="h-5 w-5" />
                        ) : (
                          <EyeIcon className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-sage-green to-wood-light text-gray-800 font-bold py-3 px-4 rounded-lg hover:from-wood-light hover:to-sage-green transition-all duration-300 disabled:opacity-50"
              >
                <KeyIcon className="w-5 h-5 inline mr-2" />
                {isLoading ? (t('resetting') || 'Resetting...') : (t('reset_password') || 'Reset Password')}
              </motion.button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage-green mx-auto"></div>
              <p className="text-gray-600 mt-2">{t('validating_token') || 'Validating reset token...'}</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default PasswordReset;