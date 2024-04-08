export interface Product {
  id: string;
  title: string;
  categories: string[];
  price: number;
  rent: number;
  description: string;
  date: string;
  views: number;
  status: "active" | "inactive";
  rate: "YEAR" | "MONTH" | "WEEK" | "DAY";
}
