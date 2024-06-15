import Image from "next/image";
import { ProductDetailsProps } from ".";

export default function ProductCard({ item }: { item: ProductDetailsProps }) {
  return (
    <div className="">
      <div className=" aspect-video h-auto">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={100}
          height={100}
          className="rounded-t-xl h-full w-full object-cover transition-all ease-in-out duration-300 group-hover:scale-125"
          priority
        />
        {item.onSale === "yes" ? (
          <div className="absolute z-10 top-0 m-2 rounded-full bg-dark-blue">
            <p className="rounded-full bg-red-600 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
              Sale
            </p>
          </div>
        ) : null}
        <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
          <div className="mb-2 flex">
            <p
              className={`mr-3 text-sm font-semibold ${
                item.onSale === "yes" ? "line-through" : ""
              }`}
            >{`$${item.price}`}</p>
            {item.onSale === "yes" ? (
              <p className="mr-3 text-sm font-semibold text-red-600">{`$${(
                item.price -
                item.price * (item.priceDrop / 100)
              ).toFixed(2)}`}</p>
            ) : null}
            {item.onSale === "yes" ? (
              <p className="mr-3 text-sm font-semibold">
                -(${item.priceDrop}%)off
              </p>
            ) : null}
          </div>
          <h3 className="mb-2 text-gray-400 text-sm">{item.name}</h3>
        </div>
      </div>
    </div>
  );
}
