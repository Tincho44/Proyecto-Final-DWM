import React, { useState } from 'react';
import { AuthProvider } from 'shared/context/AuthContext';
import { PostProvider } from 'shared/context/PostContext';
import { UserProvider } from 'shared/context/UserContext';
import { NotificationProvider } from "shared/context/NotificationContext";
import LoginPage from 'features/auth/pages/LoginPage';
import RegisterPage from 'features/auth/pages/RegisterPage';
import FeedPage from 'features/feed/pages/FeedPage';
import PrivateRoute from 'shared/navigation/PrivateRoute';
import UnAuthRoute from 'shared/navigation/UnAuthRoute';
import LayoutedRoute from 'shared/navigation/LayoutedRoute';
import CommentsPage from 'features/comments/pages/CommentsPage';
import NotificationPage from 'features/notifications/pages/NotificationPage';
import WIPPage from 'shared/pages/WIPPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <AuthProvider>
      <UserProvider>
        <PostProvider>
        <NotificationProvider> 
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
                <Route element={<LayoutedRoute />}>
                  <Route path="/comments" element={<CommentsPage />} />
                </Route>
                <Route element={<LayoutedRoute />}>
                  <Route path="/notifications" element={<NotificationPage />} />
                </Route>
              </Route>
              <Route path="*" element={<WIPPage />} />
            </Routes>
          </BrowserRouter>
          </NotificationProvider> 
        </PostProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App