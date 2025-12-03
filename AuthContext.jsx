import { createContext, useContext, useState } from "react";
import * as authApi from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = async (email, password) => {
    const res = await authApi.login(email, password);

    // Save auth info
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res)); // includes role
    setUser(res);

    return res; // important so Login.jsx can redirect based on role
  };

  const register = async (data) => {
    const newUser = await authApi.register(data);
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role,
        login,
        register,
        logout,
        isAdmin: user?.role === "admin",
        isStaff: user?.role === "staff",
        isStudent: user?.role === "student",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
