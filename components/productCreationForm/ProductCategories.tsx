"use client";

import React from "react";
import useStore from "@/store/useStore";
import Container from "./Container";


import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import MultipleSelector, { Option } from '@/components/ui/multiple-selector';


const CATEGORIES = [
  "ELECTRONICS",
  "FURNITURE",
  "HOME APPLIANCES",
  "SPORTING GOODS",
  "OUTDOOR",
  "TOYS",
];

const OPTIONS: Option[] = CATEGORIES.map((category) => ({
  label: category,
  value: category.toLowerCase(),
}));
  
  const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
  });
  
  const FormSchema = z.object({
    categories: z.array(optionSchema).min(1,{ message: "Select at least one category" }),
  });

type ValidationSchema = z.infer<typeof FormSchema>;

export default function ProductCategories() {
  const { product, step, setProduct, increaseStep,decreaseStep } = useStore(
    (state) => state
  );


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {categories: product.categories}
  });
  const {
    control,
    formState: { errors },
  } = form;

  const onSubmitHandler = (values: ValidationSchema) => {
    // console.log(values);
    setProduct({ ...product, ...values });
    console.log(step);
    increaseStep(2);
    console.log(step);
  };

  const onPrevious = () => {
    decreaseStep(step);
  };

  return (
    <Container onNext={form.handleSubmit(onSubmitHandler)} onPreviousStep={onPrevious}>
 <h1 className=" text-3xl text-center">Select Catagories</h1>
 <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitHandler)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              {/* <FormLabel><FormMessage>{errors.title?.message}</FormMessage></FormLabel> */}
              <FormControl>
                <MultipleSelector
                hidePlaceholderWhenSelected
                  value={field.value}
                  onChange={field.onChange}
                  defaultOptions={OPTIONS}
                  placeholder="Select a category"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      no results found.
                    </p>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
    </Container>
  );
}
