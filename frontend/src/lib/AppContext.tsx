"use client";

import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "./Types";
import { ToastContainer } from "react-toastify";

interface AppContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  token: String | null;
  setToken: React.Dispatch<React.SetStateAction<String | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<String | null>(localStorage.getItem("token"));

  console.log(token);
  

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
      <ToastContainer />
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
