import CommonListing from "@/components/CommonListing/index";
import { getProductByCategory } from "@/services/product";

export default async function AllMenProducts() {
  const filteredMenProducts = await getProductByCategory("men");
  console.log(filteredMenProducts);

  return (
    <CommonListing data={filteredMenProducts && filteredMenProducts.data} />
  );
}
