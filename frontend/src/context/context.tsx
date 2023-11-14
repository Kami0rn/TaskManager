import React, { createContext, useContext, useState } from 'react';
import { CustomerInterface } from '../interfaces/Icustomer';

const reactContext = createContext({ customer: null as CustomerInterface | null, login: (customerData: CustomerInterface | null) => {}, logout: () => {} });

export const useCustomer = () => {
  return useContext(reactContext);
};

export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [customer, setCustomer] = useState<CustomerInterface | null>(null);

  const login = (customerData: CustomerInterface | null) => {
    setCustomer(customerData);
  };

  const logout = () => {
    setCustomer(null);
  };

  return (
    <reactContext.Provider value={{ customer, login, logout }}>
      {children}
    </reactContext.Provider>
  );
};
