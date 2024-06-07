"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ProductDetailsProps } from "@/components/CommonListing";

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
  currentUpdatedProduct: ProductDetailsProps | null;
  setCurrentUpdatedProduct: React.Dispatch<
    React.SetStateAction<ProductDetailsProps | null>
  >;
  showCartModal: boolean;
  setShowCartModal: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: ProductDetailsProps[] | [];
  setCartItems: React.Dispatch<
    React.SetStateAction<ProductDetailsProps[] | []>
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
  const [currentUpdatedProduct, setCurrentUpdatedProduct] =
    useState<ProductDetailsProps | null>(null);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<ProductDetailsProps[] | []>([]);

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

  return (
    <GlobalContext.Provider
      value={{
        showNavModal,
        setShowNavModal,
        isAuthUser,
        setIsAuthUser,
        user,
        setUser,
        pageLevelLoader,
        setPageLevelLoader,
        componentLevelLoader,
        setComponentLevelLoader,
        currentUpdatedProduct,
        setCurrentUpdatedProduct,
        showCartModal,
        setShowCartModal,
        cartItems,
        setCartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
