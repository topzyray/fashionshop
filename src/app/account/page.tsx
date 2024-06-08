"use client";

import { GlobalContext } from "@/context/global-context";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";

export default function AccountPage() {
  const router = useRouter();
  const { user } = useContext(GlobalContext);

  useEffect(() => {
    if (user === null) {
      router.push("/login");
      return;
    }
  }, [user]);
  return (
    <section>
      <div className="mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow">
          <div className="p-6 sm:p-12">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              {/* For rendering user random image */}
            </div>

            <div className="flex flex-col flex-1">
              <h4 className="text-lg font-semibold text-center md:text-left">
                {user?.name}
              </h4>
              <p className="text-sm text-center md:text-left">
                {user && user?.email}
              </p>
              <p className="text-sm text-center md:text-left">
                {user &&
                  user?.role.slice(0, 1).toUpperCase() +
                    user?.role.slice(1).toLowerCase()}
              </p>
            </div>
            <button type="button" className="btn-small mt-5">
              View Your Orders
            </button>
            <div className="mt-6">
              <h1 className="font-bold text-lg">Your Addresses:</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
