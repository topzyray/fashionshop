"use client";

import ComponentLevelLoader from "@/components/Loaders/ComponentLevelLoader";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context/global-context";
import { getAllOrdersForAllUsers, updateOrderStatus } from "@/services/order";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast, ToastPosition } from "react-toastify";

export default function Admin() {
  const router = useRouter();

  const {
    user,
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const fetchAllOrdersForAllUsers = async () => {
    setPageLevelLoader(true);
    const response = await getAllOrdersForAllUsers();

    if (response.success) {
      setPageLevelLoader(false);
      setAllOrdersForAllUsers(
        response.data && response.data.length > 0
          ? response.data.filter(
              (item: OrdersAPIType) => item.user._id !== user?._id
            )
          : []
      );
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
    if (user && user !== null && user?.role === "admin") {
      fetchAllOrdersForAllUsers();
    }
  }, [user]);

  const handleOrderProcessing = async (orderItem: OrdersAPIType) => {
    setComponentLevelLoader({ loading: true, id: orderItem._id });
    const response = await updateOrderStatus({
      ...orderItem,
      isProcessing: false,
    });
    if (response.success) {
      toast.success(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      fetchAllOrdersForAllUsers();
    } else {
      toast.error(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

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
        <div className="px-4 py-6 sm:px-8 sm:py-10">
          <div className="flow-root">
            {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
              <ul className="flex flex-col gap-4">
                {allOrdersForAllUsers.map((item) => (
                  <li
                    key={item._id}
                    className="bg-white rounded-lg shadow p-4 flex flex-col space-y-3 py-6 text-left"
                  >
                    <div className="flex flex-col md:flex-row">
                      <h1 className="font-semibold sm:font-bold text-lg mb-3 flex-1">
                        #Order: {item._id}
                      </h1>
                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex gap-2">
                          <p className="text-base font-medium text-gray-900">
                            User Name:
                          </p>
                          <p className="text-base  font-semibold text-gray-900">
                            {item.user.name}
                          </p>
                        </div>
                        <div className="flex gap-2 overflow-clip">
                          <p className="text-base font-medium text-gray-900">
                            Email:
                          </p>
                          <p className="text-base  font-semibold text-gray-900">
                            {item.user.email}
                          </p>
                        </div>
                        <div className="flex gap-2 overflow-clip">
                          <p className="text-base font-medium text-gray-900">
                            Total Price:
                          </p>
                          <p className="text-base  font-semibold text-gray-900">
                            ${item.totalPrice}
                          </p>
                        </div>
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
                      <button
                        className={`btn-small ${
                          item.isProcessing ? "bg-yellow-600" : "bg-green-600"
                        }`}
                      >
                        {item.isProcessing
                          ? "Order is Processing"
                          : "Order is delivered"}
                      </button>
                      <button
                        onClick={() => handleOrderProcessing(item)}
                        disabled={!item.isProcessing}
                        className="btn-small"
                      >
                        {componentLevelLoader &&
                        componentLevelLoader.loading &&
                        componentLevelLoader.id === item._id ? (
                          <ComponentLevelLoader
                            text="Updating Order Status"
                            color="#ffffff"
                            loading={
                              componentLevelLoader &&
                              componentLevelLoader.loading &&
                              componentLevelLoader.id === item._id
                            }
                          />
                        ) : (
                          "Update Order Status"
                        )}
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
      <Notification />
    </section>
  );
}
