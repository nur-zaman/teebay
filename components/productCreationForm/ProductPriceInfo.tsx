"use client";

import React from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import useStore from "@/store/useStore";
import Container from "./Container";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  purchased: z.coerce
    .number()
    .min(1, { message: "Purchase price is required" }),
  rent: z.coerce.number().min(1, { message: "Rent price is required" }),
  rate: z.string().min(1, { message: "Can't be empty" }),
});

type ValidationSchema = z.infer<typeof formSchema>;

export default function ProductPriceInfo() {
  const { product, step, setProduct, increaseStep, decreaseStep } = useStore(
    (state) => state
  );
  const form = useForm<ValidationSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchased: product.priceInfo.purchased,
      rent: product.priceInfo.rent,
      rate: product.priceInfo.rate,
    },
  });

  const {
    control,
    formState: { errors },
  } = form;

  const onSubmitHandler = (values: ValidationSchema) => {
    console.log(values);
    console.log(product);
    setProduct({ ...product, ...{ priceInfo: values } });
    increaseStep(4);

    console.log(values);
    console.log(product);
  };

  return (
    <Container
      onNext={form.handleSubmit(onSubmitHandler)}
      onPreviousStep={() => decreaseStep(step)}
    >
      <h1 className="text-3xl text-center">Select price</h1>

      <Form {...form}>
        <form
          className="flex flex-col gap-6"
          onSubmit={() => form.handleSubmit(onSubmitHandler)}
        >
          <FormField
            control={control}
            name="purchased"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-c-primary-marine-blue flex items-center justify-between">
                  Purchase price
                  <FormMessage>{errors.purchased?.message}</FormMessage>
                </FormLabel>
                <FormControl>
                  <Input
                    type={`number`}
                    className={cn(
                      "placeholder:font-medium placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue",
                      {
                        "border-c-primary-strawberry-red":
                          errors.purchased?.message,
                      }
                    )}
                    placeholder="0.00"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <div>
            <h2 className="text-lg font-semibold text-c-primary-marine-blue">
              Rent
            </h2>

            <div className="flex items-center gap-6 mt-2">
              <FormField
                control={form.control}
                name="rent"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex-row inline-flex items-center">
                        <Input
                          type={`number`}
                          className={cn(
                            "w-24 placeholder:font-medium placeholder:text-c-neutral-cool-gray border-c-neutral-light-gray text-c-primary-marine-blue",
                            {
                              "border-c-primary-strawberry-red":
                                errors.rent?.message,
                            }
                          )}
                          placeholder="0.0"
                          {...field}
                        />
                        <span>$</span>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-56">
                          <SelectValue placeholder="Select option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="day">Per day</SelectItem>
                            <SelectItem value="week">Per week</SelectItem>
                            <SelectItem value="month">Per month</SelectItem>
                            <SelectItem value="year">Per year</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {errors.rent && (
              <FormMessage className="mt-2">{errors.rent?.message}</FormMessage>
            )}
          </div>
        </form>
      </Form>
    </Container>
  );
}
