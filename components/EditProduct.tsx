// EditProduct.tsx

import React, { useState } from "react";

interface Product {
  title: string;
  categories: string[];
  description: string;
  price: number;
  rent: {
    amount: number;
    period: string;
  };
}

interface EditProductProps {
  product: Product;
  onSave: (updatedProduct: Product) => void;
}

const EditProduct: React.FC<EditProductProps> = ({ product, onSave }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProduct({
      ...updatedProduct,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(updatedProduct); // Pass the updated product to the parent component
  };

  return (
    <div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={updatedProduct.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="categories">Categories</label>
        {/* Implement your category input/selection component here */}
        <input
          type="text"
          id="categories"
          name="categories"
          value={updatedProduct.categories.join(", ")}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={updatedProduct.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={updatedProduct.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="rentAmount">Rent</label>
        <input
          type="number"
          id="rentAmount"
          name="rentAmount"
          value={updatedProduct.rent.amount}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              rent: { ...updatedProduct.rent, amount: Number(e.target.value) },
            })
          }
        />
        <select
          name="rentPeriod"
          value={updatedProduct.rent.period}
          onChange={(e) =>
            setUpdatedProduct({
              ...updatedProduct,
              rent: { ...updatedProduct.rent, period: e.target.value },
            })
          }
        >
          <option value="hr">per hr</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <button onClick={handleSave}>Edit Product</button>
    </div>
  );
};

export default EditProduct;
