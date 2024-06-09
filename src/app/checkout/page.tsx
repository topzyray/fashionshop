"use client";

import { GlobalContext } from "@/context/global-context";
import { getAllAddress } from "@/services/address";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState<boolean | null>(null);
  const router = useRouter();
  const {
    cartItems,
    user,
    addresses,
    setAddresses,
    checkoutFormData,
    setCheckoutFormData,
  } = useContext(GlobalContext);

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
                  ₦
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
                  ₦
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
    </section>
  );
}
