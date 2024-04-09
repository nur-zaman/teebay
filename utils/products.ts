import { Product } from "@/types/productType";

export async function getProducts() {
  console.log("Fetching products");
  const res = await fetch("/api/products");

  const products = (await res.json()) as Product[];
  console.log(products);
  return products;
}
