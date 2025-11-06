import { useEffect, useState } from "react";
import { useProductStore, useUserStore } from "../stores";
import type { Brand, Category } from "../models/product/api";
import {
  EmptyProducts,
  Filters,
  ProductItem,
  ProductSkeleton,
} from "../components";
import { getBrands, getCategories, getProducts } from "../api/product";
import { useLocation } from "react-router";
import { Paggination } from "../components/shared/paggination";
import { useQueries } from "@tanstack/react-query";
import { usePaginationState } from "../hooks";

const IndexPage: React.FC = () => {
  const user = useUserStore((state) => state.user);
  const isUserLoading = useUserStore((state) => state.isLoading);

  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  const { pagginationInfo, setPaginationInfo } = usePaginationState();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const path = useLocation();

  const [brandsQuery, categoriesQuery, productsQuery] = useQueries({
    queries: [
      {
        queryKey: ["brands"],
        queryFn: async () => {
          const { data } = await getBrands();
          return data || [];
        },
        staleTime: 24 * 60 * 60 * 1000,
      },
      {
        queryKey: ["categories"],
        queryFn: async () => {
          const { data } = await getCategories();
          return data || [];
        },
        staleTime: 24 * 60 * 60 * 1000,
      },
      {
        queryKey: ["products", path.search, user?.id],
        queryFn: async () => {
          const { data } = await getProducts(path.search);
          return data;
        },
        staleTime: 5 * 60 * 1000,
        enabled: !isUserLoading,
      },
    ],
  });

  useEffect(() => {
    if (productsQuery.data) {
      setProducts(productsQuery.data.products);
      setPaginationInfo({
        currentPage: productsQuery.data.currentPage,
        hasMore: productsQuery.data.hasMore,
        totalCount: productsQuery.data.totalCount,
        totalPages: productsQuery.data.totalPages,
        pageSize: productsQuery.data.pageSize,
      });
    }
  }, [productsQuery.data, setProducts]);

  useEffect(() => {
    if (brandsQuery.data) setBrands(brandsQuery.data);
    if (categoriesQuery.data) setCategories(categoriesQuery.data);
  }, [brandsQuery.data, categoriesQuery.data]);

  const isLoading =
    brandsQuery.isLoading ||
    categoriesQuery.isLoading ||
    productsQuery.isLoading;

  return (
    <div
      className="grid items-start gap-8"
      style={{ gridTemplateColumns: "1fr 3fr" }}
    >
      <Filters brands={brands} categories={categories} />

      <div>
        <div className="flex items-center justify-between mb-8 ">
          <h3 className="text-3xl font-bold text-gray-900">Товары</h3>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductSkeleton className="w-full" key={i} />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <EmptyProducts />
        )}

        {pagginationInfo && (
          <Paggination
            currentPage={pagginationInfo.currentPage}
            hasMore={pagginationInfo.hasMore}
            totalCount={pagginationInfo.totalCount}
            totalPages={pagginationInfo.totalPages}
            pageSize={pagginationInfo.pageSize}
          />
        )}
      </div>
    </div>
  );
};

export default IndexPage;
