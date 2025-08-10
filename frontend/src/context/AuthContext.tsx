import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  username: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
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
    const storedUser = localStorage.getItem('adminUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (credentials: { username: string; password: string }) => {
    // Simple authentication (in production, this would call an API)
    if (credentials.username === 'admin' && credentials.password === 'roilux2024') {
      const newUser: User = {
        username: credentials.username,
        isAdmin: true,
      };
      setUser(newUser);
      localStorage.setItem('adminUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
  };

  const isAuthenticated = user !== null;

  const value: AuthContextType = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};