import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  userId: number | null;
  isAuthenticated: boolean;
  login: (userId: number) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<number | null>(1); // tymczasowo
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = (id: number) => {
    setUserId(id);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ userId, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};