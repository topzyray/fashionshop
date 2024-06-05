type LoginNewUserType = {
  email: string;
  password: string;
};

export const loginUser = async (formData: LoginNewUserType) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
