import Cookies from "js-cookie";

type AddressFormData = {
  fullName: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  userId: string;
};

export const addNewAddress = async (formData: AddressFormData) => {
  try {
    const response = await fetch("/api/address/add-new-address", {
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
    console.log("Err", err);
  }
};
export const getAllAddress = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/address/get-all-address?id=${id}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Err", err);
  }
};
export const updateAddress = async (formData: AddressFormData) => {
  try {
    const response = await fetch("/api/address/update-address", {
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
    console.log("Err", err);
  }
};
export const deleteAddress = async (id: string) => {
  try {
    const response = await fetch(`/api/address/delete-address?id=${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Err", err);
  }
};
