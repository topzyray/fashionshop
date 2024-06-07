import Cookies from "js-cookie";

export const addCartItem = async (formData: {
  productId: string;
  userID: string;
}) => {
  try {
    const response = await fetch("/api/cart/add-to-cart", {
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

export const getAllCartItems = async (id: string) => {
  try {
    const response = await fetch(`/api/cart/all-cart-items?id=${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const deleteCartItem = async (id: string) => {
  try {
    const response = await fetch(`/api/cart/delete-from-cart?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
