import { createContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  handleLoginSuccess: () => void;
  handleLogout: () => void;
  token?: string | null;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  handleLoginSuccess: () => {},
  handleLogout: () => {},
  token: null,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  const handleLoginSuccess = (authToken?: string | null) => {
    setIsAuthenticated(true);
    if (authToken) {
      setToken(authToken);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
  };

  const value = useMemo(
    () => ({ isAuthenticated, handleLoginSuccess, handleLogout, token }),
    [isAuthenticated, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
