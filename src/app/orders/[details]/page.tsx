"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context/global-context";
import { getOrderDetails } from "@/services/order";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast, ToastPosition } from "react-toastify";

export default function OrderDetailsPage({
  params,
}: {
  params: { details: string };
}) {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  //   const router = useRouter();

  const fetchOrderDetails = async () => {
    setPageLevelLoader(true);
    const response = await getOrderDetails(params.details);
    console.log(response);

    if (response.success) {
      setPageLevelLoader(false);
      toast.success(response.message, {
        position: "top-right" as ToastPosition,
      });
    } else {
      setPageLevelLoader(false);
      toast.error(response.message, {
        position: "top-right" as ToastPosition,
      });
    }
  };

  useEffect(() => {
    if (user !== null) fetchOrderDetails();
  }, [user]);

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={20}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100">
      <h1>Order Details</h1>
      <Notification />
    </section>
  );
}
