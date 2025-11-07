import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getProductById } from "../../api/product";
import { useEffect, useState } from "react";
import type { ProductWithReview } from "../../models/product/api";
import {
  ProductHeader,
  ProductImages,
  ProductSkeleton,
  ProductStock,
} from "../../components";
import { ProductBody } from "../../components/widgets/product/product-body";

export const ProductPage = () => {
  const { id } = useParams() as { id: string };
  const [product, setProduct] = useState<ProductWithReview>();

  const { data, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await getProductById(id);
      return data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const updateProductQty = (qty: number) => {
    // @ts-ignore
    setProduct({ ...product, qtyInCart: qty });
  };

  useEffect(() => {
    if (data) setProduct(data);
  }, [data]);
  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <ProductSkeleton width={800} />
        </div>
      ) : !product ? (
        <div className="w-full h-full flex items-center justify-center">
          Товар не найден
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
              <ProductImages imageUrl={product.imageUrl} />

              <div className="space-y-6">
                <ProductHeader
                  reviewsLength={product.reviews.length}
                  title={product.title}
                />

                <ProductStock price={product.price} stock={product.inStock} />

                <ProductBody
                  brand={product.brand!.title}
                  category={product.category!.title}
                  description={product.description}
                  features={product.features}
                  qty={product.qtyInCart}
                  stock={product.inStock}
                  id={product.id}
                  updateQty={updateProductQty}
                />

                <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
                  <div className="flex items-center text-sm text-gray-500">
                    {/* <ShieldCheckIcon className="w-5 h-5 text-green-500 mr-1" /> */}
                    2-Year Warranty
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                      />
                    </svg>
                    Free Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Specifications
              </h2>
              <div className="space-y-4">
                {product.features.split(", ").map((feature, index) => (
                  <div
                    key={index}
                    className="flex justify-between py-3 border-b border-gray-100"
                  >
                    <span className="font-medium text-gray-500">
                      {index + 1}.
                    </span>
                    <span className="text-gray-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* <ProductReviews
            product={product}
            renderRatingStars={renderRatingStars}
            addReview={addReview}
          /> */}
          </div>
        </div>
      )}
    </>
  );
};
