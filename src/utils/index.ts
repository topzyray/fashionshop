export type NavOptionsType = {
  id: string;
  label: string;
  path: string;
};

type StypeType = {
  button: string;
};

export const clientNavOptions: NavOptionsType[] = [
  {
    id: "home",
    label: "Home",
    path: "/",
  },
  {
    id: "listing",
    label: "All Products",
    path: "/product/listing/all-products",
  },
  {
    id: "listingMen",
    label: "Men",
    path: "/product/listing/men",
  },
  {
    id: "listingWomen",
    label: "Women",
    path: "/product/listing/women",
  },
  {
    id: "listingKids",
    label: "Kids",
    path: "/product/listing/kids",
  },
];

export const adminNavOptions: NavOptionsType[] = [
  {
    id: "adminListing",
    label: "Manage All Products",
    path: "/admin-view/all-products",
  },
  {
    id: "adminNewProduct",
    label: "Add New Product",
    path: "/admin-view/add-product",
  },
];

// export const styles = {
//   button: `mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white`,
// };
