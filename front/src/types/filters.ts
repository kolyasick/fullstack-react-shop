export type PriceRange = {
  priceFrom?: number;
  priceTo?: number;
};

export type Stock = "STOCK" | "OUT_OF_STOCK" | "ALL";

export type StockFilterType = {
  title: string;
  value: Stock;
};

export type FiltersState = {
  category: string;
  selectedBrands: Set<string>;
  priceRange: PriceRange;
  stock: Stock;
  rating: number;
  searchQuery: string;
};

export type FilterActions =  {
  updatePriceRange: (key: keyof PriceRange, value: number) => void;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setStock: React.Dispatch<React.SetStateAction<Stock>>;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  clearFilters: () => void;
  setBrand: (key: string) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
