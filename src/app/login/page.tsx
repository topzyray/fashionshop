"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import { GlobalContext } from "@/context/global-context";
import { loginUser } from "@/services/login";
import { loginFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import ComponentLevelLoader from "@/components/Loaders/ComponentLevelLoader";
import Notification from "@/components/Notification";
import { toast, ToastPosition } from "react-toastify";

type InitialFormDataType = {
  email: string;
  password: string;
};

const initialFormData = {
  email: "",
  password: "",
};

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] =
    useState<InitialFormDataType>(initialFormData);
  const {
    isAuthUser,
    setIsAuthUser,
    setUser,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const validateFormInput = () => {
    return formData &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== ""
      ? true
      : false;
  };

  const handleFormSubmit = async () => {
    setComponentLevelLoader({ loading: true, id: "" });
    const response = await loginUser(formData);
    if (response.success) {
      // Display toast message
      toast.success(response.message, {
        position: "top-right" as ToastPosition,
      });

      setIsAuthUser(true);
      setUser(response?.data?.user);
      setFormData(initialFormData);
      Cookies.set("token", response?.data?.token);
      localStorage.setItem("user", JSON.stringify(response?.data?.user));
      setComponentLevelLoader({ loading: false, id: "" });
      router.push("/");
    } else {
      // Display toast message
      toast.error(response.message, {
        position: "top-right" as ToastPosition,
      });

      setIsAuthUser(false);
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  useEffect(() => {
    if (isAuthUser) {
      router.push("/");
    }
  }, [isAuthUser]);

  return (
    <section className="bg-white relative h-screen">
      <div className="flex flex-col items-center justify-between pt-0 pb-0 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full px-4 md:pr-10 md:pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="max-w-md mx-auto flex flex-col items-center justify-start pr-4 pl-4 pt-10 md:pr-10 pb-10 md:pl-10 bg-white md:shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                Login
              </p>

              <div className="w-full mt-6 mr-0 ml-0 relative space-y-8">
                {loginFormControls.map((controlItem) =>
                  controlItem.componentType === "input" ? (
                    <InputComponent
                      key={controlItem.id}
                      type={controlItem.type}
                      placeholder={controlItem.placeholder}
                      label={controlItem.label}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [controlItem.id]: e.target.value,
                        })
                      }
                      value={
                        formData[controlItem.id as keyof typeof initialFormData]
                      }
                    />
                  ) : null
                )}
                <button
                  onClick={handleFormSubmit}
                  disabled={!validateFormInput()}
                  className="btn-large"
                >
                  {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text="Logging In"
                      color="#ffffff"
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Login"
                  )}
                </button>
                <div className="flex flex-col gap-2">
                  <p>New to website?</p>
                  <button
                    onClick={() => router.push("/register")}
                    className="btn-large"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
