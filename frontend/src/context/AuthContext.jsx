import { createContext, useEffect, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // 🔑 MUST start true

  // Fetch currently logged-in user via cookie; treat any 200 as authenticated.
  const getUser = async () => {
    try {
      const res = await api.get("/users/me", { withCredentials: true });
      console.log(res.data)
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (e) {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      let response = await api.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      console.log(response);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const login = (data) => {
    setIsAuthenticated(true);
    setUser(data);
  };
  useEffect(() => {
    getUser(); // ALWAYS call on mount (cookie auth)
  }, []);

  const value = {
    user,
    isAuthenticated,
    loading,
    logout,
    login,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
