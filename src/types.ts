export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  brand: string;
  soldOut?: boolean;
  gender?: "Hombre" | "Mujer" | "Unisex";
}

export interface ProductFilters {
  gender?: string[];
  brand?: string[];
  price?: string[];
}