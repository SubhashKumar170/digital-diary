import React, { createContext, useState, useEffect } from 'react';

// Create the context
export const AuthContext = createContext();

// Provider component
export default function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);   // default: not authenticated
  const [loading, setLoading] = useState(true);  // while checking cookie

  useEffect(() => {
    // On mount, check if user is already authenticated
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:5050/check-auth', {
          method: 'GET',
          credentials: 'include', // send cookies
        });

        if (res.status === 200) {
          setIsAuth(true);
        } else {
          setIsAuth(false);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
