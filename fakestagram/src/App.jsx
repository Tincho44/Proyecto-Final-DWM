import React, { useState } from 'react';
import { AuthProvider } from './shared/context/AuthContext';
import LoginPage from './features/auth/pages/LoginPage';
import RegisterPage from './features/auth/pages/RegisterPage';
import FeedPage from './features/feed/pages/FeedPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './shared/navigation/PrivateRoute';
import UnAuthRoute from './shared/navigation/UnAuthRoute';
import WIPPage from './shared/pages/WIPPage';

function App() {
  const [count, setCount] = useState(0)

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
          <Route element={<UnAuthRoute />}>
            <Route path="/forgot-password" element={<WIPPage />} />
          </Route>
          <Route element={<UnAuthRoute />}>
            <Route path="/login/weba" element={<WIPPage />} />
          </Route>
          <Route element={<UnAuthRoute />}>
            <Route path="/login/autogestion" element={<WIPPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route element={<FeedPage />} path="/" exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App