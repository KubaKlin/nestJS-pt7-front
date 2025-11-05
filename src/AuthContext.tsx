import { createContext, useMemo, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  handleLoginSuccess: () => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const value = useMemo(
    () => ({ isAuthenticated, handleLoginSuccess, handleLogout }),
    [isAuthenticated],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
