import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../utils/axiosConfig'

const AuthContext = createContext<any>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      // Fetch user details using token to set username
      const fetchUser = async () => {
        try {
          const response = await axios.get('/api/auth/user', {
            headers: { Authorization: token },
          });          
          setUsername(response.data.username);
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

      fetchUser();
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post('/api/auth/login', { username, password });
      setToken(response.data.token);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const register = async (username: string, password: string) => {
    try {      
      await axios.post('/api/auth/register', { username, password });
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
