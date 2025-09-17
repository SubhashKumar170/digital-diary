// src/ProtectedRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null); // null = loading

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5050/check-auth', {
          method: 'GET',
          credentials: 'include', // send cookies
        });

        if (res.ok) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setIsAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuth === null) return <p>Loading...</p>;

  if (!isAuth) return <Navigate to="/login" replace />;

  return children;
}
