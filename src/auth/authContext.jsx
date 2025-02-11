import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie"; // ✅ For handling cookies

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(Cookies.get("authToken") || ""); // ✅ Get token from cookies

    useEffect(() => {
      if (token) {
          const storedUser = Cookies.get("user");
          if (storedUser && storedUser !== "undefined") { // ✅ Check if storedUser is valid
              try {
                  setUser(JSON.parse(storedUser)); // ✅ Safely parse the JSON string
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
        Cookies.set("authToken", authToken,{expires:7}); // ✅ Store token in cookies (7 days expiry)
        Cookies.set("user", JSON.stringify(userData), { expires: 7 }); // ✅ Store user info in cookies
        setToken(authToken);
        setUser(userData);
    };

    const logout = () => {
        Cookies.remove("authToken"); // ✅ Clear token from cookies
        Cookies.remove("user");      // ✅ Clear user data from cookies
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
