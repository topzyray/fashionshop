"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import ComponentLevelLoader from "@/components/Loaders/ComponentLevelLoader";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context/global-context";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { toast, ToastPosition } from "react-toastify";

type InitialFormDataType = {
  name: string;
  email: string;
  password: string;
  role: string;
};

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
};

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] =
    useState<InitialFormDataType>(initialFormData);
  const { isAuthUser, componentLevelLoader, setComponentLevelLoader } =
    useContext(GlobalContext);
  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const validateFormInput = () => {
    return formData &&
      formData.name &&
      formData.name.trim() !== "" &&
      formData.email &&
      formData.email.trim() !== "" &&
      formData.password &&
      formData.password.trim() !== "" &&
      formData.role &&
      formData.role.trim() !== ""
      ? true
      : false;
  };

  const handleFormSubmit = async () => {
    setComponentLevelLoader({ loading: true, id: "" });
    const response = await registerNewUser(formData);
    if (response.success) {
      // Display toast message
      toast.success(response.message, {
        position: "top-right" as ToastPosition,
      });

      setFormData(initialFormData);
      setComponentLevelLoader({ loading: false, id: "" });
      setIsRegistered(true);
    } else {
      // Display toast message
      toast.error(response.message, {
        position: "top-right" as ToastPosition,
      });
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
                {isRegistered ? "Registeration Successfull" : "Sign up"}
              </p>
              {isRegistered ? (
                <button
                  onClick={() => router.push("/login")}
                  className="btn-large mt-4"
                >
                  Login
                </button>
              ) : (
                <div className="w-full mt-6 mr-0 ml-0 relative space-y-8">
                  {registrationFormControls.map((controlItem) =>
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
                          formData[
                            controlItem.id as keyof typeof initialFormData
                          ]
                        }
                      />
                    ) : controlItem.componentType === "select" ? (
                      <SelectComponent
                        key={controlItem.id}
                        options={controlItem.options}
                        label={controlItem.label}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [controlItem.id]: e.target.value,
                          })
                        }
                        value={
                          formData[
                            controlItem.id as keyof typeof initialFormData
                          ]
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
                        text="Registering"
                        color="#ffffff"
                        loading={
                          componentLevelLoader && componentLevelLoader.loading
                        }
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                  <div className="flex flex-col gap-2">
                    <p>Already registered?</p>
                    <button
                      onClick={() => router.push("/login")}
                      className="btn-large"
                    >
                      Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
