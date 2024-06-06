"use client";
import { useContext } from "react";
import { ProductDetailsProps } from ".";
import { usePathname, useRouter } from "next/navigation";
import { GlobalContext } from "@/context/global-context";

export default function ProductCardButton({
  item,
}: {
  item: ProductDetailsProps;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const { setCurrentUpdatedProduct } = useContext(GlobalContext);

  const isAdminView = pathName.includes("/admin");
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
      <button className="btn-small">Delete</button>
    </div>
  ) : (
    <button className="btn-large">Add to Cart</button>
  );
}
