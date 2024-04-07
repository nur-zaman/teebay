import { StateCreator } from "zustand";
import { Option } from "@/components/ui/multiple-selector";

type Product = {
  title: string;
  categories: Option[];
  description: string;
  priceInfo: {
    price: number;
    rent: number;
    rate: string;
  };
};

type ProductSlice = {
  product: Product;
  setProduct: (data: Product) => void;
  // setProductTitle: (title: string) => void;
  // setProductCategories: (categories: string[]) => void;
  // setProductDescription: (description: string) => void;
  // setProductPriceInfo: (priceInfo: { purchased: number; rent: number; rate: string; }) => void;
};

const initialState: Product = {
  title: "",
  categories: [],
  description: "",
  priceInfo: {
    price: 0,
    rent: 0,
    rate: "",
  },
};

const createProductSlice: StateCreator<ProductSlice> = (set) => ({
  //     product: initialState,

  //   setProduct: (data) =>
  //     set((state) => ({ product: { ...state.product, ...data } })),

  product: initialState,
  // title: "",
  setProduct: (data) => set(() => ({ product: data })),
  // setProductTitle: (title) => set((state) => ({ title: state.title })),
  // setProductCategories: (categories) => set((state) => ({ product: {...state.product, categories } })),
  // setProductDescription: (description) => set((state) => ({ product: {...state.product, description } })),
  // setProductPriceInfo: (priceInfo) => set((state) => ({ product: {...state.product, priceInfo } })),
});

export default createProductSlice;
export type { Product, ProductSlice };
