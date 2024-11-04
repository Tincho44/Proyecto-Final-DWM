import React, { useState } from 'react';
import { AuthProvider } from 'shared/context/AuthContext';
import LoginPage from 'features/auth/pages/LoginPage';
import RegisterPage from 'features/auth/pages/RegisterPage';
import FeedPage from 'features/feed/pages/FeedPage';
import PrivateRoute from 'shared/navigation/PrivateRoute';
import UnAuthRoute from 'shared/navigation/UnAuthRoute';
import WIPPage from 'shared/pages/WIPPage';
import VistaUsuario from 'features/auth/Profile/UserView';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  function NotFoundPage(){
    return <p>RIP</p>
  }
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<UnAuthRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<WIPPage />} />
            <Route path="/login/weba" element={<WIPPage />} />
            <Route path="/login/autogestion" element={<WIPPage />} />
          </Route>
          <Route path="/profile/user" element={<VistaUsuario idUsuario="6719a9a0d3970a94da53e986" />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<FeedPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App