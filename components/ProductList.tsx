"use client";

import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Product } from "@/types/productType";
import { getProducts } from "@/utils/products";

type productListProps = {
  userId?: string;
  status?: string | null;
  onclickURL: string;
  exceptUserId?: string;
  exceptStatus?: string;
  hideDeleteButton?: boolean;
};

export default function ProductList({
  userId,
  status,
  onclickURL,
  exceptUserId,
  exceptStatus,
  hideDeleteButton,
}: productListProps) {
  const productQuery = useQuery<Product[]>({
    queryKey: ["products", userId, status, exceptUserId, exceptStatus],
    queryFn: () => getProducts(userId, status, exceptUserId, exceptStatus),
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
          status={status}
          onclickURL={onclickURL}
          hideDeleteButton={hideDeleteButton}
        />
      ))}
    </div>
  );
}
