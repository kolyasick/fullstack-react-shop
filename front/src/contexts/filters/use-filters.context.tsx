import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type {
  FilterActions,
  FiltersState,
  PriceRange,
  Stock,
} from "../../types/filters";
import { useSet } from "react-use";

import { useLocation } from "react-router";
import type { Brand, Category } from "../../models/product/api";

type FilterProviderProps = {
  children: ReactNode;
};

export const FilterStateContext = createContext<FiltersState | undefined>(
  undefined
);
export const FilterActionsContext = createContext<FilterActions | undefined>(
  undefined
);

export const FilterProvider: React.FC<FilterProviderProps> = ({ children }) => {
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);

  const [page, setPage] = useState(urlParams.get("page") || null);
  const [searchQuery, setSearchQuery] = useState(
    urlParams.get("searchQuery") || ""
  );
  const [category, setCategory] = useState<Category["title"]>(
    urlParams.get("category") || ""
  );
  const [selectedBrands, { toggle: setBrand, clear: clearSelectedBrands }] =
    useSet(
      new Set<Brand["title"]>(
        Array.from(urlParams.get("brand")?.split(",") || [])
      )
    );
  const [priceRange, setPriceRange] = useState<PriceRange>({
    priceFrom: Number(urlParams.get("priceFrom") || 0),
    priceTo: Number(urlParams.get("priceTo") || 1000),
  });
  const [stock, setStock] = useState<Stock | null>(
    (urlParams.get("stock") as Stock) || "ALL"
  );
  const [rating, setRating] = useState<number | null>(
    Number(urlParams.get("rating")) || null
  );

  const updatePriceRange = (key: keyof PriceRange, value: number | null) => {
    setPriceRange((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setCategory("");
    clearSelectedBrands();
    setPriceRange({
      priceFrom: null,
      priceTo: null,
    });
    setStock(null);
    setRating(null);
    setPage(null);
  };

  const state = useMemo(
    (): FiltersState => ({
      category,
      selectedBrands,
      priceRange,
      stock,
      rating,
      searchQuery,
      page,
    }),
    [category, selectedBrands, priceRange, stock, rating, searchQuery, page]
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
      setPage,
    }),
    [
      updatePriceRange,
      setCategory,
      setStock,
      setRating,
      clearFilters,
      setBrand,
      setSearchQuery,
      setPage,
    ]
  );

  return (
    <FilterStateContext.Provider value={state}>
      <FilterActionsContext.Provider value={actions}>
        {children}
      </FilterActionsContext.Provider>
    </FilterStateContext.Provider>
  );
};
