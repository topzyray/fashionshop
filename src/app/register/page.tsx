"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import { registerNewUser } from "@/services/register";
import { registrationFormControls } from "@/utils";
import { useState } from "react";

const isRegisterd = false;

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
  const [formData, setFormData] =
    useState<InitialFormDataType>(initialFormData);

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
    console.log(formData);

    const data = await registerNewUser(formData);
    console.log(data);
  };

  return (
    <section className="bg-white relative h-screen">
      <div className="flex flex-col items-center justify-between pt-0 pb-0 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full px-4 md:pr-10 md:pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pr-4 pl-4 pt-10 md:pr-10 pb-10 md:pl-10 bg-white md:shadow-2xl rounded-xl relative z-10">
              <p className="w-full text-4xl font-medium text-center font-serif">
                {isRegisterd
                  ? "Registeration Successfull"
                  : "Sign up for an account"}
              </p>
              {isRegisterd ? (
                <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-300 ease-in-out focus:shadow hover:opacity-80 font-medium uppercase tracking-wide ">
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
                    className="disabled:opacity-50 disabled:cursor-not-allowed inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-300 ease-in-out focus:shadow hover:opacity-80 font-medium uppercase tracking-wide"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
