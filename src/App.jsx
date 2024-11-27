import React, { useState } from 'react';
import { AuthProvider } from 'shared/context/AuthContext';
import { PostProvider } from 'shared/context/PostContext';
import { UserProvider } from 'shared/context/UserContext';
import { ProfileProvider } from 'shared/context/ProfileContext';
import LoginPage from 'features/auth/pages/LoginPage';
import RegisterPage from 'features/auth/pages/RegisterPage';
import FeedPage from 'features/feed/pages/FeedPage';
import PrivateRoute from 'shared/navigation/PrivateRoute';
import UnAuthRoute from 'shared/navigation/UnAuthRoute';
import LayoutedRoute from 'shared/navigation/LayoutedRoute';
import CommentsPage from 'features/comments/pages/CommentsPage';
import ProfilePage from 'features/profile/pages/ProfilePage';
// import VistaUsuario from 'features/profile/pages/Profile';
import WIPPage from 'shared/pages/WIPPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <AuthProvider>
      <ProfileProvider>
        <UserProvider>
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
                  <Route element={<LayoutedRoute />}>
                    <Route path="/comments" element={<CommentsPage />} />
                    <Route path="/profile/:idUser" element={<ProfilePage />} />
                    {/* <Route path="/profile/user/:idUsuario" element={<VistaUsuario />} /> */}
                  </Route>
                </Route>
                <Route path="*" element={<WIPPage />} />
              </Routes>
            </BrowserRouter>
          </PostProvider>
        </UserProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App