"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Product } from "@/types/productType";
import { getProducts } from "@/utils/products";

type productListProps = {
  userId?: string;
  status?: string;
  onclickURL: string;
};

export default function ProductList({
  userId,
  status,
  onclickURL,
}: productListProps) {
  const productQuery = useQuery<Product[]>({
    queryKey: ["products", userId],
    queryFn: () => getProducts(userId),
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
        <ProductCard
          key={product.id}
          product={product}
          onclickURL={onclickURL}
        />
      ))}
    </div>
  );
}
