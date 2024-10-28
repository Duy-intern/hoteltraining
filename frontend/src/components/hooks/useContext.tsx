'use client'
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  loginToken: (token: string) => void; 
  logout: () => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const route = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      setToken(storedToken);
    }

  }, []);

  const loginToken = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };
  

  const logout = () => {
    setToken(null); 
    localStorage.removeItem('token'); 
    localStorage.removeItem('user'); 
    route.push('/')
  };
  window.addEventListener("beforeunload", () => {
    localStorage.removeItem("token");
  });
  

  return (
    <AuthContext.Provider value={{ token, setToken, logout, loginToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
