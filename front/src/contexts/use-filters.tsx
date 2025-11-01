import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { PriceRange, Stock } from "../types/filters";
import { useSet } from "react-use";
import type { Brand, Category } from "../types/product";

interface FilterContextType {
  category: string;
  selectedBrands: Set<string>;
  priceRange: PriceRange;
  stock: Stock;
  rating: number;
  searchQuery: string;
  updatePriceRange: (key: keyof PriceRange, value: number) => void;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setStock: React.Dispatch<React.SetStateAction<Stock>>;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  clearFilters: () => void;
  setBrand: (key: string) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<Category["title"]>("");
  const [selectedBrands, { toggle: setBrand, clear: clearSelectedBrands }] =
    useSet(new Set<Brand["title"]>([]));
  const [priceRange, setPriceRange] = useState<PriceRange>({
    priceFrom: 0,
    priceTo: 1000,
  });
  const [stock, setStock] = useState<Stock>("ALL");
  const [rating, setRating] = useState<number>(1);

  const updatePriceRange = (key: keyof PriceRange, value: number) => {
    setPriceRange((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setCategory("");
    clearSelectedBrands();
    setPriceRange({
      priceFrom: 0,
      priceTo: 1000,
    });
    setStock("ALL");
    setRating(1);
  };
  const value = useMemo(
    () => ({
      category,
      selectedBrands,
      priceRange,
      stock,
      rating,
      searchQuery,
      updatePriceRange,
      setCategory,
      setStock,
      setRating,
      clearFilters,
      setBrand,
      setSearchQuery,
    }),
    [searchQuery, category, selectedBrands, priceRange, stock, rating]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
