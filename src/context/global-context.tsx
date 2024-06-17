"use client";

import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ProductDetailsProps } from "@/components/CommonListing";
import { CartItem } from "@/components/CommonCart";
import { usePathname, useRouter } from "next/navigation";

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

const protectedRoutes = ["cart", "checkout", "account", "orders", "admin"];

const protectedAdminRoutes = [
  "/admin",
  "/admin/add-product",
  "/admin/all-products",
];

export default function GlobalState({ children }: GlobalContextProviderProps) {
  const [showNavModal, setShowNavModal] = useState<boolean>(false);
  const [pageLevelLoader, setPageLevelLoader] = useState<boolean>(true);
  const [componentLevelLoader, setComponentLevelLoader] = useState({
    loading: false,
    id: "",
  });
  const [isAuthUser, setIsAuthUser] = useState<boolean>(false);
  const [user, setUser] = useState<User | null | {}>(null);
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
  const [allOrdersForUser, setAllOrdersForUser] = useState<OrdersType[] | []>(
    []
  );
  const [orderDetails, setOrderDetails] = useState<OrdersType | null>(null);

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
      setUser({});
    }
  }, [Cookies]);

  useEffect(() => {
    if (
      pathName !== "/register" &&
      user &&
      Object.keys(user).length === 0 && 
      protectedRoutes.includes(pathName) > -1
    ) {
      router.push("/login");
    }
  }, [user, pathName]);

  useEffect(() => {
    if (
      user !== null &&
      user &&
      Object.keys(user).length > 0 &&
      user?.role !== "admin" &&
      protectedAdminRoutes.indexOf(pathName) > -1
    ) {
      router.push("/unauthorized");
    }
  }, [user, pathName]);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
