import React, { createContext, useState } from 'react';
import AuthService from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (username, email, password) => {
    try {
      const response = await AuthService.register(username, email, password);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await AuthService.login(email, password);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
