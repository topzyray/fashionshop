import Cookies from "js-cookie";

export const callStripeSession = async (formData) => {
  try {
    const resonse = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await resonse.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
