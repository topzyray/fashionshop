import Cookies from "js-cookie";

export const createNewOrder = async (formData: OrdersType) => {
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
      `http://localhost:3000/api/order/get-all-orders?id=${userId}`,
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
      `http://localhost:3000/api/order/order-details?id=${orderId}`,
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
