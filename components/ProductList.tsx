"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { Product } from "@/types/productType";
import { getProducts } from "@/utils/products";

export default function ProductList({
  userId,
  status,
}: {
  userId?: string;
  status?: Product["status"];
}) {
  const productQuery = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getProducts(userId, status),
  });
  const { data: products, isLoading, error } = productQuery;

  if (isLoading) {
    return <div>Fetching Data</div>;
  }

  if (error || !products) {
    return <div>Error fetching data</div>;
  }

  if (products.length === 0) {
    return <div>No product in the database, consider adding some</div>;
  }

  return (
    <div className="w-full">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
