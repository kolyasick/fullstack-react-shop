import { Link } from "react-router";
import type { Product } from "../../../models/product/api";
import { useState } from "react";
import { CartIcon } from "../../../components";
import { useCartStore, useProductStore } from "../../../stores";
import { formatCurrency } from "../../../utils/formatCurrency";

type Props = {
  product: Product;
};

export const ProductItem: React.FC<Props> = ({ product }) => {
  const [featuresLimit, setFeaturesLimit] = useState(3);
  const { addToCart: addProductToCart, removeFromCart: removeProductFromCart } =
    useCartStore();
  const { setProducts, products } = useProductStore();

  const productFeatures = product.features.split(", ");

  const addToCart = async (productId: number) => {
    try {
      await addProductToCart(productId);
      setProducts(
        products.map((p: Product) =>
          p.id === productId ? { ...p, qtyInCart: p.qtyInCart + 1 } : p
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromCart = async (productId: number, completely: boolean) => {
    try {
      await removeProductFromCart(productId, completely);
      setProducts(
        products.map((p: Product) =>
          p.id === productId ? { ...p, qtyInCart: p.qtyInCart - 1 } : p
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

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

        {product.qtyInCart > 0 ? (
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => removeFromCart(product.id, false)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              −
            </button>
            <span className="w-8 text-center text-sm">{product.qtyInCart}</span>
            <button
              onClick={() => addToCart(product.id)}
              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart(product.id)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center space-x-1"
          >
            <CartIcon className="w-4 h-4" />
            <span>Купить</span>
          </button>
        )}
      </div>
    </div>
  );
};
