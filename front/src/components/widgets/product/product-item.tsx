import { Link } from "react-router";
import type { Product } from "../../../models/product/api";
import { useState } from "react";
import { CartIcon } from "../../../components";

type Props = {
  product: Product;
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const [featuresLimit, setFeaturesLimit] = useState(3);
  const productFeatures = product.features.split(", ");

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
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

        <div className="flex flex-wrap gap-1 mb-4">
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

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              {product.price} $
            </span>
          </div>

          {product.qtyInCart > 0 ? (
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                −
              </button>
              <span className="w-8 text-center text-sm">
                {product.qtyInCart}
              </span>
              <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100">
                +
              </button>
            </div>
          ) : (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-1">
              <CartIcon className="w-4 h-4" />
              <span>Купить</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
