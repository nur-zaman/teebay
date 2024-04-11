"use client";
import { Product } from "@/types/productType";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { ConfirmAlert } from "./ConfirmAlert";
import { buyProduct, rentProduct } from "@/utils/products";
import { ProductRentMenu } from "./ProductRentMenu";

type Props = { productId: string; status?: string | null };

export default function ProductDetails({ productId, status }: Props) {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    console.log("please log in first");
    redirect("/");
    throw new Error("User ID invalid");
  }

  const router = useRouter();
  const queryClient = useQueryClient();
  const products: Product[] = queryClient.getQueryData([
    "products",
    undefined,
    null,
    undefined,
    undefined,
  ]) as Product[];

  const product: Product | undefined = products?.find(
    (p: Product) => p.id === productId
  );

  if (!product) {
    console.log("Product ID invalid");
    redirect(`/all-products`);
    throw new Error("Product ID invalid");
  }
  //   if (!userId) {
  //     alert("Please log in to purchase a product.");
  //     redirect(`/all-products`);
  //     throw new Error("User ID invalid");
  //   }

  const buyProductMutation = useMutation({
    mutationFn: ({
      userId,
      productId,
    }: {
      userId: string;
      productId: string;
    }) => buyProduct(userId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", undefined, null, undefined, undefined],
      });
      router.push("/all-products");
    },
    onError: (error) => {
      console.error("Error purchasing product:", error);
      alert("Failed to purchase product. Please try again later.");
    },
  });

  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());

  const rentProductMutation = useMutation({
    mutationFn: ({
      userId,
      productId,
      startDate,
      endDate,
    }: {
      userId: string;
      productId: string;
      startDate: Date;
      endDate: Date;
    }) => rentProduct(userId, productId, startDate, endDate),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products", undefined, null, undefined, undefined],
      });
      router.push("/all-products");
    },
    onError: (error) => {
      console.error("Error purchasing product:", error);
      alert("Failed to rent product. Please try again later.");
    },
  });

  const handleBuy = async () => {
    if (!userId) {
      alert("Please log in to purchase a product.");
      return;
    }

    try {
      await buyProductMutation.mutateAsync({ userId, productId });
    } catch (error) {
      console.error("Error in handleBuy:", error);
      // Additional error handling if needed
    }
  };

  const handleRentProduct = async () => {
    if (!userId) {
      alert("Please log in to rent a product.");
      return;
    }

    try {
      await rentProductMutation.mutateAsync({
        userId,
        productId,
        startDate,
        endDate,
      });
    } catch (error) {
      console.error("Error in handleBuy:", error);
      // Additional error handling if needed
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 min-w-[800px]">
      <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
      <p className="text-gray-600 mb-2">
        Categories:{" "}
        {product.categories.map((category) => category.name).join(", ")}
      </p>
      <p className="text-gray-600 mb-4">
        Price: ${product.price} | Rent: ${product.rent} per{" "}
        {product.rate.toString().toLowerCase()}
      </p>
      <p className="text-gray-700">{product.description}</p>
      <div className="flex justify-end mt-6 gap-2">
        <ProductRentMenu
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          handleRentProduct={handleRentProduct}
        >
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Rent
          </button>
        </ProductRentMenu>

        <ConfirmAlert
          optionYes="Yes"
          optionNo="No"
          yesAction={handleBuy}
          message="Are you sure you want to Buy this product?"
        >
          <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 hover:cursor-pointer">
            Buy
          </div>
        </ConfirmAlert>
      </div>
    </div>
  );
}
