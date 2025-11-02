import CategoryFilter from "./category-filter";
import BrandFilter from "./brand-filter";
import FiltersHeader from "./filters-header";
import PriceFilter from "./price-filter";

import RatingFilter from "./rating-filter";
import type { Brand, Category } from "../../../types/product";

import StockFilter from "./stock-filter";
import { useFilter } from "../../../contexts/use-filters";

type Props = {
  categories: Category[];
  brands: Brand[];
};

const Filters: React.FC<Props> = ({ brands, categories }) => {
  const {
    category,
    setCategory,
    priceRange,
    updatePriceRange,
    rating,
    setRating,
    selectedBrands,
    setBrand,
    stock,
    setStock,
    clearFilters,
  } = useFilter();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <FiltersHeader clearFilters={clearFilters} />

      <CategoryFilter
        categories={categories}
        selectedCategory={category}
        setCategory={setCategory}
      />

      <BrandFilter
        brands={brands}
        selectedBrands={selectedBrands}
        setBrand={setBrand}
      />

      <PriceFilter priceRange={priceRange} setPriceRange={updatePriceRange} />

      <StockFilter setStock={setStock} stockFilter={stock} />

      <RatingFilter selectedRaging={rating} setRating={setRating} />
    </div>
  );
};

export default Filters;
