import Filters from "../components/shared/filters/filters";
import EmptyProducts from "../components/shared/empty-products";

import ProductItem from "../components/shared/product-item";

import { useProductStore } from "../stores/product";
import { useEffect, useState } from "react";
import api from "../axios/config";
import type { Brand, Category } from "../types/product";
import { useUserStore } from "../stores/user";
import { useFilterState } from "../contexts/use-filters";
import Skeleton from "../components/shared/skeleton";
import { ACCESS_TOKEN_NAME } from "../constants/app";
import { useNavigate } from "react-router";

const IndexPage: React.FunctionComponent = () => {
  const { products, setProducts } = useProductStore();
  const { isLoading: isUserLoading, user } = useUserStore();

  const { category, priceRange, rating, selectedBrands, stock, searchQuery } =
    useFilterState();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (isUserLoading) return;

    const getFilteredProducts = async () => {
      try {
        setLoading(true);
        const params = {
          q: searchQuery || "",
          brand: Array.from(selectedBrands).join(", "),
          category: category || "",
          priceFrom: priceRange.priceFrom?.toString() || "",
          priceTo: priceRange.priceTo?.toString() || "",
          stock: stock || "",
          rating: rating.toString() || "",
        };
        const token = localStorage.getItem(ACCESS_TOKEN_NAME);

        const filteredParams = Object.fromEntries(
          Object.entries(params).filter(
            ([_, value]) =>
              value !== "" && value !== null && value !== undefined
          )
        );

        const queryString = new URLSearchParams(filteredParams).toString();
        const { data } = await api.get(`/products?${queryString}`, {
          headers: {
            Authorization: token ? "Bearer " + token : undefined,
          },
        });
        await navigate(`/?${queryString}`);

        if (data) setProducts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFilteredProducts();
  }, [
    isUserLoading,
    searchQuery,
    category,
    selectedBrands,
    priceRange,
    stock,
    rating,
    user,
  ]);

  useEffect(() => {
    const getBrands = () => {
      api.get("/products/brands").then((res) => setBrands(res.data));
    };
    const getCategories = () => {
      api.get("/products/categories").then((res) => setCategories(res.data));
    };
    Promise.all([getBrands(), getCategories()]);
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="grid items-start gap-8"
        style={{ gridTemplateColumns: "1fr 3fr" }}
      >
        <Filters brands={brands} categories={categories} />

        <div>
          <div className="flex items-center justify-between mb-8 ">
            <h3 className="text-3xl font-bold text-gray-900">Товары</h3>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 ">
              {Array.from({ length: 9 }).map((_, i) => (
                <Skeleton key={i} animation="wave" height={400} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductItem key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <EmptyProducts />
          )}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
