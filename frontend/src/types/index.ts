export interface Car {
  id: number;
  name: string;
  type: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  location: string;
  transmission: string;
  fuel: string;
  passengers: number;
  features: string[];
  available: boolean;
  popular: boolean;
}

export interface Filters {
  location: string;
  dateFrom: string;
  dateTo: string;
  priceRange: [number, number];
  carType: string;
  transmission: string;
  fuelType: string;
  passengers: string;
}

export type ViewMode = 'grid' | 'list';
export type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating'; 