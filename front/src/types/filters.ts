export type PriceRange = {
  priceFrom: number | null;
  priceTo: number | null;
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
  stock: Stock | null;
  rating: number | null;
  searchQuery: string;
  page: string | null;
};

export type FilterActions = {
  updatePriceRange: (key: keyof PriceRange, value: number | null) => void;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setStock: React.Dispatch<React.SetStateAction<Stock | null>>;
  setRating: React.Dispatch<React.SetStateAction<number | null>>;
  clearFilters: () => void;
  setBrand: (key: string) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<string | null>>;
};
