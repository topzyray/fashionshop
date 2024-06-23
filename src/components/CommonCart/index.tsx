import Notification from "../Notification";
import ComponentLevelLoader from "../Loaders/ComponentLevelLoader";
import { ProductDetailsProps } from "../CommonListing";
import Link from "next/link";

type CommonProductProps = Required<ProductDetailsProps>;

export type CartItem = {
  _id: string;
  productId: CommonProductProps;
  quantity: number;
};

type CommonCartProps = {
  cartItems: [] | CartItem[];
  handleDeleteCartItem: (cartItemId: string) => Promise<void>;
  componentLevelLoader: { loading: boolean; id: string };
};

export default function CommonCart({
  cartItems,
  handleDeleteCartItem,
  componentLevelLoader,
}: CommonCartProps) {
  return (
    <section className="h-screen bg-gray-100">
      <div className="mx-auto px-1 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 max-w-screen-xl px-2 sm:px-6 lg:px-8">
          <div className="bg-white max-w-4xl mx-auto shadow">
            <div className="px-2 py-6 sm:px-8 sm:py-10">
              <div className="flow-root">
                {cartItems && cartItems.length ? (
                  <ul className="-my-8">
                    {cartItems &&
                      cartItems.map((cartItem: CartItem) => (
                        <li
                          key={cartItem._id}
                          className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                        >
                          <div className="sm:shrink-0 flex gap-2 sm:flex-none">
                            <img
                              src={
                                cartItem &&
                                cartItem.productId &&
                                cartItem.productId.imageUrl
                              }
                              alt={
                                cartItem &&
                                cartItem.productId &&
                                cartItem.productId.name
                              }
                              className="h-24 w-24 max-w-full rounded-lg object-cover"
                            />
                            <div className="md:hidden flex flex-1 flex-col">
                              <div className="flex flex-col">
                                <div className="pr-0 sm:pr-4">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {cartItem &&
                                      cartItem.productId &&
                                      cartItem.productId.name}
                                  </p>
                                </div>

                                <p
                                  className={`text-sm font-semibold text-gray-950 ${
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

                                {cartItem &&
                                cartItem.productId &&
                                cartItem.productId.onSale === "yes" ? (
                                  <p className="text-sm font-semibold sm:order-1 text-red-600">{`$${(
                                    cartItem.productId.price -
                                    cartItem.productId.price *
                                      (cartItem.productId.priceDrop / 100)
                                  ).toFixed(2)}`}</p>
                                ) : null}
                                {cartItem &&
                                cartItem.productId &&
                                cartItem.productId.onSale === "yes" ? (
                                  <p className="text-xs text-gray-600">
                                    -(${cartItem.productId.priceDrop}%)off
                                  </p>
                                ) : null}

                                <p
                                  onClick={() =>
                                    handleDeleteCartItem(cartItem._id)
                                  }
                                  className="text-sm text-yellow-700 hover:underline"
                                >
                                  {componentLevelLoader &&
                                  componentLevelLoader.loading &&
                                  cartItem._id === componentLevelLoader.id ? (
                                    <ComponentLevelLoader
                                      text="Removing"
                                      color="#ca8a04"
                                      loading={
                                        componentLevelLoader &&
                                        componentLevelLoader.loading
                                      }
                                    />
                                  ) : (
                                    "Remove"
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="hidden md:flex flex-1 flex-col justify-between">
                            <div className="grid sm:grid-cols-2">
                              <div className="pr-8 sm:pr-4">
                                <Link
                                  href={`/product/${cartItem.productId._id}`}
                                >
                                  <p className="text-base font-semibold text-gray-900 cursor-pointer hover:underline">
                                    {cartItem &&
                                      cartItem.productId &&
                                      cartItem.productId.name}
                                  </p>
                                </Link>
                              </div>

                              <div className="mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                                <p
                                  className={`shrink-0 text-base font-semibold text-gray-950 sm:ml-0 sm:text-right ${
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

                                {cartItem &&
                                cartItem.productId &&
                                cartItem.productId.onSale === "yes" ? (
                                  <p className="shrink-0 text-base font-semibold sm:order-1 sm:ml-0 sm:text-right text-red-600">{`$${(
                                    cartItem.productId.price -
                                    cartItem.productId.price *
                                      (cartItem.productId.priceDrop / 100)
                                  ).toFixed(2)}`}</p>
                                ) : null}
                                {cartItem &&
                                cartItem.productId &&
                                cartItem.productId.onSale === "yes" ? (
                                  <p className="shrink-0 text-sm text-gray-600 self-end">
                                    -(${cartItem.productId.priceDrop}%)off
                                  </p>
                                ) : null}

                                <button
                                  onClick={() =>
                                    handleDeleteCartItem(cartItem._id)
                                  }
                                  type="button"
                                  className="font-medium text-yellow-700 sm:order-2 hover:underline"
                                >
                                  {componentLevelLoader &&
                                  componentLevelLoader.loading &&
                                  cartItem._id === componentLevelLoader.id ? (
                                    <ComponentLevelLoader
                                      text="Removing"
                                      color="#ca8a04"
                                      loading={
                                        componentLevelLoader &&
                                        componentLevelLoader.loading
                                      }
                                    />
                                  ) : (
                                    "Remove"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                ) : (
                  <h1 className="font-semibold text-lg">Cart is Empty</h1>
                )}
              </div>

              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Subtotal</p>
                  <p className="text-base sm:text-lg text-dark-blue font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) =>
                            (item.productId.onSale === "yes"
                              ? item.productId.price -
                                item.productId.price *
                                  (item.productId.priceDrop / 100)
                              : item.productId.price) + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Shipping</p>
                  <p className="text-base sm:text-lg text-dark-blue font-semibold">
                    $0
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">Total</p>
                  <p className="text-base sm:text-lg text-dark-blue font-semibold">
                    $
                    {cartItems && cartItems.length
                      ? cartItems.reduce(
                          (total, item) =>
                            (item.productId.onSale === "yes"
                              ? item.productId.price -
                                item.productId.price *
                                  (item.productId.priceDrop / 100)
                              : item.productId.price) + total,
                          0
                        )
                      : "0"}
                  </p>
                </div>

                <div className="flex justify-end">
                  <Link href="/checkout">
                    <button
                      disabled={cartItems && cartItems.length <= 0}
                      type="button"
                      className="group btn-small"
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Notification /> */}
    </section>
  );
}
