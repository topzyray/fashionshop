"use client";

import Notification from "@/components/Notification";
import { GlobalContext } from "@/context/global-context";
import { getAllAddress } from "@/services/address";
import { createNewOrder } from "@/services/order";
import { callStripeSession } from "@/services/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { Item } from "firebase/analytics";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import { toast, ToastPosition } from "react-toastify";

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState<boolean | null>(null);
  const [isOrderProcessing, setIsOrderProcessing] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const {
    cartItems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);
  const router = useRouter();
  const params = useSearchParams();

  const fetchAllAddresses = async () => {
    if (user !== null) {
      const respnse = await getAllAddress(user?._id);

      if (respnse.success) {
        setAddresses(respnse.data);
        localStorage.setItem("addresses", JSON.stringify(respnse.data));
      }
    }
  };

  useEffect(() => {
    if (user !== null) {
      fetchAllAddresses();
    }
  }, [user]);

  useEffect(() => {
    const createFinalOrder = async () => {
      const isStripe = JSON.parse(localStorage.getItem("stripe"));
      if (
        isStripe &&
        params.get("status") === "success" &&
        cartItems &&
        cartItems.length > 0
      ) {
        setIsOrderProcessing(true);
        const getCheckoutFormData = JSON.parse(
          localStorage.getItem("checkoutFormData")
        );

        const createFinalCheckoutFormData = {
          user: user?._id,
          shippingAddress: getCheckoutFormData.shippingAddress,
          orderItems: cartItems.map((item) => ({
            qty: 1,
            product: item.productId,
          })),
          paymentMethod: "Stripe",
          totalPrice: cartItems
            .reduce(
              (total, item) =>
                (item.productId.onSale === "yes"
                  ? item.productId.price -
                    item.productId.price * (item.productId.priceDrop / 100)
                  : item.productId.price) + total,
              0
            )
            .toFixed(2),
          isPaid: true,
          isProcessing: true,
          paidAt: new Date(),
        };

        const response = await createNewOrder(createFinalCheckoutFormData);
        if (response.success) {
          setIsOrderProcessing(false);
          setOrderSuccess(true);
          toast.success(response.message, {
            position: "top-right" as ToastPosition,
          });
          localStorage.removeItem("cartItems");
        } else {
          setIsOrderProcessing(false);
          setOrderSuccess(false);
          toast.error(response.message, {
            position: "top-right" as ToastPosition,
          });
        }
      }
    };

    createFinalOrder();
  }, [params.get("status"), cartItems]);

  const handleSelectedAddress = (getAddress) => {
    if (getAddress._id === selectedAddress) {
      setSelectedAddress(null);
      setCheckoutFormData({
        ...checkoutFormData,
        shippingAddress: {},
      });
      return;
    }

    setSelectedAddress(getAddress._id);
    setCheckoutFormData({
      ...checkoutFormData,
      shippingAddress: {
        fullName: getAddress.fullName,
        address: getAddress.address,
        city: getAddress.city,
        country: getAddress.country,
        postalCode: getAddress.postalCode,
      },
    });
  };

  // For stripe
  const publishableKey =
    "pk_test_51PPq9d2MsXx4V0jPYSNxULAr79VHkCzVR9mQVwJKiTV8sbSaYqXaEKPDZG4m3Ym3948Sbl8ytZai8zURTMDooCNh00sDJ1bHNS";
  const stripePromise = loadStripe(publishableKey);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const createLineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.productId.name,
          images: [item.productId.imageUrl],
        },
        unit_amount:
          item.productId.onSale === "yes"
            ? (
                (item.productId.price -
                  item.productId.price * (item.productId.priceDrop / 100)) *
                100
              ).toFixed(0)
            : item.productId.price * 100,
      },
      quantity: 1,
    }));

    const response = await callStripeSession(createLineItems);
    setIsOrderProcessing(true);
    localStorage.setItem("stripe", true);
    localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

    const { error } = await stripe?.redirectToCheckout({
      sessionId: response.id,
    });
    console.log(error);
  };

  useEffect(() => {
    if (orderSuccess) {
      setTimeout(() => {
        router.push("/orders");
      }, 3000);
    }
  }, [orderSuccess]);

  if (orderSuccess) {
    return (
      <section className="h-screen bg-gray-200">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 max-w-screen-sm px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow">
              <div className="px-4 py-6 sm:px-8 sm:py-10 flex flex-col justify-center items-center gap-5">
                <h1 className="font-medium text-base sm:text-lg text-center">
                  Your payment is successful and you will be redirected to
                  orders page in 3 seconds. If you were not redirected, please
                  click{" "}
                  <span
                    onClick={() => router.push("/orders")}
                    className="font-bold hover:underline"
                  >
                    here
                  </span>{" "}
                  to visit the orders page.
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (isOrderProcessing) {
    return (
      <section className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={isOrderProcessing}
          size={20}
          data-testid="loader"
        />
      </section>
    );
  }

  return (
    <section>
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="font-medium text-xl">Cart Summary</p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-5">
            {cartItems && cartItems.length ? (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                >
                  <div className="m-2 h-24 w-28">
                    <img
                      src={item && item.productId && item.productId.imageUrl}
                      alt={item && item.productId && item.productId.name}
                      className="w-full h-full rounded-md border object-cover object-center"
                    />
                  </div>
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-bold">
                      {item && item.productId && item.productId.name}
                    </span>
                    <span className="font-semibold">
                      $
                      {item && item.productId && item.productId.onSale === "yes"
                        ? (
                            item.productId.price -
                            item.productId.price *
                              (item.productId.priceDrop / 100)
                          ).toFixed(2)
                        : item.productId.price}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div>No cart found</div>
            )}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="font-medium text-xl">Shipping Address Details</p>
          <p className="text-gray-400 font-bold">
            Complete your order by selecting address below:
          </p>
          <div className="w-full mt-6 mr-0 mb-0 ml-0 space-y-6">
            {addresses && addresses.length ? (
              addresses.map((item) => (
                <div
                  onClick={() => handleSelectedAddress(item)}
                  key={item._id}
                  className={`border p-6 ${
                    item._id === selectedAddress ? "border-red-900" : ""
                  }`}
                >
                  <p>Name: {item.fullName}</p>
                  <p>Address: {item.address}</p>
                  <p>City: {item.city}</p>
                  <p>Country: {item.country}</p>
                  <p>PostalCode: {item.postalCode}</p>

                  <button type="button" className="btn-small mt-5">
                    {item._id === selectedAddress
                      ? "Selected Address"
                      : "Select Address"}
                  </button>
                </div>
              ))
            ) : (
              <p>No addresses added.</p>
            )}
          </div>

          <div className="">
            <button
              onClick={() => router.push("/account")}
              type="button"
              className="btn-small mt-5"
            >
              Add New Address
            </button>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="text-lg font-bold text-gray-900">
                  $
                  {cartItems && cartItems.length
                    ? cartItems
                        .reduce(
                          (total, item) =>
                            (item.productId.onSale === "yes"
                              ? item.productId.price -
                                item.productId.price *
                                  (item.productId.priceDrop / 100)
                              : item.productId.price) + total,
                          0
                        )
                        .toFixed(2)
                    : 0}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="text-lg font-bold text-gray-900">
                  {cartItems && cartItems.length <= 0
                    ? "Cart is empty"
                    : "Free"}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-lg font-bold text-gray-900">
                  $
                  {cartItems && cartItems.length
                    ? cartItems
                        .reduce(
                          (total, item) =>
                            (item.productId.onSale === "yes"
                              ? item.productId.price -
                                item.productId.price *
                                  (item.productId.priceDrop / 100)
                              : item.productId.price) + total,
                          0
                        )
                        .toFixed(2)
                    : 0}
                </p>
              </div>

              <div className="pb-10">
                <button
                  onClick={handleCheckout}
                  disabled={
                    (cartItems && cartItems.length <= 0) ||
                    Object.keys(checkoutFormData.shippingAddress).length === 0
                  }
                  type="button"
                  className="btn-small w-full mt-5"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Notification />
    </section>
  );
}
