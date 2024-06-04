type RegisterNewUserType = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export const registerNewUser = async (formData: RegisterNewUserType) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const finalData = response.json();
    return finalData;
  } catch (err) {
    console.log("Error", err);
  }
};
