import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
// ---------------------------------------------------------------------------

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      let decoded = jwtDecode(token);
      setUser({ role: decoded.role, id: decoded.id, username: decoded.username });
    }
  }, []);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);   // <-- reset here

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
