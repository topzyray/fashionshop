"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context/global-context";
import { getOrderDetails } from "@/services/order";
import { useRouter } from "next/navigation";
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
    orderDetails,
    setOrderDetails,
  } = useContext(GlobalContext);

  const router = useRouter();

  const fetchOrderDetails = async () => {
    setPageLevelLoader(true);
    const response = await getOrderDetails(params.details);

    if (response.success) {
      setPageLevelLoader(false);
      setOrderDetails(response.data);
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
          color={"#1d2939"}
          loading={pageLevelLoader}
          size={20}
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-100">
      <div className="mx-auto px-0 sm:px-6 lg:px-8">
        <div className="mt-4 mx-auto max-w-screen-lg px-0 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              <div className="bg-white rounded-lg shadow px-4 flex flex-col space-y-3 pb-6 text-left">
                <div className="flex flex-col space-y-3 py-6 ">
                  <div className="flex flex-col-reverse md:flex-row md:justify-between gap-2">
                    <h1
                      className={`text-lg lg:text-2xl text-left font-bold leading-7 lg:leading-9 ${
                        orderDetails && orderDetails.isProcessing
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      Order Status:{" "}
                      {orderDetails && orderDetails.isProcessing
                        ? "Processing"
                        : "Deliver"}
                    </h1>
                    <div className="flex gap-2 justify-end items-center">
                      <p className="text-base font-medium text-gray-900">
                        Processed By:
                      </p>
                      <p className="text-base  font-semibold text-gray-900">
                        {orderDetails &&
                        orderDetails.processedBy &&
                        orderDetails.processedBy?.name
                          ? orderDetails.processedBy?.name
                          : "Pending"}
                      </p>
                    </div>
                  </div>
                  <h1 className="overflow-x-clip text-base text-left font-medium leading-7 lg:leading-9 text-dark-blue">
                    Order Id: {orderDetails && orderDetails._id}
                  </h1>
                  <p className="text-base font-medium leading-6 text-dark-blue">
                    {orderDetails &&
                      orderDetails.createdAt &&
                      orderDetails.createdAt.split("T")[0]}{" "}
                    |{" "}
                    {orderDetails &&
                      orderDetails.createdAt &&
                      orderDetails.createdAt.split("T")[1].split(".")[0]}
                  </p>
                </div>

                <div className="mt-10 flex flex-col justify-center xl:flex-row items-stretch w-full xl:space-x-8 md:space-y-6 xl:space-y-0">
                  <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                    <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:p-6 xl:p-8 w-full">
                      <p className="font-bol text-lg ">Your order summary</p>
                      {orderDetails &&
                      orderDetails.orderItems &&
                      orderDetails.orderItems.length
                        ? orderDetails.orderItems.map((item) => (
                            <div
                              key={item._id}
                              className="mt-4 md:mt-6 flex gap-4 justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                            >
                              <div className="pb-4 md:pb-8 w-24 h-24 md:w-40 rounded-lg ">
                                <img
                                  src={
                                    item &&
                                    item.product &&
                                    item.product.imageUrl
                                  }
                                  className="w-full h-full rounded-lg object-cover object-center border border-gray-300"
                                />
                              </div>
                              <div className="border-b border-gray-300 md:flex-row flex-col flex justify-between items-start w-full pb-8 gap-2">
                                <div className="w-full flex flex-col justify-start items-start space-y-8">
                                  <h3 className="text-base md:text-lg font-semibold leading-6 text-gray-900">
                                    {item && item.product && item.product.name}
                                  </h3>
                                </div>
                                <div className="w-full flex justify-between items-start space-x-8">
                                  <h3 className="text-base md:text-lg font-semibold leading-6 text-gray-900">
                                    $
                                    {item && item.product && item.product.price}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          ))
                        : null}
                    </div>
                    <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-5 xl:space-x-8">
                      <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 space-y-6">
                        <h3 className="text-lg sm:text-xl font-semibold leading-6 text-gray-900">
                          Summary
                        </h3>
                        <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                          <div className="flex justify-between w-full">
                            <p className="text-base leading-5 text-gray-800">
                              Subtotal
                            </p>
                            <p className="text-base leading-5 text-gray-900">
                              ${orderDetails && orderDetails.totalPrice}
                            </p>
                          </div>
                          <div className="flex justify-between w-full">
                            <p className="text-base leading-5 text-gray-800">
                              Shipping
                            </p>
                            <p className="text-base leading-5 text-gray-900">
                              Free
                            </p>
                          </div>
                          <div className="flex justify-between w-full">
                            <p className="text-base leading-5 text-gray-800">
                              Subtotal
                            </p>
                            <p className="text-base leading-5 text-gray-900">
                              ${orderDetails && orderDetails.totalPrice}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-gray-50 w-full xl:w-96 flex items-start px-4 flex-col">
                      <h3 className="text-lg sm:text-xl font-semibold leading-6 text-gray-900">
                        Customer Details
                      </h3>
                      <div className="flex flex-col justify-start items-start flex-shrink-0">
                        <div className="flex gap-4 justify-center flex-col w-full md:justify-start   py-6 md:py-8 border-b border-gray-200">
                          <p className="text-base font-semibold leading-4 text-left text-gray-950">
                            Name: {user?.name}
                          </p>
                          <p className="text-base font-semibold leading-4 text-left text-gray-950">
                            Email: {user?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                      <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 md:space-y-0 xl:space-y-12 md:flex-row items-start ">
                        <div className="flex justify-start items-start flex-col space-y-2 sm:space-y-4 xl:mt-8">
                          <h4 className="text-lg font-medium leading-6 text-gray-900">
                            Shipping Address
                          </h4>
                          <p>
                            Address:{" "}
                            {orderDetails &&
                              orderDetails.shippingAddress.address}
                          </p>
                          <p>
                            City:{" "}
                            {orderDetails && orderDetails.shippingAddress.city}
                          </p>
                          <p>
                            Country:{" "}
                            {orderDetails &&
                              orderDetails.shippingAddress.country}
                          </p>
                          <p>
                            Postal Code:{" "}
                            {orderDetails &&
                              orderDetails.shippingAddress.postalCode}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => router.push(`/`)}
                      className="btn-small"
                    >
                      Shop Again
                    </button>
                  </div>
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
