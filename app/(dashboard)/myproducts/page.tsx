import ProductList from "@/components/ProductList";
import { Product } from '@/types/productType';
export default function MyProductsPage ()  {
    const mockProducts:Product[] = [
        {
          title: 'Cricket Kit',
          categories: ['Sporting Goods', 'Outdoor'],
          price: 500,
          rent: '100 daily',
          description:
            '2016 cricket kit brand new in box. Never used. Bought from the shop. Professional kit. Pick up item please.',
          date: '21st August 2020',
          views: 156,
        },

        {
            title: 'Cricket Kit',
            categories: ['Sporting Goods', 'Outdoor'],
            price: 500,
            rent: '100 daily',
            description:
              '2016 cricket kit brand new in box. Never used. Bought from the shop. Professional kit. Pick up item please.',
            date: '21st August 2020',
            views: 156,
          },
          {
            title: 'Cricket Kit',
            categories: ['Sporting Goods', 'Outdoor'],
            price: 500,
            rent: '100 daily',
            description:
              '2016 cricket kit brand new in box. Never used. Bought from the shop. Professional kit. Pick up item please.2016 cricket kit brand new in box. Never used. Bought from the shop. Professional kit. Pick up item please.2016 cricket kit brand new in box. Never used. Bought from the shop. Professional kit. Pick up item please.',
            date: '21st August 2020',
            views: 156,
          },
          {
            title: 'Cricket Kit',
            categories: ['Sporting Goods', 'Outdoor'],
            price: 500,
            rent: '100 daily',
            description:
              '2016 cricket kit brand new in box. Never used. Bought from the shop. Professional kit. Pick up item please.2016 cricket kit brand new in box. Never used. Bought from the shop. Professional kit. Pick up item please.2016 cricket kit brand new in box. Never used. Bought from the shop. Professional kit. Pick up item please.',
            date: '21st August 2020',
            views: 156,
          },

      ];

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">My Products</h1>
      <ProductList products={mockProducts} />
    </div>
  );
};
