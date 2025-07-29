"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ProductDetailsProps } from "@/components/CommonListing";
import { CartItem } from "@/components/CommonCart";
import { usePathname, useRouter } from "next/navigation";

export const GlobalContext = createContext({} as GlobalContextType); // Type assertion

export const initialAddressFormData: InitialAddressFormType = {
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
  processedBy: "",
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
  const [addressFormData, setAddressFormData] = useState<
    AddressFormData | InitialAddressFormType
  >(initialAddressFormData);
  const [checkoutFormData, setCheckoutFormData] = useState<CheckoutFormData>(
    initialCheckoutFormData
  );
  const [allOrdersForUser, setAllOrdersForUser] = useState<
    OrdersAPIType[] | []
  >([]);
  const [orderDetails, setOrderDetails] = useState<OrdersAPIType | null>(null);
  const [allOrdersForAllUsers, setAllOrdersForAllUsers] = useState<
    OrdersAPIType[] | []
  >([]);

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      setIsAuthUser(true);
      const userDataString = localStorage.getItem("user");
      let userData;
      if (userDataString !== null) {
        userData = JSON.parse(userDataString);
      }
      const cartItemsDataString = localStorage.getItem("cartItems");
      let cartItemsData;
      if (cartItemsDataString !== null) {
        cartItemsData = JSON.parse(cartItemsDataString);
      }
      const addressesDataString = localStorage.getItem("addresses");
      let addressesData;
      if (addressesDataString !== null) {
        addressesData = JSON.parse(addressesDataString);
      }
      setUser(userData);
      setCartItems(cartItemsData);
      setAddresses(addressesData);
    } else {
      setIsAuthUser(false);
      setUser(null);
    }
  }, [user, cartItems, addresses, isAuthUser]);

  useEffect(() => {
    // Use this for auto sign out of users after certain period of time.
  }, []);

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
        allOrdersForUser,
        setAllOrdersForUser,
        orderDetails,
        setOrderDetails,
        allOrdersForAllUsers,
        setAllOrdersForAllUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
