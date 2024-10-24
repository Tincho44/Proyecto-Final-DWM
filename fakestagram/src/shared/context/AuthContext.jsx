import React, { createContext, useState, useEffect } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [endMessage, setEndMessage] = useState(null);
  const [endType, setEndType] = useState(null);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const { login: authLogin, register: authRegister } = AuthService();

  const register = async (username, email, password) => {
    try {
      const response = await authRegister(username, email, password);
      setUser(response.data);
      setEndMessage("Usuario registrado con éxito, espere mientras es redirigido...");
      setEndType("success");
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      setEndType("error");
      setEndMessage(JSON.parse(error.request.response).message);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authLogin(email, password);
      setUser(response.data);
      setEndMessage(null);
      setEndType("success");
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      setEndType("error");
      setEndMessage(JSON.parse(error.request.response).message);
    }
  };

  const logout = () => {
    setUser(null);
    setEndMessage(null);
    setEndType(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, endMessage, endType, setEndMessage, setEndType }}>
      {children}
    </AuthContext.Provider>
  );
};
