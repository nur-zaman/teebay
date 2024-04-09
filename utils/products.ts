import { Product } from "@/types/productType";

export async function getProducts(
  userId?: string,
  status?: Product["status"]
): Promise<Product[]> {
  console.log("Fetching products");

  const queryParams: URLSearchParams = new URLSearchParams();
  if (userId) {
    queryParams.append("userId", userId);
  }
  if (status) {
    queryParams.append("status", status);
  }

  const route = `/api/products${queryParams.toString().length > 0 ? `?${queryParams.toString()}` : ""}`;

  const res = await fetch(route);

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.statusText}`);
  }

  const products = (await res.json()) as Product[];
  console.log(products);
  return products;
}

export async function deleteProduct(productId: string) {
  const response = await fetch("/api/delete-product", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  return response;
}
