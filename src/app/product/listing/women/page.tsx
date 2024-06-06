import CommonListing from "@/components/CommonListing/index";
import { getProductByCategory } from "@/services/product";

export default async function AllWomenProducts() {
  const filteredWomenProducts = await getProductByCategory("women");
  return (
    <CommonListing data={filteredWomenProducts && filteredWomenProducts.data} />
  );
}
