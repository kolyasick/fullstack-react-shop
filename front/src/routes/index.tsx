import Filters from "../components/shared/filters/filters";
import EmptyProducts from "../components/shared/empty-products";
import Loader from "../components/icons/loader";
import ProductItem from "../components/shared/product-item";

import { useProductStore } from "../stores/product";
import { useEffect, useState } from "react";
import api from "../axios/config";
import type { Brand, Category } from "../types/product";

const IndexPage: React.FunctionComponent = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const { products, setProducts } = useProductStore();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/products");
        if (data) setProducts(data);
      } catch (error) {
        console.log("Ошибка при получении продуктов: ", error);
      } finally {
        setLoading(false);
      }
    };

    const getBrands = () => {
      api.get("/products/brands").then((res) => setBrands(res.data));
    };
    const getCategories = () => {
      api.get("/products/categories").then((res) => setCategories(res.data));
    };

    Promise.all([getProducts(), getBrands(), getCategories()]);
  }, []);
  return (
    <div className="container mx-auto px-4 py-8">
      <div
        className="grid items-start gap-8"
        style={{ gridTemplateColumns: "1fr 3fr" }}
      >
        <Filters brands={brands} categories={categories} />

        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Товары</h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-24 aspect-square animate-spin" />
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
