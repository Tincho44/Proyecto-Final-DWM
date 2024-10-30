import React, { useState } from 'react';
import { AuthProvider } from 'shared/context/AuthContext';
import { PostProvider } from 'shared/context/PostContext';
import LoginPage from 'features/auth/pages/LoginPage';
import RegisterPage from 'features/auth/pages/RegisterPage';
import FeedPage from 'features/feed/pages/FeedPage';
import PrivateRoute from 'shared/navigation/PrivateRoute';
import UnAuthRoute from 'shared/navigation/UnAuthRoute';
import LayoutedRoute from 'shared/navigation/LayoutedRoute';
import WIPPage from 'shared/pages/WIPPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <PostProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<UnAuthRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route element={<LayoutedRoute />}>
                <Route path="/" element={<FeedPage />} />
              </Route>
            </Route>
            <Route path="*" element={<WIPPage />} />
          </Routes>
        </BrowserRouter>
      </PostProvider>
    </AuthProvider>
  );
}

export default App