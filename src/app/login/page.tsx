"use client";

import InputComponent from "@/components/FormElements/InputComponent";
import SelectComponent from "@/components/FormElements/SelectComponent";
import { loginFormControls, registrationFormControls } from "@/utils";
import { useRouter } from "next/navigation";

const isLoggedIn = false;

export default function Login() {
  const router = useRouter();

  return (
    <section className="bg-white relative h-screen">
      <div className="flex flex-col items-center justify-between pt-0 pb-0 mt-8 mr-auto xl:px-5 lg:flex-row">
        <div className="flex flex-col justify-center items-center w-full px-4 md:pr-10 md:pl-10 lg:flex-row">
          <div className="w-full mt-10 mr-0 mb-0 ml-0 relative max-w-2xl lg:mt-0 lg:w-5/12">
            <div className="flex flex-col items-center justify-start pr-4 pl-4 pt-10 md:pr-10 pb-10 md:pl-10 bg-white md:shadow-2xl rounded-xl relative z-10">
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
                    />
                  ) : null
                )}
                <button className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-300 ease-in-out focus:shadow hover:opacity-80 font-medium uppercase tracking-wide">
                  Login
                </button>
                <div className="flex flex-col gap-2">
                  <p>New to website?</p>
                  <button
                    onClick={() => router.push("/register")}
                    className="inline-flex w-full items-center justify-center bg-black px-6 py-4 text-lg text-white transition-all duration-300 ease-in-out focus:shadow hover:opacity-80 font-medium uppercase tracking-wide"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
