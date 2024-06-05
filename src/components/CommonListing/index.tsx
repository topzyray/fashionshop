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

const data: ProductDetailsProps[] = [
  {
    _id: "666088375e38ea923863bbb8",
    name: "Men Sneakers",
    description: "This is a nice men speaker. Very good for grand ceremonies",
    price: 500,
    category: "kids",
    sizes: [
      {
        id: "m",
        label: "M",
      },
      {
        id: "l",
        label: "L",
      },
      {
        id: "s",
        label: "S",
      },
    ],
    deliveryInfo: "No 5, Oke aro, Akure",
    onSale: "no",
    priceDrop: 5,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/fashionshop-b5163.appspot.com/o/fashionshop%2Fprint%201.png-1717602234497-bpytt39ls7?alt=media&token=b700d998-1952-4689-8812-c4b647ed60ee",
  },
  {
    _id: "666088375e38ea923863bbb8",
    name: "Men Sneakers",
    description: "This is a nice men speaker. Very good for grand ceremonies",
    price: 500,
    category: "kids",
    sizes: [
      {
        id: "m",
        label: "M",
      },
      {
        id: "l",
        label: "L",
      },
      {
        id: "s",
        label: "S",
      },
    ],
    deliveryInfo: "No 5, Oke aro, Akure",
    onSale: "no",
    priceDrop: 5,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/fashionshop-b5163.appspot.com/o/fashionshop%2Fprint%201.png-1717602234497-bpytt39ls7?alt=media&token=b700d998-1952-4689-8812-c4b647ed60ee",
  },
  {
    _id: "666088375e38ea923863bbb8",
    name: "Men Sneakers",
    description: "This is a nice men speaker. Very good for grand ceremonies",
    price: 500,
    category: "kids",
    sizes: [
      {
        id: "m",
        label: "M",
      },
      {
        id: "l",
        label: "L",
      },
      {
        id: "s",
        label: "S",
      },
    ],
    deliveryInfo: "No 5, Oke aro, Akure",
    onSale: "yes",
    priceDrop: 5,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/fashionshop-b5163.appspot.com/o/fashionshop%2Fprint%201.png-1717602234497-bpytt39ls7?alt=media&token=b700d998-1952-4689-8812-c4b647ed60ee",
  },
  {
    _id: "666088375e38ea923863bbb8",
    name: "Men Sneakers",
    description: "This is a nice men speaker. Very good for grand ceremonies",
    price: 500,
    category: "kids",
    sizes: [
      {
        id: "m",
        label: "M",
      },
      {
        id: "l",
        label: "L",
      },
      {
        id: "s",
        label: "S",
      },
    ],
    deliveryInfo: "No 5, Oke aro, Akure",
    onSale: "yes",
    priceDrop: 5,
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/fashionshop-b5163.appspot.com/o/fashionshop%2Fprint%201.png-1717602234497-bpytt39ls7?alt=media&token=b700d998-1952-4689-8812-c4b647ed60ee",
  },
];

export default function CommonListingGrid() {
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
