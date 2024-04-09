import ProductList from "@/components/ProductList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MyProductsPage() {
  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">My Products</h1>

      <div className="flex flex-col gap-4 w-full ">
        <ProductList />
        <div className="m-2 self-end">
          <Button>
            <Link href="/create-product">Add Product</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
