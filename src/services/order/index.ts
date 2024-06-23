import Cookies from "js-cookie";

type NewOrderType = {
  user: string | undefined;
  shippingAddress: any;
  orderItems: {
      qty: number;
      product: any;
  }[];
  paymentMethod: string;
  totalPrice: any;
  isPaid: boolean;
  isProcessing: boolean;
  processedby: string;
  paidAt: Date;
}

export const createNewOrder = async (formData: NewOrderType) => {
  try {
    const response = await fetch("/api/order/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const getAllOrdersForAUser = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/order/get-all-orders?id=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const getOrderDetails = async (orderId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/order/order-details?id=${orderId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const getAllOrdersForAllUsers = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_URL}/api/admin/orders/get-all-orders`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
        cache: "no-store",
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const updateOrderStatus = async (formData: OrdersAPIType) => {
  try {
    const response = await fetch(`/api/admin/orders/update-order`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
