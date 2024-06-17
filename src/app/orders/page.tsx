"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context/global-context";
import { getAllOrdersForAUser } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast, ToastPosition } from "react-toastify";

export default function Orders() {
  const {
    user,
    pageLevelLoader,
    setPageLevelLoader,
    allOrdersForUser,
    setAllOrdersForUser,
  } = useContext(GlobalContext);

  const router = useRouter();

  const fetchAllOrders = async () => {
    setPageLevelLoader(true);
    const response = await getAllOrdersForAUser(user?._id);

    if (response.success) {
      setPageLevelLoader(false);
      setAllOrdersForUser(response.data);
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
    if (user !== null) fetchAllOrders();
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
          <div>
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {allOrdersForUser && allOrdersForUser.length ? (
                  <ul className="flex flex-col gap-4">
                    {allOrdersForUser.map((item) => (
                      <li
                        key={item._id}
                        className="bg-white rounded-lg shadow p-4 flex flex-col space-y-3 py-6 text-left"
                      >
                        <div className="flex flex-col md:flex-row">
                          <h1 className="font-semibold sm:font-bold text-lg mb-3 flex-1">
                            #Order: {item._id}
                          </h1>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Total paid amount
                            </p>
                            <p className="mr-3 text-lg md:text-2xl  font-semibold text-gray-900">
                              ${item.totalPrice}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 overflow-x-auto">
                          {item.orderItems.map((orderItem, index) => (
                            <div key={index} className="shrink-0 ">
                              <img
                                alt="Order Item"
                                className="h-24 w-24 max-w-full rounded-lg object-cover border"
                                src={
                                  orderItem &&
                                  orderItem.product &&
                                  orderItem.product.imageUrl
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                          <button className="btn-small">
                            {item.isProcessing
                              ? "Order is Processing"
                              : "Order is delivered"}
                          </button>
                          <button
                            onClick={() => router.push(`/orders/${item._id}`)}
                            className="btn-small"
                          >
                            View Order Details
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="bg-white rounded-lg shadow p-4 flex flex-col space-y-3 py-6 text-left text-base sm:text-lg md:text-xl font-medium">
                    No order(s) found!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
