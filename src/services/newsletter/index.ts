export type NewsletterType = {
  email: string;
};

export const addNewsletter = async (formdata: NewsletterType) => {
  try {
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formdata),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log("Error", e);
  }
};
