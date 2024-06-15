import { ProductDetailsProps } from "@/components/CommonListing";
import Cookies from "js-cookie";

export const addNewProduct = async (formData: ProductDetailsProps) => {
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
      "http://localhost:3000/api/client/all-products",
      { method: "GET", cache: "no-store" }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const updateProduct = async (formData: ProductDetailsProps) => {
  try {
    const response = await fetch("/api/admin/update-product", {
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

export const deleteProduct = async (id: string) => {
  try {
    const response = await fetch(`/api/admin/delete-product?id=${id}`, {
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

export const getProductByCategory = async (category: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/client/product-by-category?category=${category}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

export const getProductById = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/client/product-by-id?id=${id}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
