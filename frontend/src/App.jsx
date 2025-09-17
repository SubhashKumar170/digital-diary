// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './Home';
import Profile from './Profile';
import New from './New';
import History from './History';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import AuthProvider, { AuthContext } from './AuthContext';

function AppRoutes() {
  const { isAuth, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  return (
    <Routes>
      {/* Default route -> Home if logged in, Register if not */}
      <Route index element={isAuth ? <Home /> : <Register />} />

      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/new"
        element={
          <ProtectedRoute>
            <New />
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <History />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* Catch-all for unknown routes */}
      <Route path="*" element={<h2>Error Page not found</h2>} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
