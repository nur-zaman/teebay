"use client";

import React, { useState } from "react";
import * as z from "zod";
import useStore from "@/store/useStore";
import Container from "./Container";
import { createProduct } from "@/utils/products";
import { useRouter } from "next/navigation";
import { Product as ProductDTO } from "@/types/productType";

export default function ProductSummary() {
  const { product, step, decreaseStep, resetStep, resetProduct } = useStore(
    (state) => state
  );
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onPrevious = () => {
    decreaseStep(step);
  };

  const handleProductCreation = async () => {
    const formattedProduct: ProductDTO = {
      userId: "b1c23d9b-7edb-4dde-8fc7-5f16660b093e",
      title: product.title,
      description: product.description,
      price: product.priceInfo.price,
      rent: product.priceInfo.rent,
      rate: product.priceInfo.rate.toUpperCase() as ProductDTO["rate"],
      categories: product.categories.map((cat) => ({ name: cat.label })),
    };
    try {
      const res = await createProduct(formattedProduct);
      if (!error && res.ok) router.push("/myproducts");
      resetStep();
      resetProduct();
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
