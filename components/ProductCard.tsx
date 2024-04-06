import { Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Product } from '@/types/productType';

export default function ProductCard ({ product }:{product:Product}){
  const { title, categories, price, rent, description, date, views } = product;

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-600">Categories: {categories.join(', ')}</p>
        </div>
        <button className="text-gray-400 hover:text-red-500">
          <span className="sr-only">Delete</span>
          <Trash2 />
        </button>
      </div>
      <p className="mt-2">
        Price: ${price} | Rent: ${rent}
      </p>
      <p className="mt-2 text-gray-700 line-clamp-3">{description}</p>
      {description.length > 200 && (
        <Link href="#" className="text-blue-500 hover:text-blue-700">More Details
        </Link>
      )}
      <div className=" flex mt-2 text-xs text-gray-500 gap-x-14">
        <span>Date posted: {date}</span>
        <span className="">{views} views</span>
      </div>
    </div>
  );
};
