"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Button } from "./ui/button";
import { Product } from "@/types/productType";
import { getProducts } from "@/utils/products";

export default function ProductList() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isLoading) {
    return <div>Fetching Data</div>;
  }

  if (error || !products) {
    return <div>Error fetching data</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
