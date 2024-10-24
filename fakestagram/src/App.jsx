import React from 'react';
import { AuthProvider } from './shared/context/AuthContext';
import LoginPage from './features/login/pages/LoginPage';
import RegisterPage from './features/register/pages/RegisterPage';
import FeedPage from './features/feed/pages/FeedPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './shared/navigation/PrivateRoute';
import UnAuthRoute from './shared/navigation/UnAuthRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<UnAuthRoute />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<UnAuthRoute />}>
            <Route path="/register" element={<RegisterPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<FeedPage />} path="/" exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
