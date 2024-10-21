import React from 'react';
import { AuthProvider } from './shared/context/AuthContext';
import LoginPage from './features/auth/pages/LoginPage';
import FeedPage from './features/feed/pages/FeedPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './shared/navigation/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />}>
            <Route element={<FeedPage />} path="/" exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
