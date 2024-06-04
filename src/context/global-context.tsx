"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type GlobalContextType = {
  showNavModal: boolean;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthUser: boolean;
  setIsAuthUser: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAdminView: boolean;
  setIsAdminView: React.Dispatch<React.SetStateAction<boolean>>;
  pageLevelLoader: boolean;
  setPageLevelLoader: React.Dispatch<React.SetStateAction<boolean>>;
  componentLevelLoader: {
    loading: boolean;
    id: string;
  };
  setComponentLevelLoader: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      id: string;
    }>
  >;
};

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export const GlobalContext = createContext({} as GlobalContextType); // Type assertion

export default function GlobalState({ children }: GlobalContextProviderProps) {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [pageLevelLoader, setPageLevelLoader] = useState<boolean>(false);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = localStorage.getItem("user");
      if (userData !== null) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    } else {
      setIsAuthUser(false);
    }
  }, [Cookies]);

  // useEffect(() => {
  //   if (Cookies.get("token") !== undefined) {
  //     setIsAuthUser(true);
  //     const userData = localStorage.getItem("user") || {};
  //     setUser(userData);
  //   } else {
  //     setIsAuthUser(false);
  //   }
  // }, [Cookies]);

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        isAdminView,
        setIsAdminView,
        pageLevelLoader,
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
