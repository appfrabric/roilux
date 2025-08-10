import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { 
  UserPlusIcon, 
  KeyIcon, 
  TrashIcon, 
  EyeIcon, 
  EyeSlashIcon,
  ShieldCheckIcon,
  UserIcon,
  EnvelopeIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

const UserManagement: React.FC = () => {
  const { t } = useTranslation();
  const { user, users, registerUser, deleteUser, adminChangePassword } = useAuth();
  const [activeTab, setActiveTab] = useState<'users' | 'register' | 'changePassword'>('users');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  // Registration form state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'processor' as 'admin' | 'processor'
  });

  // Change password form state
  const [passwordForm, setPasswordForm] = useState({
    selectedUserId: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (registerForm.password !== registerForm.confirmPassword) {
      setMessage({ type: 'error', text: t('passwords_dont_match') || 'Passwords do not match' });
      return;
    }

    if (registerForm.password.length < 6) {
      setMessage({ type: 'error', text: t('password_too_short') || 'Password must be at least 6 characters' });
      return;
    }

    const success = registerUser({
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      role: registerForm.role
    });

    if (success) {
      setMessage({ type: 'success', text: t('user_registered_successfully') || 'User registered successfully' });
      setRegisterForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'processor'
      });
    } else {
      setMessage({ type: 'error', text: t('user_already_exists') || 'Username or email already exists' });
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!passwordForm.selectedUserId) {
      setMessage({ type: 'error', text: t('select_user') || 'Please select a user' });
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setMessage({ type: 'error', text: t('passwords_dont_match') || 'Passwords do not match' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setMessage({ type: 'error', text: t('password_too_short') || 'Password must be at least 6 characters' });
      return;
    }

    const success = adminChangePassword(passwordForm.selectedUserId, passwordForm.newPassword);

    if (success) {
      const selectedUser = users.find(u => u.id === passwordForm.selectedUserId);
      setMessage({ 
        type: 'success', 
        text: t('password_changed_successfully') || `Password changed successfully for ${selectedUser?.username}` 
      });
      setPasswordForm({
        selectedUserId: '',
        newPassword: '',
        confirmNewPassword: ''
      });
    } else {
      setMessage({ type: 'error', text: t('password_change_failed') || 'Failed to change password' });
    }
  };

  const handleDeleteUser = (userId: string) => {
    if (window.confirm(t('confirm_delete_user') || 'Are you sure you want to delete this user?')) {
      const success = deleteUser(userId);
      if (success) {
        setMessage({ type: 'success', text: t('user_deleted_successfully') || 'User deleted successfully' });
      } else {
        setMessage({ type: 'error', text: t('cannot_delete_user') || 'Cannot delete this user' });
      }
    }
  };

  const togglePasswordVisibility = (field: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-wood-light to-sage-green rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{t('user_management') || 'User Management'}</h1>
        <p className="text-gray-700">{t('manage_system_users') || 'Manage system users and account settings'}</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex-1 py-3 px-4 rounded-md font-semibold transition-colors ${
            activeTab === 'users'
              ? 'bg-white text-sage-green shadow-md'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <UserIcon className="w-5 h-5 inline mr-2" />
          {t('all_users') || 'All Users'}
        </button>
        {user?.role === 'admin' && (
          <>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-3 px-4 rounded-md font-semibold transition-colors ${
                activeTab === 'register'
                  ? 'bg-white text-sage-green shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <UserPlusIcon className="w-5 h-5 inline mr-2" />
              {t('register_user') || 'Register User'}
            </button>
            <button
              onClick={() => setActiveTab('changePassword')}
              className={`flex-1 py-3 px-4 rounded-md font-semibold transition-colors ${
                activeTab === 'changePassword'
                  ? 'bg-white text-sage-green shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <KeyIcon className="w-5 h-5 inline mr-2" />
              {t('change_password') || 'Change Password'}
            </button>
          </>
        )}
      </div>

      {/* Message Display */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {message.text}
        </motion.div>
      )}

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {activeTab === 'users' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('system_users') || 'System Users'}</h2>
            <div className="space-y-4">
              {users.map((userData) => (
                <motion.div
                  key={userData.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      userData.role === 'admin' ? 'bg-sage-green' : 'bg-blue-500'
                    }`}>
                      {userData.role === 'admin' ? (
                        <ShieldCheckIcon className="w-6 h-6 text-white" />
                      ) : (
                        <UserIcon className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{userData.username}</h3>
                        <span className={`px-2 py-1 text-white text-xs rounded-full ${
                          userData.role === 'admin' ? 'bg-sage-green' : 'bg-blue-500'
                        }`}>
                          {userData.role === 'admin' ? (t('admin') || 'Admin') : (t('processor') || 'Processor')}
                        </span>
                        {userData.id === user?.id && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {t('you') || 'You'}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 space-x-4">
                        <span className="flex items-center">
                          <EnvelopeIcon className="w-4 h-4 mr-1" />
                          {userData.email}
                        </span>
                        <span className="flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-1" />
                          {t('created') || 'Created'}: {formatDate(userData.createdAt)}
                        </span>
                        {userData.lastLogin && (
                          <span className="text-green-600">
                            {t('last_login') || 'Last login'}: {formatDate(userData.lastLogin)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {user?.role === 'admin' && userData.id !== '1' && userData.id !== user.id && (
                    <button
                      onClick={() => handleDeleteUser(userData.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title={t('delete_user') || 'Delete User'}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'register' && user?.role === 'admin' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('register_new_user') || 'Register New User'}</h2>
            <form onSubmit={handleRegister} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('username') || 'Username'}
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, username: e.target.value }))}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green"
                    placeholder={t('enter_username') || 'Enter username'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('email') || 'Email'}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green"
                    placeholder={t('enter_email') || 'Enter email'}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('password') || 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPasswords.password ? 'text' : 'password'}
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green pr-12"
                      placeholder={t('enter_password') || 'Enter password'}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('password')}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPasswords.password ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('confirm_password') || 'Confirm Password'}
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showPasswords.confirmPassword ? 'text' : 'password'}
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      minLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green pr-12"
                      placeholder={t('confirm_password') || 'Confirm password'}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {showPasswords.confirmPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('user_role') || 'User Role'}
                </label>
                <select
                  id="role"
                  value={registerForm.role}
                  onChange={(e) => setRegisterForm(prev => ({ ...prev, role: e.target.value as 'admin' | 'processor' }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green"
                >
                  <option value="processor">{t('processor') || 'Processor'}</option>
                  <option value="admin">{t('admin') || 'Admin'}</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  {registerForm.role === 'admin' 
                    ? (t('admin_description') || 'Can register users and manage system') 
                    : (t('processor_description') || 'Can view and process requests')
                  }
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sage-green to-wood-light text-gray-800 font-bold py-3 px-4 rounded-lg hover:from-wood-light hover:to-sage-green transition-all duration-300"
              >
                <UserPlusIcon className="w-5 h-5 inline mr-2" />
                {t('register_user') || 'Register User'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'changePassword' && user?.role === 'admin' && (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('change_user_password') || 'Change User Password'}</h2>
            <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
              <div>
                <label htmlFor="selectedUser" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('select_user') || 'Select User'}
                </label>
                <select
                  id="selectedUser"
                  value={passwordForm.selectedUserId}
                  onChange={(e) => setPasswordForm(prev => ({ ...prev, selectedUserId: e.target.value }))}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green"
                >
                  <option value="">{t('choose_user') || 'Choose a user...'}</option>
                  {users.map((userData) => (
                    <option key={userData.id} value={userData.id}>
                      {userData.username} ({userData.role === 'admin' ? t('admin') || 'Admin' : t('processor') || 'Processor'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('new_password') || 'New Password'}
                </label>
                <div className="relative">
                  <input
                    id="newPassword"
                    type={showPasswords.newPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green pr-12"
                    placeholder={t('enter_new_password') || 'Enter new password'}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('newPassword')}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPasswords.newPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirmNewPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('confirm_new_password') || 'Confirm New Password'}
                </label>
                <div className="relative">
                  <input
                    id="confirmNewPassword"
                    type={showPasswords.confirmNewPassword ? 'text' : 'password'}
                    value={passwordForm.confirmNewPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmNewPassword: e.target.value }))}
                    required
                    minLength={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-green focus:border-sage-green pr-12"
                    placeholder={t('confirm_new_password') || 'Confirm new password'}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirmNewPassword')}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPasswords.confirmNewPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sage-green to-wood-light text-gray-800 font-bold py-3 px-4 rounded-lg hover:from-wood-light hover:to-sage-green transition-all duration-300"
              >
                <KeyIcon className="w-5 h-5 inline mr-2" />
                {t('change_password') || 'Change Password'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;