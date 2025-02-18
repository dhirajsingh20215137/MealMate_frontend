import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("authToken") || "");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = Cookies.get("authToken");
    const storedUser = Cookies.get("user");

    if (storedToken) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        Cookies.remove("user");
        Cookies.remove("authToken");
        setToken("");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (authToken, userData) => {
    Cookies.set("authToken", authToken, { expires: 7 });
    Cookies.set("user", JSON.stringify(userData), { expires: 7 });
    setToken(authToken);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("authToken");
    Cookies.remove("user");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
