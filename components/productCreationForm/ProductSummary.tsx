"use client";

import React from "react";
import * as z from "zod";

import useStore from "@/store/useStore";
import Container from "./Container";

const formSchema = z.object({
  description: z.string().min(1, { message: "Description is required" }),
});

export default function ProductSummary() {
  const { product, step, increaseStep, decreaseStep } = useStore(
    (state) => state
  );

  const onPrevious = () => {
    decreaseStep(step);
  };

  return (
    <Container onNext={() => {}} onPreviousStep={onPrevious}>
      <h1 className=" text-3xl text-center">Product Summary</h1>
      <div>
        <ul className="">
          <li className="">Title: {product.title}</li>
          <li className="">
            Categories: {product.categories.map((cat) => cat.label).join(", ")}
          </li>
          <li className="">Description: {product.description}</li>
          <li className="">
            Price: ${product.priceInfo.purchased}, To Rent: $
            {product.priceInfo.rent} per {product.priceInfo.rate}
          </li>
        </ul>
      </div>
    </Container>
  );
}
