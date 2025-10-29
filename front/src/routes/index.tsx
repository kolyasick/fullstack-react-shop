import React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useProductStore } from "../stores/product";

import api from "../axios/config";

import Filters from "../components/shared/filters";
import EmptyProducts from "../components/shared/empty-products";
import Loader from "../components/icons/loader";
import ProductItem from "../components/shared/product-item";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { products, setProducts } = useProductStore();
  const [loading, setLoading] = React.useState<boolean>(false);

  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/products");
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 3fr" }}>
        <Filters />

        <div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-gray-900">Товары</h3>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-24 aspect-square animate-spin" />
            </div>
          ) : true ? (
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
}
