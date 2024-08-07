import Notification from "../Notification";
import ProductCard from "./ProductCard";
import ProductCardButton from "./ProductCardButton";
import Link from "next/link";

export type SizesType = {
  id: string;
  label: string;
};

export type ProductDetailsProps = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: SizesType[] | [];
  deliveryInfo: string;
  onSale: string;
  priceDrop: number;
  imageUrl: string;
};

export default function CommonListingGrid({
  data,
}: {
  data: ProductDetailsProps[];
}) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid sm:grid-cols-2 gap-6 lg:grid-cols-4 sm:gap-4 lg:mt-16">
          {data && data.length ? (
            data.map((item: ProductDetailsProps) => (
              <article
                className="rounded-xl relative flex flex-col overflow-hidden border cursor-pointer hover:shadow-md transition-all ease-in-out duration-300"
                key={item._id}
              >
                <Link href={`/product/${item._id}`}>
                  <ProductCard item={item} />
                </Link>
                <ProductCardButton item={item} />
              </article>
            ))
          ) : (
            <div className="w-full">
              <h1 className="font-semibold text-lg">
                No product found. Please check back later.
              </h1>
            </div>
          )}
        </div>
      </div>
      {/* <Notification /> */}
    </section>
  );
}
