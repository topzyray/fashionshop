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
    <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 mt-8 lg:mt-12">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="lg:flex lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    src={data.imageUrl}
                    alt={data.name}
                    className="h-full w-full max-w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col">
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
                  >
                    <img
                      src={data.imageUrl}
                      alt={data.name}
                      className="h-full w-full object-cover"
                    />
                  </button>
                  <button
                    type="button"
                    className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-100 text-center"
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
            <h1 className="text-2xl font-bold text-gray-900">{data.name}</h1>
            <div className="mt-10 flex flex-col justify-between items-center space-y-4 border-t py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-center gap-2">
                <h1
                  className={`text-2xl font-bold ${
                    data.onSale === "yes" ? "line-through" : ""
                  }`}
                >
                  ₦ {data.price}
                </h1>
                {data.onSale === "yes" ? (
                  <h1 className="text-2xl font-bold text-red-600">{`₦${(
                    data.price -
                    data.price * (data.priceDrop / 100)
                  ).toFixed(2)}`}</h1>
                ) : null}
                {data.onSale === "yes" ? (
                  <h1 className="text-sm font-semibold self-end">
                    -(₦{data.priceDrop}%)off
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
            <ul className="mt-8 space-y-2">
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
      <Notification />
    </section>
  );
}
