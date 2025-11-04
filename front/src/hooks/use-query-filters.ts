import { useEffect, useRef } from "react";
import type { FiltersState } from "../types/filters";
import { useNavigate } from "react-router";
import qs from "qs";

export const useQueryFilters = (filters: FiltersState) => {
  const isMounted = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters,
        priceFrom: filters.priceRange.priceFrom,
        priceTo: filters.priceRange.priceTo,
        brand: Array.from(filters.selectedBrands).join(","),
        page: filters.page,
        priceRange: undefined,
      };

      const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(([_, value]) => {
          if (value === "") return false;
          return true;
        })
      );

      const query = qs.stringify(cleanedParams, {
        arrayFormat: "comma",
        skipNulls: true,
        allowEmptyArrays: false,
      });

      navigate(`?${query}`, {
        replace: true,
        preventScrollReset: false,
      });
    }
    isMounted.current = true;
  }, [filters]);
};
