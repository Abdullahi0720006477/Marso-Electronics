export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  shortDescription: string;
  description: string;
  rating: number;
  reviews: number;
  brand: string;
  category: string;
  stock: number;
  specifications: {
    [key: string]: string;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}
