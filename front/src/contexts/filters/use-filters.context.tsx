import React, { createContext, useMemo, useState, type ReactNode } from "react";
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
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  const [searchQuery, setSearchQuery] = useState(
    urlParams.get("searchQuery") || ""
  );
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
    setSearchQuery("");
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
    (): FiltersState => ({
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
