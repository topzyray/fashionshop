import ProductCard from "./ProductCard";
import ProductCardButton from "./ProductCardButton";

export type SizesType = {
  id: string;
  label: string;
};

export type ProductDetailsProps = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sizes: SizesType[];
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
        <div className="mt-10 grid sm:grid-cols-2 gap-6 md:grid-cols-4 sm:gap-4 lg:mt-16">
          {data && data.length
            ? data.map((item: ProductDetailsProps) => (
                <article
                  className="relative flex flex-col overflow-hidden border cursor-pointer hover:shadow-md transition-all ease-in-out duration-300"
                  key={item._id}
                >
                  <ProductCard item={item} />
                  <ProductCardButton item={item} />
                </article>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
