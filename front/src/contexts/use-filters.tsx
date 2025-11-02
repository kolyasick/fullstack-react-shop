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
import { useLocation } from "react-router";

interface FilterState {
  category: string;
  selectedBrands: Set<string>;
  priceRange: PriceRange;
  stock: Stock;
  rating: number;
  searchQuery: string;
}

interface FilterActions {
  updatePriceRange: (key: keyof PriceRange, value: number) => void;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setStock: React.Dispatch<React.SetStateAction<Stock>>;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  clearFilters: () => void;
  setBrand: (key: string) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

type FilterProviderProps = {
  children: ReactNode;
};

const FilterStateContext = createContext<FilterState | undefined>(undefined);
const FilterActionsContext = createContext<FilterActions | undefined>(
  undefined
);

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState(urlParams.get("q") || "");
  const [category, setCategory] = useState<Category["title"]>(
    urlParams.get("category") || ""
  );
  const [selectedBrands, { toggle: setBrand, clear: clearSelectedBrands }] =
    useSet(
      new Set<Brand["title"]>(
        Array.from(urlParams.get("brand")?.split(", ") || [])
      )
    );
  const [priceRange, setPriceRange] = useState<PriceRange>({
    priceFrom: Number(urlParams.get("priceFrom") || 0),
    priceTo: Number(urlParams.get("priceTo") || 1000),
  });
  const [stock, setStock] = useState<Stock>(
    (urlParams.get("stock") as Stock) || "ALL"
  );
  const [rating, setRating] = useState<number>(
    Number(urlParams.get("rating") || 1)
  );

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

  const state = useMemo(
    (): FilterState => ({
      category,
      selectedBrands,
      priceRange,
      stock,
      rating,
      searchQuery,
    }),
    [category, selectedBrands, priceRange, stock, rating, searchQuery]
  );

  const actions = useMemo(
    (): FilterActions => ({
      updatePriceRange,
      setCategory,
      setStock,
      setRating,
      clearFilters,
      setBrand,
      setSearchQuery,
    }),
    []
  );

  return (
    <FilterStateContext.Provider value={state}>
      <FilterActionsContext.Provider value={actions}>
        {children}
      </FilterActionsContext.Provider>
    </FilterStateContext.Provider>
  );
};

export const useFilter = () => {
  const state = useContext(FilterStateContext);
  const actions = useContext(FilterActionsContext);

  if (state === undefined || actions === undefined) {
    throw new Error("useFilter must be used within a FilterProvider");
  }

  return { ...state, ...actions };
};

export const useFilterState = () => {
  const context = useContext(FilterStateContext);
  if (context === undefined) {
    throw new Error("useFilterState must be used within a FilterProvider");
  }
  return context;
};

export const useFilterActions = () => {
  const context = useContext(FilterActionsContext);
  if (context === undefined) {
    throw new Error("useFilterActions must be used within a FilterProvider");
  }
  return context;
};
