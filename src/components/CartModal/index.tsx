"use client";

import { useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context/global-context";
import { deleteCartItem, getAllCartItems } from "@/services/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastPosition } from "react-toastify";
import ComponentLevelLoader from "../Loaders/ComponentLevelLoader";

export default function CartModal() {
  const {
    showCartModal,
    setShowCartModal,
    user,
    cartItems,
    setCartItems,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);
  const router = useRouter();

  const fetchAllCartItems = async () => {
    if (user !== null) {
      const response = await getAllCartItems(user?._id);

      if (response.success) {
        setCartItems(response.data);
        localStorage.setItem("cartItems", JSON.stringify(response.data));
      }
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
    <CommonModal
      show={showCartModal}
      setShow={setShowCartModal}
      showButtons={true}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="my-6 divide-y divide-gray-300">
            {cartItems.map((cartItem) => (
              <li
                key={cartItem && cartItem.productId && cartItem.productId._id}
                className="flex py-6"
              >
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={
                      cartItem &&
                      cartItem.productId &&
                      cartItem.productId.imageUrl
                    }
                    alt={
                      cartItem && cartItem.productId && cartItem.productId.name
                    }
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900 hover:underline">
                      <h3 onClick={() => setShowCartModal(false)}>
                        <Link
                          href={`/product/${
                            cartItem &&
                            cartItem.productId &&
                            cartItem.productId._id
                          }`}
                        >
                          {cartItem &&
                            cartItem.productId &&
                            cartItem.productId.name}
                        </Link>
                      </h3>
                    </div>

                    <p
                      className={`mt-1 text-sm text-gray-600 ${
                        cartItem &&
                        cartItem.productId &&
                        cartItem.productId.onSale === "yes"
                          ? "line-through"
                          : ""
                      }`}
                    >
                      ${" "}
                      {cartItem &&
                        cartItem.productId &&
                        cartItem.productId.price}
                    </p>
                    <div className="flex gap-2">
                      {cartItem &&
                      cartItem.productId &&
                      cartItem.productId.onSale === "yes" ? (
                        <p className="mt-1 text-sm text-red-600">{`$${(
                          cartItem.productId.price -
                          cartItem.productId.price *
                            (cartItem.productId.priceDrop / 100)
                        ).toFixed(2)}`}</p>
                      ) : null}
                      {cartItem &&
                      cartItem.productId &&
                      cartItem.productId.onSale === "yes" ? (
                        <p className="mt-1 text-sm text-gray-600 self-end">
                          -(${cartItem.productId.priceDrop}%)off
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
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
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-gray-900 flex items-center justify-center">
            <h1 className="text-xl">Cart is empty</h1>
          </div>
        )
      }
      buttonComponent={
        <div className="flex flex-col w-full">
          <button
            onClick={() => {
              router.push("/cart");
              setShowCartModal(false);
            }}
            type="button"
            className="btn-small"
          >
            Go To Cart
          </button>
          <button
            onClick={() => {
              setShowCartModal(false);
              router.push("/checkout");
            }}
            disabled={cartItems && cartItems.length === 0}
            type="button"
            className="btn-small"
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button
              onClick={() => {
                setShowCartModal(false);
                router.push("/product/listing/all-products");
              }}
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
      }
    />
  );
}
