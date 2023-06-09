import { Category } from './category';

export class Product {
  id?: string;
  name?: string;
  namear?: string;
  description?: string;
  descriptionar?: string;
  richDescription?: string;
  image?: string;
  images?: string[];
  brand?: string;
  price?: number;
  category?: Category;
  countInStock?: number;
  rating?: number;
  numReviews?: number;
  isFeatured?: boolean;
  
}
