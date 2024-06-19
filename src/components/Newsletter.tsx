"use client";

import React, { useContext, useState } from "react";
import Notification from "./Notification";
import { GlobalContext } from "@/context/global-context";
import { addNewsletter, NewsletterType } from "@/services/newsletter";
import { toast, ToastPosition } from "react-toastify";
import ComponentLevelLoader from "./Loaders/ComponentLevelLoader";

const initialFormData = {
  email: "",
};

export default function Newsletter() {
  const [formData, setFormData] = useState<NewsletterType>(initialFormData);
  const { componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);

  const handleSubmitNewsletter = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setComponentLevelLoader({ loading: true, id: "" });
    const response = await addNewsletter(formData);
    if (response.success) {
      toast.success(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setFormData(initialFormData);
    } else {
      toast.error(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  return (
    <section className="space-y-4 lg:space-y-6">
      <h4 className="text-lg font-bold">Join Our Newsletter</h4>
      <p className="text-lg font-normal">
        Receive latest updates in your inbox
      </p>
      <form
        onSubmit={handleSubmitNewsletter}
        className="flex flex-col md:flex-row gap-1"
      >
        <div className="">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
            id="email"
            placeholder="Email address"
            className="block min-w-[15rem] max-w-sm w-full lg:w-80 rounded-md border-0 px-2 py-2 lg:py-3 text-[#1D2939] font-normal shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 placeholder:font-normal placeholder:text-base focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-base sm:leading-6"
          />
        </div>
        <button
          type="submit"
          disabled={
            (componentLevelLoader && componentLevelLoader.loading) ||
            formData.email === ""
          }
          className="btn-small max-w-max bg-white text-dark-blue mt-0"
        >
          {componentLevelLoader && componentLevelLoader.loading ? (
            <ComponentLevelLoader
              text="Subscribing"
              color="#000000"
              loading={componentLevelLoader && componentLevelLoader.loading}
            />
          ) : (
            "Subscribe"
          )}
        </button>
      </form>
      <Notification />
    </section>
  );
}
