"use client";

import React, { useState } from "react";
import useStore from "@/store/useStore";
import Container from "./Container";
import { createProduct } from "@/utils/products";
import { redirect, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Product as ProductDTO } from "@/types/productType";

export default function ProductSummary() {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    redirect("/");
    throw new Error("User ID invalid");
  }
  const { product, step, decreaseStep, resetStep, resetProduct } = useStore(
    (state) => state
  );
  const router = useRouter();
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);

  const onPrevious = () => {
    decreaseStep(step);
  };

  const handleProductCreation = async () => {
    const formattedProduct: ProductDTO = {
      userId: userId,
      title: product.title,
      description: product.description,
      price: product.priceInfo.price,
      rent: product.priceInfo.rent,
      rate: product.priceInfo.rate.toUpperCase() as ProductDTO["rate"],
      categories: product.categories.map((cat) => ({ name: cat.label })),
    };
    try {
      const res = await createProduct(formattedProduct);
      if (!error && res.ok) {
        await queryClient.invalidateQueries({ queryKey: ["products"] });

        resetStep();
        resetProduct();
        router.push("/my-products");
      }
    } catch (error) {
      console.error("Error creating product:", error);
      setError(
        "An error occurred while creating the product. Please try again later."
      );
    }
  };

  return (
    <Container onNext={handleProductCreation} onPreviousStep={onPrevious}>
      <h1 className=" text-3xl text-center">Product Summary</h1>
      <div>
        <ul className="">
          <li className="">Title: {product.title}</li>
          <li className="">
            Categories: {product.categories.map((cat) => cat.label).join(", ")}
          </li>
          <li className="">Description: {product.description}</li>
          <li className="">
            Price: ${product.priceInfo.price}, To Rent: $
            {product.priceInfo.rent} per {product.priceInfo.rate}
          </li>
        </ul>
      </div>
    </Container>
  );
}
