"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

type GlobalStateProps = {
  children: React.ReactNode;
};

type UserType = {
  success: boolean;
  message: string;
  user: {
    token: string;
    data: {
      _id: string;
      name: string;
      email: string;
      role: string;
    };
  };
};

export type GlobalStateContextType = {
  showNavModal: boolean;
  setShowNavModal: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthUser: boolean | null;
  setIsAuthUser: React.Dispatch<React.SetStateAction<boolean | null>>;
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

export const GlobalContext = createContext<GlobalStateContextType | null>(null);

export default function GlobalState({ children }: GlobalStateProps) {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [isAuthUser, setIsAuthUser] = useState<boolean | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
