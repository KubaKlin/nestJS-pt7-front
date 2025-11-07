import { createContext, useMemo, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_STATE_KEY = 'is_authenticated';

interface AuthContextType {
  isAuthenticated: boolean;
  handleLoginSuccess: (authToken?: string | null) => void;
  handleLogout: () => void;
  token: string | null;
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

const getStoredToken = (): string | null => {
  try {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  } catch {
    return null;
  }
};

const getStoredAuthState = (): boolean => {
  try {
    return localStorage.getItem(AUTH_STATE_KEY) === 'true';
  } catch {
    return false;
  }
};

const setStoredToken = (token: string): void => {
  try {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
  } catch {
    console.error('Failed to store authentication token');
  }
};

const setStoredAuthState = (isAuthenticated: boolean): void => {
  try {
    localStorage.setItem(AUTH_STATE_KEY, String(isAuthenticated));
  } catch {
    console.error('Failed to store authentication state');
  }
};

const removeStoredToken = (): void => {
  try {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_STATE_KEY);
  } catch {
    console.error('Failed to remove authentication token');
  }
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = getStoredToken();
    const storedAuthState = getStoredAuthState();

    if (storedAuthState) {
      setIsAuthenticated(true);
    }

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLoginSuccess = (authToken?: string | null) => {
    setIsAuthenticated(true);
    setStoredAuthState(true);

    if (authToken) {
      setToken(authToken);
      setStoredToken(authToken);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setToken(null);
    removeStoredToken();
  };

  const value = useMemo(
    () => ({ isAuthenticated, handleLoginSuccess, handleLogout, token }),
    [isAuthenticated, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
