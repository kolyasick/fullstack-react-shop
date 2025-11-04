import {
  BrandFilter,
  CategoryFilter,
  FiltersHeader,
  PriceFilter,
  RatingFilter,
  StockFilter,
} from "../../../components";
import { useFilterActions } from "../../../contexts/filters/use-filter-actions";
import { useFilterState } from "../../../contexts/filters/use-filter-state";

import { useQueryFilters } from "../../../hooks/use-query-filters";
import type { Brand, Category } from "../../../models/product/api";

type Props = {
  categories: Category[];
  brands: Brand[];
};

export const Filters: React.FC<Props> = ({ brands, categories }) => {
  const filterState = useFilterState();
  const {
    clearFilters,
    setBrand,
    setCategory,
    setRating,
    setStock,
    updatePriceRange,
  } = useFilterActions();

  useQueryFilters(filterState);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <FiltersHeader clearFilters={clearFilters} />

      <CategoryFilter
        categories={categories}
        selectedCategory={filterState.category}
        setCategory={setCategory}
      />

      <BrandFilter
        brands={brands}
        selectedBrands={filterState.selectedBrands}
        setBrand={setBrand}
      />

      <PriceFilter
        priceRange={filterState.priceRange}
        setPriceRange={updatePriceRange}
      />

      <StockFilter setStock={setStock} stockFilter={filterState.stock} />

      <RatingFilter selectedRaging={filterState.rating} setRating={setRating} />
    </div>
  );
};
