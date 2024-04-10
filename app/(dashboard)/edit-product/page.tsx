"use client";
import EditProduct from "@/components/EditProduct";
import { Product } from "@/types/productType";
import { useSearchParams } from "next/navigation";

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
  const searchParam = useSearchParams();
  const productId = searchParam.get("productId");
  console.log(productId);

  return <EditProduct productId={productId} />;
  // return <div></div>;
}
