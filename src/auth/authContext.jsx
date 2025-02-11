import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(Cookies.get("authToken") || ""); 

    useEffect(() => {
      if (token) {
          const storedUser = Cookies.get("user");
          if (storedUser && storedUser !== "undefined") { 
              try {
                  setUser(JSON.parse(storedUser)); 
              } catch (error) {
                  console.error("Failed to parse user data:", error);
                  // Clear invalid user data from cookies
                  Cookies.remove("user");
                  setUser(null);
              }
          }
      }
  }, [token]);

    const login = (authToken, userData) => {
        Cookies.set("authToken", authToken,{expires:7}); 
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
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
