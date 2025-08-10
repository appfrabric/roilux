import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  lastLogin?: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (credentials: { username: string; password: string }) => boolean;
  logout: () => void;
  changePassword: (oldPassword: string, newPassword: string) => boolean;
  registerUser: (userData: { username: string; email: string; password: string; isAdmin: boolean }) => boolean;
  deleteUser: (userId: string) => boolean;
  sendPasswordReset: (email: string) => boolean;
  resetPassword: (token: string, newPassword: string) => boolean;
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
  // Initialize with default admin user and sample users
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('systemUsers');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    
    const defaultUsers: User[] = [
      {
        id: '1',
        username: 'admin',
        email: 'roilux.woods@gmail.com',
        isAdmin: true,
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        username: 'arthur',
        email: 'arthur@roilux.com',
        isAdmin: false,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      }
    ];
    
    localStorage.setItem('systemUsers', JSON.stringify(defaultUsers));
    return defaultUsers;
  });

  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Store passwords separately (in production, these would be hashed)
  const [passwords] = useState(() => {
    const storedPasswords = localStorage.getItem('userPasswords');
    if (storedPasswords) {
      return JSON.parse(storedPasswords);
    }
    
    const defaultPasswords = {
      '1': 'roilux2024',  // admin
      '2': 'arthur123'    // arthur
    };
    
    localStorage.setItem('userPasswords', JSON.stringify(defaultPasswords));
    return defaultPasswords;
  });

  const updatePasswords = (newPasswords: Record<string, string>) => {
    localStorage.setItem('userPasswords', JSON.stringify(newPasswords));
  };

  const updateUsers = (newUsers: User[]) => {
    setUsers(newUsers);
    localStorage.setItem('systemUsers', JSON.stringify(newUsers));
  };

  const login = (credentials: { username: string; password: string }) => {
    const foundUser = users.find(u => u.username === credentials.username);
    if (foundUser && passwords[foundUser.id] === credentials.password) {
      const userWithLastLogin = {
        ...foundUser,
        lastLogin: new Date().toISOString()
      };
      
      setUser(userWithLastLogin);
      localStorage.setItem('currentUser', JSON.stringify(userWithLastLogin));
      
      // Update user's last login in users array
      const updatedUsers = users.map(u => 
        u.id === foundUser.id ? userWithLastLogin : u
      );
      updateUsers(updatedUsers);
      
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const changePassword = (oldPassword: string, newPassword: string) => {
    if (!user || passwords[user.id] !== oldPassword) {
      return false;
    }
    
    const newPasswords = { ...passwords, [user.id]: newPassword };
    updatePasswords(newPasswords);
    return true;
  };

  const registerUser = (userData: { username: string; email: string; password: string; isAdmin: boolean }) => {
    // Check if user already exists
    if (users.some(u => u.username === userData.username || u.email === userData.email)) {
      return false;
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      username: userData.username,
      email: userData.email,
      isAdmin: userData.isAdmin,
      createdAt: new Date().toISOString(),
    };
    
    const newUsers = [...users, newUser];
    const newPasswords = { ...passwords, [newUser.id]: userData.password };
    
    updateUsers(newUsers);
    updatePasswords(newPasswords);
    
    return true;
  };

  const deleteUser = (userId: string) => {
    if (userId === '1') return false; // Can't delete main admin
    if (user?.id === userId) return false; // Can't delete self
    
    const newUsers = users.filter(u => u.id !== userId);
    const newPasswords = { ...passwords };
    delete newPasswords[userId];
    
    updateUsers(newUsers);
    updatePasswords(newPasswords);
    
    return true;
  };

  const sendPasswordReset = (email: string) => {
    const foundUser = users.find(u => u.email === email);
    if (!foundUser) return false;
    
    // In production, this would send an actual email
    // For demo, we'll just store a reset token
    const resetToken = Math.random().toString(36).substr(2, 9);
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    resetTokens[resetToken] = {
      userId: foundUser.id,
      email: foundUser.email,
      expires: Date.now() + 3600000 // 1 hour
    };
    localStorage.setItem('resetTokens', JSON.stringify(resetTokens));
    
    // For demo purposes, show the reset link in console
    console.log(`Password reset link: ${window.location.origin}/reset-password?token=${resetToken}`);
    alert(`Demo: Password reset email sent to ${email}\nReset token: ${resetToken}\n(Check console for reset link)`);
    
    return true;
  };

  const resetPassword = (token: string, newPassword: string) => {
    const resetTokens = JSON.parse(localStorage.getItem('resetTokens') || '{}');
    const tokenData = resetTokens[token];
    
    if (!tokenData || tokenData.expires < Date.now()) {
      return false;
    }
    
    const newPasswords = { ...passwords, [tokenData.userId]: newPassword };
    updatePasswords(newPasswords);
    
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
    registerUser,
    deleteUser,
    sendPasswordReset,
    resetPassword,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};