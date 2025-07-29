type RegisterNewUserType = {
  name: string;
  email: string;
  password: string;
};

type NavOptionsType = {
  id: string;
  label: string;
  path: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

type InitialAddressFormType = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  userId: string;
};

type AddressFormData = {
  _id: string;
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  userId: string;
};

interface CheckoutFormData {
  shippingAddress: {};
  paymentMethod: string;
  totalPrice: number;
  isPaid: boolean;
  paidAt: Date;
  isProcessing: boolean;
  processedBy: string;
}

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
  paidAt: string;
  isProcessing: boolean;
  processedBy?: string;
};

type OrdersAPIType = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  orderItems: [
    {
      qty: number;
      product: {
        _id: string;
        name: string;
        description: string;
        price: number;
        category: string;
        sizes: string[];
        deliveryInfo: string;
        onSale: string;
        priceDrop: number;
        imageUrl: string;
      };
      _id: string;
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
  paidAt: string;
  isProcessing: boolean;
  processedBy?: { name: string; _id: string };
  createdAt: string;
  updatedAt: string;
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
  cartItems: CartItem[] | [];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[] | []>>;
  addresses: AddressFormData[] | [];
  setAddresses: React.Dispatch<React.SetStateAction<AddressFormData[] | []>>;
  addressFormData: AddressFormData | InitialAddressFormType;
  setAddressFormData: React.Dispatch<
    React.SetStateAction<AddressFormData | InitialAddressFormType>
  >;
  checkoutFormData: CheckoutFormData;
  setCheckoutFormData: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
  allOrdersForUser: OrdersAPIType[] | [];
  setAllOrdersForUser: React.Dispatch<React.SetStateAction<OrdersAPIType[] | []>>;
  orderDetails: OrdersAPIType | null;
  setOrderDetails: React.Dispatch<React.SetStateAction<OrdersAPIType | null>>;
  allOrdersForAllUsers: OrdersAPIType[] | [];
  setAllOrdersForAllUsers: React.Dispatch<
    React.SetStateAction<OrdersAPIType[] | []>
  >;
};

type AddressKeys = keyof AddressFormData | keyof InitialAddressFormType;
