export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  stockQuantity: number;
  discount?: number;
  imageName?: string;
  imageType?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductCard extends Product {
  userAddedQuantity?: number;
}

export interface ProductFilterState {
  searchTerm: string;
  category: string;
  inStockOnly: boolean;
  sortBy: ProductSortBy;
}

export type ProductSortBy =
  | 'featured'
  | 'priceLowToHigh'
  | 'priceHighToLow'
  | 'discountHighToLow'
  | 'nameAToZ';
