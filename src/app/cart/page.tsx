"use client";

import ComponentLevelLoader from "@/components/Loaders/ComponentLevelLoader";
import Notification from "@/components/Notification";
import { GlobalContext } from "@/context/global-context";
import { deleteCartItem, getAllCartItems } from "@/services/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast, ToastPosition } from "react-toastify";

export default function CartPage() {
  const [loadingCart, setLoadingCart] = useState(false);
  const {
    user,
    cartItems,
    setCartItems,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();

  const fetchAllCartItems = async () => {
    setLoadingCart(true);
    const response = await getAllCartItems(user?._id);

    if (response.success) {
      setLoadingCart(false);
      setCartItems(response.data);
      localStorage.setItem("cartItems", JSON.stringify(response.data));
    } else {
      setLoadingCart(false);
    }
  };

  useEffect(() => {
    if (user !== null) {
      fetchAllCartItems();
    }
  }, [user]);

  const handleDeleteCartItem = async (cartItemId: string) => {
    setComponentLevelLoader({ loading: true, id: cartItemId });
    const response = await deleteCartItem(cartItemId);
    if (response.success) {
      toast.success(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      fetchAllCartItems();
      // router.refresh();
    } else {
      toast.error(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  return (
    <section className="w-full mt-5 mr-0 mb-5 ml-0 px-5 relative">
      <div className="max-w-3xl flex flex-col items-center justify-start mx-auto p-5 sm:p-10 bg-white shadow-2xl rounded-xl relative">
        <p className="w-full text-xl md:text-3xl font-medium text-center font-serif">
          All Cart Items
        </p>

        <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-8">
          {cartItems && cartItems.length ? (
            <ul role="list" className="my-6 divide-y divide-gray-300">
              {cartItems.map((cartItem) => (
                <li key={cartItem.productId._id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={
                        cartItem &&
                        cartItem.productId &&
                        cartItem.productId.imageUrl
                      }
                      alt={cartItem.productId.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900 ">
                        <h3 className="hover:underline">
                          <Link href={`/product/${cartItem.productId._id}`}>
                            {cartItem &&
                              cartItem.productId &&
                              cartItem.productId.name}
                          </Link>
                        </h3>
                        <div className="text-sm">
                          <button
                            onClick={() => handleDeleteCartItem(cartItem._id)}
                            type="button"
                            className="font-medium text-yellow-600
                           sm:order-2 hover:underline"
                          >
                            {componentLevelLoader &&
                            componentLevelLoader.loading &&
                            cartItem._id === componentLevelLoader.id ? (
                              <ComponentLevelLoader
                                text="Removing"
                                color="#ca8a04"
                                loading={
                                  componentLevelLoader &&
                                  componentLevelLoader.loading
                                }
                              />
                            ) : (
                              "Remove"
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        ₦
                        {cartItem &&
                          cartItem.productId &&
                          cartItem.productId.price}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-gray-900 flex items-center justify-center my-5">
              <h1 className="text-xl">
                {loadingCart ? (
                  <ComponentLevelLoader
                    text="Loading Cart. Please wait..."
                    color="#000000"
                    loading={loadingCart}
                  />
                ) : cartItems.length === 0 ? (
                  "Cart is empty"
                ) : null}
              </h1>
            </div>
          )}
        </div>

        <div className="flex flex-col w-full">
          <button
            disabled={cartItems && cartItems.length === 0}
            type="button"
            className="btn-small"
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button
              onClick={() => router.push("/product/listing/all-products")}
              type="button"
              className="font-medium hover:underline"
            >
              Continue Shopping
              <span aria-hidden="true" className="ml-1">
                &rarr;
              </span>
            </button>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
