"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getMe, Logout as apiLogout, refreshAccessToken, getAccessToken } from "@/config/api";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // On mount, try to restore session via refresh token
  useEffect(() => {
    async function restoreSession() {
      try {
        // If no access token in memory, try refreshing from cookie
        if (!getAccessToken()) {
          const token = await refreshAccessToken();
          if (!token) {
            setLoading(false);
            return;
          }
        }
        const userData = await getMe();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    restoreSession();
  }, []);

  const login = useCallback((userData) => {
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setUser(null);
    router.push("/");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
