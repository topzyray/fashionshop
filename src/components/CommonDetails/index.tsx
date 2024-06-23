"use client";

import { useContext } from "react";
import { ProductDetailsProps } from "../CommonListing";
import Link from "next/link";
import { GlobalContext } from "@/context/global-context";
import { addCartItem } from "@/services/cart";
import { toast, ToastPosition } from "react-toastify";
import { useRouter } from "next/navigation";
import Notification from "../Notification";
import ComponentLevelLoader from "../Loaders/ComponentLevelLoader";
import { AddCardType } from "../CommonListing/ProductCardButton";

export default function CommonDetails({ data }: { data: ProductDetailsProps }) {
  const router = useRouter();
  const {
    componentLevelLoader,
    setComponentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);

  const handleAddToCart = async (data: AddCardType) => {
    setComponentLevelLoader({ loading: true, id: data._id });
    if (user !== null) {
      const response = await addCartItem({
        productId: data._id,
        userId: user._id,
      });
      if (response.success) {
        toast.success(response.message, {
          position: "top-right" as ToastPosition,
        });
        setComponentLevelLoader({ loading: false, id: "" });
        setShowCartModal(true);
      } else {
        toast.error(response.message, {
          position: "top-right" as ToastPosition,
        });
        setComponentLevelLoader({ loading: false, id: "" });
        setShowCartModal(true);
      }
    } else {
      toast.error("Please login to add to cart", {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    }
  };

  return (
    <section className="bg-gray-100 w-full min-h-screen">
      <div className="max-w-screen-xl mx-auto lg:bg-white my-8 lg:my-12 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 ">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5 h-[20rem] md:h-[25rem] lg:h-[40rem] w-full">
                <div className="w-full h-full overflow-hidden rounded-lg ">
                  <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="h-full w-full max-w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col gap-4 w-full">
                  <button
                    type="button"
                    className="flex-0 h-20 w-20 lg:w-full overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={data.imageUrl}
                      alt={data.name}
                      className="h-full w-full object-cover"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 h-20 w-20 lg:w-full overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={data.imageUrl}
                      alt={data.name}
                      className="h-full w-full object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <div className="border-t md:border-none pt-5 md:pt-0">
              <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
            </div>
            <div className="mt-5 flex flex-col justify-between items-start space-y-4 border-t py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-center gap-2">
                <h1
                  className={`text-lg lg:text-2xl font-bold ${
                    data.onSale === "yes" ? "line-through" : ""
                  }`}
                >
                  $ {data.price}
                </h1>
                {data.onSale === "yes" ? (
                  <h1 className="text-lg lg:text-2xl font-bold text-red-600">{`$${(
                    data.price -
                    data.price * (data.priceDrop / 100)
                  ).toFixed(2)}`}</h1>
                ) : null}
                {data.onSale === "yes" ? (
                  <h1 className="text-sm font-semibold ">
                    -(${data.priceDrop}%)off
                  </h1>
                ) : null}
              </div>
              <button
                onClick={() => handleAddToCart(data)}
                type="button"
                className="btn-small"
              >
                {componentLevelLoader &&
                componentLevelLoader.loading &&
                data._id === componentLevelLoader.id ? (
                  <ComponentLevelLoader
                    text="Adding to Cart"
                    color="#ffffff"
                    loading={
                      componentLevelLoader && componentLevelLoader.loading
                    }
                  />
                ) : (
                  "Add to Cart"
                )}
              </button>
            </div>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                {data.deliveryInfo}
              </li>
              <li className="flex items-center text-left text-sm font-medium text-gray-600">
                Cancel anytime
              </li>
            </ul>
            <div className="lg:col-span-3 ">
              <div className="border-b border-gray-400">
                <nav className="flex gap-4">
                  <Link
                    href="#"
                    className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900"
                  >
                    Description
                  </Link>
                </nav>
              </div>
              <div className="mt-8 flow-root sm:mt-12">{data.description}</div>
            </div>
          </div>
        </div>
      </div>
      {/* <Notification /> */}
    </section>
  );
}
