import CommonDetails from "@/components/CommonDetails";
import { getProductById } from "@/services/product";

export default async function ProductDetailsPage({
  params,
}: {
  params: { details: string };
}) {
  const productDetailsData = await getProductById(params.details);

  return <CommonDetails data={productDetailsData && productDetailsData.data} />;
}
