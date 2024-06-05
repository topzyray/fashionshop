import Cookies from "js-cookie";

type AddNewProductType = {
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: string;
  deliveryInfo: string;
  onSale: string;
  priceDrop: number;
  imageUrl: string;
};

export const addNewProduct = async (formData: AddNewProductType) => {
  try {
    const response = await fetch("/api/admin/add-product", {
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

export const getAllProducts = async () => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/admin/all-products",
      {
        cache: "no-store",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
