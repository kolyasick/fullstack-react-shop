import CategoryFilter from "./category-filter";
import BrandFilter from "./brand-filter";
import FiltersHeader from "./filters-header";
import PriceFilter from "./price-filter";

import RatingFilter from "./rating-filter";
import type { Brand, Category } from "../../../types/product";
import { useEffect, useRef } from "react";

import StockFilter from "./stock-filter";
import api from "../../../axios/config";
import { useProductStore } from "../../../stores/product";
import { useFilter } from "../../../contexts/use-filters";

type Props = {
  categories: Category[];
  brands: Brand[];
};

const Filters: React.FC<Props> = ({ brands, categories }) => {
  const { setProducts } = useProductStore();
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
    searchQuery,
    clearFilters,
  } = useFilter();

  const isMounted = useRef(false);

  useEffect(() => {
    console.log("filters.tsx: ", searchQuery);
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }

    const getFilteredProdcuts = async () => {
      try {
        const brandsToParams = Array.from(selectedBrands).join(", ");
        const { data } = await api.get(
          `/products?q=${searchQuery}&brand=${brandsToParams}&category=${category}&priceFrom=${priceRange.priceFrom}&priceTo=${priceRange.priceTo}&stock=${stock}&rating=${rating}`
        );
        if (data) setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    getFilteredProdcuts();
  }, [
    searchQuery,
    category,
    selectedBrands,
    priceRange,
    stock,
    selectedBrands,
    rating,
  ]);

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
