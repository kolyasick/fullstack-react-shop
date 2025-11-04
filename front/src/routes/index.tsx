import { useEffect, useState } from "react";
import { useProductStore, useUserStore } from "../stores";

import type { Brand, Category, ProductResponse } from "../models/product/api";

import { EmptyProducts, Filters, ProductItem, Skeleton } from "../components";
import { getBrands, getCategories, getProducts } from "../api/product";
import { useLocation } from "react-router";
import { Paggination } from "../components/shared/paggination";

const IndexPage: React.FunctionComponent = () => {
  const { products } = useProductStore();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const { setProducts } = useProductStore();
  const { isLoading: isUserLoading, user } = useUserStore();

  const path = useLocation();

  const [pagginationInfo, setPagginationInfo] = useState<Omit<
    ProductResponse,
    "products"
  > | null>(null);

  useEffect(() => {
    if (isUserLoading) return;

    const getFilteredProducts = async () => {
      try {
        setLoading(true);
        const { data } = await getProducts(path.search);

        if (data) {
          setProducts(data.products);

          setPagginationInfo({
            currentPage: data.currentPage,
            hasMore: data.hasMore,
            totalCount: data.totalCount,
            totalPages: data.totalPages,
            pageSize: data.pageSize,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getFilteredProducts();
  }, [isUserLoading, path.search, user]);

  useEffect(() => {
    const findBrands = () => {
      getBrands().then((res) => setBrands(res.data));
    };
    const findCategories = () => {
      getCategories().then((res) => setCategories(res.data));
    };
    Promise.all([findBrands(), findCategories()]);
  }, []);

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

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} animation="wave" height={400} />
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
