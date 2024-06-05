"use client";
import { ProductDetailsProps } from ".";
import { usePathname } from "next/navigation";

export default function ProductCardButton({
  item,
}: {
  item: ProductDetailsProps;
}) {
  const pathName = usePathname();

  const isAdminView = pathName.includes("/admin");
  return isAdminView ? (
    <div className="flex flex-col gap-y-[1px]">
      <button className="btn-small">Update</button>
      <button className="btn-small">Delete</button>
    </div>
  ) : (
    <button className="btn-large">Add to Cart</button>
  );
}
