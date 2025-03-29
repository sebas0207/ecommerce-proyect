export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  soldOut?: boolean;
}