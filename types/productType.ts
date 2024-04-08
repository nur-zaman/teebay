export interface Product {
  id: string;
  title: string;
  categories: string[];
  price: number;
  rent: number;
  description: string;
  date: string;
  views: number;
  status: "BOUGHT" | "RENTED" | "SOLD" | "BORROWED";
  rate: "YEAR" | "MONTH" | "WEEK" | "DAY";
}
