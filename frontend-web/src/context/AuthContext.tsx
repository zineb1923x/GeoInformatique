import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../utils/api';
import { UserRole, hasPermission } from '../utils/roles';

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
  isAdmin: boolean;
  isModerator: boolean;
  isUser: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const TOKEN_KEY = 'sadaka_web_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    api
      .get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setUser(res.data as AuthUser))
      .catch(() => setUser(null));
  }, [token]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    setToken(res.data.token);
    // Récupérer immédiatement les infos utilisateur après connexion
    try {
      const userRes = await api.get('/auth/me', { headers: { Authorization: `Bearer ${res.data.token}` } });
      setUser(userRes.data as AuthUser);
    } catch (e) {
      // Si erreur, l'useEffect le gérera
    }
  }, []);

  const register = useCallback(
    async (payload: { firstName: string; lastName: string; phone: string; email: string; password: string }) => {
      const res = await api.post('/auth/register', payload);
      setToken(res.data.token);
    },
    []
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!user && !!token,
      hasPermission: (permission: string) => user ? hasPermission(user.role, permission) : false,
      isAdmin: user?.role === UserRole.ADMIN,
      isModerator: user?.role === UserRole.MODERATOR,
      isUser: user?.role === UserRole.USER,
      login,
      register,
      logout
    }),
    [user, token, login, register, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


