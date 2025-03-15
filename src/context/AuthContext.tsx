import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  role: string;
  username: string;
  email: string;
  phone: string;
  login: (token: string, role: string, username: string, email: string, phone: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    try {
      const token = localStorage.getItem('token');
      const storedRole = localStorage.getItem('role') || '';
      const storedUsername = localStorage.getItem('username') || '';
      const storedEmail = localStorage.getItem('email') || '';
      const storedPhone = localStorage.getItem('phone') || '';

      if (token) {
        setIsAuthenticated(true);
        setRole(storedRole);
        setUsername(storedUsername);
        setEmail(storedEmail);
        setPhone(storedPhone);
      }
    } catch (error) {
      console.error('Error loading auth data:', error);
    }
  }, []);

  const login = useCallback((token: string, role: string, username: string, email: string, phone: string) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);

    setIsAuthenticated(true);
    setRole(role);
    setUsername(username);
    setEmail(email);
    setPhone(phone);
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRole('');
    setUsername('');
    setEmail('');
    setPhone('');
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, username, email, phone, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
