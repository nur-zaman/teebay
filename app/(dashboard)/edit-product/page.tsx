import EditProduct from "@/components/EditProduct";
import { Product } from "@/types/productType";

const product: Product = {
  id: "1",
  title: "iPhone 13 pro max",
  description: "Latest iphone 13 max. Bought from the Apple store.",
  price: 1500,
  rent: 50,
  status: "BOUGHT",
  rate: "YEAR",
  userId: "1",
  categories: [
    { id: "1", name: "Electronics" },
    { id: "2", name: "Phones" },
  ],
};

export default function MyProductsPage() {
  // return <EditProduct product={product} />;
  return <div></div>;
}
