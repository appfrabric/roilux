import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'admin' | 'processor';

interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (credentials: { username: string; password: string }) => Promise<boolean>;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
  adminChangePassword: (username: string, newPassword: string) => Promise<boolean>;
  registerUser: (userData: { username: string; email: string; password: string; role: UserRole }) => Promise<boolean>;
  deleteUser: (userId: string) => Promise<boolean>;
  sendPasswordReset: (email: string) => boolean;
  resetPassword: (token: string, newPassword: string) => boolean;
  validateResetToken: (token: string) => boolean;
  isAuthenticated: boolean;
  loadUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      // Migrate old user format to new format
      if ('isAdmin' in parsedUser && !('role' in parsedUser)) {
        // Clear old session - force re-login with new system
        localStorage.removeItem('currentUser');
        localStorage.removeItem('systemUsers');
        localStorage.removeItem('userPasswords');
        return null;
      }
      return parsedUser;
    }
    return null;
  });

  const [users, setUsers] = useState<User[]>([]);

  // Load users from backend API
  const loadUsers = async () => {
    try {
      const response = await fetch('/api/auth/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users);
      }
    } catch (error) {
      console.error('Failed to load users:', error);
    }
  };

  // Load users when component mounts
  useEffect(() => {
    loadUsers();
  }, []);

  const login = async (credentials: { username: string; password: string }) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
          localStorage.setItem('currentUser', JSON.stringify(data.user));
          await loadUsers(); // Refresh users list
          return true;
        }
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    // Redirect to home page
    window.location.href = '/';
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    // For regular users, we don't have current password validation in backend yet
    // This would need to be implemented if needed
    console.warn('Regular user password change not implemented with current password validation');
    return false;
  };

  const adminChangePassword = async (username: string, newPassword: string) => {
    // Only admins can use this function
    if (!user || user.role !== 'admin') {
      return false;
    }

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          new_password: newPassword
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data.success;
      }
    } catch (error) {
      console.error('Password change failed:', error);
    }
    return false;
  };

  const registerUser = async (userData: { username: string; email: string; password: string; role: UserRole }) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          await loadUsers(); // Refresh users list
          return true;
        }
      }
    } catch (error) {
      console.error('User registration failed:', error);
    }
    return false;
  };

  const deleteUser = async (userId: string) => {
    // This endpoint doesn't exist in backend yet, would need to be implemented
    console.warn('User deletion endpoint not implemented in backend');
    return false;
  };

  // Keep password reset functionality as localStorage-based for now
  // In production, this would integrate with email service
  const sendPasswordReset = (email: string) => {
    // For demo, we'll just store a reset token
    const resetToken = Math.random().toString(36).substr(2, 9);
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    resetTokens[resetToken] = {
      email: email,
      expires: Date.now() + 1800000 // 30 minutes (30 * 60 * 1000)
    };
    localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
    
    // For demo purposes, show the reset link in console
    console.log(`Password reset link: ${window.location.origin}/reset-password?token=${resetToken}`);
    
    return true;
  };

  const validateResetToken = (token: string) => {
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    const tokenData = resetTokens[token];
    
    // Check if token exists and hasn't expired
    return tokenData && tokenData.expires > Date.now();
  };

  const resetPassword = (token: string, newPassword: string) => {
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    const tokenData = resetTokens[token];
    
    if (!tokenData || tokenData.expires < Date.now()) {
      return false;
    }
    
    // In production, this would call backend API to reset password
    console.warn('Password reset integration with backend not fully implemented');
    
    // Remove used token
    delete resetTokens[token];
    localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
    
    return true;
  };

  const isAuthenticated = user !== null;

  const value: AuthContextType = {
    user,
    users,
    login,
    logout,
    changePassword,
    adminChangePassword,
    registerUser,
    deleteUser,
    sendPasswordReset,
    resetPassword,
    validateResetToken,
    isAuthenticated,
    loadUsers,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};