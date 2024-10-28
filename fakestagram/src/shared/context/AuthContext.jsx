import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const { login: authLogin, register: authRegister } = AuthService();

  const register = async (username, email, password) => {
    try {
      const response = await authRegister(username, email, password);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authLogin(email, password);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      toast.error(JSON.parse(error.request.response).message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
