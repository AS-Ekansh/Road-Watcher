import { createContext, useContext, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

const login = async (email, password) => {
  try {
    const res = await axios.post("/auth/login", { email, password });

    if (!res.data?.data?.user) {
      throw new Error("Invalid login response");
    }

    setUser(res.data.data.user);
    return { success: true };
  } catch (err) {
    return { success: false, error: err.response?.data?.message || "Server error" };
  }
};


const register = async (form) => {
  try {
    const res = await axios.post("/auth/register", form);

    if (!res.data?.data?.user) {
      return { success: false, error: "Invalid server response" };
    }

    setUser(res.data.data.user);
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err.response?.data?.message || "Server error",
    };
  }
};



  const logout = async () => {
    await axios.post("/auth/logout", {}, { withCredentials: true });
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
