"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ProductDetailsProps } from "@/components/CommonListing";
import { CartItem } from "@/components/CommonCart";
import { usePathname, useRouter } from "next/navigation";

export type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export interface AddressFormData {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  userId: string;
}

export interface CheckoutFormData {
  shippingAddress: {};
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isProcessing: boolean;
}

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
  cartItems: CartItem[] | [];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[] | []>>;
  addresses: AddressFormData[] | [];
  setAddresses: React.Dispatch<React.SetStateAction<AddressFormData[] | []>>;
  addressFormData: AddressFormData;
  setAddressFormData: React.Dispatch<React.SetStateAction<AddressFormData>>;
  checkoutFormData: CheckoutFormData;
  setCheckoutFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
};

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

export const GlobalContext = createContext({} as GlobalContextType); // Type assertion

export const initialAddressFormData = {
  fullName: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  userId: "",
};

export const initialCheckoutFormData = {
  shippingAddress: {},
  paymentMethod: "",
  totalPrice: 0,
  isPaid: false,
  paidAt: new Date(),
  isProcessing: true,
};

export default function GlobalState({ children }: GlobalContextProviderProps) {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [pageLevelLoader, setPageLevelLoader] = useState<boolean>(true);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentUpdatedProduct, setCurrentUpdatedProduct] =
    useState<ProductDetailsProps | null>(null);
  const [showCartModal, setShowCartModal] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItem[] | []>([]);
  const [addresses, setAddresses] = useState<AddressFormData[] | []>([]);
  const [addressFormData, setAddressFormData] = useState<AddressFormData>(
    initialAddressFormData
  );
  const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormData>(
    initialCheckoutFormData
  );

  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userData = JSON.parse(localStorage.getItem("user")) || ({} as User);
      const cartItemsData = JSON.parse(localStorage.getItem("cartItems")) || [];
      const addressesData = JSON.parse(localStorage.getItem("addresses")) || [];
      setUser(userData);
      setCartItems(cartItemsData);
      setAddresses(addressesData);
    } else {
      setIsAuthUser(false);
    }
  }, [Cookies]);

  // useEffect(() => {
  //   // if (user === null) {
  //   //   router.push("/login");
  //   //   return;
  //   // }
  //   if (user !== null && user.role !== "admin" && pathName.includes("/admin")) {
  //     router.push("/unauthorized");
  //     return;
  //   }
  // }, [user, router, pathName]);

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
        addresses,
        setAddresses,
        addressFormData,
        setAddressFormData,
        checkoutFormData,
        setCheckoutFormData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
