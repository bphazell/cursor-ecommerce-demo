export type Category =
  | "outerwear"
  | "tops"
  | "bottoms"
  | "footwear"
  | "accessories"
  | "home";

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  category: Category;
  image: string;
  images?: string[];
  colors: string[];
  sizes?: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  features: string[];
  materials?: string;
}

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  image: string;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface ShippingAddress {
  name: string;
  email: string;
  address: string;
  zip: string;
}

export interface OrderLine {
  productId: string;
  productSlug: string;
  productName: string;
  productImage: string;
  selectedSize?: string;
  selectedColor?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface Order {
  orderNumber: string;
  placedAt: string;
  items: OrderLine[];
  shipping: ShippingAddress;
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
}
