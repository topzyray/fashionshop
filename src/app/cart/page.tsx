"use client";

import CommonCart from "@/components/CommonCart";
import { GlobalContext } from "@/context/global-context";
import { deleteCartItem, getAllCartItems } from "@/services/cart";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { toast, ToastPosition } from "react-toastify";

export default function CartPage() {
  const router = useRouter();
  const {
    user,
    cartItems,
    setCartItems,
    componentLevelLoader,
    setComponentLevelLoader,
    pageLevelLoader,
    setPageLevelLoader,
  } = useContext(GlobalContext);

  const fetchAllCartItems = async () => {
    if (user !== null) {
      const response = await getAllCartItems(user?._id);
      if (response.success) {
        setPageLevelLoader(false);
        setCartItems(response.data);
        localStorage.setItem("cartItems", JSON.stringify(response.data));
      } else {
        setPageLevelLoader(false);
      }
    }
  };

  useEffect(() => {
    if (user === null) {
      router.push("/login");
      return;
    }
    if (user !== null) {
      fetchAllCartItems();
    }
  }, [user]);

  if (pageLevelLoader === true) {
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

  const handleDeleteCartItem = async (cartItemId: string) => {
    setComponentLevelLoader({ loading: true, id: cartItemId });
    const response = await deleteCartItem(cartItemId);
    if (response.success) {
      toast.success(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      fetchAllCartItems();
    } else {
      toast.error(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  return (
    <CommonCart
      cartItems={cartItems}
      handleDeleteCartItem={handleDeleteCartItem}
      componentLevelLoader={componentLevelLoader}
    />
  );
}
