import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { login as loginApi } from '../services/authApi';
import type { Professor } from '../services/authApi';

interface AuthContextValue {
  token: string | null;
  professor: Professor | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'sp_token';
const PROFESSOR_KEY = 'sp_professor';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [professor, setProfessor] = useState<Professor | null>(() => {
    const raw = sessionStorage.getItem(PROFESSOR_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    const result = await loginApi(email, password);
    setLoading(false);

    if (result.success && result.token && result.professor) {
      sessionStorage.setItem(TOKEN_KEY, result.token);
      sessionStorage.setItem(PROFESSOR_KEY, JSON.stringify(result.professor));
      setToken(result.token);
      setProfessor(result.professor);
      return true;
    }

    setError(result.message || 'Login failed');
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(PROFESSOR_KEY);
    setToken(null);
    setProfessor(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, professor, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const getStoredToken = (): string | null => sessionStorage.getItem(TOKEN_KEY);
