import React, { createContext, useContext, useState } from 'react';
import { UserInterface } from '../interfaces/Iuser';

const reactContext = createContext({ user: null as UserInterface | null, login: (userData: UserInterface | null) => {}, logout: () => {} });

export const useUser = () => {
  return useContext(reactContext);
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  const login = (userData: UserInterface | null) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <reactContext.Provider value={{ user, login, logout }}>
      {children}
    </reactContext.Provider>
  );
};
