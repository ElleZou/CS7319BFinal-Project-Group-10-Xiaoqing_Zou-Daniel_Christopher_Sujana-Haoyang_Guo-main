// userContext.js
import React, { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');

  const login = (username) => {
    setUsername(username);
  };

  const logout = () => {
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
