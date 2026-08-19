import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { login as loginApi } from '../services/authApi';
import type { Student } from '../services/authApi';

interface AuthContextValue {
  token: string | null;
  student: Student | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'sp_token';
const STUDENT_KEY = 'sp_student';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Switched from localStorage to sessionStorage
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem(TOKEN_KEY));
  const [student, setStudent] = useState<Student | null>(() => {
    const raw = sessionStorage.getItem(STUDENT_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    const result = await loginApi(email, password);
    setLoading(false);

    if (result.success && result.token && result.student) {
      // Switched from localStorage to sessionStorage
      sessionStorage.setItem(TOKEN_KEY, result.token);
      sessionStorage.setItem(STUDENT_KEY, JSON.stringify(result.student));
      setToken(result.token);
      setStudent(result.student);
      return true;
    }

    setError(result.message || 'Login failed');
    return false;
  }, []);

  const logout = useCallback(() => {
    // Switched from localStorage to sessionStorage
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(STUDENT_KEY);
    setToken(null);
    setStudent(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, student, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// Updated helper for services to pull from sessionStorage
export const getStoredToken = (): string | null => sessionStorage.getItem(TOKEN_KEY);
