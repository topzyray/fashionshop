"use client";
import { useContext } from "react";
import { ProductDetailsProps } from ".";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context/global-context";
import { deleteProduct } from "@/services/product";
import { toast, ToastPosition } from "react-toastify";
import ComponentLevelLoader from "../Loaders/ComponentLevelLoader";
import { addCartItem } from "@/services/cart";

type ProductDeleteType = Required<ProductDetailsProps>;
export type AddCardType = Required<ProductDetailsProps>;

export default function ProductCardButton({
  item,
}: {
  item: ProductDetailsProps;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const {
    setCurrentUpdatedProduct,
    componentLevelLoader,
    setComponentLevelLoader,
    user,
    setShowCartModal,
  } = useContext(GlobalContext);
  const isAdminView = pathName.includes("/admin");

  const handleDeleteProduct = async (item: ProductDeleteType) => {
    setComponentLevelLoader({ loading: true, id: item._id });
    const response = await deleteProduct(item._id);
    if (response.success) {
      toast.success(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      router.refresh();
    } else {
      toast.error(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  const handleAddToCart = async (item: AddCardType) => {
    setComponentLevelLoader({ loading: true, id: item._id });
    if (user !== null) {
      const response = await addCartItem({
        productId: item._id,
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

  return isAdminView ? (
    <div className="flex flex-col gap-y-[1px]">
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin/add-product");
        }}
        className="btn-small"
      >
        Update
      </button>
      <button
        onClick={() => handleDeleteProduct(item)}
        className="btn-small flex justify-center items-center bg-red-600"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text="Deleting Product"
            color="#ffffff"
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          "Delete"
        )}
      </button>
    </div>
  ) : (
    <button
      onClick={() => handleAddToCart(item)}
      className={`btn-small flex justify-center items-center`}
    >
      {componentLevelLoader &&
      componentLevelLoader.loading &&
      item._id === componentLevelLoader.id ? (
        <ComponentLevelLoader
          text="Adding to Cart"
          color="#ffffff"
          loading={componentLevelLoader && componentLevelLoader.loading}
        />
      ) : (
        "Add to Cart"
      )}
    </button>
  );
}
