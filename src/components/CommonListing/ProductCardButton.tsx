"use client";
import { useContext } from "react";
import { ProductDetailsProps } from ".";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context/global-context";
import { deleteProduct } from "@/services/product";
import { toast, ToastPosition } from "react-toastify";
import ComponentLevelLoader from "../Loaders/ComponentLevelLoader";

type ProductDeleteType = Required<ProductDetailsProps>;

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
  } = useContext(GlobalContext);
  const isAdminView = pathName.includes("/admin");

  const handleDeleteProduct = async (item: ProductDeleteType) => {
    setComponentLevelLoader({ loading: true, id: item._id });
    const response = await deleteProduct(item._id);
    if (response.success) {
      toast.success(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: item._id });
      router.refresh();
    } else {
      toast.error(response.message, {
        position: "top-right" as ToastPosition,
      });
      setComponentLevelLoader({ loading: false, id: item._id });
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
    <button className="btn-large">Add to Cart</button>
  );
}
