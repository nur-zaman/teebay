import { Trash2 } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/productType";

export default function ProductCard({ product }: { product: Product }) {
  const { title, categories, price, rent, description, createdAt, rate } =
    product;

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">
            Categories:{" "}
            {categories.length > 0
              ? categories.map((cat) => cat.name).join(", ")
              : "No categories"}
          </p>
        </div>
        <button className="text-gray-400 hover:text-red-500">
          <span className="sr-only">Delete</span>
          <Trash2 />
        </button>
      </div>
      <p className="mt-2">
        Price: ${price} | Rent: ${rent} per {rate.toLowerCase()}
      </p>
      <p className="mt-2 text-gray-700 line-clamp-3">{description}</p>
      {description.length > 200 && (
        <Link href="#" className="text-blue-500 hover:text-blue-700">
          More Details
        </Link>
      )}
      <div className=" flex justify-between w-full mt-2 text-xs text-gray-500 gap-x-14">
        <span>
          Date posted:{" "}
          {new Date(createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span className="">{0} views</span>
      </div>
    </div>
  );
}
