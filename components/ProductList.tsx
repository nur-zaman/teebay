import ProductCard from './ProductCard';
import { Button } from './ui/button';
import { Product } from '@/types/productType';

export default function ProductList ({ products }:{products:Product[]})  {
  return (
    <div className="flex flex-col gap-4 max-w-screen-lg">
      {products.map((product,index) => (
        <ProductCard key={index} product={product} />
      ))}
                  <div  className='m-2 self-end'>
            <Button >Add Product</Button>
            </div>
    </div>
  );
};
