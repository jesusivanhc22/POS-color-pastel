export interface ProductVariant {
  id: string;
  model: string;
  color: string;
  size?: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  basePrice: number;
  variants: ProductVariant[];
}

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  model: string;
  color: string;
  size?: string;
  price: number;
  quantity: number;
  image: string;
}