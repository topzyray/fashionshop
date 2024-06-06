import CommonListing from "@/components/CommonListing/index";
import { getProductByCategory } from "@/services/product";

export default async function AllKidsProducts() {
  const filteredKidsProducts = await getProductByCategory("kids");
  return (
    <CommonListing data={filteredKidsProducts && filteredKidsProducts.data} />
  );
}
