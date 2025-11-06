import { Link } from "react-router";
import type { Product } from "../../../models/product/api";
import { useState } from "react";
import { ProductCounter } from "../../../components";
import { formatCurrency } from "../../../utils/formatCurrency";

type Props = {
  product: Product;
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const [featuresLimit, setFeaturesLimit] = useState(3);

  const productFeatures = product.features.split(", ");

  return (
    <div className="bg-white flex flex-col justify-between rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div>
        <Link to="/" className="relative overflow-hidden block">
          <img
            src={`/products/${product.imageUrl}`}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {product.inStock ? (
            <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              В наличии
            </div>
          ) : (
            <div className="absolute top-3 left-3 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Нет в наличии
            </div>
          )}

          <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {product.brand?.title}
          </div>
        </Link>

        <div className="p-4">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category?.title}
          </span>

          <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 line-clamp-2">
            {product.title}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-center mb-3">
            <div className="flex items-center"></div>
            <span className="text-sm text-gray-600 ml-2">
              {product.rating} {product.reviewsCount}
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {productFeatures
              .map((f) => (
                <span
                  key={f}
                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {f}
                </span>
              ))
              .splice(0, featuresLimit)}

            {productFeatures.length > featuresLimit ? (
              <span
                onClick={() => setFeaturesLimit(productFeatures.length)}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs cursor-pointer"
              >
                +{productFeatures.length - featuresLimit}
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 pb-4">
        <div>
          <span className="text-2xl font-bold text-gray-900">
            {formatCurrency(product.price)}
          </span>
        </div>

        <ProductCounter productId={product.id} qty={product.qtyInCart} />
      </div>
    </div>
  );
};
