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
        brand: Array.from(filters.selectedBrands).join(", "),

        priceRange: undefined,
      };

      const query = qs.stringify(params, {
        arrayFormat: "comma",
      });

      navigate(`?${query}`, {
        replace: true,
      });

    }

    isMounted.current = true;
  }, [filters]);
};
