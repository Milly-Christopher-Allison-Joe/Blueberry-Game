// console.log("Token in localStorage at mount:", localStorage.getItem("token"));
import { createContext, useMemo, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );

  const user = useMemo(() => {
    if (!token) return null;
    try {
      return jwtDecode(token);
    } catch {
      return null;
    }
  }, [token]);

  // here be dragons
  // const user = useMemo(() => {
  //   if (!token) return null;
  //   try {
  //     const base64Url = token.split(".")[1];
  //     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  //     const jsonPayload = decodeURIComponent(
  //       atob(base64)
  //         .split("")
  //         .map(function (c) {
  //           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  //         })
  //         .join("")
  //     );
  //     return JSON.parse(jsonPayload);
  //   } catch {
  //     return null;
  //   }
  // }, [token]);

  // Saves token to local whenever it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const register = async (credentials) => {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
      throw Error(result.message);
    }
    setToken(result.token);
  };

  const login = async (credentials) => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const result = await response.json();
    if (!response.ok) {
      throw Error(result.message);
    }
    setToken(result.token);
  };

  const logout = () => setToken(null);

  // console.log("AuthContext token:", token);
  // console.log("AuthContext user:", user);

  const value = { token, user, register, login, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within AuthProvider");
  return context;
}
