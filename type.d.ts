type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

interface AddressFormData {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  userId: string;
}

interface CheckoutFormData {
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
  user: User | null | {};
  setUser: React.Dispatch<React.SetStateAction<User | null | {}>>;
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
  allOrdersForUser: OrdersType[] | [];
  setAllOrdersForUser: React.Dispatch<React.SetStateAction<OrdersType[] | []>>;
};

type GlobalContextProviderProps = {
  children: React.ReactNode;
};

type OrdersType = {
  user: string;
  orderItems: [
    {
      qty: number;
      product: string;
    }
  ];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    country: string;
    postalCode: string;
  };
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isProcessing: boolean;
};
