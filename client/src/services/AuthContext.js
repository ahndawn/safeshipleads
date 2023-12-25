import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);
  }, []);

  const updateAuth = (newAuthStatus) => {
    setIsAuthenticated(newAuthStatus);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, updateAuth }}>
      {children}
    </AuthContext.Provider>
  );
};