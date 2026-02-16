import React, { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../api";
import { MOCK_USER } from "../constants";
import { UserProfile } from "../types";

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isValidated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<UserProfile>) => void;
  setUser: (data: Partial<UserProfile>) => void;
  verifySession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "@PetLife:user";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Inicialização síncrona: o app sabe na hora se existe um rastro de usuário
  const [user, _setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const verifySession = async () => {
    if (!user || isValidated) return;

    setIsLoading(true);
    try {
      const validatedUser = await api.auth.validateSession(user.email);
      _setUser(validatedUser);
      setIsValidated(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validatedUser));
    } catch (error) {
      console.error("Sessão inválida no servidor:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const authUser = { ...MOCK_USER, email };
      _setUser(authUser);
      setIsValidated(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    _setUser(null);
    setIsValidated(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  const setUser = (data: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...data };
      _setUser(updated);
      setIsValidated(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  const updateUser = (data: Partial<UserProfile>) => {
    if (user) {
      const updated = { ...user, ...data };
      _setUser(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated: !!user,
        isValidated,
        isLoading,
        setUser,
        login,
        logout,
        updateUser,
        verifySession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
